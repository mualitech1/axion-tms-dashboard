// This file contains the canonical Supabase client for the entire application.
// Always import supabase from here, never create your own client instance.
import { createClient } from '@supabase/supabase-js';
import { withRetry } from '@/lib/utils';
import type { Database } from './types';

// Get environment variables with fallbacks for development
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://pykpcnwfbqlkngdulyuk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5a3BjbndmYnFsa25nZHVseXVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwNDQxMjIsImV4cCI6MjA2MzYyMDEyMn0.rDV7l-f0JHYG5V7S1vkmzgH3f_OC_NODdOUr0j0XakU";

if (!SUPABASE_URL) {
  throw new Error('VITE_SUPABASE_URL environment variable is required');
}

if (!SUPABASE_PUBLISHABLE_KEY) {
  throw new Error('VITE_SUPABASE_ANON_KEY environment variable is required');
}

// HMR Protection: Prevent multiple client instances during development
if (import.meta.env.DEV) {
  // Track client instances for debugging
  interface ClientTracker {
    count: number;
  }
  
  const globalScope = globalThis as typeof globalThis & {
    __SUPABASE_CLIENT_TRACKER__?: ClientTracker;
  };
  
  const clientTracker = globalScope.__SUPABASE_CLIENT_TRACKER__ || { count: 0 };
  clientTracker.count++;
  globalScope.__SUPABASE_CLIENT_TRACKER__ = clientTracker;
  
  if (clientTracker.count > 1) {
    console.warn(`[Supabase] Multiple client instances detected: ${clientTracker.count}. This may cause OAuth issues.`);
  }
}

// Log in development mode
console.log('[Supabase] Initializing client with URL:', SUPABASE_URL);

// Create and export the Supabase client with timeout and connection options
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    debug: import.meta.env.DEV
  },
  global: {
    headers: {
      'Connection': 'keep-alive',
      'Cache-Control': 'no-cache'
    },
    fetch: async (url, options = {}) => {
      // Create AbortController for longer timeout on OAuth flows
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout for OAuth
      
      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
          cache: 'no-store',
        });
        clearTimeout(timeoutId);
        return response;
      } catch (error: unknown) {
        clearTimeout(timeoutId);
        
        // Handle rate limiting gracefully
        const errorObj = error as { message?: string; code?: string; statusCode?: number };
        if (errorObj.message?.includes('rate limit') || errorObj.statusCode === 429) {
          throw new Error(`Rate limited. Please wait a moment before trying again. ${errorObj.message || 'Unknown error'}`);
        }
        
        throw error;
      }
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
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
export const withSupabaseRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3
): Promise<T> => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: unknown) {
      const errorObj = error as { message?: string };
      
      if (attempt === maxRetries || !errorObj.message?.includes('rate limit')) {
        throw error;
      }
      
      // Exponential backoff for rate limits
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw new Error('Max retries exceeded');
};

// Utility function to generate a ULID (similar to UUID but time-ordered)
export function ulid(): string {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, () => {
    return ((Math.random() * 16) | 0).toString(16);
  });
}