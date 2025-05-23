import { useQuery } from '@tanstack/react-query';
import { Job } from '@/pages/jobs/types/jobTypes';  // Update import path to match the project structure
import { jsonToLocation } from '@/utils/location-utils';
import { useJobMutations } from './mutations/use-job-mutations';
import { jobService } from '@/services/job-service';

// Define a specific type for job filters
interface JobFilters {
  status?: string;
  priority?: string;
  search?: string;
  dateRange?: { from: Date; to: Date };
  [key: string]: unknown;
}

export function useJobs(filters?: JobFilters) {
  const mutations = useJobMutations();

  const { data: jobs, isLoading, error, refetch } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      try {
        // Use the job service instead of direct Supabase calls
        // This will handle the separate fetching of jobs, customers, and carriers
        const jobData = await jobService.getJobs();
        
        // Apply client-side filtering if filters are provided
        let filteredJobs = jobData;
        
        if (filters) {
          filteredJobs = jobData.filter(job => {
            let includeJob = true;
            
            // Filter by status if provided
            if (filters.status && job.status !== filters.status) {
              includeJob = false;
            }
            
            // Filter by priority if provided
            if (filters.priority && job.priority !== filters.priority) {
              includeJob = false;
            }
            
            // Filter by search term (check multiple fields)
            if (filters.search && filters.search.trim() !== '') {
              const searchTerm = filters.search.toLowerCase().trim();
              const searchFields = [
                job.reference,
                job.title,
                job.customer?.name,
                job.carrier?.name
              ].filter(Boolean);
              
              // Include job only if any field contains the search term
              const matchesSearch = searchFields.some(
                field => field && field.toLowerCase().includes(searchTerm)
              );
              
              if (!matchesSearch) {
                includeJob = false;
              }
            }
            
            // Filter by date range if provided
            if (filters.dateRange && job.pickup_date) {
              const jobDate = new Date(job.pickup_date);
              if (
                (filters.dateRange.from && jobDate < filters.dateRange.from) ||
                (filters.dateRange.to && jobDate > filters.dateRange.to)
              ) {
                includeJob = false;
              }
            }
            
            return includeJob;
          });
        }

        // Transform locations if they're stored as JSON strings
        const transformedData = filteredJobs.map(job => {
          try {
            return {
              ...job,
              pickup_location: typeof job.pickup_location === 'string' 
                ? jsonToLocation(job.pickup_location) 
                : job.pickup_location,
              delivery_location: typeof job.delivery_location === 'string' 
                ? jsonToLocation(job.delivery_location) 
                : job.delivery_location
            };
          } catch (err) {
            console.warn("Error transforming job locations:", err);
            return job;
          }
        });

        return transformedData;
      } catch (error) {
        console.error("Error in useJobs hook:", error);
        // Return empty array instead of throwing to avoid UI crashes
        return [];
      }
    },
    staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
    retry: 2
  });

  return {
    jobs: jobs || [],
    isLoading,
    error,
    refetch,
    ...mutations
  };
}
