import { useState } from 'react';
import { Users, FileCheck, ShieldOff, Clock, CheckCircle2, AlertCircle, ArrowRight, Mail } from 'lucide-react';

const mockUsers = [
  { id: 'usr_8992', email: 'raj.kumar@example.in', purpose: 'Marketing, Analytics', status: 'Active', updated: '2 days ago', consentLog: 'SHA-256: 9f8e...a3c1' },
  { id: 'usr_8993', email: 'sneha.p@example.in', purpose: 'Essential Services Only', status: 'Partial Revocation', updated: '4 hrs ago', consentLog: 'SHA-256: 4b2d...e7f0' },
  { id: 'usr_8994', email: 'anita.d@example.in', purpose: 'Marketing', status: 'Withdrawn', updated: '1 hr ago', consentLog: 'SHA-256: c1a9...52bd' },
  { id: 'usr_8995', email: 'vikram.s@example.in', purpose: 'Analytics, Personalization', status: 'Active', updated: '5 days ago', consentLog: 'SHA-256: 7d3f...18e5' },
  { id: 'usr_8996', email: 'priya.m@example.in', purpose: 'None (Withdrawn All)', status: 'Withdrawn', updated: '12 hrs ago', consentLog: 'SHA-256: ae52...d4c8' },
];

const mockDSARs = [
  { id: 'DSAR-4401', user: 'anita.d@example.in', type: 'Erasure (Right to be Forgotten)', submitted: '2026-04-02 09:15', deadline: '2026-04-05 09:15', hoursLeft: 68, stage: 'Identity Verified', stageNum: 2 },
  { id: 'DSAR-4402', user: 'external_user_19@proton.me', type: 'Data Export (Portability)', submitted: '2026-04-01 14:30', deadline: '2026-04-04 14:30', hoursLeft: 12, stage: 'Data Gathering', stageNum: 3 },
  { id: 'DSAR-4403', user: 'raj.kumar@example.in', type: 'Data Export (Portability)', submitted: '2026-03-30 10:00', deadline: '2026-04-02 10:00', hoursLeft: -4, stage: 'SLA Breached', stageNum: -1 },
  { id: 'DSAR-4404', user: 'vikram.s@example.in', type: 'Correction', submitted: '2026-04-03 08:00', deadline: '2026-04-06 08:00', hoursLeft: 71, stage: 'Pending Verification', stageNum: 1 },
];

const stages = ['Submitted', 'Identity Verified', 'Data Gathering', 'Redaction', 'Fulfilled'];

const consentStats = [
  { label: 'Total Subjects', value: '12,480', color: 'var(--primary-color)' },
  { label: 'Active Consents', value: '11,204', color: 'var(--success)' },
  { label: 'Partial Revocations', value: '892', color: 'var(--warning)' },
  { label: 'Full Withdrawals', value: '384', color: 'var(--danger)' },
];

export default function ConsentManagement() {
  const [activeSection, setActiveSection] = useState<'consent' | 'dsar'>('consent');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Toggle Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={() => setActiveSection('consent')}
          style={{
            padding: '10px 24px', borderRadius: '8px', border: '1px solid var(--border-color)',
            backgroundColor: activeSection === 'consent' ? 'var(--primary-color)' : 'transparent',
            color: activeSection === 'consent' ? 'white' : 'var(--text-muted)',
            cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'inherit',
            transition: 'all 0.2s'
          }}
        >
          <Users size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          Consent Ledger
        </button>
        <button
          onClick={() => setActiveSection('dsar')}
          style={{
            padding: '10px 24px', borderRadius: '8px', border: '1px solid var(--border-color)',
            backgroundColor: activeSection === 'dsar' ? 'var(--primary-color)' : 'transparent',
            color: activeSection === 'dsar' ? 'white' : 'var(--text-muted)',
            cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', fontFamily: 'inherit',
            transition: 'all 0.2s'
          }}
        >
          <Clock size={16} style={{ marginRight: 6, verticalAlign: 'middle' }} />
          DSAR Workflow
        </button>
      </div>

      {activeSection === 'consent' && (
        <>
          {/* Stats Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {consentStats.map((s) => (
              <div key={s.label} className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: s.color }}>{s.value}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Consent Table */}
          <div className="glass-panel">
            <div className="card-title">
              <Users size={22} color="var(--primary-color)" /> Immutable Consent Ledger
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
              Cryptographically signed log of user consent events. Each entry's integrity is verifiable via its SHA-256 hash.
            </p>

            <table className="data-table">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Identifier (Masked)</th>
                  <th>Consented Purposes</th>
                  <th>Proof Hash</th>
                  <th>Last Updated</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockUsers.map(user => (
                  <tr key={user.id}>
                    <td style={{ fontFamily: 'monospace' }}>{user.id}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={14} color="var(--text-muted)" />
                        {user.email.replace(/(.{2})(.*)(?=@)/, "$1***")}
                      </div>
                    </td>
                    <td>{user.purpose}</td>
                    <td style={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user.consentLog}</td>
                    <td>{user.updated}</td>
                    <td>
                       <span className={`badge ${
                        user.status === 'Active' ? 'badge-success' :
                        user.status === 'Withdrawn' ? 'badge-danger' : 'badge-warning'
                      }`}>
                        {user.status === 'Withdrawn' ? <ShieldOff size={12} style={{marginRight: 4}}/> : <FileCheck size={12} style={{marginRight: 4}}/>}
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeSection === 'dsar' && (
        <>
          {/* DSAR Pipeline */}
          <div className="glass-panel">
            <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={22} color="var(--primary-color)" /> DSAR Fulfillment Pipeline
              </div>
              <span className="badge badge-warning">72-Hour SLA Enforced (DPDP Act §13)</span>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
              End-to-end data subject request automation. Identity verification → Data gathering → AI-assisted redaction → Delivery.
            </p>

            {/* Stage Legend */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '24px', padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px' }}>
              {stages.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{
                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 600,
                    backgroundColor: 'rgba(37,99,235,0.1)', color: 'var(--primary-hover)'
                  }}>
                    {i + 1}. {s}
                  </div>
                  {i < stages.length - 1 && <ArrowRight size={14} color="var(--text-muted)" style={{ margin: '0 4px' }} />}
                </div>
              ))}
            </div>

            {/* DSAR Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {mockDSARs.map(dsar => {
                const isBreach = dsar.hoursLeft < 0;
                const isUrgent = dsar.hoursLeft > 0 && dsar.hoursLeft <= 24;
                return (
                  <div key={dsar.id} style={{
                    padding: '20px 24px',
                    backgroundColor: 'rgba(255,255,255,0.02)',
                    borderRadius: '12px',
                    border: `1px solid ${isBreach ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.05)'}`,
                    borderLeft: `4px solid ${isBreach ? 'var(--danger)' : isUrgent ? 'var(--warning)' : 'var(--success)'}`,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <span style={{ fontFamily: 'monospace', fontWeight: 700 }}>{dsar.id}</span>
                          <span className={`badge ${isBreach ? 'badge-danger' : isUrgent ? 'badge-warning' : 'badge-success'}`}>
                            {isBreach ? <AlertCircle size={12} style={{marginRight: 4}}/> : isUrgent ? <Clock size={12} style={{marginRight: 4}}/> : <CheckCircle2 size={12} style={{marginRight: 4}}/>}
                            {isBreach ? `SLA Breached (${Math.abs(dsar.hoursLeft)}h overdue)` : `${dsar.hoursLeft}h remaining`}
                          </span>
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>
                          {dsar.type} — <span style={{ color: 'var(--text-main)' }}>{dsar.user}</span>
                        </div>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>
                        <div>Submitted: {dsar.submitted}</div>
                        <div>Deadline: {dsar.deadline}</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {!isBreach && (
                      <div style={{ display: 'flex', gap: '4px', height: '6px' }}>
                        {stages.map((_, i) => (
                          <div key={i} style={{
                            flex: 1, borderRadius: '3px',
                            backgroundColor: i < dsar.stageNum ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)',
                            transition: 'background-color 0.3s'
                          }} />
                        ))}
                      </div>
                    )}
                    {!isBreach && (
                      <div style={{ fontSize: '0.8rem', color: 'var(--primary-hover)', marginTop: '8px' }}>
                        Current Stage: <strong>{dsar.stage}</strong>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
