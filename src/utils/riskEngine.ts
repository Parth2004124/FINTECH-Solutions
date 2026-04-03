import type { RiskWeights, RiskScore, RiskLevel } from '../types';

/**
 * Calculates the organizational Risk Score based on the PRD algorithm.
 * 
 * Formula: Risk Score (0-100) = 
 *   (Unmapped Data Volume * weight_unmapped) + 
 *   (Expired Consents * weight_consent) +
 *   (Overdue DSARs * weight_sla) + 
 *   (Cross-Border Violations * weight_crossBorder)
 * 
 * Risk Levels:
 *   0-30:  LOW (Green)
 *   31-70: AT_RISK (Yellow)
 *   71-100: CRITICAL (Red)
 */
export function calculateRiskScore(
  unmappedDataVol: number,
  expiredConsents: number,
  overdueDSARs: number,
  crossBorderViolations: number,
  weights: RiskWeights = { unmappedData: 0.3, expiredConsents: 0.4, overdueDSARs: 0.2, crossBorder: 0.1 }
): RiskScore {
  const breakdown = {
    unmapped: Math.round(unmappedDataVol * weights.unmappedData),
    consent: Math.round(expiredConsents * weights.expiredConsents),
    sla: Math.round(overdueDSARs * weights.overdueDSARs),
    crossBorder: Math.round(crossBorderViolations * weights.crossBorder),
  };

  const rawScore = breakdown.unmapped + breakdown.consent + breakdown.sla + breakdown.crossBorder;
  const score = Math.min(100, Math.max(0, rawScore));

  let level: RiskLevel = 'LOW';
  if (score > 70) level = 'CRITICAL';
  else if (score > 30) level = 'AT_RISK';

  return { score, level, breakdown };
}

/**
 * Returns the CSS color variable for a given risk level.
 */
export function getRiskColor(level: RiskLevel): string {
  switch (level) {
    case 'LOW': return '#10b981';       // Green
    case 'AT_RISK': return '#f59e0b';   // Yellow
    case 'CRITICAL': return '#ef4444';  // Red
  }
}

/**
 * Returns a human-readable label for a given risk level.
 */
export function getRiskLabel(level: RiskLevel): string {
  switch (level) {
    case 'LOW': return 'Low Risk';
    case 'AT_RISK': return 'At Risk';
    case 'CRITICAL': return 'Critical';
  }
}

/**
 * Formats a number as a compact string (e.g., 1200 → "1.2K").
 */
export function formatCompact(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
}

/**
 * Masks an email address for PII display (e.g., "raj.kumar@example.in" → "ra***@example.in").
 */
export function maskEmail(email: string): string {
  return email.replace(/(.{2})(.*)(?=@)/, "$1***");
}

/**
 * Calculates remaining hours from a deadline string.
 */
export function hoursUntilDeadline(deadline: string): number {
  const deadlineTime = new Date(deadline).getTime();
  const now = Date.now();
  return Math.round((deadlineTime - now) / (1000 * 60 * 60));
}
