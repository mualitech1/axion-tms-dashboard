
import { useState } from 'react';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerDetailDialog from '@/components/customers/CustomerDetailDialog';
import CustomerOverview from '@/components/customers/CustomerOverview';
import CustomerAlerts from '@/components/customers/CustomerAlerts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export default function CustomersList() {
  const [customers, setCustomers] = useState(customerData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };
  
  const filteredCustomers = customers.filter(customer => {
    if (filterType === 'active') return customer.status === 'Active';
    if (filterType === 'inactive') return customer.status === 'Inactive';
    if (filterType === 'onhold') return customer.status === 'On Hold';
    return true;
  });
  
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'Inactive').length;
  const onHoldCustomers = customers.filter(c => c.status === 'On Hold').length;
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Customer Alerts */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Alerts & Notifications</CardTitle>
          <CardDescription>
            Important alerts that need your attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerAlerts customers={customers} />
        </CardContent>
      </Card>
      
      {/* Customer List with Filtering */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <CardTitle>Customer Directory</CardTitle>
              <CardDescription>
                Manage and filter your customer base
              </CardDescription>
            </div>
            <Tabs value={filterType} onValueChange={setFilterType} className="w-full sm:max-w-md">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all">
                  All ({customers.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active ({activeCustomers})
                </TabsTrigger>
                <TabsTrigger value="onhold">
                  On Hold ({onHoldCustomers})
                </TabsTrigger>
                <TabsTrigger value="inactive">
                  Inactive ({inactiveCustomers})
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <CustomerTable 
            customers={filteredCustomers} 
            onViewDetails={handleViewDetails} 
          />
        </CardContent>
      </Card>
      
      {/* Customer Overview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Overview</CardTitle>
          <CardDescription>
            Analytics and insights about your customer base
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CustomerOverview />
        </CardContent>
      </Card>
      
      {/* Customer Detail Dialog */}
      <CustomerDetailDialog 
        customer={selectedCustomer}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
