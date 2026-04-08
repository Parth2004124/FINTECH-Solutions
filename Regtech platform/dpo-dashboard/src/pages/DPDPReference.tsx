import { useState } from 'react';
import { BookOpen, ChevronDown, ChevronUp, Scale, AlertTriangle, IndianRupee } from 'lucide-react';
import { getDPDPActReference } from '../services/regulatoryIntel';

export default function DPDPReference() {
  const sections = getDPDPActReference();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header */}
      <div className="glass-panel" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <Scale size={24} color="var(--primary-color)" />
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
            Digital Personal Data Protection Act, 2023
          </h3>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
          Quick reference guide for key DPDP Act sections relevant to platform compliance operations.
          Source: <a href="https://www.meity.gov.in/writereaddata/files/Digital_Personal_Data_Protection_Act_2023.pdf" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-hover)' }}>MeitY Official</a> /
          <a href="https://www.indiacode.nic.in/handle/123456789/20835" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-hover)', marginLeft: '4px' }}>India Code</a>
        </p>
      </div>

      {/* Sections Accordion */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {sections.map(sec => {
          const isExpanded = expandedSection === sec.section;
          return (
            <div
              key={sec.section} className="glass-panel"
              style={{
                padding: '0', cursor: 'pointer',
                borderLeft: `4px solid ${sec.penalty.includes('250') ? 'var(--danger)' : 'var(--warning)'}`,
                overflow: 'hidden'
              }}
            >
              <div
                onClick={() => setExpandedSection(isExpanded ? null : sec.section)}
                style={{
                  padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    minWidth: '48px', height: '48px', borderRadius: '10px',
                    backgroundColor: 'rgba(37,99,235,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.85rem', color: 'var(--primary-hover)'
                  }}>
                    {sec.section}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '1rem' }}>{sec.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '2px' }}>{sec.summary.substring(0, 100)}...</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span className="badge badge-danger" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <IndianRupee size={10} /> {sec.penalty}
                  </span>
                  {isExpanded ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </div>
              </div>

              {isExpanded && (
                <div style={{
                  padding: '0 24px 24px', borderTop: '1px solid var(--border-color)'
                }}>
                  <div style={{ paddingTop: '20px' }}>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
                      {sec.summary}
                    </p>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <BookOpen size={14} /> Platform Obligations
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {sec.obligations.map((ob, i) => (
                          <div key={i} style={{
                            padding: '10px 16px', backgroundColor: 'rgba(37,99,235,0.04)', borderRadius: '8px',
                            border: '1px solid rgba(37,99,235,0.08)', fontSize: '0.9rem',
                            display: 'flex', alignItems: 'center', gap: '8px'
                          }}>
                            <span style={{ color: 'var(--primary-hover)', fontWeight: 700 }}>{i + 1}.</span>
                            {ob}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div style={{
                      padding: '12px 16px', backgroundColor: 'rgba(239,68,68,0.05)', borderRadius: '8px',
                      border: '1px solid rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                      <AlertTriangle size={16} color="var(--danger)" />
                      <span style={{ fontSize: '0.85rem' }}>
                        <strong>Maximum Penalty:</strong> <span style={{ color: 'var(--danger)' }}>{sec.penalty}</span>
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
