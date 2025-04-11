
import { useState } from "react";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Form } from "@/components/ui/form";

// Import our components
import { InvoiceDialogHeader } from "./DialogHeader";
import { InvoiceTabs } from "./InvoiceTabs";
import { InvoiceDetailsForm } from "./InvoiceDetailsForm";
import { InvoiceLineItems } from "./InvoiceLineItems";
import { useInvoiceForm } from "./hooks/useInvoiceForm";

export interface InvoiceData {
  id: string;
  customer: string;
  date: string;
  dueDate: string;
  amount: number;
  status: "pending" | "paid";
  notes?: string;
  items: {
    description: string;
    quantity: string;
    rate: string;
    amount: string;
  }[];
}

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvoiceCreated: (invoice: InvoiceData) => void;
  onInvoiceUpdated?: (invoice: InvoiceData) => void;
  editInvoice?: InvoiceData | null;
}

export function CreateInvoiceDialog({ 
  open, 
  onOpenChange, 
  onInvoiceCreated,
  onInvoiceUpdated,
  editInvoice = null
}: CreateInvoiceDialogProps) {
  const [activeTab, setActiveTab] = useState("details");
  const { toast } = useToast();
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
  
  // Set form values when editing an invoice or when the component mounts with an editInvoice
  useState(() => {
    if (isEditMode && editInvoice) {
      setFormValues({
        customer: editInvoice.customer,
        issueDate: editInvoice.date,
        dueDate: editInvoice.dueDate,
        notes: editInvoice.notes || "",
        paymentTerms: getPaymentTermsFromDates(editInvoice.date, editInvoice.dueDate),
        items: editInvoice.items
      });
    }
  });

  // Helper function to determine payment terms from dates
  function getPaymentTermsFromDates(issueDate: string, dueDate: string): string {
    const issue = new Date(issueDate);
    const due = new Date(dueDate);
    const diffDays = Math.round((due.getTime() - issue.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 15) return "net15";
    if (diffDays <= 30) return "net30";
    return "net60";
  }

  const handleSubmit = form.handleSubmit((data) => {
    if (isEditMode && editInvoice) {
      // Update existing invoice
      const updatedInvoice: InvoiceData = {
        ...editInvoice,
        customer: data.customer,
        date: data.issueDate,
        dueDate: data.dueDate,
        amount: calculateTotal(),
        notes: data.notes,
        items: data.items
      };

      onInvoiceUpdated?.(updatedInvoice);
      
      toast({
        title: "Invoice updated",
        description: `Invoice ${editInvoice.id} has been updated successfully.`,
      });
    } else {
      // Create new invoice
      const newId = `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000)}`;
      
      const newInvoice: InvoiceData = {
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
    }

    // Reset form and close dialog
    resetForm();
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
        resetForm();
        setActiveTab("details");
      }
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-white">
        <InvoiceDialogHeader isEditMode={isEditMode} />
        
        <Form {...form}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="px-6">
              <Tabs value={activeTab} onValueChange={handleTabChange}>
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
                      {isEditMode ? "Update Invoice" : "Create Invoice"}
                    </Button>
                  </DialogFooter>
                </TabsContent>
              </Tabs>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
