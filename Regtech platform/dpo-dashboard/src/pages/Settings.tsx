import { useState } from 'react';
import { Sliders, Key, Bell, Shield, Clock, Save, RotateCcw, Eye, EyeOff, Copy, Plus } from 'lucide-react';

interface WeightConfig {
  unmapped: number;
  consent: number;
  sla: number;
  crossBorder: number;
}

export default function Settings() {
  const [weights, setWeights] = useState<WeightConfig>({ unmapped: 30, consent: 40, sla: 20, crossBorder: 10 });
  const [dsarSLA, setDsarSLA] = useState(72);
  const [showKey1, setShowKey1] = useState(false);
  const [showKey2, setShowKey2] = useState(false);
  const [saved, setSaved] = useState(false);

  const total = weights.unmapped + weights.consent + weights.sla + weights.crossBorder;
  const isValid = total === 100;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setWeights({ unmapped: 30, consent: 40, sla: 20, crossBorder: 10 });
    setDsarSLA(72);
  };

  // Simulated live score preview
  const previewScore = Math.round(
    (145 * (weights.unmapped / 100) * 0.3) +
    (80 * (weights.consent / 100) * 0.4) +
    (100 * (weights.sla / 100) * 0.2) +
    (0 * (weights.crossBorder / 100) * 0.1)
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '900px' }}>

      {/* Risk Algorithm */}
      <div className="glass-panel">
        <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={22} color="var(--primary-color)" /> Risk Algorithm Configuration
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handleReset} style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
              color: 'var(--text-muted)', borderRadius: '8px', padding: '6px 14px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontFamily: 'inherit'
            }}>
              <RotateCcw size={14} /> Reset Defaults
            </button>
            <button onClick={handleSave} style={{
              background: saved ? 'var(--success)' : 'var(--primary-color)', border: 'none',
              color: 'white', borderRadius: '8px', padding: '6px 18px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'inherit',
              transition: 'background-color 0.3s'
            }}>
              <Save size={14} /> {saved ? 'Saved ✓' : 'Save Configuration'}
            </button>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
          Adjust the weighting factors for the organizational Risk Score (0–100). The formula is:
          <code style={{ display: 'block', marginTop: '8px', padding: '10px 16px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '6px', fontSize: '0.85rem', color: 'var(--primary-hover)' }}>
            Risk = (Unmapped × {weights.unmapped}%) + (Expired Consents × {weights.consent}%) + (Overdue DSARs × {weights.sla}%) + (Cross-Border × {weights.crossBorder}%)
          </code>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { key: 'unmapped' as const, label: 'Unmapped Data Volume', color: '#3b82f6' },
            { key: 'consent' as const, label: 'Expired Consents', color: '#f59e0b' },
            { key: 'sla' as const, label: 'Overdue DSARs (SLA)', color: '#ef4444' },
            { key: 'crossBorder' as const, label: 'Cross-Border Violations', color: '#a855f7' },
          ].map(item => (
            <div key={item.key}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontWeight: 500 }}>{item.label}</span>
                <span style={{ fontWeight: 700, color: item.color, fontFamily: 'monospace' }}>{weights[item.key]}%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <input
                  type="range" min="0" max="100" value={weights[item.key]}
                  onChange={(e) => setWeights(prev => ({ ...prev, [item.key]: Number(e.target.value) }))}
                  style={{ width: '100%', accentColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Validation + Preview */}
        <div style={{
          marginTop: '24px', padding: '16px', borderRadius: '8px',
          backgroundColor: isValid ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)',
          border: `1px solid ${isValid ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
          <div>
            <div style={{ fontWeight: 600, color: isValid ? 'var(--success)' : 'var(--danger)' }}>
              Total Weight: {total}% {isValid ? '✓ Valid' : '✗ Must equal 100%'}
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {isValid ? 'Configuration is ready to apply.' : 'Adjust sliders so total equals exactly 100%.'}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Preview Score</div>
            <div style={{
              fontSize: '2rem', fontWeight: 700,
              color: previewScore > 70 ? 'var(--danger)' : previewScore > 30 ? 'var(--warning)' : 'var(--success)'
            }}>{previewScore}</div>
          </div>
        </div>
      </div>

      {/* SLA Configuration */}
      <div className="glass-panel">
        <div className="card-title">
          <Clock size={22} color="var(--primary-color)" /> DSAR SLA Timer
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Configure the default deadline for DSAR fulfillment. Under DPDP Act §13, the recommended maximum is 72 hours.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <input
            type="number" value={dsarSLA} min={24} max={168}
            onChange={(e) => setDsarSLA(Number(e.target.value))}
            style={{
              width: '100px', padding: '10px 16px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)',
              borderRadius: '8px', color: 'var(--text-main)', fontSize: '1.2rem', fontWeight: 700, fontFamily: 'inherit', textAlign: 'center'
            }}
          />
          <span style={{ color: 'var(--text-muted)' }}>hours</span>
          {dsarSLA > 72 && (
            <span className="badge badge-warning" style={{ marginLeft: '8px' }}>
              ⚠ Exceeds DPDP recommended limit
            </span>
          )}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass-panel">
        <div className="card-title">
          <Bell size={22} color="var(--primary-color)" /> Notification Preferences
        </div>
        {[
          { label: 'SLA Breach Escalation to CXO', desc: 'Auto-email to C-suite when DSAR deadlines are missed', enabled: true },
          { label: 'New Breach Auto-Lock Records', desc: 'Automatically lock affected data records on breach declaration', enabled: true },
          { label: 'Daily Compliance Digest', desc: 'Morning summary of risk score changes and pending actions', enabled: false },
          { label: 'Real-time PII Detection Alerts', desc: 'Notify DPO when NLP scanner finds new PII in unstructured data', enabled: true },
        ].map((pref, i) => (
          <div key={i} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '14px 0', borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.03)' : 'none'
          }}>
            <div>
              <div style={{ fontWeight: 500 }}>{pref.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{pref.desc}</div>
            </div>
            <label style={{
              position: 'relative', display: 'inline-block', width: '44px', height: '24px', cursor: 'pointer'
            }}>
              <input type="checkbox" defaultChecked={pref.enabled} style={{ opacity: 0, width: 0, height: 0 }} />
              <span style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                backgroundColor: pref.enabled ? 'var(--primary-color)' : 'rgba(255,255,255,0.1)',
                borderRadius: '12px', transition: '0.3s'
              }}>
                <span style={{
                  position: 'absolute', left: pref.enabled ? '22px' : '2px', bottom: '2px',
                  width: '20px', height: '20px', borderRadius: '50%',
                  backgroundColor: 'white', transition: '0.3s'
                }} />
              </span>
            </label>
          </div>
        ))}
      </div>

      {/* API Keys */}
      <div className="glass-panel">
        <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={22} color="var(--primary-color)" /> Platform API Keys
          </div>
          <button style={{
            background: 'var(--primary-color)', border: 'none', color: 'white',
            borderRadius: '8px', padding: '6px 14px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontFamily: 'inherit'
          }}>
            <Plus size={14} /> Generate New Key
          </button>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '16px' }}>
          Service account keys for frontend consent SDKs and backend data source crawlers.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: 'Production Website Consent SDK', access: 'Write-Only', lastUsed: 'Just now', key: 'key_live_4f8e...a2c1d9', show: showKey1, setShow: setShowKey1, fullKey: 'key_live_4f8e7b2a91c3d8e5f0a2c1d9' },
            { name: 'AWS Read-Replica Scanner', access: 'Read-Only', lastUsed: '15 mins ago', key: 'key_scan_7d3f...e18b52', show: showKey2, setShow: setShowKey2, fullKey: 'key_scan_7d3f9a1c4b2e6d8f5a0e18b52' },
          ].map((apiKey, i) => (
            <div key={i} style={{
              padding: '16px 20px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '10px',
              border: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <div>
                <div style={{ fontWeight: 600 }}>{apiKey.name}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '6px' }}>
                  <span className="badge badge-neutral">{apiKey.access}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Last used: {apiKey.lastUsed}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                  <code style={{ fontSize: '0.8rem', color: 'var(--primary-hover)', backgroundColor: 'rgba(37,99,235,0.05)', padding: '4px 8px', borderRadius: '4px' }}>
                    {apiKey.show ? apiKey.fullKey : apiKey.key}
                  </code>
                  <button onClick={() => apiKey.setShow(!apiKey.show)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}>
                    {apiKey.show ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                  <button onClick={() => navigator.clipboard.writeText(apiKey.fullKey)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}>
                    <Copy size={14} />
                  </button>
                </div>
              </div>
              <button style={{
                background: 'transparent', border: '1px solid var(--danger)', color: 'var(--danger)',
                padding: '6px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem', fontFamily: 'inherit'
              }}>
                Revoke
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Security */}
      <div className="glass-panel">
        <div className="card-title">
          <Shield size={22} color="var(--primary-color)" /> Security & Encryption
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { label: 'Encryption at Rest', value: 'AES-256', badge: 'badge-success' },
            { label: 'Encryption in Transit', value: 'TLS 1.3', badge: 'badge-success' },
            { label: 'MFA Enforcement', value: 'Enabled', badge: 'badge-success' },
            { label: 'RBAC Model', value: '4 Roles Active', badge: 'badge-neutral' },
            { label: 'SOC2 Type II', value: 'Certified', badge: 'badge-success' },
            { label: 'ISO 27001', value: 'Audit Scheduled', badge: 'badge-warning' },
          ].map((sec, i) => (
            <div key={i} style={{
              padding: '16px', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>{sec.label}</div>
              <span className={`badge ${sec.badge}`}>{sec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
