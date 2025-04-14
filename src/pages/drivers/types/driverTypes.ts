
export interface DriverLicense {
  number: string;
  expiryDate: string;
  categories: string[];
}

export interface DriverCPC {
  number: string;
  expiryDate: string;
  completedHours: number;
  requiredHours: number;
}

export interface DriverKPI {
  onTimeDeliveries: number;
  fuelEfficiency: number;
  safetyScore: number;
  customerSatisfaction: number;
}

export interface Driver {
  id: number;
  name: string;
  nationalInsurance: string;
  address: string;
  phoneNumber: string;
  email: string;
  status: 'Active' | 'Inactive' | 'On Leave';
  license: DriverLicense;
  cpc: DriverCPC;
  kpi: DriverKPI;
  joinDate: string;
  emergencyContact?: string;
}

export type DriverStatus = 'Active' | 'Inactive' | 'On Leave';
