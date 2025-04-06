
import React, { useState } from 'react';
import { Customer } from '@/types/customer';
import CustomerAlerts from './CustomerAlerts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BellRing, CalendarClock, FileCheck, CreditCard } from 'lucide-react';

interface CustomerAlertsDashboardProps {
  customers: Customer[];
}

const CustomerAlertsDashboard: React.FC<CustomerAlertsDashboardProps> = ({ customers }) => {
  const [activeTab, setActiveTab] = useState('all');
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Customer Alerts & Reminders</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <BellRing className="h-4 w-4" />
          Configure Alerts
        </Button>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            <span className="hidden sm:inline">All Alerts</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="contracts" className="flex items-center gap-2">
            <CalendarClock className="h-4 w-4" />
            <span className="hidden sm:inline">Contracts</span>
          </TabsTrigger>
          <TabsTrigger value="credit" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Credit</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          <CustomerAlerts allCustomers={customers} />
        </TabsContent>
        
        <TabsContent value="documents" className="mt-0">
          <CustomerAlerts allCustomers={customers.filter(customer => 
            customer.documents?.some(doc => doc.expiryDate) || customer.acceptedTerms === false
          )} />
        </TabsContent>
        
        <TabsContent value="contracts" className="mt-0">
          <CustomerAlerts allCustomers={customers.filter(customer => 
            customer.rateCards?.some(card => card.validTo)
          )} />
        </TabsContent>
        
        <TabsContent value="credit" className="mt-0">
          <CustomerAlerts allCustomers={customers.filter(customer => 
            customer.creditLimit !== undefined
          )} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerAlertsDashboard;
