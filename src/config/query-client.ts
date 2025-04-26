
import { QueryClient } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/error-handler';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
      gcTime: 1000 * 60 * 30, // Cache persists for 30 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (
          error instanceof Error &&
          'status' in error &&
          typeof error.status === 'number' &&
          error.status >= 400 &&
          error.status < 500
        ) {
          return false;
        }
        return failureCount < 3;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
      onError: (error) => {
        console.error('Mutation error:', error);
        toast({
          title: 'Operation Failed',
          description: getErrorMessage(error),
          variant: 'destructive',
        });
      }
    }
  }
});

