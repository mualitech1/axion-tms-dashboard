
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/config/query-client';

interface PaymentMethod {
  id: string;
  company_id: string;
  type: 'credit_card' | 'bank_transfer' | 'cash' | 'check' | 'paypal' | 'other';
  name: string;
  is_default: boolean;
  details: Record<string, any>;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

export function usePaymentMethods(companyId?: string) {
  const { toast } = useToast();

  const {
    data: paymentMethods,
    isLoading,
    error
  } = useQuery({
    queryKey: ['payment-methods', companyId],
    queryFn: async () => {
      const query = supabase
        .from('payment_methods')
        .select('*')
        .order('created_at', { ascending: false });

      if (companyId) {
        query.eq('company_id', companyId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
    enabled: !!companyId
  });

  const addPaymentMethod = useMutation({
    mutationFn: async (newMethod: Omit<PaymentMethod, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('payment_methods')
        .insert(newMethod)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast({
        title: "Payment Method Added",
        description: "The payment method has been successfully added.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Adding Payment Method",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const updatePaymentMethod = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<PaymentMethod> & { id: string }) => {
      const { data, error } = await supabase
        .from('payment_methods')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast({
        title: "Payment Method Updated",
        description: "The payment method has been successfully updated.",
      });
    }
  });

  const deletePaymentMethod = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('payment_methods')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payment-methods'] });
      toast({
        title: "Payment Method Deleted",
        description: "The payment method has been successfully deleted.",
      });
    }
  });

  return {
    paymentMethods,
    isLoading,
    error,
    addPaymentMethod,
    updatePaymentMethod,
    deletePaymentMethod
  };
}
