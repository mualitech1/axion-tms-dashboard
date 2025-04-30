
import { Job as DatabaseJob } from '@/types/database-types';
import { Job, JobLocation } from '@/types/job';
import { Json } from '@/integrations/supabase/types';

/**
 * Safely parses JSON location data from any format
 */
const parseLocationData = (locationData: Json | null): JobLocation => {
  // If null or undefined, return empty location object
  if (locationData === null || locationData === undefined) {
    return { address: '', city: '', postcode: '', country: '' };
  }
  
  // If it's already an object with expected properties, use it directly
  if (typeof locationData === 'object' && locationData !== null) {
    // Ensure it has at least the required fields
    return {
      address: (locationData as any).address || '',
      city: (locationData as any).city || '',
      postcode: (locationData as any).postcode || '',
      country: (locationData as any).country || '',
      ...(locationData as any) // Preserve any other properties
    };
  }
  
  // If it's a string (JSON), try to parse it
  if (typeof locationData === 'string') {
    try {
      const parsed = JSON.parse(locationData);
      return {
        address: parsed.address || '',
        city: parsed.city || '',
        postcode: parsed.postcode || '',
        country: parsed.country || '',
        ...parsed // Preserve any other properties
      };
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
    title: dbJob.title || 'Untitled Job',
    client: dbJob.customer?.name || 'Unassigned',
    date: dbJob.pickup_date || new Date().toISOString(),
    time: dbJob.pickup_date ? new Date(dbJob.pickup_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '00:00',
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
 * Also ensures all required fields have at least default values
 */
export function adaptJobTypeToDatabase(job: Partial<Job>): Partial<DatabaseJob> {
  console.log("Adapting job for database:", job);
  
  // Process pickup_location and delivery_location if provided
  let pickup_location = null;
  let delivery_location = null;
  
  if ((job as any).pickup_location) {
    pickup_location = (job as any).pickup_location;
  }
  
  if ((job as any).delivery_location) {
    delivery_location = (job as any).delivery_location;
  }
  
  // Define minimum required fields for job creation or update
  const dbJob: Partial<DatabaseJob> = {
    title: job.title || 'New Job', // Provide default for required fields
    status: job.status || 'booked',
    priority: job.priority || 'medium',
    reference: job.reference || `REF-${Date.now()}`, // Generate a default reference if none provided
    notes: job.notes,
    value: job.value,
    estimated_duration: job.estimatedDuration,
    pod_uploaded: job.podUploaded,
    pod_document_id: job.podDocumentId,
    issue_details: job.issueDetails,
    // Always ensure pickup_date is set for new jobs
    pickup_date: job.date || new Date().toISOString(),
  };
  
  // Add locations if they were provided
  if (pickup_location) {
    dbJob.pickup_location = pickup_location;
  }
  
  if (delivery_location) {
    dbJob.delivery_location = delivery_location;
  }
  
  console.log("Transformed dbJob:", dbJob);
  return dbJob;
}
