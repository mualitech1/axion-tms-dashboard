
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Job, JobLocation } from '@/types/database';
import { useToast } from '@/hooks/use-toast';
import { apiClient, queryClient } from '@/services/supabase-client';
import { getErrorMessage } from '@/utils/error-handler';
import { z } from 'zod';

// Schema for job validation
const jobLocationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),
});

// Schema for the entire job
const jobSchema = z.object({
  title: z.string().min(2, "Job title is required and must be at least 2 characters"),
  reference: z.string().min(1, "Reference is required"),
  status: z.string().default("booked"),
  priority: z.string().default("medium"),
  pickup_date: z.string().min(1, "Pickup date is required"),
  pickup_location: jobLocationSchema,
  delivery_location: jobLocationSchema,
  customer_id: z.string().nullable().optional(),
  carrier_id: z.string().nullable().optional(),
  vehicle_id: z.string().nullable().optional(),
  driver_id: z.string().nullable().optional(),
  estimated_duration: z.number().nullable().optional(),
  value: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
  issue_details: z.string().nullable().optional(),
  pod_document_id: z.string().nullable().optional(),
  pod_uploaded: z.boolean().nullable().optional().default(false),
});

export function useJobs() {
  const { toast } = useToast();

  // Helper function to convert JobLocation to JSON for Supabase
  const locationToJson = (location: JobLocation | Record<string, any>) => {
    // Since we've added an index signature to JobLocation, it's already compatible with JSON
    return location;
  }

  // Helper function to convert from JSON to JobLocation
  const jsonToLocation = (json: any): JobLocation => {
    if (!json) return { address: '', city: '', postcode: '', country: '' };
    return json as JobLocation;
  }

  // Fetch all jobs with caching and error handling
  const { data: jobs, isLoading, error, refetch } = useQuery({
    queryKey: ['jobs'],
    queryFn: async () => {
      try {
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

        // Transform the data to match our Job type
        const transformedData = data.map(job => ({
          ...job,
          pickup_location: jsonToLocation(job.pickup_location),
          delivery_location: jsonToLocation(job.delivery_location)
        })) as Job[];

        return transformedData;
      } catch (error) {
        console.error("Error fetching jobs:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    staleTime: 1000 * 60 * 5, // Data considered fresh for 5 minutes
    retry: 2
  });

  // Create job with validation
  const createJob = useMutation({
    mutationFn: async (newJobData: Omit<Job, 'id' | 'created_at' | 'updated_at'>) => {
      try {
        // Validate the job data
        const validationResult = jobSchema.safeParse(newJobData);
        if (!validationResult.success) {
          const errors = validationResult.error.format();
          console.error("Validation errors:", errors);
          throw new Error("Invalid job data. Please check all required fields.");
        }

        // Convert location objects to JSON for Supabase
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
      // Invalidate and refetch queries
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

  // Update job with validation
  const updateJob = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Job> & { id: string }) => {
      try {
        // Validate the updates if they contain required fields
        if (updates.title || updates.reference || updates.pickup_date || 
            updates.pickup_location || updates.delivery_location) {
          
          const currentJob = jobs?.find(job => job.id === id);
          if (!currentJob) {
            throw new Error("Job not found");
          }
          
          // Merge current job with updates for validation
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

  // Delete job with error handling
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
    jobs,
    isLoading,
    error,
    refetch,
    createJob,
    updateJob,
    deleteJob
  };
}
