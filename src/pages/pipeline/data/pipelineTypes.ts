
export interface PipelineStage {
  id: string;
  name: string;
  description: string;
}

export interface Lead {
  id: string;
  company: string;
  contact: string;
  title: string;
  email: string;
  phone: string;
  value: number;
  probability: number;
  source: LeadSource;
  stage: string;
  created: string;
  lastActivity: string;
  status: LeadStatus;
  notes: string;
  tags: string[];
  assignedTo: string;
}

export enum LeadSource {
  WEBSITE = 'website',
  REFERRAL = 'referral',
  COLD_CALL = 'cold-call',
  EVENT = 'event',
  LINKEDIN = 'linkedin',
  EMAIL_CAMPAIGN = 'email-campaign',
  PARTNER = 'partner',
  OTHER = 'other'
}

export enum LeadStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived'
}

export interface Activity {
  id: string;
  leadId: string;
  type: ActivityType;
  description: string;
  timestamp: string;
  userId: string;
  metadata?: Record<string, any>;
}

export enum ActivityType {
  NOTE = 'note',
  EMAIL = 'email',
  CALL = 'call',
  MEETING = 'meeting',
  TASK_CREATED = 'task-created',
  TASK_COMPLETED = 'task-completed',
  STAGE_CHANGED = 'stage-changed',
  DOCUMENT = 'document',
  SYSTEM = 'system'
}

export interface Task {
  id: string;
  leadId: string;
  title: string;
  description: string;
  dueDate: string;
  completed: boolean;
  assignedTo: string;
  priority: TaskPriority;
  createdAt: string;
  createdBy: string;
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent'
}
