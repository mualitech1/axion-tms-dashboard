import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useInvoiceForm } from "./hooks/useInvoiceForm";

// Import our components
import { InvoiceDialogHeader } from "./DialogHeader";
import { InvoiceFormProvider } from "./InvoiceFormProvider";
import { InvoiceDialogContent } from "./InvoiceDialogContent";
import { CreateInvoiceDialogProps, InvoiceData } from "./types";

export { type InvoiceData } from "./types";

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
  
  const handleSubmit = (data: any) => {
    if (isEditMode && editInvoice) {
      // Update existing invoice
      const updatedInvoice: InvoiceData = {
        ...editInvoice,
        customer: data.customer,
        date: data.issueDate,
        dueDate: data.dueDate,
        amount: calculateTotal(data.items),
        notes: data.notes,
        items: data.items
      };

      onInvoiceUpdated?.(updatedInvoice);
      
      toast({
        title: "Quantum Transaction Updated",
        description: `Transaction ${editInvoice.id} parameters successfully recalibrated.`,
      });
    } else {
      // Create new invoice
      const newId = `QTX-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`;
      
      const newInvoice: InvoiceData = {
        id: newId,
        customer: data.customer,
        date: data.issueDate,
        dueDate: data.dueDate,
        amount: calculateTotal(data.items),
        status: "pending",
        notes: data.notes,
        items: data.items
      };

      onInvoiceCreated(newInvoice);
      
      toast({
        title: "Quantum Transaction Created",
        description: `Transaction ${newId} has been successfully initialized.`,
      });
    }

    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
  };
  
  // Helper function to calculate total from items
  const calculateTotal = (items: any[]) => {
    return items.reduce((sum, item) => {
      return sum + parseFloat(item.amount || "0");
    }, 0);
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
