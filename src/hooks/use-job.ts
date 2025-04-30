
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Job, JobLocation } from '@/types/job';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/error-handler';
import { adaptDatabaseJobsToJobTypes, adaptJobTypeToDatabase, adaptDatabaseJobToJobType } from '@/pages/jobs/adapters/jobAdapter';
import { Json } from '@/integrations/supabase/types';

// Helper function to ensure we're working with JSON objects
const ensureJobLocationObject = (location: any): JobLocation => {
  if (!location) return { address: '', city: '', postcode: '', country: '' };
  
  if (typeof location === 'string') {
    try {
      return JSON.parse(location);
    } catch (e) {
      console.error('Error parsing location object:', e);
      return { address: '', city: '', postcode: '', country: '' };
    }
  }
  
  return location as JobLocation;
};

// Hook for fetching all jobs with filters
export function useJobs(filters?: Record<string, any>) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const {
    data: jobs,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['jobs', filters],
    queryFn: async () => {
      try {
        let query = supabase
          .from('jobs')
          .select(`
            *,
            customer:companies!customer_id(*),
            carrier:companies!carrier_id(*),
            vehicle:vehicles(*),
            driver:drivers(*)
          `);
        
        // Apply filters if any
        if (filters) {
          if (filters.status) {
            query = query.eq('status', filters.status);
          }
          if (filters.priority) {
            query = query.eq('priority', filters.priority);
          }
          // Add more filters as needed
        }
        
        const { data, error } = await query.order('created_at', { ascending: false });
        if (error) throw error;
        
        // Transform the data to match our Job type using the adapter function
        return adaptDatabaseJobsToJobTypes(data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: `Failed to load jobs: ${error.message}`,
          variant: 'destructive',
        });
      }
    }
  });

  // Job mutation for creating a new job
  const createJob = useMutation({
    mutationFn: async (jobData: Omit<Job, 'id' | 'createdAt'>) => {
      try {
        // Transform the job data for the database using our adapter
        const supabaseJob = adaptJobTypeToDatabase(jobData);
        
        // Ensure required fields for database insertion
        if (!supabaseJob.pickup_date) {
          supabaseJob.pickup_date = new Date().toISOString();
        }
        
        // Make sure pickup_location and delivery_location are defined
        if (!supabaseJob.pickup_location) {
          supabaseJob.pickup_location = { address: '', city: '', postcode: '', country: '' };
        }
        
        if (!supabaseJob.delivery_location) {
          supabaseJob.delivery_location = { address: '', city: '', postcode: '', country: '' };
        }

        const { data, error } = await supabase
          .from('jobs')
          .insert(supabaseJob)
          .select()
          .single();

        if (error) throw error;
        return data;
      } catch (error) {
        console.error("Error creating job:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Success',
        description: 'Job created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to create job: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Job mutation for updating a job
  const updateJob = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Job> & { id: string | number }) => {
      try {
        // Convert id to string for Supabase
        const jobId = id.toString();
        
        // Transform updates for database
        const supabaseUpdates = adaptJobTypeToDatabase(updates);
        
        // Ensure delivery_location and pickup_location are defined if needed
        if (!supabaseUpdates.delivery_location && !supabaseUpdates.pickup_location) {
          // If we're not updating locations, we don't need to include them
          // This avoids the TypeScript error about required fields
          
          const { data, error } = await supabase
            .from('jobs')
            .update(supabaseUpdates)
            .eq('id', jobId)
            .select()
            .single();

          if (error) throw error;
          return data;
        } else {
          // If updating locations, we need to ensure they're properly formatted
          // For this, we need to first fetch the current job
          const { data: currentJob, error: fetchError } = await supabase
            .from('jobs')
            .select('pickup_location, delivery_location')
            .eq('id', jobId)
            .single();
            
          if (fetchError) throw fetchError;
          
          // Ensure locations are properly defined
          const updatedJob = {
            ...supabaseUpdates,
            pickup_location: supabaseUpdates.pickup_location || currentJob.pickup_location,
            delivery_location: supabaseUpdates.delivery_location || currentJob.delivery_location,
          };
          
          const { data, error } = await supabase
            .from('jobs')
            .update(updatedJob)
            .eq('id', jobId)
            .select()
            .single();

          if (error) throw error;
          return data;
        }
      } catch (error) {
        console.error("Error updating job:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Success',
        description: 'Job updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to update job: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Job mutation for deleting a job
  const deleteJob = useMutation({
    mutationFn: async (id: string | number) => {
      try {
        // Convert id to string for Supabase
        const jobId = id.toString();
        
        const { error } = await supabase
          .from('jobs')
          .delete()
          .eq('id', jobId);

        if (error) throw error;
      } catch (error) {
        console.error("Error deleting job:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: 'Success',
        description: 'Job deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to delete job: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  return {
    jobs,
    isLoading,
    error,
    refetch,
    createJob,
    updateJob,
    deleteJob
  };
}

// Hook for fetching a specific job by ID
export function useJob(id?: string | number) {
  const { toast } = useToast();
  const enabled = id !== undefined;
  
  const {
    data: job,
    isLoading,
    error
  } = useQuery({
    queryKey: ['job', id],
    queryFn: async () => {
      if (!id) return null;
      
      try {
        // Convert id to string for Supabase
        const jobId = id.toString();
        
        const { data, error } = await supabase
          .from('jobs')
          .select(`
            *,
            customer:companies!customer_id(*),
            carrier:companies!carrier_id(*),
            vehicle:vehicles(*),
            driver:drivers(*)
          `)
          .eq('id', jobId)
          .single();

        if (error) throw error;
        
        // Transform to our Job type using the adapter
        return data ? adaptDatabaseJobToJobType(data) : null;
      } catch (error) {
        console.error(`Error fetching job with ID ${id}:`, error);
        throw new Error(getErrorMessage(error));
      }
    },
    enabled,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: `Failed to load job details: ${error.message}`,
          variant: 'destructive',
        });
      }
    }
  });

  return {
    job,
    isLoading,
    error
  };
}
