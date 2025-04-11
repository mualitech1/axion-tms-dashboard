
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Define the validation schema using zod
const invoiceItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.string().min(1, "Quantity is required").refine(val => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Quantity must be a positive number"
  }),
  rate: z.string().min(1, "Rate is required").refine(val => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Rate must be a non-negative number"
  }),
  amount: z.string()
});

const invoiceSchema = z.object({
  customer: z.string().min(1, "Customer is required"),
  issueDate: z.string().min(1, "Issue date is required"),
  dueDate: z.string().min(1, "Due date is required"),
  paymentTerms: z.string().min(1, "Payment terms are required"),
  notes: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, "At least one item is required")
});

export type InvoiceFormValues = z.infer<typeof invoiceSchema>;
export type InvoiceItem = z.infer<typeof invoiceItemSchema>;

export function useInvoiceForm() {
  // Helper functions for dates
  function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  function getDefaultDueDate() {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 15); // Default to 15 days from now
    return dueDate.toISOString().split('T')[0];
  }

  // Set up react-hook-form with zod validation
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customer: "",
      issueDate: getTodayDate(),
      dueDate: getDefaultDueDate(),
      paymentTerms: "net15",
      notes: "",
      items: [{ description: "", quantity: "1", rate: "", amount: "0" }]
    }
  });

  const addInvoiceItem = () => {
    const items = form.getValues("items");
    form.setValue("items", [
      ...items, 
      { description: "", quantity: "1", rate: "", amount: "0" }
    ]);
  };

  const removeInvoiceItem = (index: number) => {
    const items = form.getValues("items");
    if (items.length > 1) {
      const updatedItems = [...items];
      updatedItems.splice(index, 1);
      form.setValue("items", updatedItems);
    }
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const items = [...form.getValues("items")];
    
    items[index] = { 
      ...items[index], 
      [field]: value 
    };
    
    // Calculate amount if we have both quantity and rate
    if ((field === 'quantity' || field === 'rate') && 
        items[index].quantity && 
        items[index].rate) {
      const quantity = parseFloat(items[index].quantity);
      const rate = parseFloat(items[index].rate);
      items[index].amount = (quantity * rate).toFixed(2);
    }
    
    form.setValue("items", items);
  };

  const calculateTotal = () => {
    const items = form.getValues("items");
    return items.reduce((sum, item) => {
      return sum + parseFloat(item.amount || "0");
    }, 0);
  };

  const handlePaymentTermsChange = (value: string) => {
    form.setValue("paymentTerms", value);
    
    let newDueDate = new Date(form.getValues("issueDate"));
    
    switch(value) {
      case "net15":
        newDueDate.setDate(newDueDate.getDate() + 15);
        break;
      case "net30":
        newDueDate.setDate(newDueDate.getDate() + 30);
        break;
      case "net60":
        newDueDate.setDate(newDueDate.getDate() + 60);
        break;
    }
    
    form.setValue("dueDate", newDueDate.toISOString().split('T')[0]);
  };

  const resetForm = () => {
    form.reset({
      customer: "",
      issueDate: getTodayDate(),
      dueDate: getDefaultDueDate(),
      paymentTerms: "net15",
      notes: "",
      items: [{ description: "", quantity: "1", rate: "", amount: "0" }]
    });
  };

  const setFormValues = (values: Partial<InvoiceFormValues>) => {
    form.reset(values);
  };

  return {
    form,
    handleItemChange,
    addInvoiceItem,
    removeInvoiceItem,
    calculateTotal,
    handlePaymentTermsChange,
    resetForm,
    setFormValues
  };
}
