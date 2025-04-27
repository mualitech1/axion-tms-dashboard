
import { useState } from "react";
import { InvoiceData } from "@/components/invoices/create-invoice-dialog/types";
import { useToast } from "@/hooks/use-toast";

export function useInvoiceActions(setInvoicesList: React.Dispatch<React.SetStateAction<InvoiceData[]>>) {
  const [editingInvoice, setEditingInvoice] = useState<InvoiceData | null>(null);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [createJobOpen, setCreateJobOpen] = useState(false);
  const { toast } = useToast();

  const handleInvoiceCreated = (newInvoice: InvoiceData) => {
    setInvoicesList(current => [newInvoice, ...current]);
    setCreateDialogOpen(false);
    
    toast({
      title: "Invoice created",
      description: `Invoice ${newInvoice.id} has been created successfully.`,
    });
  };
  
  const handleInvoiceUpdated = (updatedInvoice: InvoiceData) => {
    setInvoicesList(current => 
      current.map(invoice => 
        invoice.id === updatedInvoice.id ? updatedInvoice : invoice
      )
    );
    
    toast({
      title: "Invoice updated",
      description: `Invoice ${updatedInvoice.id} has been updated successfully.`,
    });
  };
  
  const handleInvoiceDeleted = (id: string) => {
    if (window.confirm("Are you sure you want to delete this invoice?")) {
      setInvoicesList(current => current.filter(invoice => invoice.id !== id));
      
      toast({
        title: "Invoice deleted",
        description: `Invoice ${id} has been deleted successfully.`,
      });
    }
  };
  
  const handleStatusChange = (id: string, newStatus: "pending" | "paid") => {
    setInvoicesList(current => 
      current.map(invoice => {
        if (invoice.id === id) {
          return { ...invoice, status: newStatus };
        }
        return invoice;
      })
    );
    
    toast({
      title: `Invoice marked as ${newStatus}`,
      description: `Invoice ${id} has been updated to ${newStatus}.`,
    });
  };
  
  const handleEditInvoice = (invoice: InvoiceData) => {
    setEditingInvoice(invoice);
    setCreateDialogOpen(true);
  };

  return {
    editingInvoice,
    createDialogOpen,
    createJobOpen,
    setCreateDialogOpen,
    setCreateJobOpen,
    handleInvoiceCreated,
    handleInvoiceUpdated,
    handleInvoiceDeleted,
    handleStatusChange,
    handleEditInvoice,
  };
}
