/**
 * Extracts a meaningful error message from different error types
 * @param error The error object to process
 * @returns A standardized error message string
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  
  if (typeof error === 'object' && error !== null) {
    // Handle Supabase-style errors
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    
    if ('error' in error && typeof error.error === 'string') {
      return error.error;
    }
    
    if ('statusText' in error && typeof error.statusText === 'string') {
      return error.statusText;
    }
  }
  
  // Fallback for unknown error formats
  return 'An unknown error occurred';
}

/**
 * Logs errors to the console in a standardized format
 * In a production app, this would send errors to a monitoring service
 * @param context The context where the error occurred
 * @param error The error object
 */
export function logError(context: string, error: unknown): void {
  console.error(`[${context}] Error:`, error);
  
  // In a real production app, this would connect to error monitoring
  // For now we just log to console in all environments
}

/**
 * Handles API errors with standardized approach
 * @param error Error from an API call
 * @returns Standardized error object
 */
export function handleApiError(error: unknown): { message: string; status?: number } {
  logError('API', error);
  
  // Extract HTTP status if available
  let status: number | undefined;
  if (
    typeof error === 'object' && 
    error !== null && 
    'status' in error && 
    typeof error.status === 'number'
  ) {
    status = error.status;
  }
  
  return {
    message: getErrorMessage(error),
    status
  };
}
