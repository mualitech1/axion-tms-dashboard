import { useState, useEffect } from 'react';

interface PerformanceOptions {
  enableCaching?: boolean;
  minRenderTime?: number;
  throttleUpdates?: boolean;
}

/**
 * Custom hook to optimize dashboard performance
 * 
 * @param dataFetcher Function to fetch dashboard data
 * @param options Performance configuration options
 * @returns An object containing dashboard data and loading state
 */
export function useDashboardPerformance<T>(
  dataFetcher: () => Promise<T> | T,
  options: PerformanceOptions = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const {
    enableCaching = true,
    minRenderTime = 500,
    throttleUpdates = true,
  } = options;

  useEffect(() => {
    let isMounted = true;
    let cacheKey: string | null = null;
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        
        // Simulate minimum render time for loading states
        const startTime = Date.now();
        
        // Check cache first if enabled
        if (enableCaching) {
          cacheKey = 'aximo-dashboard-cache';
          const cached = localStorage.getItem(cacheKey);
          
          if (cached) {
            const { data: cachedData, timestamp } = JSON.parse(cached);
            const cacheAge = Date.now() - timestamp;
            
            // Use cache if it's less than 5 minutes old
            if (cacheAge < 5 * 60 * 1000) {
              if (isMounted) {
                setData(cachedData);
                // Still show loading for minimum time for visual consistency
                const elapsed = Date.now() - startTime;
                const remainingTime = Math.max(0, minRenderTime - elapsed);
                
                await new Promise(resolve => setTimeout(resolve, remainingTime));
                setIsLoading(false);
                setLastUpdated(new Date(timestamp));
                return;
              }
            }
          }
        }
        
        // Fetch fresh data
        const result = await dataFetcher();
        
        // Ensure minimum render time for loading states
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minRenderTime - elapsed);
        
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }
        
        if (isMounted) {
          setData(result);
          setLastUpdated(new Date());
          
          // Cache the result if caching is enabled
          if (enableCaching && cacheKey) {
            localStorage.setItem(cacheKey, JSON.stringify({
              data: result,
              timestamp: Date.now()
            }));
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    // Set up refresh interval if throttleUpdates is enabled
    let refreshInterval: NodeJS.Timeout | null = null;
    
    if (throttleUpdates) {
      refreshInterval = setInterval(() => {
        fetchData();
      }, 2 * 60 * 1000); // Refresh every 2 minutes
    }
    
    return () => {
      isMounted = false;
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    };
  }, [dataFetcher, enableCaching, minRenderTime, throttleUpdates]);
  
  const refresh = async () => {
    try {
      setIsLoading(true);
      const result = await dataFetcher();
      setData(result);
      setLastUpdated(new Date());
      setError(null);
      
      // Update cache
      if (enableCaching) {
        localStorage.setItem('aximo-dashboard-cache', JSON.stringify({
          data: result,
          timestamp: Date.now()
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    data,
    isLoading,
    error,
    lastUpdated,
    refresh
  };
} 