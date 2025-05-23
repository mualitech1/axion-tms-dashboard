import { supabase } from '@/integrations/supabase/client';
import { getErrorMessage } from '@/utils/error-handler';
import type { TableName } from '@/types/database-types';
import type { Tables } from '@/integrations/supabase/types';

// Define a generic query parameters interface to replace 'any'
interface QueryParams {
  select?: string;
  orderBy?: string;
  ascending?: boolean;
  start?: number;
  end?: number;
  [key: string]: unknown;
}

/**
 * Unified API client for Supabase interactions.
 * 
 * IMPORTANT UPDATE: Backend now uses Text format for primary keys instead of UUIDs.
 * All ID parameters should be passed as text strings rather than UUID format.
 */
export const apiClient = {
  /**
   * Fetch records from a table with optional query parameters
   */
  async get<T extends TableName>(tableName: T, query: QueryParams = {}): Promise<Tables<T>[]> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select(query.select || '*')
        .order(query.orderBy || 'created_at', { ascending: query.ascending ?? false })
        .range(query.start || 0, query.end || 9);
      
      if (error) throw error;
      return data as Tables<T>[];
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Fetch a single record by its ID
   * @param id Text-based ID (previously UUID)
   */
  async getById<T extends TableName>(tableName: T, id: string, query: QueryParams = {}): Promise<Tables<T>> {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select(query.select || '*')
        .eq('id' as any, id)
        .single();
      
      if (error) throw error;
      return data as Tables<T>;
    } catch (error) {
      console.error(`Error fetching ${tableName} by ID:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Create a new record
   */
  async create<T extends TableName>(
    tableName: T, 
    data: Record<string, unknown>
  ): Promise<Tables<T>> {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert([data] as any)
        .select()
        .single();
      
      if (error) throw error;
      return result as Tables<T>;
    } catch (error) {
      console.error(`Error creating record in ${tableName}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Update an existing record
   * @param id Text-based ID (previously UUID)
   */
  async update<T extends TableName>(
    tableName: T, 
    id: string, 
    data: Record<string, unknown>
  ): Promise<Tables<T>> {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .update(data as any)
        .eq('id' as any, id)
        .select()
        .single();
      
      if (error) throw error;
      return result as Tables<T>;
    } catch (error) {
      console.error(`Error updating record in ${tableName}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  /**
   * Delete a record
   * @param id Text-based ID (previously UUID)
   */
  async delete(tableName: TableName, id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id' as any, id);
      
      if (error) throw error;
    } catch (error) {
      console.error(`Error deleting record from ${tableName}:`, error);
      throw new Error(getErrorMessage(error));
    }
  }
};

// Re-export for convenience
export { queryClient } from '@/config/query-client';
export { networkService } from '@/services/network-service';
