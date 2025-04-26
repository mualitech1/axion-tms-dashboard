
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Job, JobLocation } from '@/types/database';
import { useToast } from '@/hooks/use-toast';

export function useJobs() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Helper function to convert JobLocation to JSON for Supabase
  const locationToJson = (location: JobLocation | Record<string, any>) => {
    return location as Record<string, any>;
  }

  // Helper function to convert from JSON to JobLocation
  const jsonToLocation = (json: any): JobLocation => {
    if (!json) return { address: '', city: '', postcode: '', country: '' };
    return json as JobLocation;
  }

  // Fetch all jobs
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          customer:companies!customer_id(*),
          carrier:companies!carrier_id(*),
          vehicle:vehicles(*),
          driver:drivers(*)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Job[];
    }
  });

  // Create job
  const createJob = useMutation({
    mutationFn: async (newJob: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => {
      // Convert location objects to JSON for Supabase
      const supabaseJob = {
        ...newJob,
        pickup_location: locationToJson(newJob.pickup_location),
        delivery_location: locationToJson(newJob.delivery_location)
      };

      const { data, error } = await supabase
        .from('jobs')
        .insert(supabaseJob)
        .select()
        .single();

      if (error) throw error;
      return data as Job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Job Created",
        description: "The job has been successfully created.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Creating Job",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Update job
  const updateJob = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Job> & { id: string }) => {
      // Convert location objects to JSON if they exist in the updates
      const supabaseUpdates = { ...updates };
      
      if (updates.pickup_location) {
        supabaseUpdates.pickup_location = locationToJson(updates.pickup_location);
      }
      
      if (updates.delivery_location) {
        supabaseUpdates.delivery_location = locationToJson(updates.delivery_location);
      }

      const { data, error } = await supabase
        .from('jobs')
        .update(supabaseUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data as Job;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Job Updated",
        description: "The job has been successfully updated.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Updating Job",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Delete job
  const deleteJob = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Job Deleted",
        description: "The job has been successfully deleted.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error Deleting Job",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  return {
    jobs,
    isLoading,
    error,
    createJob,
    updateJob,
    deleteJob
  };
}
