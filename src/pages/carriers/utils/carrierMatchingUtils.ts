
import { JobRequirements, MatchResult, MatchingFilters } from "../data/types/matchingTypes";
import { Carrier } from "../data/types/carrierTypes";

// Default matching filters
const defaultMatchingFilters: MatchingFilters = {
  requireAllCapabilities: true,
  requireAllRegions: true,
  minimumComplianceLevel: 'Compliant',
  prioritizeByDistance: true,
  excludeInactiveCarriers: true,
  excludeNonCompliantCarriers: true
};

/**
 * Find the best carrier matches for a job based on requirements
 */
export function findBestMatches(
  jobRequirements: JobRequirements,
  carriers: Carrier[],
  filters: MatchingFilters = defaultMatchingFilters
): MatchResult[] {
  // Filter out inactive carriers if required
  let eligibleCarriers = carriers;
  if (filters.excludeInactiveCarriers) {
    eligibleCarriers = eligibleCarriers.filter(c => c.status === 'Active');
  }
  
  // Filter out non-compliant carriers if required
  if (filters.excludeNonCompliantCarriers) {
    eligibleCarriers = eligibleCarriers.filter(c => c.complianceStatus !== 'Non-Compliant');
  }
  
  // Calculate match scores for each carrier
  const matches: MatchResult[] = eligibleCarriers.map(carrier => {
    const matchReasons: string[] = [];
    const matchWarnings: string[] = [];
    let matchScore = 0;
    
    // Check capability match
    const capabilityMatchCount = jobRequirements.requiredCapabilities.filter(
      cap => carrier.capabilities.includes(cap)
    ).length;
    
    const hasAllCapabilities = capabilityMatchCount === jobRequirements.requiredCapabilities.length;
    
    if (hasAllCapabilities) {
      matchScore += 50;
      matchReasons.push('Has all required capabilities');
    } else if (capabilityMatchCount > 0) {
      const matchPercent = Math.round((capabilityMatchCount / jobRequirements.requiredCapabilities.length) * 100);
      matchScore += Math.round(50 * (capabilityMatchCount / jobRequirements.requiredCapabilities.length));
      matchReasons.push(`Matches ${matchPercent}% of required capabilities`);
      
      if (filters.requireAllCapabilities) {
        matchWarnings.push('Missing some required capabilities');
      }
    } else {
      matchWarnings.push('No matching capabilities');
    }
    
    // Check region match if carrier has operating regions
    if (carrier.operatingRegions && carrier.operatingRegions.length > 0) {
      const regionMatchCount = jobRequirements.requiredRegions.filter(
        region => carrier.operatingRegions?.includes(region)
      ).length;
      
      const hasAllRegions = regionMatchCount === jobRequirements.requiredRegions.length;
      
      if (hasAllRegions) {
        matchScore += 30;
        matchReasons.push('Operates in all required regions');
      } else if (regionMatchCount > 0) {
        const matchPercent = Math.round((regionMatchCount / jobRequirements.requiredRegions.length) * 100);
        matchScore += Math.round(30 * (regionMatchCount / jobRequirements.requiredRegions.length));
        matchReasons.push(`Operates in ${matchPercent}% of required regions`);
        
        if (filters.requireAllRegions) {
          matchWarnings.push('Doesn\'t operate in all required regions');
        }
      } else {
        matchWarnings.push('No regional coverage match');
      }
    } else {
      matchScore += 15; // Give some points if no regions specified (assume they can serve)
      matchReasons.push('General regional coverage');
      matchWarnings.push('No specific regional information available');
    }
    
    // Check compliance status
    if (carrier.complianceStatus === 'Fully Compliant') {
      matchScore += 20;
      matchReasons.push('Fully compliant with regulations');
    } else if (carrier.complianceStatus === 'Compliant') {
      matchScore += 15;
      matchReasons.push('Compliant with regulations');
    } else if (carrier.complianceStatus === 'Issues') {
      matchScore += 5;
      matchWarnings.push('Has compliance issues that need attention');
    } else {
      matchWarnings.push('Non-compliant with regulations');
    }
    
    // Add some randomness to simulate other factors
    const randomFactor = Math.floor(Math.random() * 10) - 5; // -5 to +5
    matchScore = Math.max(0, Math.min(100, matchScore + randomFactor));
    
    return {
      jobId: jobRequirements.id,
      carrierId: carrier.id,
      carrierName: carrier.name,
      matchScore,
      matchReasons,
      matchWarnings
    };
  });
  
  // Sort matches by score (highest first)
  return matches
    .filter(match => match.matchScore > 40) // Only include matches above threshold
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 5); // Return top 5 matches
}
