
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  Building, 
  User, 
  CreditCard, 
  FileBarChart, 
  Clock,
  CheckCircle
} from "lucide-react";
import { Customer } from '@/types/customer';
import { useToast } from '@/hooks/use-toast';
import CustomerGeneralInfo from './CustomerGeneralInfo';
import CustomerContacts from './CustomerContacts';
import CustomerDocuments from './CustomerDocuments';
import CustomerRateCards from './CustomerRateCards';
import CustomerJobHistory from './CustomerJobHistory';

interface CustomerDetailDialogProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomerDetailDialog = ({ customer, open, onOpenChange }: CustomerDetailDialogProps) => {
  const [activeTab, setActiveTab] = useState("general");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  if (!customer) return null;

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Customer Updated",
        description: "Customer details have been updated successfully",
        variant: "default",
      });
      onOpenChange(false);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 h-10 w-10 rounded-full flex items-center justify-center text-blue-600 font-semibold">
              {customer.name.substring(0, 1)}
            </div>
            <div>
              <DialogTitle className="text-xl">{customer.name}</DialogTitle>
              <div className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                <span className="bg-green-100 text-green-700 text-xs py-0.5 px-2 rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" />
                  <span>Active Customer</span>
                </span>
                <span className="text-muted-foreground">•</span>
                <span>Added on Apr 2, 2025</span>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4 border-b">
            <TabsList className="grid grid-cols-6 bg-muted/50 rounded-lg p-1">
              <TabsTrigger value="general" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Building className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="contacts" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <User className="h-4 w-4 mr-2" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="documents" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="rates" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <CreditCard className="h-4 w-4 mr-2" />
                Rates
              </TabsTrigger>
              <TabsTrigger value="invoices" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <FileBarChart className="h-4 w-4 mr-2" />
                Invoices
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
                <Clock className="h-4 w-4 mr-2" />
                History
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="p-6">
            <TabsContent value="general" className="mt-0 animate-fade-in">
              <CustomerGeneralInfo customer={customer} />
            </TabsContent>
            
            <TabsContent value="contacts" className="mt-0 animate-fade-in">
              <CustomerContacts customer={customer} />
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0 animate-fade-in">
              <CustomerDocuments customer={customer} />
            </TabsContent>
            
            <TabsContent value="rates" className="mt-0 animate-fade-in">
              <CustomerRateCards customer={customer} />
            </TabsContent>
            
            <TabsContent value="invoices" className="mt-0 animate-fade-in">
              <div className="p-6 border rounded-lg bg-white shadow-sm">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">Customer Invoices</h3>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Invoice
                  </Button>
                </div>
                <div className="bg-slate-50 p-8 rounded-md text-center border border-dashed border-slate-200">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-slate-300" />
                  <p className="text-muted-foreground font-medium">No invoices found for this customer</p>
                  <p className="text-sm text-muted-foreground mt-1">Create your first invoice by clicking the button above</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0 animate-fade-in">
              <CustomerJobHistory customer={customer} />
            </TabsContent>
          </div>
        </Tabs>
        
        <DialogFooter className="px-6 py-4 border-t bg-gray-50">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white" 
            disabled={isSaving} 
            onClick={handleSave}
          >
            {isSaving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving Changes...
              </>
            ) : 'Save Changes'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;
