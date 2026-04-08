import { useState } from 'react';
import { Shield, Users, Database, AlertTriangle, LayoutDashboard, Settings, Bell, Newspaper, Scale } from 'lucide-react';
import RiskScoreGauge from './components/RiskScoreGauge';
import DSARTracker from './components/DSARTracker';
import DataSourcesInventory from './components/DataSourcesInventory';
import AICopilotChat from './components/AICopilotChat';

import DataInventory from './pages/DataInventory';
import ConsentManagement from './pages/ConsentManagement';
import BreachAudits from './pages/BreachAudits';
import SettingsConfig from './pages/Settings';
import RegulatoryFeed from './pages/RegulatoryFeed';
import DPDPReference from './pages/DPDPReference';

type Tab = 'dashboard' | 'inventory' | 'consent' | 'breaches' | 'regulatory' | 'dpdp' | 'settings';

const NAV_ITEMS: { key: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { key: 'dashboard', label: 'Executive Dashboard', icon: LayoutDashboard },
  { key: 'inventory', label: 'Data Inventory (RoPA)', icon: Database },
  { key: 'consent', label: 'Consent & DSARs', icon: Users },
  { key: 'breaches', label: 'Breaches & Audits', icon: AlertTriangle },
  { key: 'regulatory', label: 'Regulatory Feed', icon: Newspaper },
  { key: 'dpdp', label: 'DPDP Act Reference', icon: Scale },
];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="dashboard-grid">
            <RiskScoreGauge 
              unmappedDataVol={145} 
              expiredConsents={80} 
              overdueDSARs={100} 
              crossBorderViolations={0} 
            />
            <DSARTracker />
            <DataSourcesInventory />
            <AICopilotChat />
          </div>
        );
      case 'inventory':
        return <DataInventory />;
      case 'consent':
        return <ConsentManagement />;
      case 'breaches':
        return <BreachAudits />;
      case 'regulatory':
        return <RegulatoryFeed />;
      case 'dpdp':
        return <DPDPReference />;
      case 'settings':
        return <SettingsConfig />;
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <Shield size={28} color="var(--primary-color)" />
          <h1>SUSAN Compliance</h1>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
            <div
              key={item.key}
              className={`nav-item ${activeTab === item.key ? 'active' : ''}`}
              onClick={() => setActiveTab(item.key)}
            >
              <item.icon size={18} /> {item.label}
            </div>
          ))}

          {/* Settings at the bottom */}
          <div
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
            style={{ marginTop: 'auto' }}
          >
            <Settings size={18} /> Settings
          </div>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="header">
          <div>
            <h2>Data Protection Officer (DPO) Portal</h2>
            <p>Real-time DPDP Compliance & Risk Surveillance</p>
          </div>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ position: 'relative', cursor: 'pointer' }}>
               <Bell size={20} color="var(--text-muted)" />
               <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', backgroundColor: 'var(--danger)', borderRadius: '50%' }}></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: '600' }}>Parth Bhosale</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Chief DPO</div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                PB
              </div>
            </div>
          </div>
        </header>

        {renderContent()}

      </main>
    </div>
  );
}

export default App;
