
import { Carrier } from './types/carrierTypes';

export const carriers: Carrier[] = [
  { 
    id: 1, 
    name: 'City Distribution Ltd', 
    region: 'London', 
    fleet: 'LGV', 
    status: 'Issue', 
    favorite: true,
    complianceStatus: 'Action Required',
    insuranceExpiry: '2024-06-15',
    licenseExpiry: '2024-08-22',
    capabilities: ['curtain-side', 'traction-only'],
    operatingRegions: ['south', 'east', 'london']
  },
  { 
    id: 2, 
    name: 'Long Haul Transport', 
    region: 'Manchester', 
    fleet: 'HGV', 
    status: 'Active', 
    favorite: false,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-09-10',
    licenseExpiry: '2025-02-15',
    capabilities: ['temperature-controlled', 'adr', 'eu-transport'],
    operatingRegions: ['north', 'midlands']
  },
  { 
    id: 3, 
    name: 'Swift Freight Services', 
    region: 'Birmingham', 
    fleet: 'Mixed Fleet', 
    status: 'Active', 
    favorite: true,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-11-05',
    licenseExpiry: '2024-12-30',
    capabilities: ['container', 'deep-sea'],
    operatingRegions: ['midlands', 'west']
  },
  { 
    id: 4, 
    name: 'Global Logistics Co.', 
    region: 'Glasgow', 
    fleet: 'HGV', 
    status: 'Active', 
    favorite: false,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2025-01-20',
    licenseExpiry: '2025-03-15',
    capabilities: ['adr', 'temperature-controlled', 'eu-transport'],
    operatingRegions: ['north', 'east']
  },
  { 
    id: 5, 
    name: 'Regional Express', 
    region: 'Liverpool', 
    fleet: 'LGV', 
    status: 'Active', 
    favorite: false,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-08-12',
    licenseExpiry: '2024-10-05',
    capabilities: ['curtain-side', 'rigid'],
    operatingRegions: ['south', 'west']
  },
  { 
    id: 6, 
    name: 'Island Carriers', 
    region: 'Belfast', 
    fleet: 'Multimodal', 
    status: 'Issue', 
    favorite: false,
    complianceStatus: 'Non-Compliant',
    insuranceExpiry: '2024-05-30',
    licenseExpiry: '2024-07-18',
    capabilities: ['container', 'deep-sea'],
    operatingRegions: ['north', 'east']
  },
  { 
    id: 7, 
    name: 'Northern Transport', 
    region: 'Newcastle', 
    fleet: 'HGV', 
    status: 'Inactive', 
    favorite: false,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-10-15',
    licenseExpiry: '2025-01-10',
    capabilities: ['temperature-controlled', 'adr', 'eu-transport'],
    operatingRegions: ['north', 'west']
  },
  { 
    id: 8, 
    name: 'Southern Freight Ltd', 
    region: 'Southampton', 
    fleet: 'LGV', 
    status: 'Active', 
    favorite: true,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-12-05',
    licenseExpiry: '2025-02-28',
    capabilities: ['curtain-side', 'traction-only'],
    operatingRegions: ['south', 'east']
  }
];
