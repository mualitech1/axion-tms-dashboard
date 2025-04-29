
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerDetailDialog from '@/components/customers/CustomerDetailDialog';
import CustomerOverview from '@/components/customers/CustomerOverview';
import CustomerAlertsDashboard from '@/components/customers/CustomerAlertsDashboard';
import CustomerSegmentation from '@/components/customers/CustomerSegmentation';
import CustomerFilters from '@/components/customers/CustomerFilters';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Filter, Download, Plus, LayoutGrid, List, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CustomersList() {
  const [customers, setCustomers] = useState(customerData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };
  
  // Filter customers based on status and search term
  const filteredCustomers = customers.filter(customer => {
    const matchesStatus = 
      filterType === 'all' || 
      (filterType === 'key' && customer.status === 'Active' && customer.creditLimit > 50000) ||
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
  const keyAccounts = customers.filter(c => c.status === 'Active' && c.creditLimit > 50000).length;
  
  return (
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto">
      {/* Customer filters section based on the screenshot */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CustomerFilters 
          activeFilter={filterType}
          totalCustomers={customers.length}
          activeCount={activeCustomers}
          inactiveCount={inactiveCustomers}
          onHoldCount={onHoldCustomers}
          onFilterChange={setFilterType}
        />
      </motion.div>

      {/* Action Bar - Metrics Summary */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center">
            <div className="bg-green-500 rounded-full p-3 mr-4">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-green-700 text-sm font-medium">Active Customers</p>
              <p className="text-2xl font-bold text-green-900">{activeCustomers}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center">
            <div className="bg-amber-500 rounded-full p-3 mr-4">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-amber-700 text-sm font-medium">On Hold</p>
              <p className="text-2xl font-bold text-amber-900">{onHoldCustomers}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-500 rounded-full p-3 mr-4">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-blue-700 text-sm font-medium">Key Accounts</p>
              <p className="text-2xl font-bold text-blue-900">{keyAccounts}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4 flex items-center">
            <div className="bg-gray-500 rounded-full p-3 mr-4">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-gray-700 text-sm font-medium">Inactive</p>
              <p className="text-2xl font-bold text-gray-900">{inactiveCustomers}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {/* Main Customer Table Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-md border-indigo-100 overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-xl font-semibold text-indigo-800">
                    {filterType === 'all' ? 'All Customers' :
                     filterType === 'key' ? 'Key Accounts' :
                     filterType === 'active' ? 'Active Customers' :
                     filterType === 'onhold' ? 'On Hold Customers' :
                     'Inactive Customers'}
                  </CardTitle>
                  <CardDescription>
                    Showing {filteredCustomers.length} of {customers.length} customers
                  </CardDescription>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setViewMode('list')}
                    className={`${viewMode === 'list' ? 'bg-indigo-100 border-indigo-200' : ''}`}
                  >
                    <List className="h-4 w-4 mr-2" />
                    List
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setViewMode('cards')}
                    className={`${viewMode === 'cards' ? 'bg-indigo-100 border-indigo-200' : ''}`}
                  >
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Cards
                  </Button>
                  <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Customer
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-0 pt-4">
              <CustomerTable 
                customers={filteredCustomers} 
                onViewDetails={handleViewDetails} 
              />
            </CardContent>
          </Card>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Customer Segmentation - Left Column */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <CustomerSegmentation customers={customers} />
          </motion.div>
          
          {/* Customer Overview - Right Column */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-md border-indigo-100 h-full">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <CardTitle className="text-indigo-700">Customer Overview</CardTitle>
                <CardDescription>
                  Analytics and insights about your customer base
                </CardDescription>
              </CardHeader>
              <Separator />
              <CardContent className="pt-6">
                <CustomerOverview />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
      
      {/* Customer Detail Dialog */}
      <CustomerDetailDialog 
        customer={selectedCustomer}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
