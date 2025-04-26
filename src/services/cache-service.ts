
import { queryClient } from './api-service';

// Predefined entity types for type safety
export type EntityType = 'jobs' | 'companies' | 'vehicles' | 'drivers' | 'documents';

// Cache service to manage React Query cache
export const cacheService = {
  // Prefetch data into cache (useful for anticipated user actions)
  prefetch: async (entityType: EntityType, fetcher: () => Promise<any>) => {
    await queryClient.prefetchQuery({
      queryKey: [entityType],
      queryFn: fetcher,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  },

  // Invalidate cache for specific entity
  invalidate: (entityType: EntityType) => {
    queryClient.invalidateQueries({ queryKey: [entityType] });
  },

  // Invalidate multiple entity caches at once
  invalidateMany: (entityTypes: EntityType[]) => {
    entityTypes.forEach(entityType => {
      queryClient.invalidateQueries({ queryKey: [entityType] });
    });
  },

  // Set cache data directly
  setData: <T>(entityType: EntityType, data: T) => {
    queryClient.setQueryData([entityType], data);
  },

  // Update specific cache item
  updateItem: <T extends { id: string }>(entityType: EntityType, itemId: string, updates: Partial<T>) => {
    queryClient.setQueryData([entityType], (oldData: T[] | undefined) => {
      if (!oldData) return oldData;
      return oldData.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      );
    });
  },

  // Remove specific cache item
  removeItem: (entityType: EntityType, itemId: string) => {
    queryClient.setQueryData([entityType], (oldData: any[] | undefined) => {
      if (!oldData) return oldData;
      return oldData.filter(item => item.id !== itemId);
    });
  },

  // Clear all cache
  clear: () => {
    queryClient.clear();
  },

  // Get cache state for debugging
  getState: (entityType?: EntityType) => {
    if (entityType) {
      return queryClient.getQueryState([entityType]);
    }
    
    return {
      jobs: queryClient.getQueryState(['jobs']),
      companies: queryClient.getQueryState(['companies']),
      vehicles: queryClient.getQueryState(['vehicles']),
      drivers: queryClient.getQueryState(['drivers']),
      documents: queryClient.getQueryState(['documents']),
    };
  }
};

// Network state tracking with auto-retry functionality
export const networkStateService = {
  isOnline: () => navigator.onLine,
  
  pendingOperations: new Map<string, () => Promise<any>>(),

  // Add an operation to pending list (for offline mode)
  addPendingOperation: (key: string, operation: () => Promise<any>) => {
    networkStateService.pendingOperations.set(key, operation);
    localStorage.setItem('pendingOperations', JSON.stringify(Array.from(networkStateService.pendingOperations.keys())));
  },

  // Remove completed operation
  removePendingOperation: (key: string) => {
    networkStateService.pendingOperations.delete(key);
    localStorage.setItem('pendingOperations', JSON.stringify(Array.from(networkStateService.pendingOperations.keys())));
  },

  // Try to execute all pending operations when back online
  processPendingOperations: async () => {
    if (!navigator.onLine) return;
    
    const operations = Array.from(networkStateService.pendingOperations.entries());
    for (const [key, operation] of operations) {
      try {
        await operation();
        networkStateService.removePendingOperation(key);
      } catch (error) {
        console.error(`Failed to process pending operation ${key}:`, error);
      }
    }
  },

  // Setup listener for online status changes
  setupNetworkListener: () => {
    const handleOnline = () => {
      networkStateService.processPendingOperations();
    };

    window.addEventListener('online', handleOnline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
    };
  }
};
