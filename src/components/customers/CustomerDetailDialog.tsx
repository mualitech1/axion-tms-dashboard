
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
import CustomerGeneralInfo from './CustomerGeneralInfo';
import CustomerContacts from './CustomerContacts';
import CustomerDocuments from './CustomerDocuments';
import CustomerRateCards from './CustomerRateCards';
import CustomerJobHistory from './CustomerJobHistory';
import { Customer } from '@/types/customer';

interface CustomerDetailDialogProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CustomerDetailDialog = ({ customer, open, onOpenChange }: CustomerDetailDialogProps) => {
  const [activeTab, setActiveTab] = useState("general");

  if (!customer) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <span className="bg-tms-blue-light h-8 w-8 rounded-full flex items-center justify-center text-tms-blue">
              {customer.name.substring(0, 1)}
            </span>
            {customer.name}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="rates">Rate Cards</TabsTrigger>
            <TabsTrigger value="history">Job History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="mt-0">
            <CustomerGeneralInfo customer={customer} />
          </TabsContent>
          
          <TabsContent value="contacts" className="mt-0">
            <CustomerContacts customer={customer} />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <CustomerDocuments customer={customer} />
          </TabsContent>
          
          <TabsContent value="rates" className="mt-0">
            <CustomerRateCards customer={customer} />
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <CustomerJobHistory customer={customer} />
          </TabsContent>
        </Tabs>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
          <Button>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerDetailDialog;
