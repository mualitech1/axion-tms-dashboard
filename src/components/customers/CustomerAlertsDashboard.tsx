
import React, { useState } from 'react';
import { Customer } from '@/types/customer';
import CustomerAlerts from './CustomerAlerts';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BellRing, CalendarClock, FileCheck, CreditCard, FilterX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface CustomerAlertsDashboardProps {
  customers: Customer[];
}

const CustomerAlertsDashboard: React.FC<CustomerAlertsDashboardProps> = ({ customers }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [showAllAlerts, setShowAllAlerts] = useState(true);
  
  // Calculate alert counts for badge indicators
  const documentAlertsCount = customers.filter(customer => 
    customer.documents?.some(doc => {
      if (!doc.expiryDate) return false;
      const expiryDate = new Date(doc.expiryDate);
      const today = new Date();
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    }) || customer.acceptedTerms === false
  ).length;
  
  const contractAlertsCount = customers.filter(customer => 
    customer.rateCards?.some(card => {
      if (!card.validTo) return false;
      const expiryDate = new Date(card.validTo);
      const today = new Date();
      const diffTime = expiryDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 30 && diffDays > 0;
    })
  ).length;
  
  const creditAlertsCount = customers.filter(customer => 
    customer.creditLimit !== undefined && customer.creditLimit < 5000
  ).length;
  
  const totalAlertsCount = documentAlertsCount + contractAlertsCount + creditAlertsCount;
  
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center">
              <BellRing className="h-5 w-5 mr-2 text-amber-500" />
              Customer Alerts & Reminders
              {totalAlertsCount > 0 && (
                <Badge variant="destructive" className="ml-2">{totalAlertsCount}</Badge>
              )}
            </CardTitle>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={() => setShowAllAlerts(!showAllAlerts)}
          >
            {showAllAlerts ? (
              <>
                <FilterX className="h-4 w-4" />
                Hide Resolved
              </>
            ) : (
              <>
                <BellRing className="h-4 w-4" />
                Show All
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      
      <Separator />
      
      <CardContent className="pt-4">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <BellRing className="h-4 w-4" />
              <span className="hidden sm:inline">All</span>
              {totalAlertsCount > 0 && (
                <Badge variant="secondary" className="ml-1">{totalAlertsCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-1">
              <FileCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Documents</span>
              {documentAlertsCount > 0 && (
                <Badge variant="secondary" className="ml-1">{documentAlertsCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="contracts" className="flex items-center gap-1">
              <CalendarClock className="h-4 w-4" />
              <span className="hidden sm:inline">Contracts</span>
              {contractAlertsCount > 0 && (
                <Badge variant="secondary" className="ml-1">{contractAlertsCount}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="credit" className="flex items-center gap-1">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Credit</span>
              {creditAlertsCount > 0 && (
                <Badge variant="secondary" className="ml-1">{creditAlertsCount}</Badge>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <CustomerAlerts 
              customers={customers} 
              showAllAlerts={showAllAlerts}
            />
          </TabsContent>
          
          <TabsContent value="documents" className="mt-0">
            <CustomerAlerts 
              customers={customers.filter(customer => 
                customer.documents?.some(doc => doc.expiryDate) || customer.acceptedTerms === false
              )}
              alertTypes={['documents', 'terms']}
              showAllAlerts={showAllAlerts}
            />
          </TabsContent>
          
          <TabsContent value="contracts" className="mt-0">
            <CustomerAlerts 
              customers={customers.filter(customer => 
                customer.rateCards?.some(card => card.validTo)
              )}
              alertTypes={['contracts']}
              showAllAlerts={showAllAlerts}
            />
          </TabsContent>
          
          <TabsContent value="credit" className="mt-0">
            <CustomerAlerts 
              customers={customers.filter(customer => 
                customer.creditLimit !== undefined
              )}
              alertTypes={['credit']}
              showAllAlerts={showAllAlerts}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CustomerAlertsDashboard;
