
export interface Company {
  id: string;
  name: string;
  type: 'customer' | 'carrier';
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  credit_limit: number;
  created_at: string;
  updated_at: string;
  address: {
    street?: string;
    city?: string;
    postcode?: string;
    country?: string;
  } | null;
  metadata: Record<string, any>;
}

export interface Vehicle {
  id: string;
  registration: string;
  make: string;
  model: string;
  year: number | null;
  type: string;
  status: string;
  mot_expiry_date: string | null;
  tax_expiry_date: string | null;
  insurance_expiry_date: string | null;
  last_service_date: string | null;
  next_service_date: string | null;
  current_mileage: number | null;
  acquisition_date: string | null;
  created_at: string;
  updated_at: string;
  assigned_driver_id: string | null;
}

// Modified to be a Record type which satisfies Json requirements
export interface JobLocation {
  address: string;
  city: string;
  postcode: string;
  country: string;
  notes?: string;
  [key: string]: string | undefined; // Add index signature to make it compatible with Json type
}

export interface Job {
  id: string;
  reference: string;
  title: string;
  customer_id: string | null;
  carrier_id: string | null;
  vehicle_id: string | null;
  driver_id: string | null;
  status: string;
  priority: string;
  pickup_date: string;
  pickup_location: JobLocation | Record<string, any>;
  delivery_location: JobLocation | Record<string, any>;
  estimated_duration: number | null;
  value: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string;
  pod_uploaded: boolean;
  pod_document_id: string | null;
  issue_details: string | null;
  // Add joined relationships
  customer?: Company;
  carrier?: Company;
  vehicle?: Vehicle;
  driver?: any;
}
