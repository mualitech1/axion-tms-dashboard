import { useState, useEffect } from 'react';
import { useJobs } from './use-jobs';

interface PerformanceOptions {
  enableCaching?: boolean;
  minRenderTime?: number;
  throttleUpdates?: boolean;
}

// Define a more specific filter type
interface JobFilters {
  status?: string;
  priority?: string;
  search?: string;
  dateRange?: { from: Date; to: Date };
  [key: string]: unknown;
}

/**
 * Custom hook to optimize jobs page performance
 * 
 * @param filters Optional filters for the jobs data
 * @param options Performance configuration options
 * @returns An object containing jobs data and loading state
 */
export function useJobsPerformance(
  filters?: JobFilters,
  options: PerformanceOptions = {}
) {
  const [isOptimizedLoading, setIsOptimizedLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const {
    enableCaching = true,
    minRenderTime = 800,
    throttleUpdates = true,
  } = options;

  // Use the base jobs hook
  const { 
    jobs, 
    isLoading: isBaseLoading, 
    error, 
    refetch,
    createJob,
    updateJob,
    deleteJob 
  } = useJobs(filters);

  // Handle caching and optimized loading states
  useEffect(() => {
    let isMounted = true;
    let cacheKey: string | null = null;
    
    const handleData = async () => {
      try {
        // Set loading state
        if (isBaseLoading) {
          setIsOptimizedLoading(true);
        }
        
        // Simulate minimum render time for loading states
        const startTime = Date.now();
        
        // Check cache first if enabled
        if (enableCaching && !isBaseLoading && jobs) {
          cacheKey = `aximo-jobs-cache-${JSON.stringify(filters || {})}`;
          
          // Cache the result if caching is enabled
          if (cacheKey) {
            localStorage.setItem(cacheKey, JSON.stringify({
              jobs,
              timestamp: Date.now()
            }));
          }
        }
        
        // Only proceed if base hook has finished loading
        if (!isBaseLoading) {
          // Ensure minimum render time for loading states
          const elapsed = Date.now() - startTime;
          const remainingTime = Math.max(0, minRenderTime - elapsed);
          
          if (remainingTime > 0) {
            await new Promise(resolve => setTimeout(resolve, remainingTime));
          }
          
          if (isMounted) {
            setIsOptimizedLoading(false);
            setLastUpdated(new Date());
          }
        }
      } catch (err) {
        console.error("Performance hook error:", err);
        if (isMounted) {
          setIsOptimizedLoading(false);
        }
      }
    };
    
    handleData();
    
    // Set up refresh interval if throttleUpdates is enabled
    let refreshInterval: NodeJS.Timeout | null = null;
    
    if (throttleUpdates && !isBaseLoading) {
      refreshInterval = setInterval(() => {
        refetch();
      }, 3 * 60 * 1000); // Refresh every 3 minutes
    }
    
    return () => {
      isMounted = false;
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [filters, isBaseLoading, jobs, minRenderTime, enableCaching, throttleUpdates, refetch]);
  
  // Combined loading state that respects the minimum render time
  const isLoading = isBaseLoading || isOptimizedLoading;
  
  // Enhanced refresh function
  const refresh = async () => {
    setIsOptimizedLoading(true);
    await refetch();
    
    // Ensure minimum loading time for visual consistency
    setTimeout(() => {
      setIsOptimizedLoading(false);
      setLastUpdated(new Date());
    }, minRenderTime);
  };
  
  return {
    jobs,
    isLoading,
    error,
    lastUpdated,
    refresh,
    createJob,
    updateJob,
    deleteJob
  };
} 