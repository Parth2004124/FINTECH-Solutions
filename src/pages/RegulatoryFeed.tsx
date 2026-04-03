import { useState, useEffect } from 'react';
import { Newspaper, ExternalLink, AlertTriangle, RefreshCw, Wifi, WifiOff } from 'lucide-react';
import type { RegulatoryUpdate } from '../types';
import { fetchRBINotifications } from '../services/regulatoryIntel';

export default function RegulatoryFeed() {
  const [updates, setUpdates] = useState<RegulatoryUpdate[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [filter, setFilter] = useState<string>('all');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchRBINotifications();
      // Determine if live data or fallback by checking if the first item has an rbi- prefix
      setIsLive(data.length > 0 && data[0].id.startsWith('rbi-'));
      setUpdates(data);
    } catch {
      setUpdates([]);
    }
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const filtered = filter === 'all'
    ? updates
    : updates.filter(u => u.source === filter);

  const sources = ['all', 'RBI', 'MeitY', 'SEBI', 'DPB', 'CERT-In'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Header with live/fallback indicator */}
      <div className="glass-panel" style={{ padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Newspaper size={22} color="var(--primary-color)" />
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>Regulatory Intelligence Feed</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              Live updates from RBI, MeitY, SEBI, CERT-In — sourced from official RSS feeds and government portals.
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className={`badge ${isLive ? 'badge-success' : 'badge-warning'}`} style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {isLive ? <Wifi size={12} /> : <WifiOff size={12} />}
            {isLive ? 'Live RBI Feed' : 'Curated Data'}
          </span>
          <button
            onClick={loadData}
            disabled={loading}
            style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)',
              color: 'var(--text-muted)', borderRadius: '8px', padding: '6px 12px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontFamily: 'inherit'
            }}
          >
            <RefreshCw size={14} className={loading ? 'spin' : ''} /> Refresh
          </button>
        </div>
      </div>

      {/* Source filter tabs */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {sources.map(s => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '6px 16px', borderRadius: '20px',
              border: `1px solid ${filter === s ? 'var(--primary-color)' : 'var(--border-color)'}`,
              backgroundColor: filter === s ? 'rgba(37,99,235,0.15)' : 'transparent',
              color: filter === s ? 'var(--primary-hover)' : 'var(--text-muted)',
              cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, fontFamily: 'inherit',
              transition: 'all 0.2s'
            }}
          >
            {s === 'all' ? 'All Sources' : s}
          </button>
        ))}
      </div>

      {/* Feed items */}
      {loading ? (
        <div className="glass-panel" style={{ padding: '60px', textAlign: 'center', color: 'var(--text-muted)' }}>
          <RefreshCw size={24} className="spin" style={{ marginBottom: '12px' }} />
          <div>Fetching regulatory updates from government feeds...</div>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filtered.map(update => (
            <div key={update.id} className="glass-panel" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <span className="badge badge-neutral" style={{ fontWeight: 700 }}>{update.source}</span>
                    <span className={`badge ${
                      update.impact === 'High' ? 'badge-danger' :
                      update.impact === 'Medium' ? 'badge-warning' : 'badge-neutral'
                    }`}>
                      {update.impact === 'High' && <AlertTriangle size={10} style={{ marginRight: 4 }} />}
                      {update.impact} Impact
                    </span>
                    <span className="badge badge-neutral">{update.category}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{update.date}</span>
                  </div>
                  <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.4 }}>{update.title}</h4>
                  <p style={{ margin: '8px 0 0', color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>
                    {update.summary}
                  </p>
                </div>
                {update.url && (
                  <a
                    href={update.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginLeft: '16px', padding: '8px', borderRadius: '8px',
                      backgroundColor: 'rgba(37,99,235,0.08)', color: 'var(--primary-hover)',
                      textDecoration: 'none', display: 'flex', alignItems: 'center', flexShrink: 0
                    }}
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
