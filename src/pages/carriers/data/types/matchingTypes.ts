
import { Carrier } from "./carrierTypes";

export interface JobRequirements {
  id: string;
  pickupLocation: string;
  deliveryLocation: string;
  requiredCapabilities: string[];
  requiredRegions: string[];
  pickupDate: string;
  deliveryDate: string;
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  weight?: number;
  volume?: number;
  specialInstructions?: string;
}

export interface MatchResult {
  jobId: string;
  carrierId: number;
  carrierName: string;
  matchScore: number;  // 0-100 score representing match quality
  matchReasons: string[];
  matchWarnings?: string[];
}

export interface MatchingFilters {
  requireAllCapabilities: boolean;
  requireAllRegions: boolean;
  minimumComplianceLevel: 'Any' | 'Compliant' | 'Fully Compliant';
  prioritizeByDistance?: boolean;
  excludeInactiveCarriers: boolean;
  excludeNonCompliantCarriers: boolean;
}

// For future development
export interface DistanceMatrix {
  [locationPair: string]: {
    distance: number;  // in kilometers or miles
    estimatedTime: number;  // in minutes
  }
}
