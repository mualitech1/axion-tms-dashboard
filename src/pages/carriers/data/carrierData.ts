
import { Carrier } from './types/carrierTypes';
import { carriers } from './carrierList';
import { additionalCarriers } from './carrierList2';

// Combine all carrier data
export const carrierData: Carrier[] = [...carriers, ...additionalCarriers];

// Re-export types and constants for easy import elsewhere
export type { Carrier };
export * from './constants/capabilityConstants';
