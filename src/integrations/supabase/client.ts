// This file contains the canonical Supabase client for the entire application.
// Always import supabase from here, never create your own client instance.
import { createClient } from '@supabase/supabase-js';
import { withRetry } from '@/lib/utils';
import type { Database } from './types';

// Get environment variables with fallbacks for development
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://ngriinwwvpvhuhsdwcfm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ncmlpbnd3dnB2aHVoc2R3Y2ZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ2MzM1MzMsImV4cCI6MjA2MDIwOTUzM30.Llc6uvxfcn5RqAmPZZHyvl1pRCCKDlWd5wWA1lvID5k";

// Log in development mode
if (import.meta.env.DEV) {
  console.log('[Supabase] Initializing client with URL:', SUPABASE_URL);
}

// Create and export the Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});

// Export a debug helper function
export const debugSupabaseAuth = async () => {
  if (!import.meta.env.DEV) return;
  
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error('[Supabase] Auth debug - Session error:', error);
      return;
    }
    
    console.log('[Supabase] Auth debug - Session:', data.session ? 'Active' : 'None');
    if (data.session) {
      console.log('[Supabase] Auth debug - User:', data.session.user.email);
      console.log('[Supabase] Auth debug - Expires:', new Date(data.session.expires_at * 1000).toLocaleString());
    }
  } catch (err) {
    console.error('[Supabase] Auth debug - Unexpected error:', err);
  }
};

/**
 * Wrapper for Supabase queries with automatic retry and rate limit handling
 * @param queryFn Function that executes the Supabase query
 * @param maxRetries Maximum number of retry attempts (default: 3)
 * @param baseDelay Base delay in ms between retries (default: 1000)
 * @returns The result of the query
 */
export async function withSupabaseRetry<T>(
  queryFn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  return withRetry(
    async () => {
      try {
        return await queryFn();
      } catch (error: any) {
        // Handle rate limiting errors specifically
        if (
          error.message?.includes('ERR_INSUFFICIENT_RESOURCES') ||
          error.code === '429' ||
          error.statusCode === 429
        ) {
          console.warn('Supabase rate limit reached, retrying with exponential backoff...');
          throw new Error(`Rate limited: ${error.message}`);
        }
        
        // For other errors, just pass them through
        throw error;
      }
    },
    maxRetries,
    baseDelay
  );
}

// Utility function to generate a ULID (similar to UUID but time-ordered)
export function ulid(): string {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, () => {
    return ((Math.random() * 16) | 0).toString(16);
  });
}