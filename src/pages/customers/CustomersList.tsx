
import { useState } from 'react';
import { motion } from 'framer-motion';
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
import { Filter, Download, Search, LayoutGrid, List, ChevronRight, Users } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

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
    <div className="space-y-6 animate-fade-in max-w-[1600px] mx-auto">
      {/* Enhanced Header with Gradient */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }} 
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-lg mb-6 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyNSIgaGVpZ2h0PSIyIiBmaWxsPSIjZmZmIiBvcGFjaXR5PSIwLjA1Ii8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPjwvc3ZnPg==')] opacity-40 mix-blend-overlay"></div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
          <div>
            <div className="flex items-center">
              <div className="bg-white/20 p-3 rounded-full mr-4">
                <Users className="h-7 w-7" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Customer Management</h1>
                <p className="text-indigo-100">Manage your customer relationships and data</p>
              </div>
            </div>
            
            <div className="flex items-center mt-4 text-xs text-indigo-100">
              <span>Dashboard</span>
              <ChevronRight className="h-3 w-3 mx-1" />
              <span className="font-medium text-white">Customers</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              className="bg-white/10 hover:bg-white/20 text-white border-0"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button className="bg-white text-indigo-700 hover:bg-indigo-50">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Action Bar */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
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
        
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
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
        
        <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
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
        
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 flex items-center">
            <div className="bg-blue-500 rounded-full p-3 mr-4">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <p className="text-blue-700 text-sm font-medium">Total Customers</p>
              <p className="text-2xl font-bold text-blue-900">{customers.length}</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {/* Customer Alerts Enhanced Dashboard */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <CustomerAlertsDashboard customers={customers} />
        </motion.div>
        
        {/* Customer Directory and Filtering */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="shadow-md border-indigo-100 overflow-hidden">
            <CardHeader className="pb-3 bg-gradient-to-r from-indigo-50 to-purple-50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-indigo-700">Customer Directory</CardTitle>
                  <CardDescription>
                    Manage and filter your customer base
                  </CardDescription>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant={viewMode === 'list' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4 mr-2" />
                    List
                  </Button>
                  <Button 
                    variant={viewMode === 'cards' ? "default" : "outline"} 
                    size="sm"
                    onClick={() => setViewMode('cards')}
                  >
                    <LayoutGrid className="h-4 w-4 mr-2" />
                    Cards
                  </Button>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                <div className="relative md:col-span-4">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search customers by name or email..."
                    className="pl-10 w-full border-indigo-200 focus:border-indigo-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <Tabs value={filterType} onValueChange={setFilterType} className="md:col-span-5">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="all" className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white">
                      All ({customers.length})
                    </TabsTrigger>
                    <TabsTrigger value="active" className="data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      Active ({activeCustomers})
                    </TabsTrigger>
                    <TabsTrigger value="onhold" className="data-[state=active]:bg-amber-600 data-[state=active]:text-white">
                      On Hold ({onHoldCustomers})
                    </TabsTrigger>
                    <TabsTrigger value="inactive" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white">
                      Inactive ({inactiveCustomers})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                <div className="flex items-center gap-2 justify-end md:col-span-3">
                  <Button variant="outline" size="sm" className="h-9 border-indigo-200 text-indigo-700 hover:text-indigo-800 hover:border-indigo-300">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 border-indigo-200 text-indigo-700 hover:text-indigo-800 hover:border-indigo-300">
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
