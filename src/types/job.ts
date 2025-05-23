// Job status types
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

// Priority levels
export type JobPriority = "low" | "medium" | "high";

// Common location interface with a flexible index signature
export interface JobLocation {
  address: string;
  city: string;
  postcode: string;
  country: string;
  notes?: string;
  [key: string]: string | undefined; // More specific type than 'any' to satisfy linter
}

// Hauler/carrier info 
export interface JobHauler {
  id: string; // Text format ID (previously UUID or number)
  name: string;
  contactPhone?: string;
  email?: string;
}

// Consolidated Job interface
export interface Job {
  id: string; // Text format ID (previously UUID or number)
  title: string;
  client: string;
  date: string;
  time: string;
  origin: string;
  destination: string;
  vehicle: string;
  status: JobStatus;
  priority: JobPriority;
  hauler?: JobHauler;
  value?: number;
  agreed_cost_gbp?: number; // Payment amount for carrier
  reference?: string;
  notes?: string;
  createdAt: string;
  lastUpdatedAt?: string;
  estimatedDuration?: number;
  podUploaded?: boolean;
  podDocumentId?: string; // Text format ID (previously UUID)
  issueDetails?: string;
  self_invoiced?: boolean | null; // Whether job has been included in a self-invoice
}

// Status transition interface
export interface StatusTransition {
  from: JobStatus;
  to: JobStatus;
  label: string;
  requiresAction?: boolean;
  actionType?: 'assign-hauler' | 'confirm-completion' | 'upload-pod' | 'generate-invoice' | 'confirm-payment' | 'archive' | 'report-issue' | 'resolve-issue';
}
