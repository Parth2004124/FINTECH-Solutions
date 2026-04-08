
import { Database, Cloud, FileText, CheckCircle, XCircle } from 'lucide-react';

const sources = [
  { id: 1, name: 'AWS RDS (PostgreSQL)', type: 'Database', records: '1.2M', pii: 'Aadhaar, PAN', status: 'Syncing', icon: Database, synced: true },
  { id: 2, name: 'Salesforce CRM', type: 'SaaS', records: '450K', pii: 'Email, Phone', status: 'Synced', icon: Cloud, synced: true },
  { id: 3, name: 'HubSpot Marketing', type: 'SaaS', records: '890K', pii: 'Email', status: 'Compliance Blocked', icon: Cloud, synced: false },
  { id: 4, name: 'S3 Support Logs', type: 'Unstructured', records: '2TB', pii: 'Scanning...', status: 'NLP Scanning', icon: FileText, synced: true },
];

export default function DataSourcesInventory() {
  return (
    <div className="glass-panel col-span-6">
      <div className="card-title">
        <Database size={20} color="var(--primary-color)" /> Data Discovery & RoPA Inventory
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sources.map((source) => (
          <div key={source.id} style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '16px',
            backgroundColor: 'rgba(255,255,255,0.02)',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '8px', 
                backgroundColor: 'rgba(37,99,235,0.1)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center' 
              }}>
                <source.icon size={20} color="var(--primary-color)" />
              </div>
              <div>
                <div style={{ fontWeight: '600' }}>{source.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{source.type} • {source.records} Records</div>
              </div>
            </div>
            
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '4px' }}>PII: {source.pii}</div>
              <div style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '4px',
                fontSize: '0.8rem', color: source.synced ? 'var(--success)' : 'var(--danger)'
              }}>
                {source.synced ? <CheckCircle size={12} /> : <XCircle size={12} />}
                {source.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
