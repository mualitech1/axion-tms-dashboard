
// Mock data for supply chain intelligence features

export const mockVendorData = [
  { 
    id: 'v1', 
    name: 'Global Logistics Partners', 
    category: 'Transportation',
    reliabilityScore: 92,
    onTimeDelivery: 94.2,
    qualityScore: 88.5,
    status: 'active',
    lastDelivery: '2025-05-01',
    contact: {
      name: 'Alice Johnson',
      email: 'ajohnson@glp.com',
      phone: '+1 (555) 123-4567'
    }
  },
  { 
    id: 'v2', 
    name: 'FastTrack Carriers', 
    category: 'Transportation',
    reliabilityScore: 87,
    onTimeDelivery: 89.7,
    qualityScore: 91.2,
    status: 'active',
    lastDelivery: '2025-05-03',
    contact: {
      name: 'Robert Smith',
      email: 'robert@fasttrack.com',
      phone: '+1 (555) 234-5678'
    }
  },
  { 
    id: 'v3', 
    name: 'SecurePack Supplies', 
    category: 'Packaging',
    reliabilityScore: 95,
    onTimeDelivery: 97.1,
    qualityScore: 93.8,
    status: 'active',
    lastDelivery: '2025-04-28',
    contact: {
      name: 'Jennifer Lee',
      email: 'jlee@securepack.com',
      phone: '+1 (555) 345-6789'
    }
  },
  { 
    id: 'v4', 
    name: 'DataTech Solutions', 
    category: 'Technology',
    reliabilityScore: 89,
    onTimeDelivery: 91.5,
    qualityScore: 94.3,
    status: 'at risk',
    lastDelivery: '2025-04-15',
    contact: {
      name: 'Michael Chen',
      email: 'mchen@datatech.com',
      phone: '+1 (555) 456-7890'
    }
  },
  { 
    id: 'v5', 
    name: 'EcoFriendly Packaging', 
    category: 'Packaging',
    reliabilityScore: 91,
    onTimeDelivery: 88.2,
    qualityScore: 97.4,
    status: 'active',
    lastDelivery: '2025-05-02',
    contact: {
      name: 'Sarah Green',
      email: 'sgreen@ecofriendly.com',
      phone: '+1 (555) 567-8901'
    }
  },
];

export const mockInventoryData = [
  {
    id: 'inv1',
    item: 'Standard Shipping Boxes (L)',
    category: 'Packaging',
    quantity: 1250,
    minThreshold: 500,
    maxThreshold: 2000,
    location: 'Warehouse A',
    lastRestocked: '2025-04-20',
    status: 'normal',
    vendor: 'SecurePack Supplies'
  },
  {
    id: 'inv2',
    item: 'Standard Shipping Boxes (M)',
    category: 'Packaging',
    quantity: 320,
    minThreshold: 400,
    maxThreshold: 1500,
    location: 'Warehouse A',
    lastRestocked: '2025-04-25',
    status: 'low',
    vendor: 'SecurePack Supplies'
  },
  {
    id: 'inv3',
    item: 'Packing Tape',
    category: 'Supplies',
    quantity: 542,
    minThreshold: 200,
    maxThreshold: 800,
    location: 'Warehouse B',
    lastRestocked: '2025-04-28',
    status: 'normal',
    vendor: 'EcoFriendly Packaging'
  },
  {
    id: 'inv4',
    item: 'GPS Tracking Devices',
    category: 'Technology',
    quantity: 78,
    minThreshold: 50,
    maxThreshold: 150,
    location: 'Secure Storage',
    lastRestocked: '2025-04-10',
    status: 'normal',
    vendor: 'DataTech Solutions'
  },
  {
    id: 'inv5',
    item: 'Temperature Sensors',
    category: 'Technology',
    quantity: 42,
    minThreshold: 40,
    maxThreshold: 120,
    location: 'Secure Storage',
    lastRestocked: '2025-04-15',
    status: 'critical',
    vendor: 'DataTech Solutions'
  }
];

export const mockDisruptionData = [
  {
    id: 'dis1',
    type: 'Weather',
    severity: 'high',
    location: 'Gulf Coast',
    startDate: '2025-05-02',
    expectedEndDate: '2025-05-05',
    status: 'active',
    affectedRoutes: ['TX-LA', 'LA-MS', 'MS-AL'],
    description: 'Tropical storm causing port closures and highway delays',
    alternativeRoutes: ['TX-OK-AR-MS', 'TX-OK-AR-TN-AL']
  },
  {
    id: 'dis2',
    type: 'Labor',
    severity: 'medium',
    location: 'West Coast Ports',
    startDate: '2025-05-01',
    expectedEndDate: '2025-05-10',
    status: 'active',
    affectedRoutes: ['Port of LA', 'Port of Long Beach'],
    description: 'Dock workers strike slowing container processing',
    alternativeRoutes: ['Port of Oakland', 'Port of Seattle']
  },
  {
    id: 'dis3',
    type: 'Political',
    severity: 'medium',
    location: 'US-Canada Border',
    startDate: '2025-04-28',
    expectedEndDate: '2025-05-08',
    status: 'monitoring',
    affectedRoutes: ['MI-ON', 'NY-ON', 'WA-BC'],
    description: 'New border regulations causing crossing delays',
    alternativeRoutes: ['Alternative crossings at less busy checkpoints']
  },
  {
    id: 'dis4',
    type: 'Infrastructure',
    severity: 'low',
    location: 'Midwest',
    startDate: '2025-04-25',
    expectedEndDate: '2025-06-15',
    status: 'active',
    affectedRoutes: ['I-70', 'I-80'],
    description: 'Major road construction causing traffic congestion',
    alternativeRoutes: ['I-90', 'I-40']
  },
  {
    id: 'dis5',
    type: 'Supply Shortage',
    severity: 'high',
    location: 'Global',
    startDate: '2025-04-10',
    expectedEndDate: '2025-07-01',
    status: 'active',
    affectedRoutes: ['All semiconductor shipments'],
    description: 'Critical shortage of semiconductor components',
    alternativeRoutes: ['Airfreight options for critical components']
  }
];
