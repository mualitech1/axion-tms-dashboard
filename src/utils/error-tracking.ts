import { toast } from '@/hooks/use-toast';

// Simple error reporting mechanism - in a real app this would connect to 
// an external service like Sentry, Rollbar, or other monitoring tools
interface ErrorOptions {
  context?: Record<string, unknown>;
  level?: 'error' | 'warning' | 'info';
  userId?: string;
  silent?: boolean;
}

type ErrorHandler = (error: Error, options?: ErrorOptions) => void;
type ErrorListener = (error: Error, context: Record<string, unknown>) => void;

class ErrorTracker {
  private static instance: ErrorTracker;
  private listeners: ErrorListener[] = [];
  
  // For development error tracking
  private recentErrors: Array<{
    timestamp: number;
    error: Error;
    context?: Record<string, unknown>;
  }> = [];
  
  private constructor() {}
  
  public static getInstance(): ErrorTracker {
    if (!ErrorTracker.instance) {
      ErrorTracker.instance = new ErrorTracker();
    }
    return ErrorTracker.instance;
  }
  
  /**
   * Track an error
   */
  public captureError: ErrorHandler = (error, options = {}) => {
    const { 
      context = {}, 
      level = 'error',
      userId,
      silent = false
    } = options;
    
    // Store the error for local debugging
    this.recentErrors.push({
      timestamp: Date.now(),
      error,
      context
    });
    
    // Keep only the last 20 errors
    if (this.recentErrors.length > 20) {
      this.recentErrors.shift();
    }
    
    // Log to console in development
    if (process.env.NODE_ENV !== 'production') {
      console.group('Quantum Error Tracker');
      console.error(error);
      console.info('Context:', context);
      console.info('User ID:', userId);
      console.groupEnd();
    }
    
    // In production, this would send to a real error tracking service
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
      // Example: Sentry.captureException(error, { extra: context, user: { id: userId } });
    }
    
    // Show a toast notification unless silent is true
    if (!silent) {
      toast({
        title: level === 'error' ? 'An error occurred' : 'Warning',
        description: error.message || 'Something went wrong. Our engineers have been notified.',
        variant: level === 'error' ? 'destructive' : 'default',
      });
    }
    
    // Notify all listeners
    this.listeners.forEach(listener => {
      try {
        listener(error, context);
      } catch (listenerError) {
        console.error('Error in error listener:', listenerError);
      }
    });
  };
  
  /**
   * Add a listener for errors
   */
  public addListener(listener: ErrorListener): () => void {
    this.listeners.push(listener);
    
    // Return a function to remove the listener
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
  
  /**
   * Get recent errors for debugging
   */
  public getRecentErrors() {
    return [...this.recentErrors];
  }
  
  /**
   * Clear recent errors
   */
  public clearRecentErrors() {
    this.recentErrors = [];
  }
}

// Export a singleton instance
export const errorTracker = ErrorTracker.getInstance();

/**
 * Wrap a function with error handling
 */
export function withErrorHandling<T extends (...args: unknown[]) => unknown>(
  fn: T,
  options?: ErrorOptions
): (...args: Parameters<T>) => ReturnType<T> | undefined {
  return (...args: Parameters<T>): ReturnType<T> | undefined => {
    try {
      return fn(...args) as ReturnType<T>;
    } catch (error) {
      errorTracker.captureError(error instanceof Error ? error : new Error(String(error)), options);
      return undefined;
    }
  };
}

/**
 * Wrap an async function with error handling
 */
export async function withAsyncErrorHandling<T>(
  fn: () => Promise<T>,
  options?: ErrorOptions
): Promise<T | undefined> {
  try {
    return await fn();
  } catch (error) {
    errorTracker.captureError(error instanceof Error ? error : new Error(String(error)), options);
    return undefined;
  }
}

export default errorTracker; 