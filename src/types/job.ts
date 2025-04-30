
// Job status types
export type JobStatus = 
  | "booked" 
  | "allocated"
  | "in-progress"
  | "finished"
  | "invoiced"
  | "cleared"
  | "completed"
  | "archived"
  | "issues";

// Priority levels
export type JobPriority = "low" | "medium" | "high";

// Common location interface 
export interface JobLocation {
  address: string;
  city: string;
  postcode: string;
  country: string;
  notes?: string;
  [key: string]: any; // Allow any additional properties to be compatible with Json type
}

// Hauler/carrier info 
export interface JobHauler {
  id: string | number;
  name: string;
  contactPhone?: string;
  email?: string;
}

// Consolidated Job interface
export interface Job {
  id: string | number;
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
  reference?: string;
  notes?: string;
  createdAt: string;
  lastUpdatedAt?: string;
  estimatedDuration?: number;
  podUploaded?: boolean;
  podDocumentId?: string;
  issueDetails?: string;
}

// Status transition interface
export interface StatusTransition {
  from: JobStatus;
  to: JobStatus;
  label: string;
  requiresAction?: boolean;
  actionType?: 'assign-hauler' | 'confirm-completion' | 'upload-pod' | 'generate-invoice' | 'confirm-payment' | 'archive' | 'report-issue' | 'resolve-issue';
}
