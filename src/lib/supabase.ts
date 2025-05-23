// DEPRECATED: Please use the canonical client from '@/integrations/supabase/client'
// This file is maintained for backward compatibility and will be removed in future.
import { supabase as canonicalClient } from '@/integrations/supabase/client';

// Log deprecation warning in development
if (import.meta.env.DEV) {
  console.warn(
    '[Deprecated] src/lib/supabase.ts is deprecated. ' + 
    'Please import supabase from "@/integrations/supabase/client" instead.'
  );
}

// Re-export the canonical client
export const supabase = canonicalClient;

/**
 * Resets the Supabase schema cache to force a fresh schema fetch
 * Call this when you've made changes to the database schema or 
 * when encountering schema-related errors
 */
export async function resetSupabaseSchemaCache() {
  try {
    // Issue RPC call to reset the schema cache
    await supabase.rpc('reset_schema_cache');
    console.log('Supabase schema cache reset successfully');
    
    return true;
  } catch (error) {
    console.error('Failed to reset Supabase schema cache:', error);
    return false;
  }
}

export default supabase; 