
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Import our new components
import { InvoiceDialogHeader } from "./DialogHeader";
import { InvoiceTabs } from "./InvoiceTabs";
import { InvoiceDetailsForm } from "./InvoiceDetailsForm";
import { InvoiceLineItems } from "./InvoiceLineItems";
import { useInvoiceForm } from "./hooks/useInvoiceForm";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvoiceCreated: (invoice: any) => void;
}

export function CreateInvoiceDialog({ 
  open, 
  onOpenChange, 
  onInvoiceCreated 
}: CreateInvoiceDialogProps) {
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();
  const {
    invoiceDetails,
    handleCustomerChange,
    handleInputChange,
    handleItemChange,
    addInvoiceItem,
    removeInvoiceItem,
    calculateTotal,
    handlePaymentTermsChange,
    resetForm
  } = useInvoiceForm();

  const handleSubmit = () => {
    // Basic validation
    if (!invoiceDetails.customer || calculateTotal() <= 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Generate a new invoice ID
    const newId = `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`;
    
    const newInvoice = {
      id: newId,
      customer: invoiceDetails.customer,
      date: invoiceDetails.issueDate,
      dueDate: invoiceDetails.dueDate,
      amount: calculateTotal(),
      status: "pending",
      notes: invoiceDetails.notes,
      items: invoiceDetails.items
    };

    onInvoiceCreated(newInvoice);
    
    toast({
      title: "Invoice created",
      description: `Invoice ${newId} has been created successfully.`,
    });

    // Reset form and close dialog
    resetForm();
    setActiveTab("details");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-white">
        <InvoiceDialogHeader />
        
        <div className="px-6">
          <InvoiceTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          
          <TabsContent value="details" className="py-4 space-y-4">
            <InvoiceDetailsForm 
              invoiceDetails={invoiceDetails}
              handleCustomerChange={handleCustomerChange}
              handleInputChange={handleInputChange}
              handlePaymentTermsChange={handlePaymentTermsChange}
            />

            <div className="flex justify-end pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
                Cancel
              </Button>
              <Button type="button" onClick={() => setActiveTab("items")}>
                Next: Line Items
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="items" className="py-4">
            <InvoiceLineItems 
              items={invoiceDetails.items}
              handleItemChange={handleItemChange}
              addInvoiceItem={addInvoiceItem}
              removeInvoiceItem={removeInvoiceItem}
              calculateTotal={calculateTotal}
            />

            <DialogFooter className="flex justify-between gap-2 pt-6">
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setActiveTab("details")}>
                  Back
                </Button>
                <Button variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
              </div>
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Create Invoice
              </Button>
            </DialogFooter>
          </TabsContent>
        </div>
      </DialogContent>
    </Dialog>
  );
}
