import { useQuery, useMutation } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { queryClient } from '@/config/query-client';

interface Invoice {
  id: string;
  invoice_number: string;
  customer_id: string;
  job_ids: string[] | null;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Void' | 'Partially Paid';
  invoice_date: string;
  due_date: string;
  subtotal_gbp: number;
  vat_amount_gbp: number;
  total_amount_gbp: number;
  pdf_url?: string;
  created_at: string;
  updated_at: string;
  customer?: {
    id: string;
    company_name: string;
  };
  invoice_line_items?: {
    id: string;
    description: string;
    quantity: number;
    unit_price_gbp: number;
    line_total_gbp: number;
  }[];
}

// 🔥 NEW: Line item interface for creation
interface LineItemInput {
  description: string;
  quantity: number;
  rate: number; // This will be converted to unit_price_gbp
}

// 🔥 NEW: Enhanced invoice creation input that includes line items
interface CreateInvoiceInput extends Omit<Invoice, 'id' | 'created_at' | 'updated_at' | 'customer' | 'invoice_line_items'> {
  line_items?: LineItemInput[];
}

export function useInvoices() {
  const { toast } = useToast();

  console.log("🔍 Fetching quantum transactions from Supabase...");

  const { data: invoices, isLoading, error } = useQuery({
    queryKey: ['invoices'],
    queryFn: async () => {
      console.log("⚡ Executing Supabase query for invoices...");
      
      const { data, error } = await supabase
        .from('invoices')
        .select(`
          *,
          customer:customers(id, company_name),
          invoice_line_items(*)
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error("❌ Supabase invoice fetch error:", error);
        throw error;
      }

      console.log("✅ Successfully fetched invoices from Supabase:", data?.length || 0, "invoices");
      return data;
    }
  });

  // 🔥 NEW: Dedicated mutation for creating line items
  const createLineItems = useMutation({
    mutationFn: async ({ invoiceId, items }: { invoiceId: string, items: LineItemInput[] }) => {
      console.log("💎 Creating line items for invoice:", invoiceId);
      
      const lineItemsData = items.map(item => ({
        id: `li_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        invoice_id: invoiceId,
        description: item.description,
        quantity: item.quantity,
        unit_price_gbp: item.rate,
        line_total_gbp: item.quantity * item.rate
      }));

      // Use raw SQL since TypeScript types don't recognize invoice_line_items yet
      const insertQuery = `
        INSERT INTO invoice_line_items (id, invoice_id, description, quantity, unit_price_gbp, line_total_gbp)
        VALUES ${lineItemsData.map(item => 
          `('${item.id}', '${item.invoice_id}', '${item.description.replace(/'/g, "''")}', ${item.quantity}, ${item.unit_price_gbp}, ${item.line_total_gbp})`
        ).join(', ')};
      `;

      const { error } = await supabase.rpc('exec_sql', { query: insertQuery });
      
      if (error) {
        console.error("❌ Line items creation failed:", error);
        throw error;
      }

      console.log("✅ Line items created successfully!");
      return lineItemsData;
    }
  });

  const createInvoice = useMutation({
    mutationFn: async (newInvoice: Omit<Invoice, 'id' | 'created_at' | 'updated_at' | 'customer' | 'invoice_line_items'>) => {
      console.log("🚀 Creating quantum transaction:", newInvoice);
      
      const { data, error } = await supabase
        .from('invoices')
        .insert(newInvoice)
        .select(`
          *,
          customer:customers(id, company_name)
        `)
        .single();

      if (error) {
        console.error("❌ Invoice creation error:", error);
        throw error;
      }

      console.log("✅ Quantum transaction created successfully:", data);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Quantum Transaction Created",
        description: "The energy exchange has been successfully initialized.",
      });
    },
    onError: (error: Error) => {
      console.error("❌ Quantum transaction creation failed:", error);
      toast({
        title: "Transaction Creation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // 🔥 NEW: Combined mutation for creating invoice with line items
  const createCompleteInvoice = useMutation({
    mutationFn: async (invoiceData: CreateInvoiceInput) => {
      console.log("🌌 Creating complete quantum transaction with particles:", invoiceData);

      // First create the invoice
      const { line_items, ...invoiceOnly } = invoiceData;
      const invoice = await createInvoice.mutateAsync(invoiceOnly);

      // Then create line items if they exist
      if (line_items && line_items.length > 0) {
        await createLineItems.mutateAsync({
          invoiceId: invoice.id,
          items: line_items
        });
      }

      // Return complete invoice with line items
      const { data: completeInvoice } = await supabase
        .from('invoices')
        .select(`
          *,
          customer:customers(id, company_name),
          invoice_line_items(*)
        `)
        .eq('id', invoice.id)
        .single();

      console.log("🎯 Complete quantum transaction with particles:", completeInvoice);
      return completeInvoice;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Complete Quantum Transaction Created",
        description: "The energy exchange with all quantum particles has been initialized!",
      });
    },
    onError: (error: Error) => {
      console.error("❌ Complete quantum transaction failed:", error);
      toast({
        title: "Transaction Creation Failed",
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
        .select(`
          *,
          customer:customers(id, company_name),
          invoice_line_items(*)
        `)
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
      toast({
        title: "Quantum Transaction Updated",
        description: "Energy patterns have been successfully recalibrated.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Transaction Update Failed",
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
        title: "Quantum Transaction Deleted",
        description: "Energy signature has been successfully dissolved.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Transaction Deletion Failed",
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
    createCompleteInvoice,
    updateInvoice,
    deleteInvoice
  };
}
