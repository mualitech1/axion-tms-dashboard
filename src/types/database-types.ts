
import { Tables as SupabaseTables } from '@/integrations/supabase/types';

// Define a union type of all valid table names for type safety
export type TableName = 'companies' | 'jobs' | 'vehicles' | 'drivers' | 'documents' | 'profiles' | 'user_roles' | 'claude_tasks';

// Import and use the Tables type directly from generated Supabase types
export type Tables<T extends TableName> = SupabaseTables<T>;

// Map table names to their respective types from the generated Tables type
export type TableTypes = {
  companies: Tables<'companies'>;
  jobs: Tables<'jobs'>;
  vehicles: Tables<'vehicles'>;
  drivers: Tables<'drivers'>;
  documents: Tables<'documents'>;
  profiles: Tables<'profiles'>;
  user_roles: Tables<'user_roles'>;
  claude_tasks: Tables<'claude_tasks'>;
}
