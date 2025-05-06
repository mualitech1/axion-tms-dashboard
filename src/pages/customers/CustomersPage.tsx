import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import MainLayout from '@/components/layout/MainLayout';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerDetailDialog from '@/components/customers/CustomerDetailDialog';
import CustomerMetrics from '@/components/customers/CustomerMetrics';
import CustomerFilters from '@/components/customers/CustomerFilters';
import CustomerActions from '@/components/customers/CustomerActions';
import CustomerSegmentationChart from '@/components/customers/CustomerSegmentationChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText, Plus, Search, LayoutGrid, List, Users, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function CustomersPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [customers, setCustomers] = useState(customerData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };
  
  const handleAddCustomer = (newCustomer: Customer) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Customer Added",
        description: `${newCustomer.name} has been successfully added`,
      });
      setIsLoading(false);
      
      // Navigate to the new customer's page
      navigate(`/customers/${newCustomer.id}`);
    }, 500);
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

  // Define metrics values for CustomerMetrics
  const metricsData = {
    totalCalls: 68,
    totalEmails: 173,
    newCustomers: 24,
    scheduledMeetings: 12,
    activityTimestamp: 'Today, 10:30 AM'
  };
  
  return (
    <MainLayout title="Customers">
      <div className="animate-fade-in px-1 md:px-4">
        <motion.div 
          className="mb-8 space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Page Header Card with Counters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl overflow-hidden shadow-xl"
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
                    Customer Management
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
                        value="key"
                        className="data-[state=active]:bg-white data-[state=active]:text-indigo-700 text-white"  
                        onClick={() => setFilterType('key')}
                      >
                        Key Accounts
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                  
                  <Button 
                    className="bg-white text-indigo-700 hover:bg-indigo-50"
                    onClick={() => navigate('/customers/new')}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Customer
                  </Button>
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
                <div className="bg-white/10 backdrop-blur-sm rounded-full p-3 mr-4">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm">All Customers</p>
                  <p className="text-2xl font-bold text-white">{customers.length}</p>
                </div>
              </div>
              
              <div className="bg-indigo-600 p-4 flex items-center hover:bg-indigo-500 transition-colors">
                <div className="bg-green-400/20 backdrop-blur-sm rounded-full p-3 mr-4">
                  <Users className="h-5 w-5 text-green-300" />
                </div>
                <div>
                  <p className="text-white text-sm">Active</p>
                  <p className="text-2xl font-bold text-white">{activeCustomers}</p>
                </div>
              </div>
              
              <div className="bg-indigo-600 p-4 flex items-center hover:bg-indigo-500 transition-colors">
                <div className="bg-blue-400/20 backdrop-blur-sm rounded-full p-3 mr-4">
                  <Users className="h-5 w-5 text-blue-300" />
                </div>
                <div>
                  <p className="text-white text-sm">Key Accounts</p>
                  <p className="text-2xl font-bold text-white">{keyAccounts}</p>
                </div>
              </div>
              
              <div className="bg-indigo-600 p-4 flex items-center hover:bg-indigo-500 transition-colors">
                <div className="bg-red-400/20 backdrop-blur-sm rounded-full p-3 mr-4">
                  <Users className="h-5 w-5 text-red-300" />
                </div>
                <div>
                  <p className="text-white text-sm">Inactive</p>
                  <p className="text-2xl font-bold text-white">{inactiveCustomers}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Customer Performance Metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CustomerMetrics {...metricsData} />
          </motion.div>
          
          {/* Quick Actions */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <CustomerActions />
          </motion.div>
          
          {/* Main Customer Table Card */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="shadow-lg border-indigo-50 overflow-hidden rounded-xl dark:bg-indigo-950/20 dark:border-indigo-800/30">
              <CardHeader className="pb-0 border-b border-indigo-50 dark:border-indigo-800/30 bg-indigo-50/50 dark:bg-indigo-900/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-xl font-semibold text-indigo-800 dark:text-indigo-200">
                      {filterType === 'all' ? 'All Customers' :
                      filterType === 'key' ? 'Key Accounts' :
                      filterType === 'active' ? 'Active Customers' :
                      filterType === 'onhold' ? 'On Hold Customers' :
                      'Inactive Customers'}
                    </CardTitle>
                    <CardDescription className="text-indigo-600/70 dark:text-indigo-400/70">
                      Showing {filteredCustomers.length} of {customers.length} customers
                    </CardDescription>
                  </div>
                  
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    <div className="w-full sm:w-auto relative">
                      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                      <Input
                        placeholder="Search customers..."
                        className="pl-8 w-full sm:w-[240px] border-indigo-100 focus:border-indigo-300 bg-white dark:bg-indigo-900/30 dark:border-indigo-700/50"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => setViewMode('list')}
                        className={`${viewMode === 'list' ? 'bg-indigo-100 border-indigo-200 text-indigo-800 dark:bg-indigo-900/50 dark:border-indigo-700 dark:text-indigo-300' : 'dark:border-indigo-800 dark:text-indigo-300'}`}
                      >
                        <List className="h-4 w-4 mr-1" />
                        List
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setViewMode('cards')}
                        className={`${viewMode === 'cards' ? 'bg-indigo-100 border-indigo-200 text-indigo-800 dark:bg-indigo-900/50 dark:border-indigo-700 dark:text-indigo-300' : 'dark:border-indigo-800 dark:text-indigo-300'}`}
                      >
                        <LayoutGrid className="h-4 w-4 mr-1" />
                        Cards
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-indigo-100 dark:border-indigo-800 dark:text-indigo-300"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <CustomerTable 
                  customers={filteredCustomers} 
                  onViewDetails={handleViewDetails} 
                />
              </CardContent>
            </Card>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customer Segmentation Chart */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="lg:col-span-1"
            >
              <CustomerSegmentationChart customers={customers} />
            </motion.div>
            
            {/* Recent Activity */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="lg:col-span-2"
            >
              <Card className="h-full bg-white dark:bg-indigo-950/20 shadow-sm border border-indigo-100/50 dark:border-indigo-800/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
                    Recent Activity
                  </CardTitle>
                  <CardDescription className="text-indigo-500 dark:text-indigo-400">
                    Latest customer interactions and events
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {customers.slice(0, 5).map((customer, index) => (
                      <div 
                        key={customer.id} 
                        className="flex items-start p-3 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/20 border border-indigo-100/50 dark:border-indigo-800/30"
                      >
                        <div className="bg-white dark:bg-indigo-800 h-10 w-10 rounded-full flex items-center justify-center mr-3 border border-indigo-100 dark:border-indigo-700">
                          {index % 3 === 0 ? (
                            <FileText className="h-5 w-5 text-pink-500" />
                          ) : index % 3 === 1 ? (
                            <Phone className="h-5 w-5 text-blue-500" />
                          ) : (
                            <Users className="h-5 w-5 text-green-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="font-medium text-indigo-900 dark:text-indigo-200">
                              {index % 3 === 0 ? 'Contract Updated' : 
                               index % 3 === 1 ? 'Call Completed' : 
                              'Account Reviewed'}
                            </p>
                            <span className="text-xs text-indigo-500 dark:text-indigo-400">
                              {index === 0 ? 'Just now' : 
                               index === 1 ? '2 hours ago' : 
                               index === 2 ? 'Yesterday' : 
                               index === 3 ? '2 days ago' : 
                              'Last week'}
                            </span>
                          </div>
                          <p className="text-sm text-indigo-700 dark:text-indigo-300">
                            {customer.name} {index % 3 === 0 ? 'has a new contract' : 
                             index % 3 === 1 ? 'call log updated' : 
                            'account status changed'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Customer Detail Dialog */}
        <CustomerDetailDialog 
          customer={selectedCustomer}
          open={isDetailOpen}
          onOpenChange={setIsDetailOpen}
        />
      </div>
    </MainLayout>
  );
}
