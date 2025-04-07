
import { Carrier } from "../data/types/carrierTypes";
import { JobRequirements, MatchResult, MatchingFilters } from "../data/types/matchingTypes";

/**
 * Calculate a basic matching score between a job and carrier
 * This is a simplified algorithm that can be enhanced in the future
 */
export function calculateMatchScore(
  job: JobRequirements,
  carrier: Carrier,
  filters: MatchingFilters = {
    requireAllCapabilities: false,
    requireAllRegions: true,
    minimumComplianceLevel: 'Compliant',
    excludeInactiveCarriers: true,
    excludeNonCompliantCarriers: true
  }
): MatchResult | null {
  const matchReasons: string[] = [];
  const matchWarnings: string[] = [];
  let score = 0;
  
  // Preliminary filtering
  if (filters.excludeInactiveCarriers && carrier.status === 'Inactive') {
    return null;
  }
  
  if (filters.excludeNonCompliantCarriers && carrier.complianceStatus === 'Non-Compliant') {
    return null;
  }

  // Capability matching
  const hasAllRequiredCapabilities = job.requiredCapabilities.every(
    capability => carrier.capabilities.includes(capability)
  );
  
  const hasAtLeastOneRequiredCapability = job.requiredCapabilities.some(
    capability => carrier.capabilities.includes(capability)
  );

  if (filters.requireAllCapabilities) {
    if (!hasAllRequiredCapabilities) return null;
    score += 30;
    matchReasons.push("Has all required capabilities");
  } else {
    if (!hasAtLeastOneRequiredCapability) return null;
    
    const capabilityMatchPercentage = job.requiredCapabilities.filter(
      capability => carrier.capabilities.includes(capability)
    ).length / job.requiredCapabilities.length;
    
    score += Math.round(capabilityMatchPercentage * 30);
    matchReasons.push(`Matches ${Math.round(capabilityMatchPercentage * 100)}% of required capabilities`);
    
    if (capabilityMatchPercentage < 1) {
      matchWarnings.push("Missing some requested capabilities");
    }
  }

  // Region matching
  const hasAllRequiredRegions = job.requiredRegions.every(
    region => carrier.operatingRegions?.includes(region)
  );
  
  if (filters.requireAllRegions && !hasAllRequiredRegions) {
    return null;
  }
  
  const regionMatchPercentage = carrier.operatingRegions 
    ? job.requiredRegions.filter(
        region => carrier.operatingRegions.includes(region)
      ).length / job.requiredRegions.length
    : 0;
  
  score += Math.round(regionMatchPercentage * 30);
  
  if (regionMatchPercentage === 1) {
    matchReasons.push("Operates in all required regions");
  } else if (regionMatchPercentage > 0) {
    matchReasons.push(`Operates in ${Math.round(regionMatchPercentage * 100)}% of required regions`);
    matchWarnings.push("Doesn't cover all requested regions");
  }

  // Compliance status bonus
  if (carrier.complianceStatus === 'Compliant') {
    score += 20;
    matchReasons.push("Fully compliant carrier");
  } else if (carrier.complianceStatus === 'Action Required') {
    score += 10;
    matchWarnings.push("Carrier has compliance issues that need attention");
  }

  // Status bonus
  if (carrier.status === 'Active') {
    score += 20;
    matchReasons.push("Carrier is currently active");
  } else if (carrier.status === 'Issue') {
    score += 5;
    matchWarnings.push("Carrier has active issues");
  }

  // Cap the score at 100
  score = Math.min(score, 100);

  return {
    jobId: job.id,
    carrierId: carrier.id,
    carrierName: carrier.name,
    matchScore: score,
    matchReasons,
    matchWarnings: matchWarnings.length > 0 ? matchWarnings : undefined
  };
}

/**
 * Find all matching carriers for a job
 */
export function findMatchingCarriers(
  job: JobRequirements,
  carriers: Carrier[],
  filters?: MatchingFilters,
  limit?: number
): MatchResult[] {
  const matches = carriers
    .map(carrier => calculateMatchScore(job, carrier, filters))
    .filter((match): match is MatchResult => match !== null)
    .sort((a, b) => b.matchScore - a.matchScore);

  return limit ? matches.slice(0, limit) : matches;
}

/**
 * Find the best carrier for a job
 */
export function findBestCarrier(
  job: JobRequirements,
  carriers: Carrier[],
  filters?: MatchingFilters
): MatchResult | null {
  const matches = findMatchingCarriers(job, carriers, filters, 1);
  return matches.length > 0 ? matches[0] : null;
}

// For future development:
// - Add distance-based scoring
// - Factor in carrier availability
// - Consider historical performance
// - Account for carrier preferences
