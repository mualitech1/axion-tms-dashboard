
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Handle PostgrestError from Supabase
    if ('code' in error && 'details' in error && 'hint' in error && 'message' in error) {
      const pgError = error as { code: string; message: string; details: string };
      console.error('Database error:', pgError);
      
      // Handle specific PostgreSQL error codes
      if (pgError.code === '23505') {
        return 'This record already exists.';
      } else if (pgError.code === '23503') {
        return 'This operation failed because a related record is missing.';
      } else if (pgError.code === '42P01') {
        return 'The requested resource does not exist.';
      }
      
      return pgError.message || 'Database operation failed';
    }
    
    // Handle network or other errors
    if ('message' in error) {
      return error.message;
    }
  }
  
  // Fallback for unknown errors
  return 'An unexpected error occurred. Please try again later.';
}
