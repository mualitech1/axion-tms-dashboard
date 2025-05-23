import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Customer } from '@/types/customer';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerList from '@/components/customers/CustomerList';
import CustomerDetailDialog from '@/components/customers/CustomerDetailDialog';
import CustomerMetrics from '@/components/customers/CustomerMetrics';
import CustomerFilters from '@/components/customers/CustomerFilters';
import CustomerActions from '@/components/customers/CustomerActions';
import CustomerSegmentationChart from '@/components/customers/CustomerSegmentationChart';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Download, FileText, Plus, Search, LayoutGrid, List, Users, Phone, AlertCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCustomers } from '@/hooks/use-customer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CustomerTableSkeleton from '@/components/customers/CustomerTableSkeleton';
import CustomerCardsSkeleton from '@/components/customers/CustomerCardsSkeleton';

export default function CustomersPage() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'list'>('list');
  
  // Filter object for Supabase query
  const [filters, setFilters] = useState<Record<string, string>>({});
  
  // Use the hook to fetch customers from Supabase
  const { 
    customers, 
    isLoading, 
    error, 
    refetch, 
    createCustomer,
    updateCustomer,
    deleteCustomer
  } = useCustomers(filters);
  
  // Update filters when filter type changes
  useEffect(() => {
    // Convert UI filter type to database filter
    const dbFilters: Record<string, string> = {};
    
    if (filterType === 'active') {
      dbFilters.status = 'Active';
    } else if (filterType === 'inactive') {
      dbFilters.status = 'Inactive';
    } else if (filterType === 'onhold') {
      dbFilters.status = 'On Hold';
    }
    // For 'all' and 'key', we'll handle those differently
    
    setFilters(dbFilters);
  }, [filterType]);
  
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };
  
  const handleAddCustomer = async (newCustomer: Customer) => {
    try {
      await createCustomer.mutateAsync({
        name: newCustomer.name,
        contact: newCustomer.contact,
        email: newCustomer.email,
        phone: newCustomer.phone,
        status: newCustomer.status,
        creditLimit: newCustomer.creditLimit,
        address: newCustomer.address,
      });
      
      // Navigate to the new customer's page
      // Note: We don't have the ID yet, so we'll just go back to the list
      // and the user can find the new customer there
      navigate('/customers');
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };
  
  // Filter customers for client-side filtering (search and key accounts)
  const filteredCustomers = customers ? customers.filter(customer => {
    // For key accounts filter (can't be done directly in Supabase query)
    if (filterType === 'key' && (customer.status !== 'Active' || customer.creditLimit <= 50000)) {
      return false;
    }
    
    // Apply search filter
    const matchesSearch = 
      searchTerm === '' ||
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.contact && customer.contact.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  }) : [];
  
  // Calculate counts
  const activeCustomers = customers ? customers.filter(c => c.status === 'Active').length : 0;
  const inactiveCustomers = customers ? customers.filter(c => c.status === 'Inactive').length : 0;
  const onHoldCustomers = customers ? customers.filter(c => c.status === 'On Hold').length : 0;
  const keyAccounts = customers ? customers.filter(c => c.status === 'Active' && c.creditLimit > 50000).length : 0;

  // Define metrics values for CustomerMetrics (placeholder for real data)
  const metricsData = {
    totalCalls: 68,
    totalEmails: 173,
    newCustomers: customers ? customers.filter(c => {
      const createdDate = new Date(c.createdAt || new Date());
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return createdDate >= thirtyDaysAgo;
    }).length : 0,
    scheduledMeetings: 12,
    activityTimestamp: 'Today, 10:30 AM'
  };
  
  // Add keyboard shortcuts event listener in the component
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Search shortcut: Press "/" to focus search
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
      
      // Alt+L: Switch to list view
      if (e.altKey && e.key === 'l') {
        e.preventDefault();
        setViewMode('list');
      }
      
      // Alt+G: Switch to grid/card view
      if (e.altKey && e.key === 'g') {
        e.preventDefault();
        setViewMode('cards');
      }
      
      // Alt+E: Export
      if (e.altKey && e.key === 'e') {
        e.preventDefault();
        // Implement export functionality here
        toast({
          title: 'Export triggered',
          description: 'Export feature will be available soon.'
        });
      }
      
      // Alt+N: New customer
      if (e.altKey && e.key === 'n') {
        e.preventDefault();
        navigate('/customers/new');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, setViewMode, toast]);
  
  return (
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
                <p className="text-2xl font-bold text-white">{isLoading ? '...' : customers?.length || 0}</p>
              </div>
            </div>
            
            <div className="bg-indigo-600 p-4 flex items-center hover:bg-indigo-500 transition-colors">
              <div className="bg-green-400/20 backdrop-blur-sm rounded-full p-3 mr-4">
                <Users className="h-5 w-5 text-green-300" />
              </div>
              <div>
                <p className="text-white text-sm">Active</p>
                <p className="text-2xl font-bold text-white">{isLoading ? '...' : activeCustomers}</p>
              </div>
            </div>
            
            <div className="bg-indigo-600 p-4 flex items-center hover:bg-indigo-500 transition-colors">
              <div className="bg-blue-400/20 backdrop-blur-sm rounded-full p-3 mr-4">
                <Users className="h-5 w-5 text-blue-300" />
              </div>
              <div>
                <p className="text-white text-sm">Key Accounts</p>
                <p className="text-2xl font-bold text-white">{isLoading ? '...' : keyAccounts}</p>
              </div>
            </div>
            
            <div className="bg-indigo-600 p-4 flex items-center hover:bg-indigo-500 transition-colors">
              <div className="bg-red-400/20 backdrop-blur-sm rounded-full p-3 mr-4">
                <Users className="h-5 w-5 text-red-300" />
              </div>
              <div>
                <p className="text-white text-sm">Inactive</p>
                <p className="text-2xl font-bold text-white">{isLoading ? '...' : inactiveCustomers}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Error message if needed */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load customers data. Please try again later.
            </AlertDescription>
          </Alert>
        )}
        
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
          <CustomerActions onAddCustomer={handleAddCustomer} />
        </motion.div>
        
        {/* View Toggle Buttons */}
        <div className="flex items-center justify-end mb-4">
          <div className="flex space-x-1 bg-indigo-50 dark:bg-indigo-950/30 p-1 rounded-md">
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className={`h-8 gap-1 ${viewMode === 'list' ? 'bg-white text-indigo-700 shadow-sm dark:bg-indigo-800 dark:text-indigo-100' : 'bg-transparent text-indigo-600 dark:text-indigo-400'}`}
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </Button>
            <Button
              variant={viewMode === 'cards' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('cards')}
              className={`h-8 gap-1 ${viewMode === 'cards' ? 'bg-white text-indigo-700 shadow-sm dark:bg-indigo-800 dark:text-indigo-100' : 'bg-transparent text-indigo-600 dark:text-indigo-400'}`}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="hidden sm:inline">Cards</span>
            </Button>
          </div>
        </div>
        
        {/* Main Content */}
        {isLoading ? (
          viewMode === 'list' ? <CustomerTableSkeleton /> : <CustomerCardsSkeleton />
        ) : error ? (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              Failed to load customers. Please try again.
            </AlertDescription>
          </Alert>
        ) : viewMode === 'list' ? (
          <CustomerTable 
            customers={filteredCustomers} 
            onViewDetails={handleViewDetails}
            viewMode={viewMode}
            onDeleteCustomer={(id) => {
              if (confirm('Are you sure you want to delete this customer?')) {
                deleteCustomer.mutate(id);
              }
            }}
          />
        ) : (
          <CustomerList 
            customers={filteredCustomers} 
            onViewDetails={handleViewDetails} 
            onDeleteCustomer={(id) => {
              if (confirm('Are you sure you want to delete this customer?')) {
                deleteCustomer.mutate(id);
              }
            }}
          />
        )}
      </motion.div>
      
      {/* Customer Detail Dialog */}
      {selectedCustomer && (
        <CustomerDetailDialog
          customer={selectedCustomer}
          open={isDetailOpen}
          onClose={() => setIsDetailOpen(false)}
          onEdit={(customer) => navigate(`/customers/${customer.id}`)}
        />
      )}
    </div>
  );
}
