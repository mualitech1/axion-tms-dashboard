
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';

export function useSubscription() {
  const { toast } = useToast();
  const { session } = useAuth();

  const {
    data: subscription,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['subscription'],
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      return data;
    },
    enabled: !!session
  });

  const startCheckout = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('create-checkout');
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
      return data;
    },
    onError: (error: Error) => {
      toast({
        title: "Error starting checkout",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const openCustomerPortal = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
      return data;
    },
    onError: (error: Error) => {
      toast({
        title: "Error opening customer portal",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  return {
    subscription,
    isLoading,
    error,
    startCheckout,
    openCustomerPortal,
    refetch
  };
}
