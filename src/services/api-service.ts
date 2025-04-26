
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { QueryClient } from '@tanstack/react-query';

// Global query client for advanced cache control
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
      cacheTime: 1000 * 60 * 30, // Cache persists for 30 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (
          error instanceof Error &&
          'status' in error &&
          typeof error.status === 'number' &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        return failureCount < 3; // Retry up to 3 times for other errors
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
      onError: (error) => {
        console.error('Mutation error:', error);
        toast({
          title: 'Operation Failed',
          description: getErrorMessage(error),
          variant: 'destructive',
        });
      }
    }
  }
});

// Error handler with custom error message extraction
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

// Validate input data based on schema
export function validateData<T>(data: T, schema: any): { isValid: boolean; errors?: Record<string, string> } {
  try {
    schema.parse(data);
    return { isValid: true };
  } catch (error) {
    if (error instanceof Error && 'errors' in error) {
      const zodError = error as { errors: Array<{ path: string[]; message: string }> };
      const errors = zodError.errors.reduce((acc, curr) => {
        const path = curr.path.join('.');
        acc[path] = curr.message;
        return acc;
      }, {} as Record<string, string>);
      
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: 'Validation failed' } };
  }
}

// Control cache invalidation with more precision
export function invalidateQueries(queryKeys: string | string[]) {
  const keys = Array.isArray(queryKeys) ? queryKeys : [queryKeys];
  keys.forEach(key => {
    queryClient.invalidateQueries({ queryKey: [key] });
  });
}

// Handle offline status and retry operations
export const networkService = {
  isOnline: (): boolean => {
    return navigator.onLine;
  },
  
  onNetworkStatusChange: (callback: (status: boolean) => void) => {
    window.addEventListener('online', () => callback(true));
    window.addEventListener('offline', () => callback(false));
    
    return () => {
      window.removeEventListener('online', () => callback(true));
      window.removeEventListener('offline', () => callback(false));
    };
  }
};

// Enhanced Supabase client with error handling
export const apiClient = {
  async get<T>(table: string, query: any = {}): Promise<T[]> {
    try {
      const { data, error } = await supabase
        .from(table)
        .select(query.select || '*')
        .order(query.orderBy || 'created_at', { ascending: query.ascending ?? false })
        .range(query.start || 0, query.end || 9);
      
      if (error) throw error;
      return data as T[];
    } catch (error) {
      console.error(`Error fetching data from ${table}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  async getById<T>(table: string, id: string, query: any = {}): Promise<T> {
    try {
      const { data, error } = await supabase
        .from(table)
        .select(query.select || '*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as T;
    } catch (error) {
      console.error(`Error fetching ${table} by ID:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  async create<T>(table: string, data: Partial<T>): Promise<T> {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert(data)
        .select()
        .single();
      
      if (error) throw error;
      return result as T;
    } catch (error) {
      console.error(`Error creating record in ${table}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  async update<T>(table: string, id: string, data: Partial<T>): Promise<T> {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result as T;
    } catch (error) {
      console.error(`Error updating record in ${table}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  async delete(table: string, id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error(`Error deleting record from ${table}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }
};
