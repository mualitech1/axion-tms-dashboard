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
  onClose: () => void;
  onEdit?: (customer: Customer) => void;
}

const CustomerDetailDialog = ({ customer, open, onClose, onEdit }: CustomerDetailDialogProps) => {
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
      onClose();
    }, 800);
  };

  const handleEdit = () => {
    if (onEdit && customer) {
      onEdit(customer);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto p-0" 
        aria-describedby="customer-detail-description"
        aria-labelledby="customer-detail-title"
      >
        <DialogHeader className="px-6 py-4 border-b sticky top-0 bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-950 dark:to-indigo-900 z-10">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold shadow-md">
              {customer.name.substring(0, 1)}
            </div>
            <div>
              <DialogTitle 
                id="customer-detail-title"
                className="text-xl bg-gradient-to-r from-indigo-800 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-300 dark:to-indigo-500"
              >
                {customer.name}
              </DialogTitle>
              <div 
                id="customer-detail-description" 
                className="text-sm text-muted-foreground mt-1 flex items-center gap-2"
              >
                <span className="bg-green-100 text-green-700 text-xs py-0.5 px-2 rounded-full flex items-center gap-1 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle className="h-3 w-3" />
                  <span>{customer.status || 'Active'} Customer</span>
                </span>
                <span className="text-muted-foreground">•</span>
                <span>Added on {customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>
        </DialogHeader>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 pt-4 border-b bg-gradient-to-r from-indigo-50/50 to-white dark:from-indigo-950/50 dark:to-indigo-900/50">
            <TabsList className="grid grid-cols-6 bg-indigo-100/70 rounded-lg p-1 dark:bg-indigo-900/30" aria-label="Customer information tabs">
              <TabsTrigger value="general" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-indigo-800 dark:text-indigo-200">
                <Building className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="contacts" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-indigo-800 dark:text-indigo-200">
                <User className="h-4 w-4 mr-2" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="documents" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-indigo-800 dark:text-indigo-200">
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="rates" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-indigo-800 dark:text-indigo-200">
                <CreditCard className="h-4 w-4 mr-2" />
                Rates
              </TabsTrigger>
              <TabsTrigger value="invoices" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-indigo-800 dark:text-indigo-200">
                <FileBarChart className="h-4 w-4 mr-2" />
                Invoices
              </TabsTrigger>
              <TabsTrigger value="history" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-indigo-800 dark:text-indigo-200">
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
              <div className="p-6 border rounded-lg bg-white shadow-sm dark:bg-indigo-950/20 dark:border-indigo-800/30">
                <div className="mb-4 flex justify-between items-center">
                  <h3 className="text-lg font-medium">Customer Invoices</h3>
                  <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Invoice
                  </Button>
                </div>
                <div className="bg-indigo-50/70 p-8 rounded-md text-center border border-dashed border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800/30">
                  <FileText className="h-12 w-12 mx-auto mb-3 text-indigo-300" />
                  <p className="text-indigo-600 font-medium dark:text-indigo-300">No invoices found for this customer</p>
                  <p className="text-sm text-indigo-500 mt-1 dark:text-indigo-400">Create your first invoice by clicking the button above</p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="mt-0 animate-fade-in">
              <CustomerJobHistory customer={customer} />
            </TabsContent>
          </div>
        </Tabs>
        
        <DialogFooter className="px-6 py-4 border-t bg-gradient-to-r from-indigo-50 to-white dark:from-indigo-950/50 dark:to-indigo-900/50">
          <div className="flex items-center gap-2 w-full justify-between">
            <div>
              {onEdit && (
                <Button 
                  variant="outline" 
                  className="border-indigo-200 text-indigo-700" 
                  onClick={handleEdit}
                  aria-label="Edit customer details"
                >
                  Edit Customer
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={onClose}
                aria-label="Cancel and close dialog"
              >
                Cancel
              </Button>
              <Button 
                className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-md" 
                disabled={isSaving} 
                onClick={handleSave}
                aria-label="Save customer changes"
                aria-busy={isSaving}
              >
                {isSaving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving Changes...
                  </>
                ) : 'Save Changes'}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;
