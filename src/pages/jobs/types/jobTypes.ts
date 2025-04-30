
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
  priority: "low" | "medium" | "high";
  hauler?: {
    id: string | number;
    name: string;
    contactPhone?: string;
    email?: string;
  };
  value?: number;
  reference?: string;
  notes?: string;
  createdAt: string;
  lastUpdatedAt?: string;
  estimatedDuration?: number;
  podUploaded?: boolean; // Track if POD has been uploaded
  podDocumentId?: string; // Reference to the uploaded POD document
  issueDetails?: string; // Details about any issues that occur
}

export interface StatusTransition {
  from: JobStatus;
  to: JobStatus;
  label: string;
  requiresAction?: boolean;
  actionType?: 'assign-hauler' | 'confirm-completion' | 'upload-pod' | 'generate-invoice' | 'confirm-payment' | 'archive' | 'report-issue' | 'resolve-issue';
}
