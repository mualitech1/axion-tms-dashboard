export interface Carrier {
  id: number;
  name: string;
  region: string;
  fleet: string;
  status: 'Active' | 'Inactive' | 'Issue';
  favorite: boolean;
  complianceStatus: string;
  insuranceExpiry: string;
  licenseExpiry: string;
  capabilities: string[];
  operatingRegions?: string[];
}

export const carrierData: Carrier[] = [
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
  },
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
