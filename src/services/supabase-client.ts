
import { supabase } from '@/integrations/supabase/client';
import { getErrorMessage } from '@/utils/error-handler';
import type { TableName } from '@/types/database-types';
import type { Tables } from '@/integrations/supabase/types';

export const apiClient = {
  async get<T extends TableName>(tableName: T, query: any = {}): Promise<Tables<T>[]> {
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
  
  async getById<T extends TableName>(tableName: T, id: string, query: any = {}): Promise<Tables<T>> {
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
  
  async create<T extends TableName>(
    tableName: T, 
    data: Record<string, any>
  ): Promise<Tables<T>> {
    try {
      const { data: result, error } = await supabase
        .from(tableName)
        .insert([data] as any) // Wrap in array to satisfy the API
        .select()
        .single();
      
      if (error) throw error;
      return result as Tables<T>;
    } catch (error) {
      console.error(`Error creating record in ${tableName}:`, error);
      throw new Error(getErrorMessage(error));
    }
  },
  
  async update<T extends TableName>(
    tableName: T, 
    id: string, 
    data: Record<string, any>
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
  
  // Simplify the delete function by removing generic type parameters entirely
  async delete(tableName: TableName, id: string): Promise<void> {
    try {
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id); // Remove the type assertion 'as any'
      
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
