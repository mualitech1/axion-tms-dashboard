
import { Job as DatabaseJob } from '@/types/database';
import { Job, JobLocation } from '@/types/job';

/**
 * Converts a database job object to the format expected by the Jobs UI components
 */
export function adaptDatabaseJobToJobType(dbJob: DatabaseJob): Job {
  // Ensure pickup_location and delivery_location are properly handled
  const pickupLocation = dbJob.pickup_location || {};
  const deliveryLocation = dbJob.delivery_location || {};
  
  return {
    id: dbJob.id,
    title: dbJob.title,
    client: dbJob.customer?.name || 'Unassigned',
    date: dbJob.pickup_date,
    time: new Date(dbJob.pickup_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    origin: typeof pickupLocation === 'object' && pickupLocation.city ? pickupLocation.city : 'Unknown',
    destination: typeof deliveryLocation === 'object' && deliveryLocation.city ? deliveryLocation.city : 'Unknown',
    vehicle: dbJob.vehicle ? `${dbJob.vehicle.make} ${dbJob.vehicle.model}` : 'Unassigned',
    status: dbJob.status as any,
    priority: (dbJob.priority || 'medium') as any,
    createdAt: dbJob.created_at || new Date().toISOString(),
    reference: dbJob.reference || '',
    value: dbJob.value || undefined,
    notes: dbJob.notes || undefined,
    hauler: dbJob.carrier ? {
      id: dbJob.carrier.id,
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
export function adaptDatabaseJobsToJobTypes(dbJobs: DatabaseJob[] | undefined): Job[] {
  if (!dbJobs) return [];
  return dbJobs.map(adaptDatabaseJobToJobType);
}

/**
 * Converts a UI job type back to database format for saving
 */
export function adaptJobTypeToDatabase(job: Partial<Job>): Partial<DatabaseJob> {
  // Define minimum required fields for job creation
  const dbJob: Partial<DatabaseJob> = {
    title: job.title,
    status: job.status,
    priority: job.priority,
    reference: job.reference,
    notes: job.notes,
    value: job.value,
    estimated_duration: job.estimatedDuration,
    pod_uploaded: job.podUploaded,
    pod_document_id: job.podDocumentId,
    issue_details: job.issueDetails,
    // Default values for required fields
    pickup_date: new Date().toISOString(),
    pickup_location: { address: '', city: '', postcode: '', country: '' },
    delivery_location: { address: '', city: '', postcode: '', country: '' }
  };
  
  return dbJob;
}
