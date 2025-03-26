
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
}

// Update the carrier data to include all required properties
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
    licenseExpiry: '2024-08-22'
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
    licenseExpiry: '2025-02-15'
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
    licenseExpiry: '2024-12-30'
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
    licenseExpiry: '2025-03-15'
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
    licenseExpiry: '2024-10-05'
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
    licenseExpiry: '2024-07-18'
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
    licenseExpiry: '2025-01-10'
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
    licenseExpiry: '2025-02-28'
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
    licenseExpiry: '2024-11-20'
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
    licenseExpiry: '2024-12-12'
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
    licenseExpiry: '2024-10-25'
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
    licenseExpiry: '2025-04-20'
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
    licenseExpiry: '2024-07-25'
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
    licenseExpiry: '2025-01-15'
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
    licenseExpiry: '2025-03-10'
  }
];
