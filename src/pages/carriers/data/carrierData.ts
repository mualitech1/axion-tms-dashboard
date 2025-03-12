
import { Carrier } from '../components/CarrierTable';

// Mock data for carriers
export const carrierData: Carrier[] = [
  {
    id: 1,
    name: 'Express Logistics',
    fleet: 'Mixed Fleet',
    region: 'National',
    complianceStatus: 'Compliant',
    insuranceExpiry: '2023-12-15',
    licenseExpiry: '2024-02-28',
  },
  {
    id: 2,
    name: 'Swift Transport',
    fleet: 'HGV Only',
    region: 'North & Midlands',
    complianceStatus: 'Compliant',
    insuranceExpiry: '2023-09-20',
    licenseExpiry: '2024-01-15',
  },
  {
    id: 3,
    name: 'Global Freight Services',
    fleet: 'Multimodal',
    region: 'International',
    complianceStatus: 'Action Required',
    insuranceExpiry: '2023-07-10',
    licenseExpiry: '2023-08-05',
  },
  {
    id: 4,
    name: 'Regional Haulage',
    fleet: 'Vans & Rigids',
    region: 'South East',
    complianceStatus: 'Compliant',
    insuranceExpiry: '2024-01-30',
    licenseExpiry: '2024-03-15',
  },
  {
    id: 5,
    name: 'City Distribution Ltd',
    fleet: 'LGV Only',
    region: 'London & Home Counties',
    complianceStatus: 'Non-Compliant',
    insuranceExpiry: '2023-06-05',
    licenseExpiry: '2023-05-31',
  },
];
