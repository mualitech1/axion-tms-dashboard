
import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/config/query-client';

interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  job_id: string | null;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'partially_paid';
  issue_date: string;
  due_date: string;
  total_amount: number;
  tax_amount: number;
  notes?: string;
  terms?: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export function useInvoices() {
  const { toast } = useToast();

  const {
    data: invoices,
    isLoading,
    error
  } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customer:companies(name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }
  });

  const createInvoice = useMutation({
    mutationFn: async (newInvoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('invoices')
        .insert(newInvoice)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Invoice Created",
        description: "The invoice has been successfully created.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Creating Invoice",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const updateInvoice = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Invoice> & { id: string }) => {
      const { data, error } = await supabase
        .from('invoices')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Invoice Updated",
        description: "The invoice has been successfully updated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Updating Invoice",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const deleteInvoice = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('invoices')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Invoice Deleted",
        description: "The invoice has been successfully deleted.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error Deleting Invoice",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  return {
    invoices,
    isLoading,
    error,
    createInvoice,
    updateInvoice,
    deleteInvoice
  };
}
