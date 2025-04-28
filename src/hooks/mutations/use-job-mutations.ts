
import { useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/services/supabase-client';
import { getErrorMessage } from '@/utils/error-handler';
import { jobSchema } from '@/types/job-schemas';
import { locationToJson } from '@/utils/location-utils';

export function useJobMutations() {
  const { toast } = useToast();

  const createJob = useMutation({
    mutationFn: async (newJobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        const validationResult = jobSchema.safeParse(newJobData);
        if (!validationResult.success) {
          const errors = validationResult.error.format();
          console.error("Validation errors:", errors);
          throw new Error("Invalid job data. Please check all required fields.");
        }

        const supabaseJob = {
          ...newJobData,
          pickup_location: locationToJson(newJobData.pickup_location),
          delivery_location: locationToJson(newJobData.delivery_location)
        };

        const { data, error } = await supabase
          .from('jobs')
          .insert(supabaseJob)
          .select()
          .single();

        if (error) throw error;
        return data as Job;
      } catch (error) {
        console.error("Error creating job:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Job Created",
        description: "The job has been successfully created.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Creating Job",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const updateJob = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Job> & { id: string }) => {
      try {
        if (updates.title || updates.reference || updates.pickup_date || 
            updates.pickup_location || updates.delivery_location) {
          
          // Fix: Type the query data properly
          const jobs = queryClient.getQueryData<Job[]>(['jobs']);
          const currentJob = jobs?.find((job) => job.id === id);
          
          if (!currentJob) {
            throw new Error("Job not found");
          }
          
          const jobToValidate = {
            ...currentJob,
            ...updates,
          };
          
          const validationResult = jobSchema.safeParse(jobToValidate);
          if (!validationResult.success) {
            const errors = validationResult.error.format();
            console.error("Validation errors:", errors);
            throw new Error("Invalid job data. Please check all required fields.");
          }
        }

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
      } catch (error) {
        console.error("Error updating job:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Job Updated",
        description: "The job has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Updating Job",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const deleteJob = useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from('jobs')
          .delete()
          .eq('id', id);

        if (error) throw error;
      } catch (error) {
        console.error("Error deleting job:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      toast({
        title: "Job Deleted",
        description: "The job has been successfully deleted.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Deleting Job",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  return {
    createJob,
    updateJob,
    deleteJob
  };
}
