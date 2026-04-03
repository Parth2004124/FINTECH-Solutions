
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { ShieldAlert, ShieldCheck, Shield } from 'lucide-react';

interface RiskScoreProps {
  unmappedDataVol: number;
  expiredConsents: number;
  overdueDSARs: number;
  crossBorderViolations: number;
}

export default function RiskScoreGauge({
  unmappedDataVol,
  expiredConsents,
  overdueDSARs,
  crossBorderViolations
}: RiskScoreProps) {
  // PRD Algorithm
  const score = Math.round(
    (unmappedDataVol * 0.3) +
    (expiredConsents * 0.4) +
    (overdueDSARs * 0.2) +
    (crossBorderViolations * 0.1)
  );

  let statusText = 'Low Risk';
  let color = '#10b981'; // Green
  let Icon = ShieldCheck;
  
  if (score > 70) {
    statusText = 'Critical';
    color = '#ef4444'; // Red
    Icon = ShieldAlert;
  } else if (score > 30) {
    statusText = 'At Risk';
    color = '#f59e0b'; // Yellow
    Icon = Shield;
  }

  const data = [
    { name: 'Risk', value: score, color: color },
    { name: 'Safe', value: 100 - score, color: 'rgba(255,255,255,0.05)' }
  ];

  return (
    <div className="glass-panel col-span-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h3 className="card-title" style={{ width: '100%', marginBottom: '0' }}><Icon size={20} color={color} /> Risk Scoring Engine</h3>
      
      <div style={{ position: 'relative', width: '100%', height: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="75%"
              startAngle={180}
              endAngle={0}
              innerRadius={80}
              outerRadius={100}
              dataKey="value"
              stroke="none"
              cornerRadius={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div style={{ position: 'absolute', top: '55%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', fontWeight: '700', lineHeight: '1', color: color }}>{score}</div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>
            {statusText}
          </div>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-main)', fontWeight: '600' }}>{Math.round(unmappedDataVol * 0.3)}</div>
          <div>Unmapped (-30%)</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-main)', fontWeight: '600' }}>{Math.round(expiredConsents * 0.4)}</div>
          <div>Consent (-40%)</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'var(--text-main)', fontWeight: '600' }}>{Math.round(overdueDSARs * 0.2)}</div>
          <div>SLA (-20%)</div>
        </div>
      </div>
    </div>
  );
}
