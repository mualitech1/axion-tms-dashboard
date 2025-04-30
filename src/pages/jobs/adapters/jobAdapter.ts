
import { Job as DatabaseJob } from '@/types/database';
import { Job, JobLocation } from '@/types/job';
import { Json } from '@/integrations/supabase/types';

/**
 * Safely parses JSON location data from any format
 */
const parseLocationData = (locationData: Json | JobLocation | Record<string, any> | null): JobLocation => {
  // If null or undefined, return empty location object
  if (locationData === null || locationData === undefined) {
    return { address: '', city: '', postcode: '', country: '' };
  }
  
  // If it's already an object, use it directly
  if (typeof locationData === 'object') {
    return locationData as JobLocation;
  }
  
  // If it's a string (JSON), try to parse it
  if (typeof locationData === 'string') {
    try {
      return JSON.parse(locationData) as JobLocation;
    } catch (e) {
      console.error('Error parsing location data:', e);
      return { address: '', city: '', postcode: '', country: '' };
    }
  }
  
  // Fallback: return empty location object
  return { address: '', city: '', postcode: '', country: '' };
};

/**
 * Converts a database job object to the format expected by the Jobs UI components
 */
export function adaptDatabaseJobToJobType(dbJob: DatabaseJob): Job {
  // Parse locations properly regardless of format
  const pickupLocation = parseLocationData(dbJob.pickup_location);
  const deliveryLocation = parseLocationData(dbJob.delivery_location);
  
  // Get city values safely
  const pickupCity = pickupLocation?.city || 'Unknown';
  const deliveryCity = deliveryLocation?.city || 'Unknown';
  
  return {
    id: dbJob.id,
    title: dbJob.title,
    client: dbJob.customer?.name || 'Unassigned',
    date: dbJob.pickup_date,
    time: new Date(dbJob.pickup_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    origin: pickupCity,
    destination: deliveryCity,
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
  // Define default location objects for required fields
  const defaultLocation = { address: '', city: '', postcode: '', country: '' };
  
  // Define minimum required fields for job creation or update
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
    // Always include these required fields with default values if this is for a new job
    pickup_date: job.date || new Date().toISOString(),
    pickup_location: defaultLocation,
    delivery_location: defaultLocation
  };
  
  return dbJob;
}
