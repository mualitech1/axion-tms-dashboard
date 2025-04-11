
import { useState } from "react";
import { X, Calendar, DollarSign, Building2, FileText, CreditCard } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatCurrency } from "@/lib/utils";

interface CreateInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInvoiceCreated: (invoice: any) => void;
}

export function CreateInvoiceDialog({ open, onOpenChange, onInvoiceCreated }: CreateInvoiceDialogProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [invoiceDetails, setInvoiceDetails] = useState({
    customer: "",
    amount: "",
    issueDate: getTodayDate(),
    dueDate: getDefaultDueDate(),
    notes: "",
    items: [{ description: "", quantity: "1", rate: "", amount: "0" }],
    paymentTerms: "net15",
  });

  const { toast } = useToast();

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

  const handleCustomerChange = (value: string) => {
    setInvoiceDetails(prev => ({ ...prev, customer: value }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInvoiceDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const updatedItems = [...invoiceDetails.items];
    
    updatedItems[index] = { 
      ...updatedItems[index], 
      [field]: value 
    };
    
    // Calculate amount if we have both quantity and rate
    if ((field === 'quantity' || field === 'rate') && 
        updatedItems[index].quantity && 
        updatedItems[index].rate) {
      const quantity = parseFloat(updatedItems[index].quantity);
      const rate = parseFloat(updatedItems[index].rate);
      updatedItems[index].amount = (quantity * rate).toFixed(2);
    }
    
    setInvoiceDetails(prev => ({
      ...prev,
      items: updatedItems
    }));
  };

  const addInvoiceItem = () => {
    setInvoiceDetails(prev => ({
      ...prev,
      items: [...prev.items, { description: "", quantity: "1", rate: "", amount: "0" }]
    }));
  };

  const removeInvoiceItem = (index: number) => {
    if (invoiceDetails.items.length > 1) {
      const updatedItems = [...invoiceDetails.items];
      updatedItems.splice(index, 1);
      setInvoiceDetails(prev => ({
        ...prev,
        items: updatedItems
      }));
    }
  };

  const calculateTotal = () => {
    return invoiceDetails.items.reduce((sum, item) => {
      return sum + parseFloat(item.amount || "0");
    }, 0);
  };

  const handlePaymentTermsChange = (value: string) => {
    let newDueDate = new Date(invoiceDetails.issueDate);
    
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
    
    setInvoiceDetails(prev => ({
      ...prev,
      paymentTerms: value,
      dueDate: newDueDate.toISOString().split('T')[0]
    }));
  };

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
    setInvoiceDetails({
      customer: "",
      amount: "",
      issueDate: getTodayDate(),
      dueDate: getDefaultDueDate(),
      notes: "",
      items: [{ description: "", quantity: "1", rate: "", amount: "0" }],
      paymentTerms: "net15",
    });
    setActiveTab("details");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[650px] p-0 overflow-hidden bg-white">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <FileText className="mr-2 h-6 w-6" />
              Create New Invoice
            </DialogTitle>
            <p className="text-blue-100 mt-2">Enter the details to generate a new invoice</p>
          </DialogHeader>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-6">
          <TabsList className="grid w-full grid-cols-2 mb-4 mt-4">
            <TabsTrigger value="details">Invoice Details</TabsTrigger>
            <TabsTrigger value="items">Line Items</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details" className="py-4 space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customer" className="text-sm font-medium">
                    Customer
                  </Label>
                  <div className="relative">
                    <Select 
                      value={invoiceDetails.customer} 
                      onValueChange={handleCustomerChange}
                    >
                      <SelectTrigger className="w-full pl-9">
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Globex Industries">Globex Industries</SelectItem>
                        <SelectItem value="Acme Corporation">Acme Corporation</SelectItem>
                        <SelectItem value="Wayne Enterprises">Wayne Enterprises</SelectItem>
                        <SelectItem value="Stark Industries">Stark Industries</SelectItem>
                        <SelectItem value="Umbrella Corporation">Umbrella Corporation</SelectItem>
                      </SelectContent>
                    </Select>
                    <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="issueDate" className="text-sm font-medium">
                    Issue Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="issueDate"
                      name="issueDate"
                      type="date"
                      value={invoiceDetails.issueDate}
                      onChange={handleInputChange}
                      className="pl-9"
                    />
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms" className="text-sm font-medium">
                    Payment Terms
                  </Label>
                  <div className="relative">
                    <Select 
                      value={invoiceDetails.paymentTerms} 
                      onValueChange={handlePaymentTermsChange}
                    >
                      <SelectTrigger className="w-full pl-9">
                        <SelectValue placeholder="Select payment terms" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="net15">Net 15 days</SelectItem>
                        <SelectItem value="net30">Net 30 days</SelectItem>
                        <SelectItem value="net60">Net 60 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <CreditCard className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate" className="text-sm font-medium">
                    Due Date
                  </Label>
                  <div className="relative">
                    <Input
                      id="dueDate"
                      name="dueDate"
                      type="date"
                      value={invoiceDetails.dueDate}
                      onChange={handleInputChange}
                      className="pl-9"
                    />
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-sm font-medium">
                  Notes (Optional)
                </Label>
                <Input
                  id="notes"
                  name="notes"
                  placeholder="Add any additional notes here..."
                  value={invoiceDetails.notes}
                  onChange={handleInputChange}
                />
              </div>
            </div>

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
            <div className="space-y-4">
              <div className="border rounded-md overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr className="border-b">
                      <th className="px-4 py-3 text-left">Item</th>
                      <th className="px-4 py-3 text-left w-20">Qty</th>
                      <th className="px-4 py-3 text-left w-24">Rate</th>
                      <th className="px-4 py-3 text-left w-24">Amount</th>
                      <th className="px-4 py-3 text-left w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceDetails.items.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">
                          <Input
                            value={item.description}
                            onChange={(e) => handleItemChange(index, "description", e.target.value)}
                            placeholder="Item description"
                            className="border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <Input
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                            type="number"
                            min="1"
                            className="border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <div className="relative">
                            <DollarSign className="absolute left-0 top-2.5 h-3.5 w-3.5 text-gray-500" />
                            <Input
                              value={item.rate}
                              onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                              type="number"
                              min="0"
                              step="0.01"
                              className="pl-5 border-0 px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                          </div>
                        </td>
                        <td className="px-4 py-2 font-medium">
                          ${parseFloat(item.amount || "0").toFixed(2)}
                        </td>
                        <td className="p-2 text-center">
                          {invoiceDetails.items.length > 1 && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0" 
                              onClick={() => removeInvoiceItem(index)}
                            >
                              <X className="h-4 w-4 text-gray-500" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addInvoiceItem}
                className="text-blue-600 border-dashed border-blue-300"
              >
                + Add Another Line Item
              </Button>

              <div className="flex justify-between p-4 bg-gray-50 rounded-md mt-4">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold">{formatCurrency(calculateTotal())}</span>
              </div>
            </div>

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
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
