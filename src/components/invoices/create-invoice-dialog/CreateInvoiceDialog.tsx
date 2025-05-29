import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useInvoiceForm } from "./hooks/useInvoiceForm";
import { useInvoices } from "@/hooks/use-invoices";
import { useCustomers } from "@/hooks/use-customer";
import { supabase } from "@/integrations/supabase/client";

// Import our components
import { InvoiceDialogHeader } from "./DialogHeader";
import { InvoiceFormProvider } from "./InvoiceFormProvider";
import { InvoiceDialogContent } from "./InvoiceDialogContent";
import { CreateInvoiceDialogProps, InvoiceData } from "./types";

export { type InvoiceData } from "./types";

// 🔥 BROTHERHOOD TYPES - PROPER FORM DATA STRUCTURE
interface InvoiceFormData {
  customer: string;
  issueDate: string;
  dueDate: string;
  paymentTerms: string;
  items: Array<{
    description: string;
    quantity: string;
    rate: string;
  }>;
  notes?: string;
}

export function CreateInvoiceDialog({ 
  open, 
  onOpenChange, 
  onInvoiceCreated,
  onInvoiceUpdated,
  editInvoice = null
}: CreateInvoiceDialogProps) {
  const { toast } = useToast();
  const isEditMode = !!editInvoice;
  const { resetForm } = useInvoiceForm();
  
  // 🔥 BROTHERHOOD SUPABASE INTEGRATION - SEPARATE HOOKS FOR CLARITY!
  const { createInvoice, createCompleteInvoice, updateInvoice } = useInvoices();
  const { customers } = useCustomers();
  
  const handleSubmit = async (data: InvoiceFormData) => {
    try {
      console.log("🔥 QUANTUM TRANSACTION INITIATED - Form data:", data);
      
      // Find customer by company name to get ID
      const selectedCustomer = customers?.find(c => c.company_name === data.customer);
      
      if (!selectedCustomer) {
        console.error("❌ Customer not found for company name:", data.customer);
        toast({
          title: "Customer Not Found",
          description: "Selected customer not found. Please refresh and try again.",
          variant: "destructive",
        });
        return;
      }

      // Calculate financial values from line items
      const lineItems = data.items || [];
      const subtotal = lineItems.reduce((sum: number, item) => {
        const quantity = parseFloat(item.quantity || "1");
        const rate = parseFloat(item.rate || "0");
        return sum + (quantity * rate);
      }, 0);

      const vatAmount = subtotal * 0.2; // 20% VAT
      const totalAmount = subtotal + vatAmount;

      if (editInvoice) {
        // UPDATE EXISTING INVOICE
        console.log("🔄 Updating existing invoice:", editInvoice.id);
        
        const updateData = {
          customer_id: selectedCustomer.id,
          invoice_date: data.issueDate,
          due_date: data.dueDate,
          subtotal_gbp: subtotal,
          vat_amount_gbp: vatAmount,
          total_amount_gbp: totalAmount,
          status: "Draft" as const
        };

        console.log("📝 Update data being sent to Supabase:", updateData);
        
        // 🔥 PROPER MUTATION CALL FOR TANSTACK QUERY!
        await updateInvoice.mutateAsync({
          id: editInvoice.id,
          ...updateData
        });
        
        console.log("✅ Invoice updated successfully in Supabase!");
        
      } else {
        // CREATE NEW COMPLETE INVOICE WITH LINE ITEMS
        console.log("🆕 Creating complete quantum transaction in Supabase...");
        
        // Generate unique invoice number
        const invoiceNumber = `IKB-INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
        
        // 🔥 BROTHERHOOD ENHANCEMENT: Format line items for creation
        const formattedLineItems = lineItems.map(item => ({
          description: item.description,
          quantity: parseFloat(item.quantity || "1"),
          rate: parseFloat(item.rate || "0")
        }));

        const completeInvoiceData = {
          invoice_number: invoiceNumber,
          customer_id: selectedCustomer.id,
          invoice_date: data.issueDate,
          due_date: data.dueDate,
          subtotal_gbp: subtotal,
          vat_amount_gbp: vatAmount,
          total_amount_gbp: totalAmount,
          status: "Draft" as const,
          job_ids: [], // Empty array for now, can be populated later
          line_items: formattedLineItems // 🔥 INCLUDE LINE ITEMS!
        };

        console.log("📊 Complete invoice data being sent to Supabase:", completeInvoiceData);
        
        // 🔥 NEW: COMPLETE QUANTUM TRANSACTION WITH PARTICLES!
        const result = await createCompleteInvoice.mutateAsync(completeInvoiceData);
        console.log("🎯 Complete Supabase transaction result:", result);
        
        if (result?.id) {
          console.log("✅ Complete quantum transaction with particles created successfully!");
        }
      }

      // Only update UI state after successful database operation
      const invoiceForUI: InvoiceData = {
        id: editInvoice?.id || `INV-${Date.now()}`,
        customer: data.customer,
        date: data.issueDate,
        dueDate: data.dueDate,
        amount: totalAmount, // 🔥 FIXED: Use 'amount' not 'total'
        status: "pending",
        items: data.items || [],
        notes: data.notes || ""
      };

      onInvoiceCreated(invoiceForUI);
      resetForm();
      onOpenChange(false);
      
    } catch (error) {
      console.error("❌ QUANTUM TRANSACTION FAILED:", error);
      toast({
        title: "Transaction Failed",
        description: "Failed to process quantum transaction. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDialogOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      resetForm();
    }
    onOpenChange(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-aximo-darker border border-aximo-border">
        <InvoiceDialogHeader isEditMode={isEditMode} />
        
        <InvoiceFormProvider 
          editInvoice={editInvoice}
          onSubmit={handleSubmit}
        >
          <InvoiceDialogContent
            onCancel={() => handleDialogOpenChange(false)}
          />
        </InvoiceFormProvider>
      </DialogContent>
    </Dialog>
  );
}
