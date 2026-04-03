
import { Clock, AlertCircle } from 'lucide-react';

const mockDSARs = [
  { id: 'REQ-8890', user: 'alice@example.com', type: 'Deletion', status: 'Pending', timeframe: '68h left', isAtRisk: false },
  { id: 'REQ-8891', user: 'bob@example.com', type: 'Export', status: 'In Progress', timeframe: '12h left', isAtRisk: true },
  { id: 'REQ-8889', user: 'charlie@exam...', type: 'Export', status: 'Fulfilled', timeframe: 'Done', isAtRisk: false },
  { id: 'REQ-8888', user: 'diana@example...', type: 'Correction', status: 'SLA Breach', timeframe: '-4h overdue', isAtRisk: true, isBreach: true },
];

export default function DSARTracker() {
  return (
    <div className="glass-panel col-span-8">
      <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={20} color="var(--primary-hover)" /> 
          DSAR (Subject Access Request) Automation
        </div>
        <span className="badge badge-warning">72h SLA Enforced</span>
      </div>
      
      <table className="data-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Data Subject</th>
            <th>Type</th>
            <th>Countdown</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {mockDSARs.map((req) => (
            <tr key={req.id}>
              <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{req.id}</td>
              <td style={{ color: 'var(--text-muted)' }}>{req.user}</td>
              <td>{req.type}</td>
              <td>
                <span style={{ 
                  color: req.isBreach ? 'var(--danger)' : req.isAtRisk ? 'var(--warning)' : 'var(--text-muted)',
                  fontWeight: req.isAtRisk ? '600' : '400',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  {req.isBreach && <AlertCircle size={14} />}
                  {req.timeframe}
                </span>
              </td>
              <td>
                <span className={`badge ${
                  req.status === 'Fulfilled' ? 'badge-success' : 
                  (req.isBreach ? 'badge-danger' : 
                  (req.status === 'Pending' ? 'badge-neutral' : 'badge-warning'))
                }`}>
                  {req.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
