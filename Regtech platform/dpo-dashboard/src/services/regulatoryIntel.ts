/**
 * Service to fetch regulatory intelligence from free Indian government sources.
 * 
 * Data Sources (all free, no API key required for basic access):
 * 1. RBI Notifications RSS:  https://www.rbi.org.in/notifications_rss.xml
 * 2. DPDP Act Full Text:     https://www.meity.gov.in (MeitY official)
 * 3. data.gov.in:            Open Government Data Platform (free API key)
 * 
 * Since this is a frontend-only prototype and these RSS/XML feeds have CORS
 * restrictions, we use a free CORS proxy (corsproxy.io) for demonstration.
 * In production, a backend microservice would handle this.
 */

import type { RegulatoryUpdate } from '../types';

const CORS_PROXY = 'https://corsproxy.io/?';
const RBI_RSS = 'https://www.rbi.org.in/notifications_rss.xml';

/**
 * Fetches the latest RBI notifications/circulars from their official RSS feed.
 * Falls back to curated mock data if the fetch fails (CORS, offline, etc.).
 */
export async function fetchRBINotifications(): Promise<RegulatoryUpdate[]> {
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(RBI_RSS)}`, {
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const xmlText = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');
    const items = doc.querySelectorAll('item');

    const updates: RegulatoryUpdate[] = [];
    items.forEach((item, i) => {
      if (i >= 10) return; // Cap at 10 latest

      const title = item.querySelector('title')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || '';

      // Classify impact based on keywords
      let impact: 'High' | 'Medium' | 'Low' = 'Low';
      const lowerTitle = title.toLowerCase();
      if (lowerTitle.includes('data') || lowerTitle.includes('cyber') || lowerTitle.includes('privacy') || lowerTitle.includes('penalty')) {
        impact = 'High';
      } else if (lowerTitle.includes('guideline') || lowerTitle.includes('amendment') || lowerTitle.includes('compliance')) {
        impact = 'Medium';
      }

      updates.push({
        id: `rbi-${i}`,
        source: 'RBI',
        title: title.trim(),
        date: pubDate ? new Date(pubDate).toLocaleDateString('en-IN') : 'N/A',
        category: 'Circular',
        impact,
        summary: `Official RBI notification: ${title.trim().substring(0, 120)}...`,
        url: link.trim(),
      });
    });

    return updates.length > 0 ? updates : getFallbackUpdates();
  } catch {
    console.warn('[RegIntel] RBI RSS fetch failed, using curated fallback data.');
    return getFallbackUpdates();
  }
}

/**
 * Curated fallback regulatory updates — real regulatory events
 * that are always available even when the RSS feed is unreachable.
 */
function getFallbackUpdates(): RegulatoryUpdate[] {
  return [
    {
      id: 'reg-001',
      source: 'MeitY',
      title: 'Digital Personal Data Protection Act, 2023 — Official Gazette Notification',
      date: '11 Aug 2023',
      category: 'Notification',
      impact: 'High',
      summary: 'The DPDP Act received Presidential assent. All data fiduciaries processing Indian citizens\' personal data must comply with consent, DSAR, and breach notification requirements.',
      url: 'https://www.meity.gov.in/writereaddata/files/Digital_Personal_Data_Protection_Act_2023.pdf',
    },
    {
      id: 'reg-002',
      source: 'RBI',
      title: 'Storage of Payment System Data — Data Localization Directive',
      date: '06 Apr 2018',
      category: 'Circular',
      impact: 'High',
      summary: 'All payment system operators must ensure that complete end-to-end transaction data is stored exclusively within India. Cross-border mirroring is prohibited.',
      url: 'https://www.rbi.org.in/Scripts/NotificationUser.aspx?Id=11244',
    },
    {
      id: 'reg-003',
      source: 'CERT-In',
      title: 'Directions under Section 70B(6) — Mandatory Cyber Incident Reporting',
      date: '28 Apr 2022',
      category: 'Guidelines',
      impact: 'High',
      summary: 'All service providers, intermediaries, and body corporates must report cyber security incidents to CERT-In within 6 hours of discovery.',
      url: 'https://www.cert-in.org.in/Directions70B.jsp',
    },
    {
      id: 'reg-004',
      source: 'RBI',
      title: 'Master Direction on Outsourcing of IT Services by Regulated Entities',
      date: '10 Apr 2023',
      category: 'Guidelines',
      impact: 'Medium',
      summary: 'RBI-regulated entities must ensure cloud providers and IT vendors comply with data security, audit, and access control requirements. Board oversight is mandatory.',
      url: 'https://www.rbi.org.in/Scripts/BS_ViewMasDirections.aspx',
    },
    {
      id: 'reg-005',
      source: 'SEBI',
      title: 'Cybersecurity and Cyber Resilience Framework for Market Infrastructure Institutions',
      date: '15 Jan 2024',
      category: 'Guidelines',
      impact: 'Medium',
      summary: 'Stock exchanges, depositories, and clearing corporations must implement enhanced cybersecurity measures including SOC operations, penetration testing, and incident response plans.',
      url: 'https://www.sebi.gov.in/legal/circulars',
    },
    {
      id: 'reg-006',
      source: 'DPB',
      title: 'DPDP Rules Draft — Consent Manager Registration Requirements',
      date: '03 Jan 2025',
      category: 'Amendment',
      impact: 'High',
      summary: 'Draft rules propose that Consent Managers must register with the Data Protection Board, maintain Rs 2 Cr net worth, and implement interoperable consent artifact standards.',
      url: 'https://www.meity.gov.in/data-protection-framework',
    },
    {
      id: 'reg-007',
      source: 'MeitY',
      title: 'DPDP Act Section 8(7) — Data Retention Limitations',
      date: '11 Aug 2023',
      category: 'Notification',
      impact: 'Medium',
      summary: 'Personal data shall not be retained beyond the period necessary for the specified purpose. Data fiduciaries must erase data when consent is withdrawn or purpose is fulfilled.',
      url: 'https://www.indiacode.nic.in/handle/123456789/20835',
    },
  ];
}

/**
 * Returns a structured reference of key DPDP Act sections relevant to platform operations.
 */
export function getDPDPActReference() {
  return [
    { section: '§4', title: 'Grounds for Processing', summary: 'Personal data may only be processed for lawful purposes with the consent of the Data Principal, or for certain legitimate uses.', obligations: ['Obtain consent before processing', 'Maintain proof of consent', 'State purpose clearly'], penalty: 'Up to ₹250 Crore' },
    { section: '§5', title: 'Notice Requirements', summary: 'Data Fiduciary must give notice to Data Principal with description of data collected and purpose of processing.', obligations: ['Provide itemized notice', 'Multi-language support', 'Accessible format'], penalty: 'Up to ₹200 Crore' },
    { section: '§6', title: 'Consent of Data Principal', summary: 'Consent must be free, specific, informed, unconditional, and unambiguous. Must be limited to the specified purpose.', obligations: ['Granular consent capture', 'Easy withdrawal mechanism', 'No bundled consent'], penalty: 'Up to ₹250 Crore' },
    { section: '§8', title: 'Obligations of Data Fiduciary', summary: 'Data Fiduciary must ensure completeness, accuracy, and consistency. Must implement security safeguards and erase data when purpose is fulfilled.', obligations: ['Data accuracy maintenance', 'Security safeguards', 'Timely erasure', 'Breach notification'], penalty: 'Up to ₹250 Crore' },
    { section: '§11', title: 'Rights of Data Principal', summary: 'Data Principal has the right to access information, correction, erasure, and grievance redressal.', obligations: ['DSAR fulfillment', 'Nominated representative support', 'Accessible portal'], penalty: 'Up to ₹250 Crore' },
    { section: '§13', title: 'Processing of Children\'s Data', summary: 'Verifiable consent of parent/guardian required. No tracking, behavioral monitoring, or targeted ads for children.', obligations: ['Age verification', 'Parental consent', 'No profiling'], penalty: 'Up to ₹200 Crore' },
    { section: '§15', title: 'Breach Notification', summary: 'Data Fiduciary must notify the Data Protection Board and affected Data Principals of any personal data breach.', obligations: ['Notify DPB', 'Notify affected users', 'Document timeline'], penalty: 'Up to ₹250 Crore' },
  ];
}
