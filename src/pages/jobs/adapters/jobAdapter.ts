
import { Job as DatabaseJob } from '@/types/database';
import { Job as JobType } from '../types/jobTypes';

/**
 * Converts a database job object to the format expected by the Jobs UI components
 */
export function adaptDatabaseJobToJobType(dbJob: DatabaseJob): JobType {
  return {
    id: Number(dbJob.id),
    title: dbJob.title,
    client: dbJob.customer?.name || 'Unassigned',
    date: dbJob.pickup_date,
    time: new Date(dbJob.pickup_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    origin: dbJob.pickup_location?.city || '',
    destination: dbJob.delivery_location?.city || '',
    vehicle: dbJob.vehicle ? `${dbJob.vehicle.make} ${dbJob.vehicle.model}` : 'Unassigned',
    status: dbJob.status as any,
    priority: (dbJob.priority || 'medium') as any,
    createdAt: dbJob.created_at || new Date().toISOString(),
    reference: dbJob.reference || '',
    value: dbJob.value || undefined,
    notes: dbJob.notes || undefined,
    hauler: dbJob.carrier ? {
      id: Number(dbJob.carrier.id),
      name: dbJob.carrier.name,
      contactPhone: dbJob.carrier.phone || undefined,
      email: dbJob.carrier.email || undefined
    } : undefined,
    estimatedDuration: dbJob.estimated_duration || undefined,
    podUploaded: dbJob.pod_uploaded || false,
    podDocumentId: dbJob.pod_document_id || undefined,
    issueDetails: dbJob.issue_details || undefined
  };
}

/**
 * Converts an array of database jobs to job types
 */
export function adaptDatabaseJobsToJobTypes(dbJobs: DatabaseJob[] | undefined): JobType[] {
  if (!dbJobs) return [];
  return dbJobs.map(adaptDatabaseJobToJobType);
}
