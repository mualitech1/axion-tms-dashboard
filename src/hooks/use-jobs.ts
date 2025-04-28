
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Job } from '@/types/database';
import { getErrorMessage } from '@/utils/error-handler';
import { jsonToLocation } from '@/utils/location-utils';
import { useJobMutations } from './mutations/use-job-mutations';

export function useJobs() {
  const mutations = useJobMutations();

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

  return {
    jobs,
    isLoading,
    error,
    refetch,
    ...mutations
  };
}
