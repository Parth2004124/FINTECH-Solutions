import { useState } from 'react';
import { Database, Search, MapPin, Globe, ArrowUpRight, Filter } from 'lucide-react';

const mockRopa = [
  { id: 1, system: 'AWS RDS (PostgreSQL)', owner: 'DevOps Team', dataCategory: 'PII, Financial', piiFields: ['Aadhaar', 'PAN', 'Bank Account'], legalBasis: 'Contractual', retention: '7 Years', location: 'ap-south-1 (Mumbai)', region: '🇮🇳 India', records: '1.2M', status: 'Compliant', lastScan: '2 hrs ago' },
  { id: 2, system: 'Salesforce CRM', owner: 'Sales Operations', dataCategory: 'PII', piiFields: ['Email', 'Phone', 'Name'], legalBasis: 'Consent', retention: '3 Years', location: 'eu-west-1 (Ireland)', region: '🇪🇺 EU', records: '450K', status: 'Warning - Cross Border', lastScan: '6 hrs ago' },
  { id: 3, system: 'HubSpot Marketing', owner: 'Marketing Leads', dataCategory: 'Marketing Analytics', piiFields: ['Email', 'Cookies'], legalBasis: 'Legitimate Interest', retention: '1 Year', location: 'us-east-1 (N. Virginia)', region: '🇺🇸 USA', records: '890K', status: 'Blocked - No DPDP Addendum', lastScan: '1 day ago' },
  { id: 4, system: 'Stripe Billing', owner: 'Finance', dataCategory: 'PCI, Financial', piiFields: ['Card Number (tokenized)', 'Billing Address'], legalBasis: 'Contractual / Legal', retention: '10 Years', location: 'ap-south-1 (Mumbai)', region: '🇮🇳 India', records: '320K', status: 'Compliant', lastScan: '30 mins ago' },
  { id: 5, system: 'S3 Application Logs', owner: 'Engineering', dataCategory: 'IP Addresses, Auth Tokens', piiFields: ['IP Address', 'Session Tokens'], legalBasis: 'Security', retention: '90 Days', location: 'ap-south-1 (Mumbai)', region: '🇮🇳 India', records: '2TB', status: 'Review Needed', lastScan: 'Scanning...' },
  { id: 6, system: 'MongoDB Atlas (User Profiles)', owner: 'Product Team', dataCategory: 'PII, Behavioral', piiFields: ['Name', 'DOB', 'Preferences'], legalBasis: 'Consent', retention: '5 Years', location: 'ap-south-1 (Mumbai)', region: '🇮🇳 India', records: '2.1M', status: 'Compliant', lastScan: '1 hr ago' },
];

const stats = [
  { label: 'Total Data Sources', value: '6', color: 'var(--primary-color)' },
  { label: 'PII Fields Tracked', value: '14', color: '#a855f7' },
  { label: 'Cross-Border Flows', value: '2', color: 'var(--warning)' },
  { label: 'Blocked Systems', value: '1', color: 'var(--danger)' },
];

export default function DataInventory() {
  const [search, setSearch] = useState('');
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filtered = mockRopa.filter(r =>
    r.system.toLowerCase().includes(search.toLowerCase()) ||
    r.dataCategory.toLowerCase().includes(search.toLowerCase()) ||
    r.piiFields.some(f => f.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Stats Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {stats.map((s) => (
          <div key={s.label} className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: s.color }}>{s.value}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Main Table */}
      <div className="glass-panel">
        <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Database size={22} color="var(--primary-color)" /> Record of Processing Activities (RoPA)
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div className="chat-input" style={{ width: '300px' }}>
              <input
                type="text"
                placeholder="Search systems, PII fields..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button><Search size={16} /></button>
            </div>
            <button style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
              color: 'var(--text-muted)', borderRadius: '8px', padding: '0 12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem'
            }}>
              <Filter size={14} /> Filter
            </button>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '8px', marginBottom: '24px' }}>
          Automated data flow mapping across all connected data silos. Click any row to expand PII details.
        </p>

        <table className="data-table">
          <thead>
            <tr>
              <th>System / Database</th>
              <th>Data Categories</th>
              <th>Legal Basis</th>
              <th>Data Location</th>
              <th>Records</th>
              <th>Last Scan</th>
              <th>Compliance</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(row => (
              <>
                <tr
                  key={row.id}
                  onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}
                  style={{ cursor: 'pointer', transition: 'background 0.2s' }}
                >
                  <td>
                    <div style={{ fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {row.system}
                      <ArrowUpRight size={12} color="var(--text-muted)" />
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Owner: {row.owner}</div>
                  </td>
                  <td>{row.dataCategory}</td>
                  <td><span className="badge badge-neutral">{row.legalBasis}</span></td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={12} color="var(--text-muted)" />
                      <div>
                        <div>{row.region}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{row.location}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ fontFamily: 'monospace', fontWeight: 600 }}>{row.records}</td>
                  <td style={{ color: row.lastScan === 'Scanning...' ? 'var(--warning)' : 'var(--text-muted)', fontSize: '0.85rem' }}>{row.lastScan}</td>
                  <td>
                    <span className={`badge ${
                      row.status.includes('Compliant') ? 'badge-success' :
                      row.status.includes('Blocked') ? 'badge-danger' : 'badge-warning'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
                {expandedRow === row.id && (
                  <tr key={`${row.id}-detail`}>
                    <td colSpan={7} style={{ padding: '16px 24px', backgroundColor: 'rgba(37,99,235,0.03)', borderLeft: '3px solid var(--primary-color)' }}>
                      <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Detected PII Fields</div>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {row.piiFields.map(f => (
                              <span key={f} className="badge badge-warning" style={{ fontSize: '0.8rem' }}>{f}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Retention Policy</div>
                          <span style={{ fontWeight: 600 }}>{row.retention}</span>
                        </div>
                        <div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Cross-Border</div>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Globe size={14} color={row.region.includes('India') ? 'var(--success)' : 'var(--warning)'} />
                            {row.region.includes('India') ? 'Domestic' : 'International Transfer'}
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
