
import { Carrier } from './types/carrierTypes';

export const additionalCarriers: Carrier[] = [
  { 
    id: 9, 
    name: 'Midland Logistics', 
    region: 'Leeds', 
    fleet: 'Mixed Fleet', 
    status: 'Active', 
    favorite: false,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-09-25',
    licenseExpiry: '2024-11-20',
    capabilities: ['container', 'deep-sea'],
    operatingRegions: ['north', 'west']
  },
  { 
    id: 10, 
    name: 'Eastern Carriers', 
    region: 'Norwich', 
    fleet: 'Multimodal', 
    status: 'Active', 
    favorite: false,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-08-08',
    licenseExpiry: '2024-12-12',
    capabilities: ['temperature-controlled', 'adr', 'eu-transport'],
    operatingRegions: ['north', 'east']
  },
  { 
    id: 11, 
    name: 'Western Transport', 
    region: 'Bristol', 
    fleet: 'HGV', 
    status: 'Active', 
    favorite: false,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-07-30',
    licenseExpiry: '2024-10-25',
    capabilities: ['curtain-side', 'traction-only'],
    operatingRegions: ['south', 'west']
  },
  { 
    id: 12, 
    name: 'Coastal Shipping', 
    region: 'Cardiff', 
    fleet: 'Multimodal', 
    status: 'Active', 
    favorite: false,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2025-02-15',
    licenseExpiry: '2025-04-20',
    capabilities: ['container', 'deep-sea'],
    operatingRegions: ['north', 'east']
  },
  { 
    id: 13, 
    name: 'Highland Haulers', 
    region: 'Inverness', 
    fleet: 'Mixed Fleet', 
    status: 'Issue', 
    favorite: false,
    complianceStatus: 'Action Required',
    insuranceExpiry: '2024-06-05',
    licenseExpiry: '2024-07-25',
    capabilities: ['temperature-controlled', 'adr', 'eu-transport'],
    operatingRegions: ['north', 'west']
  },
  { 
    id: 14, 
    name: 'Valley Distribution', 
    region: 'Sheffield', 
    fleet: 'LGV', 
    status: 'Active', 
    favorite: false,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-10-10',
    licenseExpiry: '2025-01-15',
    capabilities: ['curtain-side', 'rigid'],
    operatingRegions: ['south', 'west']
  },
  { 
    id: 15, 
    name: 'Peak Transport', 
    region: 'Derby', 
    fleet: 'HGV', 
    status: 'Active', 
    favorite: true,
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-11-20',
    licenseExpiry: '2025-03-10',
    capabilities: ['temperature-controlled', 'adr', 'eu-transport'],
    operatingRegions: ['north', 'west']
  }
];
