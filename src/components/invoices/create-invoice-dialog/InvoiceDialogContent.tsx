import { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { InvoiceTabs } from "./InvoiceTabs";
import { InvoiceDetailsForm } from "./InvoiceDetailsForm";
import { InvoiceLineItems } from "./InvoiceLineItems";
import { useInvoiceContext } from "./InvoiceContext";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Zap } from "lucide-react";

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

        <TabsContent value="energy" className="space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-purple-800">Quantum Energy Distribution</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="energy-core">Primary Energy Core</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select core type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quantum-fusion">Quantum Fusion Core</SelectItem>
                    <SelectItem value="antimatter">Antimatter Reactor</SelectItem>
                    <SelectItem value="zero-point">Zero-Point Energy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="energy-output">Energy Output (TW)</Label>
                <Input 
                  id="energy-output"
                  type="number"
                  placeholder="Enter terawatt output"
                />
              </div>
              <div>
                <Label htmlFor="efficiency">Quantum Efficiency (%)</Label>
                <Input 
                  id="efficiency"
                  type="number"
                  placeholder="Enter efficiency percentage"
                />
              </div>
              <div>
                <Label htmlFor="resonance">Dimensional Resonance</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select resonance frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alpha">Alpha Wave (7-13 Hz)</SelectItem>
                    <SelectItem value="beta">Beta Wave (14-30 Hz)</SelectItem>
                    <SelectItem value="gamma">Gamma Wave (30+ Hz)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
