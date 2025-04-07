
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
