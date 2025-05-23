export interface Company {
  id: string; // Text format ID (previously UUID)
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
  metadata: Record<string, string | number | boolean | null>;
}

export interface Vehicle {
  id: string; // Text format ID (previously UUID)
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
  assigned_driver_id: string | null; // Text format ID (previously UUID)
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
  id: string; // Text format ID (previously UUID)
  reference: string;
  title: string;
  customer_id: string | null; // Text format ID (previously UUID)
  carrier_id: string | null; // Text format ID (previously UUID)
  vehicle_id: string | null; // Text format ID (previously UUID)
  driver_id: string | null; // Text format ID (previously UUID)
  status: string;
  priority: string;
  pickup_date: string;
  pickup_location: JobLocation | Record<string, string | number | null>;
  delivery_location: JobLocation | Record<string, string | number | null>;
  estimated_duration: number | null;
  value: number | null;
  agreed_cost_gbp: number | null; // Payment amount for carrier
  notes: string | null;
  created_at: string;
  updated_at: string;
  created_by: string; // Text format ID (previously UUID)
  pod_uploaded: boolean;
  pod_document_id: string | null; // Text format ID (previously UUID)
  issue_details: string | null;
  self_invoiced: boolean | null; // Whether job has been included in a self-invoice
  // Add joined relationships
  customer?: Company;
  carrier?: Company;
  vehicle?: Vehicle;
  driver?: Record<string, unknown>;
}
