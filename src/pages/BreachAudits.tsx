import { useState } from 'react';
import { AlertTriangle, ShieldAlert, Activity, FileText, CheckCircle, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

const mockIncidents = [
  { id: 'INC-2026-041', date: '2026-04-01', time: '02:34 IST', description: 'Unauthorized API access to staging database via expired service token', severity: 'Critical', affectedUsers: 1200, notification: 'Notified DPB (within 24h)', status: 'Under Investigation', responder: 'Security Team' },
  { id: 'INC-2026-038', date: '2026-03-22', time: '14:10 IST', description: 'Internal analytics tool exported bulk PII without AI-assisted redaction', severity: 'High', affectedUsers: 450, notification: 'Internal Only', status: 'Mitigated', responder: 'DPO Office' },
  { id: 'INC-2026-029', date: '2026-02-14', time: '09:00 IST', description: 'S3 bucket temporary public exposure (CloudTrail confirmed no external access)', severity: 'Medium', affectedUsers: 0, notification: 'Log Only', status: 'Closed', responder: 'DevOps' },
];

const auditTrail = [
  { ts: '2026-04-03 10:02:34', actor: 'System Agent', action: 'Blocked HubSpot API sync', reason: 'Missing DPDP data processing addendum', icon: 'block' },
  { ts: '2026-04-03 09:45:12', actor: 'Parth Bhosale (DPO)', action: 'Approved DSAR-4401 identity verification', reason: 'OTP verified via Aadhaar DigiLocker', icon: 'approve' },
  { ts: '2026-04-03 09:30:00', actor: 'Scanner Agent', action: 'Completed PII scan on MongoDB Atlas', reason: '3 new PII fields detected: DOB, Preferences, Location', icon: 'scan' },
  { ts: '2026-04-03 08:15:22', actor: 'System Agent', action: 'Auto-escalated DSAR-4403 to CXO', reason: 'SLA breach: 72h deadline exceeded by 4 hours', icon: 'escalate' },
  { ts: '2026-04-02 23:59:59', actor: 'Cron Scheduler', action: 'Generated daily compliance snapshot', reason: 'Risk score: 76 (Critical). 2 overdue DSARs flagged.', icon: 'report' },
  { ts: '2026-04-02 18:30:00', actor: 'Parth Bhosale (DPO)', action: 'Exported audit report for Q1 2026', reason: 'Regulatory filing preparation for DPB annual review', icon: 'export' },
];

const breachStats = [
  { label: 'Open Incidents', value: '1', color: 'var(--danger)' },
  { label: 'Mitigated (30d)', value: '1', color: 'var(--warning)' },
  { label: 'Closed (YTD)', value: '3', color: 'var(--success)' },
  { label: 'Avg. Response Time', value: '4.2h', color: 'var(--primary-color)' },
];

export default function BreachAudits() {
  const [expandedIncident, setExpandedIncident] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {breachStats.map((s) => (
          <div key={s.label} className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: s.color }}>{s.value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Incident Log */}
      <div className="glass-panel" style={{ borderLeft: '4px solid var(--danger)' }}>
        <div className="card-title">
          <ShieldAlert size={22} color="var(--danger)" /> Security Incident Register
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Under DPDP Act §8, significant breaches must be reported to the Data Protection Board within 72 hours.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {mockIncidents.map(inc => (
            <div key={inc.id} style={{
              padding: '20px',
              backgroundColor: 'rgba(255,255,255,0.02)',
              borderRadius: '12px',
              border: `1px solid ${inc.severity === 'Critical' ? 'rgba(239,68,68,0.2)' : 'rgba(255,255,255,0.05)'}`,
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
              onClick={() => setExpandedIncident(expandedIncident === inc.id ? null : inc.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '8px',
                    backgroundColor: inc.severity === 'Critical' ? 'rgba(239,68,68,0.1)' : inc.severity === 'High' ? 'rgba(245,158,11,0.1)' : 'rgba(255,255,255,0.05)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <ShieldAlert size={20} color={inc.severity === 'Critical' ? 'var(--danger)' : inc.severity === 'High' ? 'var(--warning)' : 'var(--text-muted)'} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontWeight: 700, fontFamily: 'monospace', color: inc.severity === 'Critical' ? 'var(--danger)' : 'inherit' }}>{inc.id}</span>
                      <span className={`badge ${inc.severity === 'Critical' ? 'badge-danger' : inc.severity === 'High' ? 'badge-warning' : 'badge-neutral'}`}>{inc.severity}</span>
                      <span className={`badge ${inc.status === 'Under Investigation' ? 'badge-danger' : inc.status === 'Mitigated' ? 'badge-warning' : 'badge-success'}`}>{inc.status}</span>
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>{inc.description}</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <div>{inc.date}</div>
                    <div>{inc.time}</div>
                  </div>
                  {expandedIncident === inc.id ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
                </div>
              </div>

              {expandedIncident === inc.id && (
                <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Affected Users</div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', marginTop: '4px', color: inc.affectedUsers > 0 ? 'var(--warning)' : 'var(--success)' }}>{inc.affectedUsers.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Regulatory Action</div>
                    <div style={{ fontWeight: 600, marginTop: '4px' }}>{inc.notification}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Responder</div>
                    <div style={{ fontWeight: 600, marginTop: '4px' }}>{inc.responder}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <button style={{
                      backgroundColor: 'rgba(37,99,235,0.1)', color: 'var(--primary-hover)', border: '1px solid rgba(37,99,235,0.2)',
                      padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem',
                      display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'inherit'
                    }}>
                      <FileText size={14} /> Generate DPB Report
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
           <button style={{
             backgroundColor: 'var(--danger)', color: 'white', border: 'none', padding: '12px 24px',
             borderRadius: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px',
             cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem'
           }}>
             <AlertTriangle size={16} /> Declare New Breach
           </button>
        </div>
      </div>

      {/* Audit Trail */}
      <div className="glass-panel">
        <div className="card-title">
          <Activity size={22} color="var(--primary-color)" /> System Audit Trail (Append-Only)
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Tamper-proof log of all system and human actions. Stored in append-only ledger (Elasticsearch / AWS QLDB).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {auditTrail.map((entry, i) => (
            <div key={i} style={{
              display: 'flex', gap: '16px', padding: '16px 0',
              borderBottom: i < auditTrail.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '32px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  backgroundColor:
                    entry.icon === 'block' ? 'rgba(239,68,68,0.1)' :
                    entry.icon === 'approve' ? 'rgba(16,185,129,0.1)' :
                    entry.icon === 'escalate' ? 'rgba(245,158,11,0.1)' :
                    'rgba(37,99,235,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  {entry.icon === 'block' && <XCircle size={16} color="var(--danger)" />}
                  {entry.icon === 'approve' && <CheckCircle size={16} color="var(--success)" />}
                  {entry.icon === 'escalate' && <AlertTriangle size={16} color="var(--warning)" />}
                  {entry.icon === 'scan' && <Activity size={16} color="var(--primary-color)" />}
                  {entry.icon === 'report' && <FileText size={16} color="var(--primary-color)" />}
                  {entry.icon === 'export' && <FileText size={16} color="var(--primary-color)" />}
                </div>
                {i < auditTrail.length - 1 && <div style={{ width: '2px', flex: 1, backgroundColor: 'rgba(255,255,255,0.05)', marginTop: '4px' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{entry.action}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>{entry.reason}</div>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', marginLeft: '16px' }}>
                    <div>{entry.ts}</div>
                    <div style={{ textAlign: 'right', color: 'var(--primary-hover)' }}>{entry.actor}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
