/**
 * Utility functions for testing and validating text-based ID formats
 */

/**
 * Validates if an ID follows the job_[timestamp]_[random] format
 * @param id The ID to test
 * @returns boolean indicating if the ID matches the format
 */
export function isValidJobIdFormat(id: string): boolean {
  // Check if the ID follows the job_[timestamp]_[random] format
  const regex = /^job_[a-z0-9]+_[a-z0-9]+$/;
  return regex.test(id);
}

/**
 * Validates if an ID follows any of the accepted text-based ID formats
 * @param id The ID to test
 * @param type Optional type of ID to validate against specific formats
 * @returns boolean indicating if the ID is valid
 */
export function isValidTextBasedId(id: any, type?: 'job' | 'customer' | 'carrier' | 'generic'): boolean {
  if (typeof id !== 'string') {
    return false;
  }
  
  // For job IDs, use the specific format check
  if (type === 'job') {
    return isValidJobIdFormat(id);
  }
  
  // For customer IDs, they should start with 'cust_'
  if (type === 'customer') {
    return id.startsWith('cust_');
  }
  
  // For carrier IDs, they should start with 'carr_'
  if (type === 'carrier') {
    return id.startsWith('carr_');
  }
  
  // Generic check - must be a string and not empty
  return id.trim().length > 0;
}

/**
 * Sample function to test a batch of IDs
 * @param ids Array of IDs to test
 * @param type Optional type to validate against
 * @returns Object with results of the validation
 */
export function batchTestIds(ids: any[], type?: 'job' | 'customer' | 'carrier' | 'generic'): {
  valid: string[];
  invalid: { id: any; reason: string }[];
  summary: { total: number; valid: number; invalid: number; percentage: string };
} {
  const valid: string[] = [];
  const invalid: { id: any; reason: string }[] = [];
  
  for (const id of ids) {
    if (isValidTextBasedId(id, type)) {
      valid.push(id);
    } else {
      let reason = 'Invalid format';
      if (typeof id !== 'string') {
        reason = `Not a string type: ${typeof id}`;
      } else if (id.trim().length === 0) {
        reason = 'Empty string';
      } else if (type === 'job' && !isValidJobIdFormat(id)) {
        reason = 'Does not match job_[timestamp]_[random] format';
      } else if (type === 'customer' && !id.startsWith('cust_')) {
        reason = 'Customer ID should start with "cust_"';
      } else if (type === 'carrier' && !id.startsWith('carr_')) {
        reason = 'Carrier ID should start with "carr_"';
      }
      
      invalid.push({ id, reason });
    }
  }
  
  const total = ids.length;
  const validCount = valid.length;
  const invalidCount = invalid.length;
  const percentage = total > 0 ? `${Math.round((validCount / total) * 100)}%` : '0%';
  
  return {
    valid,
    invalid,
    summary: { total, valid: validCount, invalid: invalidCount, percentage }
  };
}

/**
 * Function to check an object recursively for valid IDs
 * @param obj Object to check for IDs
 * @returns Report on ID validity
 */
export function deepCheckObjectIds(obj: Record<string, any>): {
  validIds: { path: string; id: string }[];
  invalidIds: { path: string; id: any; reason: string }[];
} {
  const validIds: { path: string; id: string }[] = [];
  const invalidIds: { path: string; id: any; reason: string }[] = [];
  
  function traverse(object: any, path = '') {
    if (object === null || object === undefined) {
      return;
    }
    
    if (typeof object === 'object') {
      if (Array.isArray(object)) {
        object.forEach((item, index) => {
          traverse(item, path ? `${path}[${index}]` : `[${index}]`);
        });
      } else {
        Object.entries(object).forEach(([key, value]) => {
          const newPath = path ? `${path}.${key}` : key;
          
          // Check if this is an ID field
          if (key === 'id' || key.endsWith('Id') || key.endsWith('_id')) {
            if (isValidTextBasedId(value)) {
              validIds.push({ path: newPath, id: value as string });
            } else {
              let reason = 'Invalid format';
              if (typeof value !== 'string') {
                reason = `Not a string type: ${typeof value}`;
              } else if ((value as string).trim().length === 0) {
                reason = 'Empty string';
              }
              invalidIds.push({ path: newPath, id: value, reason });
            }
          }
          
          traverse(value, newPath);
        });
      }
    }
  }
  
  traverse(obj);
  
  return { validIds, invalidIds };
} 