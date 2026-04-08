// Centralized TypeScript types for the entire platform

// ==========================================
// Risk Scoring Engine
// ==========================================
export interface RiskWeights {
  unmappedData: number;   // default 0.3
  expiredConsents: number; // default 0.4
  overdueDSARs: number;    // default 0.2
  crossBorder: number;     // default 0.1
}

export type RiskLevel = 'LOW' | 'AT_RISK' | 'CRITICAL';

export interface RiskScore {
  score: number;
  level: RiskLevel;
  breakdown: {
    unmapped: number;
    consent: number;
    sla: number;
    crossBorder: number;
  };
}

// ==========================================
// Data Sources / RoPA
// ==========================================
export type DataSourceType = 'Database' | 'SaaS' | 'Unstructured' | 'API';
export type ComplianceStatus = 'Compliant' | 'Warning' | 'Blocked' | 'Review Needed';
export type SyncStatus = 'Synced' | 'Syncing' | 'Compliance Blocked' | 'NLP Scanning';

export interface PIIField {
  name: string;
  category: 'Identifier' | 'Financial' | 'Contact' | 'Behavioral' | 'Auth';
  sensitivity: 'High' | 'Medium' | 'Low';
}

export interface DataSource {
  id: number;
  system: string;
  owner: string;
  type: DataSourceType;
  dataCategory: string;
  piiFields: PIIField[];
  legalBasis: string;
  retention: string;
  location: string;
  region: string;
  regionFlag: string;
  records: string;
  status: ComplianceStatus;
  syncStatus: SyncStatus;
  lastScan: string;
}

// ==========================================
// Consent Management
// ==========================================
export type ConsentStatus = 'Active' | 'Partial Revocation' | 'Withdrawn';

export interface ConsentRecord {
  id: string;
  email: string;
  purposes: string;
  status: ConsentStatus;
  updated: string;
  proofHash: string;
}

// ==========================================
// DSAR (Data Subject Access Requests)
// ==========================================
export type DSARType = 'Erasure' | 'Export' | 'Correction' | 'Access';
export type DSARStage = 'Submitted' | 'Identity Verified' | 'Data Gathering' | 'Redaction' | 'Fulfilled' | 'SLA Breached';

export interface DSARRequest {
  id: string;
  user: string;
  type: DSARType;
  description: string;
  submitted: string;
  deadline: string;
  hoursLeft: number;
  stage: DSARStage;
  stageNum: number;
}

// ==========================================
// Breach & Incident Management
// ==========================================
export type IncidentSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type IncidentStatus = 'Under Investigation' | 'Mitigated' | 'Closed';

export interface SecurityIncident {
  id: string;
  date: string;
  time: string;
  description: string;
  severity: IncidentSeverity;
  affectedUsers: number;
  notification: string;
  status: IncidentStatus;
  responder: string;
}

export type AuditIcon = 'block' | 'approve' | 'scan' | 'escalate' | 'report' | 'export';

export interface AuditEntry {
  ts: string;
  actor: string;
  action: string;
  reason: string;
  icon: AuditIcon;
}

// ==========================================
// Regulatory Intelligence Feed
// ==========================================
export interface RegulatoryUpdate {
  id: string;
  source: 'RBI' | 'MeitY' | 'SEBI' | 'DPB' | 'CERT-In';
  title: string;
  date: string;
  category: 'Circular' | 'Notification' | 'Guidelines' | 'Amendment' | 'Advisory';
  impact: 'High' | 'Medium' | 'Low';
  summary: string;
  url: string;
}

// ==========================================
// DPDP Act Reference
// ==========================================
export interface DPDPSection {
  section: string;
  title: string;
  summary: string;
  obligations: string[];
  penalty: string;
}

// ==========================================
// Platform Settings
// ==========================================
export interface NotificationPreference {
  label: string;
  description: string;
  enabled: boolean;
  key: string;
}

export interface APIKey {
  name: string;
  access: 'Read-Only' | 'Write-Only' | 'Admin';
  lastUsed: string;
  keyPreview: string;
  fullKey: string;
}

export interface SecurityCertification {
  label: string;
  value: string;
  status: 'Certified' | 'Pending' | 'Scheduled';
}
