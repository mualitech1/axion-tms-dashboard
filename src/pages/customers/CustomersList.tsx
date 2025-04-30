
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
import { Filter, Download, Plus, LayoutGrid, List, Users, Search } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';

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
      {/* Filter Tabs */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-indigo-600 rounded-xl overflow-hidden shadow-md"
      >
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-xl font-semibold text-white"
              >
                Customer List
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-indigo-200 text-sm"
              >
                View and manage your customer accounts
              </motion.p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Tabs defaultValue="all" className="w-full sm:w-auto">
                <TabsList className="bg-indigo-700/50">
                  <TabsTrigger 
                    value="all"
                    className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 text-white"
                    onClick={() => setFilterType('all')}
                  >
                    All
                  </TabsTrigger>
                  <TabsTrigger 
                    value="active" 
                    className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 text-white"
                    onClick={() => setFilterType('active')}
                  >
                    Active
                  </TabsTrigger>
                  <TabsTrigger 
                    value="inactive"
                    className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 text-white"  
                    onClick={() => setFilterType('inactive')}
                  >
                    Inactive
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Customer Metrics Summary */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-indigo-700 border-t border-indigo-500"
        >
          <div className="bg-indigo-600 p-4 flex items-center hover:bg-indigo-500 transition-colors">
            <div className="bg-white/10 rounded-full p-3 mr-4">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-white text-sm">All Customers</p>
              <p className="text-2xl font-bold text-white">{customers.length}</p>
            </div>
          </div>
          
          <div className="bg-indigo-600 p-4 flex items-center hover:bg-indigo-500 transition-colors">
            <div className="bg-green-400/20 rounded-full p-3 mr-4">
              <Users className="h-5 w-5 text-green-300" />
            </div>
            <div>
              <p className="text-white text-sm">Active</p>
              <p className="text-2xl font-bold text-white">{activeCustomers}</p>
            </div>
          </div>
          
          <div className="bg-indigo-600 p-4 flex items-center hover:bg-indigo-500 transition-colors">
            <div className="bg-amber-400/20 rounded-full p-3 mr-4">
              <Users className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <p className="text-white text-sm">On Hold</p>
              <p className="text-2xl font-bold text-white">{onHoldCustomers}</p>
            </div>
          </div>
          
          <div className="bg-indigo-600 p-4 flex items-center hover:bg-indigo-500 transition-colors">
            <div className="bg-red-400/20 rounded-full p-3 mr-4">
              <Users className="h-5 w-5 text-red-300" />
            </div>
            <div>
              <p className="text-white text-sm">Inactive</p>
              <p className="text-2xl font-bold text-white">{inactiveCustomers}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Customer filters */}
      <motion.div 
        initial={{ y: -10, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
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

      <div className="grid grid-cols-1 gap-6">
        {/* Main Customer Table Card */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card className="shadow-md border-indigo-50 overflow-hidden rounded-xl">
            <CardHeader className="pb-0 border-b border-indigo-50">
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
                
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <div className="w-full sm:w-auto relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search customers..."
                      className="pl-8 w-full sm:w-[240px] border-gray-200"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setViewMode('list')}
                      className={`${viewMode === 'list' ? 'bg-indigo-100 border-indigo-200 text-indigo-800' : ''}`}
                    >
                      <List className="h-4 w-4 mr-1" />
                      List
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setViewMode('cards')}
                      className={`${viewMode === 'cards' ? 'bg-indigo-100 border-indigo-200 text-indigo-800' : ''}`}
                    >
                      <LayoutGrid className="h-4 w-4 mr-1" />
                      Cards
                    </Button>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                      <Plus className="h-4 w-4 mr-1" />
                      Add Customer
                    </Button>
                  </div>
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
            transition={{ duration: 0.5, delay: 0.5 }}
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
            <CustomerOverview />
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
