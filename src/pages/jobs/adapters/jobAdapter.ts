import { Job as DatabaseJob } from '@/types/database';
import { Job, JobLocation } from '@/types/job';
import { Json } from '@/integrations/supabase/types';

// Define an extended interface that might include legacy fields like job_reference
interface ExtendedJobData extends Partial<Job> {
  job_reference?: string; // LEGACY FIELD - This should never be sent to the database
  pickup_location?: any;
  delivery_location?: any;
  [key: string]: any; // Allow any other properties
}

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
      address: (locationData as Record<string, string>).address || '',
      city: (locationData as Record<string, string>).city || '',
      postcode: (locationData as Record<string, string>).postcode || '',
      country: (locationData as Record<string, string>).country || '',
      ...(locationData as Record<string, string>) // Preserve any other properties
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
  console.log('adaptDatabaseJobToJobType INPUT:', dbJob);
  
  // Parse locations properly regardless of format
  const pickupLocation = parseLocationData(dbJob.pickup_location);
  const deliveryLocation = parseLocationData(dbJob.delivery_location);
  
  // Get city values safely
  const pickupCity = pickupLocation?.city || 'Unknown';
  const deliveryCity = deliveryLocation?.city || 'Unknown';
  
  const adaptedJob = {
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
  
  console.log('adaptDatabaseJobToJobType OUTPUT:', adaptedJob);
  return adaptedJob;
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
export function adaptJobTypeToDatabase(job: ExtendedJobData): Partial<DatabaseJob> {
  console.log("🔄 adaptJobTypeToDatabase - INPUT:", job);
  
  // CRITICAL: First check for and handle job_reference
  if (job.job_reference) {
    console.warn("⚠️ CRITICAL: Found legacy job_reference field - converting to reference");
    if (!job.reference) {
      job.reference = job.job_reference;
    }
    // Always delete job_reference to ensure it's never sent to the database
    delete job.job_reference;
  }
  
  // Process pickup_location and delivery_location if provided
  let pickup_location = null;
  let delivery_location = null;
  
  if (job.pickup_location) {
    pickup_location = job.pickup_location;
  }
  
  if (job.delivery_location) {
    delivery_location = job.delivery_location;
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
  
  // Create a copy to safely remove any non-database fields
  const result = { ...dbJob };
  
  // FINAL SAFETY CHECK: Ensure absolutely no job_reference field is present
  const finalResult = result as unknown as Record<string, unknown>;
  
  if ('job_reference' in finalResult) {
    console.warn("🛡️ FINAL SAFETY CHECK: job_reference found in output - removing");
    delete finalResult.job_reference;
  }
  
  // NUCLEAR OPTION: Comprehensive deletion of ANY job_reference field
  // This is the most aggressive approach to guarantee no job_reference reaches Supabase
  const nuclearClean = (obj: Record<string, any>) => {
    // 1. Direct removal of exact match
    if ('job_reference' in obj) {
      console.warn("⚛️ NUCLEAR DEFENSE: Removing exact job_reference match");
      delete obj.job_reference;
    }
    
    // 2. Remove any key that *might* be job_reference (case insensitive pattern matching)
    Object.keys(obj).forEach(key => {
      if (key.toLowerCase().includes('job_reference') || 
          key.toLowerCase().includes('jobreference') ||
          key.toLowerCase().includes('job_ref') ||
          (key.toLowerCase().includes('job') && key.toLowerCase().includes('ref'))) {
        console.warn(`⚛️ NUCLEAR DEFENSE: Removing potential job_reference: "${key}"`);
        delete obj[key];
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // 3. Recursive cleaning of nested objects
        nuclearClean(obj[key]);
      }
    });
    
    return obj;
  };
  
  // Apply nuclear cleaning
  const purifiedResult = nuclearClean(finalResult);
  
  console.log("🔄 adaptJobTypeToDatabase - OUTPUT (NUCLEAR CLEANED):", purifiedResult);
  return purifiedResult;
}
