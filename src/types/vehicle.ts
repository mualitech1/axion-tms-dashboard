
export interface Vehicle {
  id: string;
  registration: string;
  make: string;
  model: string;
  year: number | string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance';
  mot_expiry_date?: string | null;
  tax_expiry_date?: string | null; 
  insurance_expiry_date?: string | null;
  last_service_date?: string | null;
  next_service_date?: string | null;
  current_mileage?: number | null;
  acquisition_date?: string | null;
  assigned_driver_id?: string | null;
}

export interface VehicleWithDriver extends Vehicle {
  driver?: {
    id: string;
    name: string;
    profile_image?: string;
  };
}

export interface VehicleFilters {
  status?: string[];
  type?: string[];
  make?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface MaintenanceRecord {
  id: string;
  vehicle_id: string;
  service_type: string; 
  date: string;
  mileage: number;
  description: string;
  cost?: number;
  technician?: string;
  notes?: string;
}
