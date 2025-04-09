
import { useState } from 'react';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerDetailDialog from '@/components/customers/CustomerDetailDialog';
import CustomerOverview from '@/components/customers/CustomerOverview';
import CustomerAlertsDashboard from '@/components/customers/CustomerAlertsDashboard';
import CustomerSegmentation from '@/components/customers/CustomerSegmentation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Filter, Download, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CustomersList() {
  const [customers, setCustomers] = useState(customerData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };
  
  // Filter customers based on status and search term
  const filteredCustomers = customers.filter(customer => {
    const matchesStatus = 
      filterType === 'all' || 
      (filterType === 'active' && customer.status === 'Active') ||
      (filterType === 'inactive' && customer.status === 'Inactive') ||
      (filterType === 'onhold' && customer.status === 'On Hold');
    
    const matchesSearch = 
      searchTerm === '' ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.contact.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });
  
  const activeCustomers = customers.filter(c => c.status === 'Active').length;
  const inactiveCustomers = customers.filter(c => c.status === 'Inactive').length;
  const onHoldCustomers = customers.filter(c => c.status === 'On Hold').length;
  
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Customer Alerts Enhanced Dashboard */}
      <CustomerAlertsDashboard customers={customers} />
      
      {/* Customer List with Enhanced Filtering */}
      <Card className="shadow-md">
        <CardHeader className="pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <CardTitle>Customer Directory</CardTitle>
              <CardDescription>
                Manage and filter your customer base
              </CardDescription>
            </div>
          </div>
          
          <div className="mt-4 flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search customers by name or email..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
            
            <div className="flex items-center gap-2 self-end">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filter
              </Button>
              <Button variant="outline" size="sm" className="h-9">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <Separator />
        
        <CardContent className="p-0">
          <CustomerTable 
            customers={filteredCustomers} 
            onViewDetails={handleViewDetails} 
          />
        </CardContent>
      </Card>
      
      {/* Customer Segmentation - New Section */}
      <CustomerSegmentation customers={customers} />
      
      {/* Customer Overview Section */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Customer Overview</CardTitle>
          <CardDescription>
            Analytics and insights about your customer base
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-6">
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
