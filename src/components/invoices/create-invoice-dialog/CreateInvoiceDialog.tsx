
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";

// Import our components
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
    form,
    handleItemChange,
    addInvoiceItem,
    removeInvoiceItem,
    calculateTotal,
    handlePaymentTermsChange,
  } = useInvoiceForm();

  const handleSubmit = form.handleSubmit((data) => {
    // Generate a new invoice ID
    const newId = `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`;
    
    const newInvoice = {
      id: newId,
      customer: data.customer,
      date: data.issueDate,
      dueDate: data.dueDate,
      amount: calculateTotal(),
      status: "pending",
      notes: data.notes,
      items: data.items
    };

    onInvoiceCreated(newInvoice);
    
    toast({
      title: "Invoice created",
      description: `Invoice ${newId} has been created successfully.`,
    });

    // Reset form and close dialog
    form.reset();
    setActiveTab("details");
    onOpenChange(false);
  });

  const handleTabChange = async (tab: string) => {
    // When going from details to items tab, validate the details first
    if (tab === "items" && activeTab === "details") {
      const isValid = await form.trigger(["customer", "issueDate", "dueDate", "paymentTerms"]);
      if (isValid) {
        setActiveTab(tab);
      }
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) {
        form.reset();
      }
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-white">
        <InvoiceDialogHeader />
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="px-6">
              <InvoiceTabs activeTab={activeTab} setActiveTab={handleTabChange} />
              
              <TabsContent value="details" className="py-4 space-y-4">
                <InvoiceDetailsForm 
                  form={form}
                  handlePaymentTermsChange={handlePaymentTermsChange}
                />

                <div className="flex justify-end pt-4">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
                    Cancel
                  </Button>
                  <Button type="button" onClick={() => handleTabChange("items")}>
                    Next: Line Items
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="items" className="py-4">
                <InvoiceLineItems 
                  form={form}
                  handleItemChange={handleItemChange}
                  addInvoiceItem={addInvoiceItem}
                  removeInvoiceItem={removeInvoiceItem}
                  calculateTotal={calculateTotal}
                />

                <DialogFooter className="flex justify-between gap-2 pt-6">
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                      Back
                    </Button>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                      Cancel
                    </Button>
                  </div>
                  <Button 
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  >
                    Create Invoice
                  </Button>
                </DialogFooter>
              </TabsContent>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
