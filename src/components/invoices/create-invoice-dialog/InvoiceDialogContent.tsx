
import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { InvoiceTabs } from "./InvoiceTabs";
import { InvoiceDetailsForm } from "./InvoiceDetailsForm";
import { InvoiceLineItems } from "./InvoiceLineItems";
import { useInvoiceContext } from "./InvoiceContext";

interface InvoiceDialogContentProps {
  onCancel: () => void;
}

export function InvoiceDialogContent({ onCancel }: InvoiceDialogContentProps) {
  const [activeTab, setActiveTab] = useState("details");
  const formValues = useInvoiceContext();
  
  const handleTabChange = async (tab: string) => {
    // When going from details to items tab, validate the details first
    if (tab === "items" && activeTab === "details") {
      const isValid = await formValues.form.trigger(["customer", "issueDate", "dueDate", "paymentTerms"]);
      if (isValid) {
        setActiveTab(tab);
      }
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="px-6">
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <InvoiceTabs activeTab={activeTab} setActiveTab={handleTabChange} />
        
        <TabsContent value="details" className="py-4 space-y-4">
          <InvoiceDetailsForm 
            form={formValues.form}
            handlePaymentTermsChange={formValues.handlePaymentTermsChange}
          />

          <div className="flex justify-end pt-4">
            <Button type="button" variant="outline" onClick={onCancel} className="mr-2">
              Cancel
            </Button>
            <Button type="button" onClick={() => handleTabChange("items")}>
              Next: Line Items
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="items" className="py-4">
          <InvoiceLineItems 
            form={formValues.form}
            handleItemChange={formValues.handleItemChange}
            addInvoiceItem={formValues.addInvoiceItem}
            removeInvoiceItem={formValues.removeInvoiceItem}
            calculateTotal={formValues.calculateTotal}
          />

          <DialogFooter className="flex justify-between gap-2 pt-6">
            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={() => setActiveTab("details")}>
                Back
              </Button>
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            </div>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              {formValues.isEditMode ? "Update Invoice" : "Create Invoice"}
            </Button>
          </DialogFooter>
        </TabsContent>
      </Tabs>
    </div>
  );
}
