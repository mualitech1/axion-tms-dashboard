
export interface ServiceRecord {
  id: number;
  date: string;
  mileage: number;
  type: 'Regular' | 'Repair' | 'MOT';
  description: string;
  cost: number;
  provider: string;
  notes?: string;
}

export interface Vehicle {
  id: number;
  registration: string;
  make: string;
  model: string;
  year: number;
  type: 'Truck' | 'Van' | 'Car' | 'Other';
  status: 'Active' | 'Maintenance' | 'Out of Service';
  motExpiryDate: string;
  taxExpiryDate: string;
  insuranceExpiryDate: string;
  lastServiceDate: string;
  nextServiceDate: string;
  currentMileage: number;
  acquisitionDate: string;
  serviceHistory: ServiceRecord[];
  assignedDriverId?: number;
}

export type VehicleStatus = 'Active' | 'Maintenance' | 'Out of Service';
export type ServiceType = 'Regular' | 'Repair' | 'MOT';
