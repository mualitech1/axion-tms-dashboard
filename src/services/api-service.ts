
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { QueryClient } from '@tanstack/react-query';
import { Tables } from '@/integrations/supabase/types';

// Define a union type of all valid table names for type safety
type TableName = 'companies' | 'jobs' | 'vehicles' | 'drivers' | 'documents' | 'profiles' | 'user_roles' | 'claude_tasks';

// Map table names to their respective types from the generated Tables type
type TableTypes = {
  companies: Tables<'companies'>;
  jobs: Tables<'jobs'>;
  vehicles: Tables<'vehicles'>;
  drivers: Tables<'drivers'>;
  documents: Tables<'documents'>;
  profiles: Tables<'profiles'>;
  user_roles: Tables<'user_roles'>;
  claude_tasks: Tables<'claude_tasks'>;
}

// Global query client for advanced cache control
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Cache persists for 30 minutes (renamed from cacheTime)
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

// Type-safe approach to handle table names with generics
export const apiClient = {
  async get<T extends keyof TableTypes>(tableName: T, query: any = {}): Promise<TableTypes[T][]> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select(query.select || '*')
        .order(query.orderBy || 'created_at', { ascending: query.ascending ?? false })
        .range(query.start || 0, query.end || 9);
      
      if (error) throw error;
      return data as TableTypes[T][];
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  async getById<T extends keyof TableTypes>(tableName: T, id: string, query: any = {}): Promise<TableTypes[T]> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select(query.select || '*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as TableTypes[T];
    } catch (error) {
      console.error(`Error fetching ${tableName} by ID:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  async create<T extends keyof TableTypes>(
    tableName: T, 
    data: Partial<TableTypes[T]>
  ): Promise<TableTypes[T]> {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert(data as any)
        .select()
        .single();
      
      if (error) throw error;
      return result as TableTypes[T];
    } catch (error) {
      console.error(`Error creating record in ${tableName}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  async update<T extends keyof TableTypes>(
    tableName: T, 
    id: string, 
    data: Partial<TableTypes[T]>
  ): Promise<TableTypes[T]> {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data as any)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result as TableTypes[T];
    } catch (error) {
      console.error(`Error updating record in ${tableName}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  async delete(tableName: TableName, id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    } catch (error) {
      console.error(`Error deleting record from ${tableName}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }
};
