/**
 * NUCLEAR JOB CLEANER
 * 
 * This utility aggressively removes ANY trace of job_reference from a job object
 * before it's sent to Supabase.
 * 
 * Use this as a final defensive measure to prevent schema mismatch errors.
 */

/**
 * Deep cleans an object to remove ANY fields that might be job_reference
 * using a scorched earth approach.
 */
export function nuclearCleanJobPayload<T>(payload: T): T {
  // Early exit for non-objects
  if (!payload || typeof payload !== 'object') return payload;
  
  // Create a deep copy to avoid mutating the original
  const cleaned = JSON.parse(JSON.stringify(payload)) as Record<string, any>;
  
  // Apply nuclear cleaning algorithm
  deepClean(cleaned);
  
  // Return the cleaned object with original type
  return cleaned as T;
}

/**
 * Recursive function to clean nested objects
 */
function deepClean(obj: Record<string, any>): void {
  // Safety check
  if (!obj || typeof obj !== 'object') return;
  
  // List of patterns to check for (case insensitive)
  const dangerPatterns = [
    'job_reference',
    'jobreference',
    'job_ref',
    'jobref'
  ];
  
  // Check each key in the object
  Object.keys(obj).forEach(key => {
    const lowerKey = key.toLowerCase();
    
    // Check if key matches any danger pattern
    const isDangerous = dangerPatterns.some(pattern => 
      lowerKey.includes(pattern) || 
      (lowerKey.includes('job') && lowerKey.includes('ref'))
    );
    
    if (isDangerous) {
      // Remove the dangerous field
      console.warn(`⚛️ NUCLEAR DEFENSE: Removing field "${key}" that looks like job_reference`);
      delete obj[key];
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively clean nested objects
      deepClean(obj[key]);
    }
  });
}

/**
 * Validator function to check for job_reference traces
 * Returns true if the object is clean, false if it found job_reference
 */
export function validateNoJobReference(obj: any): boolean {
  // Early exit for non-objects
  if (!obj || typeof obj !== 'object') return true;
  
  // Flag to track if we found any job_reference
  let isClean = true;
  
  // List of patterns to check for (case insensitive)
  const dangerPatterns = [
    'job_reference',
    'jobreference',
    'job_ref',
    'jobref'
  ];
  
  // Check each key in the object
  Object.keys(obj).forEach(key => {
    const lowerKey = key.toLowerCase();
    
    // Check if key matches any danger pattern
    const isDangerous = dangerPatterns.some(pattern => 
      lowerKey.includes(pattern) || 
      (lowerKey.includes('job') && lowerKey.includes('ref'))
    );
    
    if (isDangerous) {
      console.error(`⚠️ JOB_REFERENCE DETECTED: Found "${key}" field that looks like job_reference`);
      isClean = false;
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      // Recursively check nested objects
      isClean = isClean && validateNoJobReference(obj[key]);
    }
  });
  
  return isClean;
}

/**
 * Usage example:
 * 
 * import { nuclearCleanJobPayload } from '@/utils/nuclear-job-cleaner';
 * 
 * // Before sending to Supabase:
 * const cleanJobData = nuclearCleanJobPayload(jobData);
 * 
 * // Then use cleanJobData instead of jobData
 * await supabase.from('jobs').insert([cleanJobData]);
 */ 