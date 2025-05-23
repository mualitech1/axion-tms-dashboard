import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { getErrorMessage } from '@/utils/error-handler';

// Define the Invoice type
interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  customerName?: string;
  issueDate: string;
  dueDate: string;
  totalAmount: number;
  taxAmount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'partially_paid';
  jobId?: string;
  notes?: string;
  terms?: string;
  createdAt: string;
  updatedAt: string;
}

interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
  taxRate?: number;
}

// Hook for fetching all invoices with filters
export function useInvoices(filters?: Record<string, any>) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const {
    data: invoices,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['invoices', filters],
    queryFn: async () => {
      try {
        let query = supabase
          .from('invoices')
          .select(`
            *,
            customer:companies!customer_id(id, name)
          `);
        
        // Apply filters if any
        if (filters) {
          if (filters.status) {
            query = query.eq('status', filters.status);
          }
          if (filters.customerId) {
            query = query.eq('customer_id', filters.customerId);
          }
          if (filters.fromDate && filters.toDate) {
            query = query
              .gte('issue_date', filters.fromDate)
              .lte('issue_date', filters.toDate);
          }
        }
        
        const { data, error } = await query.order('issue_date', { ascending: false });
        if (error) throw error;
        
        // Transform database records to Invoice type
        const transformedInvoices: Invoice[] = data.map((invoice: any) => ({
          id: invoice.id,
          invoiceNumber: invoice.invoice_number,
          customerId: invoice.customer_id,
          customerName: invoice.customer?.name || 'Unknown Customer',
          issueDate: invoice.issue_date,
          dueDate: invoice.due_date,
          totalAmount: invoice.total_amount,
          taxAmount: invoice.tax_amount,
          status: invoice.status,
          jobId: invoice.job_id,
          notes: invoice.notes,
          terms: invoice.terms,
          createdAt: invoice.created_at,
          updatedAt: invoice.updated_at,
        }));
        
        return transformedInvoices;
      } catch (error) {
        console.error("Error fetching invoices:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: `Failed to load invoices: ${error.message}`,
          variant: 'destructive',
        });
      }
    }
  });

  // Create invoice mutation
  const createInvoice = useMutation({
    mutationFn: async (data: { 
      invoiceData: Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>,
      items: Omit<InvoiceItem, 'id' | 'invoiceId'>[]
    }) => {
      const { invoiceData, items } = data;
      
      try {
        // First create the invoice
        const supabaseInvoice = {
          invoice_number: invoiceData.invoiceNumber,
          customer_id: invoiceData.customerId,
          issue_date: invoiceData.issueDate,
          due_date: invoiceData.dueDate,
          total_amount: invoiceData.totalAmount,
          tax_amount: invoiceData.taxAmount,
          status: invoiceData.status,
          job_id: invoiceData.jobId,
          notes: invoiceData.notes,
          terms: invoiceData.terms,
        };
        
        const { data: newInvoice, error: invoiceError } = await supabase
          .from('invoices')
          .insert(supabaseInvoice)
          .select()
          .single();
          
        if (invoiceError) throw invoiceError;
        
        if (items.length > 0) {
          // Now create the invoice items
          const invoiceItems = items.map(item => ({
            invoice_id: newInvoice.id,
            description: item.description,
            quantity: item.quantity,
            unit_price: item.unitPrice,
            amount: item.amount,
            tax_rate: item.taxRate,
          }));
          
          const { error: itemsError } = await supabase
            .from('invoice_items')
            .insert(invoiceItems);
            
          if (itemsError) throw itemsError;
        }
        
        return newInvoice;
      } catch (error) {
        console.error("Error creating invoice:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: 'Success',
        description: 'Invoice created successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to create invoice: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Update invoice mutation
  const updateInvoice = useMutation({
    mutationFn: async (data: { 
      id: string, 
      invoiceData: Partial<Omit<Invoice, 'id' | 'createdAt' | 'updatedAt'>>,
      items?: Omit<InvoiceItem, 'id' | 'invoiceId'>[]
    }) => {
      const { id, invoiceData, items } = data;
      
      try {
        // Transform to database format
        const supabaseUpdates: Record<string, any> = {};
        
        if (invoiceData.invoiceNumber) supabaseUpdates.invoice_number = invoiceData.invoiceNumber;
        if (invoiceData.customerId) supabaseUpdates.customer_id = invoiceData.customerId;
        if (invoiceData.issueDate) supabaseUpdates.issue_date = invoiceData.issueDate;
        if (invoiceData.dueDate) supabaseUpdates.due_date = invoiceData.dueDate;
        if (invoiceData.totalAmount !== undefined) supabaseUpdates.total_amount = invoiceData.totalAmount;
        if (invoiceData.taxAmount !== undefined) supabaseUpdates.tax_amount = invoiceData.taxAmount;
        if (invoiceData.status) supabaseUpdates.status = invoiceData.status;
        if (invoiceData.jobId !== undefined) supabaseUpdates.job_id = invoiceData.jobId;
        if (invoiceData.notes !== undefined) supabaseUpdates.notes = invoiceData.notes;
        if (invoiceData.terms !== undefined) supabaseUpdates.terms = invoiceData.terms;
        
        // Update the invoice
        const { error: invoiceError } = await supabase
          .from('invoices')
          .update(supabaseUpdates)
          .eq('id', id);
          
        if (invoiceError) throw invoiceError;
        
        // If items provided, delete existing and add new ones
        if (items) {
          // First delete existing items
          const { error: deleteError } = await supabase
            .from('invoice_items')
            .delete()
            .eq('invoice_id', id);
            
          if (deleteError) throw deleteError;
          
          if (items.length > 0) {
            // Add new items
            const invoiceItems = items.map(item => ({
              invoice_id: id,
              description: item.description,
              quantity: item.quantity,
              unit_price: item.unitPrice,
              amount: item.amount,
              tax_rate: item.taxRate,
            }));
            
            const { error: itemsError } = await supabase
              .from('invoice_items')
              .insert(invoiceItems);
              
            if (itemsError) throw itemsError;
          }
        }
        
        return { success: true, id };
      } catch (error) {
        console.error("Error updating invoice:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: 'Success',
        description: 'Invoice updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to update invoice: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Delete invoice mutation
  const deleteInvoice = useMutation({
    mutationFn: async (id: string) => {
      try {
        // First delete invoice items
        const { error: itemsError } = await supabase
          .from('invoice_items')
          .delete()
          .eq('invoice_id', id);
          
        if (itemsError) throw itemsError;
        
        // Then delete the invoice
        const { error: invoiceError } = await supabase
          .from('invoices')
          .delete()
          .eq('id', id);
          
        if (invoiceError) throw invoiceError;
        
        return { success: true };
      } catch (error) {
        console.error("Error deleting invoice:", error);
        throw new Error(getErrorMessage(error));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: 'Success',
        description: 'Invoice deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to delete invoice: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  return {
    invoices,
    isLoading,
    error,
    refetch,
    createInvoice,
    updateInvoice,
    deleteInvoice
  };
}

// Hook for fetching a specific invoice by ID
export function useInvoice(id?: string) {
  const { toast } = useToast();
  const enabled = id !== undefined;
  
  const {
    data: invoice,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['invoice', id],
    queryFn: async () => {
      if (!id) return null;
      
      try {
        // Get the invoice
        const { data: invoiceData, error: invoiceError } = await supabase
          .from('invoices')
          .select(`
            *,
            customer:companies!customer_id(id, name, email, phone, contact_name)
          `)
          .eq('id', id)
          .single();
          
        if (invoiceError) throw invoiceError;
        
        // Get the invoice items
        const { data: itemsData, error: itemsError } = await supabase
          .from('invoice_items')
          .select('*')
          .eq('invoice_id', id);
          
        if (itemsError) throw itemsError;
        
        // Transform to Invoice type
        const invoice: Invoice = {
          id: invoiceData.id,
          invoiceNumber: invoiceData.invoice_number,
          customerId: invoiceData.customer_id,
          customerName: invoiceData.customer?.name || 'Unknown Customer',
          issueDate: invoiceData.issue_date,
          dueDate: invoiceData.due_date,
          totalAmount: invoiceData.total_amount,
          taxAmount: invoiceData.tax_amount,
          status: invoiceData.status,
          jobId: invoiceData.job_id,
          notes: invoiceData.notes,
          terms: invoiceData.terms,
          createdAt: invoiceData.created_at,
          updatedAt: invoiceData.updated_at,
        };
        
        // Transform invoice items
        const items: InvoiceItem[] = itemsData.map((item: any) => ({
          id: item.id,
          invoiceId: item.invoice_id,
          description: item.description,
          quantity: item.quantity,
          unitPrice: item.unit_price,
          amount: item.amount,
          taxRate: item.tax_rate,
        }));
        
        return {
          invoice,
          items,
          customer: invoiceData.customer || null
        };
      } catch (error) {
        console.error(`Error fetching invoice with ID ${id}:`, error);
        throw new Error(getErrorMessage(error));
      }
    },
    enabled,
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error',
          description: `Failed to load invoice details: ${error.message}`,
          variant: 'destructive',
        });
      }
    }
  });

  return {
    data: invoice,
    isLoading,
    error,
    refetch,
  };
} 