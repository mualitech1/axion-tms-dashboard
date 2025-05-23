export type JobStatus = 
  | "booked" 
  | "allocated"
  | "in-progress"
  | "finished"
  | "invoiced"
  | "cleared"
  | "completed"
  | "delivered"
  | "archived"
  | "issues"
  | "ready_for_invoicing"
  | "self_invoiced"
  | "pod_received";

export interface Job {
  id: string | number; 
  reference: string;
  title: string;
  status: JobStatus;
  priority: "low" | "medium" | "high";
  
  // Relations
  customer_id: string;
  carrier_id?: string | null;
  vehicle_id?: string | null;
  driver_id?: string | null;
  
  // Nested relations
  customer?: {
    id: string;
    name: string;
    email?: string;
    [key: string]: unknown;
  };
  
  carrier?: {
    id: string;
    name: string;
    email?: string;
    [key: string]: unknown;
  };
  
  // Locations
  pickup_location: string | Record<string, unknown>;
  delivery_location: string | Record<string, unknown>;
  
  // Dates
  pickup_date?: string;
  created_at: string;
  updated_at?: string;
  
  // Additional fields
  value?: number;
  agreed_cost_gbp?: number; // Payment amount for carrier
  notes?: string;
  estimated_duration?: number;
  pod_uploaded?: boolean;
  pod_document_id?: string | null;
  issue_details?: string | null;
  created_by?: string;
  self_invoiced?: boolean | null; // Whether job has been included in a self-invoice
  
  // Legacy fields (for compatibility with older components)
  date?: string;
  time?: string;
  client?: string;
  origin?: string;
  destination?: string;
  vehicle?: string;
  hauler?: {
    id: string | number;
    name: string;
    contactPhone?: string;
    email?: string;
  };
  createdAt?: string;
  lastUpdatedAt?: string;
  podUploaded?: boolean;
  podDocumentId?: string;
  issueDetails?: string;
}

export interface StatusTransition {
  from: JobStatus;
  to: JobStatus;
  label: string;
  requiresAction?: boolean;
  actionType?: 'assign-hauler' | 'confirm-completion' | 'upload-pod' | 'generate-invoice' | 'confirm-payment' | 'archive' | 'report-issue' | 'resolve-issue';
}
