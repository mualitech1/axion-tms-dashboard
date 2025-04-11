
import React, { ReactNode, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { useInvoiceForm } from "./hooks/useInvoiceForm";
import { InvoiceData } from "./types";
import { getPaymentTermsFromDates } from "./utils/invoiceUtils";
import { InvoiceContextProvider } from "./InvoiceContext";

interface InvoiceFormProviderProps {
  children: ReactNode;
  editInvoice?: InvoiceData | null;
  onSubmit: (data: any) => void;
}

export function InvoiceFormProvider({ 
  children, 
  editInvoice = null, 
  onSubmit 
}: InvoiceFormProviderProps) {
  const isEditMode = !!editInvoice;
  
  const {
    form,
    handleItemChange,
    addInvoiceItem,
    removeInvoiceItem,
    calculateTotal,
    handlePaymentTermsChange,
    resetForm,
    setFormValues
  } = useInvoiceForm();

  // Set form values when editing an invoice
  useEffect(() => {
    if (isEditMode && editInvoice) {
      // Ensure all items have the required properties
      const formattedItems = editInvoice.items.map(item => ({
        description: item.description || "",
        quantity: item.quantity || "1",
        rate: item.rate || "",
        amount: item.amount || "0"
      }));
      
      setFormValues({
        customer: editInvoice.customer,
        issueDate: editInvoice.date,
        dueDate: editInvoice.dueDate,
        notes: editInvoice.notes || "",
        paymentTerms: getPaymentTermsFromDates(editInvoice.date, editInvoice.dueDate),
        items: formattedItems
      });
    }
  }, [isEditMode, editInvoice, setFormValues]);

  const contextValue = {
    form,
    handleItemChange,
    addInvoiceItem,
    removeInvoiceItem,
    calculateTotal,
    handlePaymentTermsChange,
    resetForm,
    isEditMode
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <InvoiceContextProvider value={contextValue}>
          {children}
        </InvoiceContextProvider>
      </form>
    </Form>
  );
}

export type InvoiceFormContextValues = ReturnType<typeof useInvoiceForm> & { isEditMode: boolean };
