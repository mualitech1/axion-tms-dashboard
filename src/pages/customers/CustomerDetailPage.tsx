import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Save, Trash2, Loader2, AlertCircle, RefreshCw, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useCustomers, useCustomer } from '@/hooks/use-customer';
import CustomerHeader from '@/components/customers/CustomerHeader';
import CustomerOverview from '@/components/customers/CustomerOverview';
import CustomerMetrics from '@/components/customers/CustomerMetrics';
import CustomerJobHistory from '@/components/customers/CustomerJobHistory';
import CustomerGeneralInfo from '@/components/customers/CustomerGeneralInfo';
import CustomerContacts from '@/components/customers/CustomerContacts';
import CustomerDocuments from '@/components/customers/CustomerDocuments';
import RateCardManager from '@/components/customers/RateCardManager';
import RateCalculator from '@/components/customers/RateCalculator';
import CustomerActions from '@/components/customers/CustomerActions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Customer } from '@/types/customer';
import { generateSlug } from '@/utils/slug-utils';

// Custom hook to extract just the mutations from useCustomers
function useCustomerMutations() {
  const { updateCustomer, deleteCustomer } = useCustomers();
  return { updateCustomer, deleteCustomer };
}

export default function CustomerDetailPage() {
  // Changed from id to identifier to match the new route param
  const { identifier } = useParams<{ identifier: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');
  const [isEditing, setIsEditing] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  
  // Get the customer ID either from the query param or the identifier
  const customerId = searchParams.get('id') || identifier;
  
  // Get all customers to use for slug lookup
  const { customers: allCustomers } = useCustomers();
  
  // Use the useCustomer hook for fetching a single customer
  const {
    customer,
    isLoading,
    error
  } = useCustomer(customerId);
  
  // Get the mutation hooks for updating and deleting customers
  const { updateCustomer, deleteCustomer } = useCustomerMutations();
  
  const [updatedCustomer, setUpdatedCustomer] = useState<Customer | null>(null);
  
  // Handle case when customer isn't found by ID but might be found by slug
  useEffect(() => {
    if (error && allCustomers?.length && identifier) {
      // If we couldn't find by ID, check if the identifier is a slug
      const foundCustomer = allCustomers.find(c => generateSlug(c.name) === identifier);
      
      if (foundCustomer) {
        // Navigate to the URL with the ID as query param
        const newParams = new URLSearchParams(searchParams);
        newParams.set('id', foundCustomer.id);
        
        // Maintain the active tab in the URL
        if (activeTab && activeTab !== 'overview') {
          newParams.set('tab', activeTab);
        }
        
        // Navigate without changing the URL display but setting the ID param
        navigate(`/customers/${identifier}?${newParams.toString()}`, { replace: true });
      }
    }
  }, [error, allCustomers, identifier, searchParams, navigate, activeTab]);
  
  useEffect(() => {
    if (customer) {
      setUpdatedCustomer({ ...customer });
      
      // If we have a customer and the URL uses an ID rather than a slug,
      // update the URL to use the slug format for better SEO
      if (identifier && !isNaN(parseInt(identifier, 10)) && 
          generateSlug(customer.name) !== identifier) {
        const slug = generateSlug(customer.name);
        
        // Create new search params with the id
        const newParams = new URLSearchParams(searchParams);
        newParams.set('id', customer.id);
        
        // Redirect to the slug-based URL
        navigate(`/customers/${slug}?${newParams.toString()}`, { replace: true });
      }
    }
  }, [customer, identifier, searchParams, navigate]);
  
  useEffect(() => {
    // Update the active tab when search params change
    const tabFromParams = searchParams.get('tab');
    if (tabFromParams) {
      setActiveTab(tabFromParams);
    }
  }, [searchParams]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    // Update the URL with the new tab without losing other params
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('tab', value);
      return newParams;
    });
  };
  
  const handleSave = async () => {
    if (!customer || !updatedCustomer) return;
    
    try {
      await updateCustomer.mutateAsync({
        id: customer.id,
        name: updatedCustomer.name,
        contact: updatedCustomer.contact,
        email: updatedCustomer.email,
        phone: updatedCustomer.phone,
        status: updatedCustomer.status,
        creditLimit: updatedCustomer.creditLimit,
        address: updatedCustomer.address,
      });
      
      setIsEditing(false);
      toast({
        title: 'Customer Updated',
        description: 'Customer information has been updated successfully',
      });
      
      // Update URL if the name changed (which affects the slug)
      if (generateSlug(updatedCustomer.name) !== generateSlug(customer.name)) {
        const newSlug = generateSlug(updatedCustomer.name);
        const newParams = new URLSearchParams(searchParams);
        navigate(`/customers/${newSlug}?${newParams.toString()}`, { replace: true });
      }
    } catch (error) {
      console.error('Error updating customer:', error);
      toast({
        variant: 'destructive',
        title: 'Update Failed',
        description: 'There was an error updating this customer. Please try again.',
      });
    }
  };
  
  const handleDelete = async () => {
    if (!customer) return;
    
    try {
      await deleteCustomer.mutateAsync(customer.id);
      
      toast({
        title: 'Customer Deleted',
        description: 'Customer has been deleted successfully',
      });
      
      navigate('/customers');
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        variant: 'destructive',
        title: 'Delete Failed',
        description: 'There was an error deleting this customer. Please try again.',
      });
    }
  };
  
  const SkeletonCustomerUI = () => (
    <motion.div 
      className="p-1 md:p-4 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/customers')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Customers
        </Button>
      </div>
      
      <div className="bg-white dark:bg-indigo-950/20 p-6 rounded-xl border border-indigo-100/70 dark:border-indigo-800/30 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-7 w-80" />
            <Skeleton className="h-5 w-60" />
          </div>
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
          <Skeleton className="h-20" />
        </div>
      </div>
      
      <div className="bg-white dark:bg-indigo-950/20 p-6 rounded-xl border border-indigo-100/70 dark:border-indigo-800/30 shadow-sm">
        <div className="flex space-x-4 mb-6">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
        <Skeleton className="h-[300px] w-full" />
      </div>
    </motion.div>
  );
  
  if (isLoading) {
    return <SkeletonCustomerUI />;
  }
  
  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            An error occurred while loading the customer.
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2"
              onClick={() => navigate('/customers')}
            >
              Return to Customers
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  if (!customer) {
    return (
      <div className="container px-4 py-8 mx-auto max-w-7xl">
        <Alert>
          <AlertTitle>No customer found</AlertTitle>
          <AlertDescription>
            Could not find the requested customer.
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2"
              onClick={() => navigate('/customers')}
            >
              Return to Customers
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Button
          variant="ghost"
          size="sm"
          className="mb-4"
          onClick={() => navigate('/customers')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Customers
        </Button>
        
        <div className="space-y-6">
          <CustomerHeader 
            customer={customer} 
            onEditSuccess={(updatedCustomer) => setUpdatedCustomer(updatedCustomer)}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs 
                defaultValue="overview" 
                value={activeTab}
                onValueChange={handleTabChange}
                className="w-full"
              >
                <TabsList className="grid grid-cols-6 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="info">General Info</TabsTrigger>
                  <TabsTrigger value="contacts">Contacts</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="jobs">Job History</TabsTrigger>
                  <TabsTrigger value="rate-cards">Rate Cards</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="p-6 mt-0">
                  <div className="space-y-6">
                    <CustomerMetrics 
                      totalCalls={27}
                      totalEmails={45}
                      newCustomers={0}
                      scheduledMeetings={3}
                      activityTimestamp="Today, 14:30"
                    />
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <CustomerOverview customer={customer} />
                      </div>
                      <div>
                        <RateCalculator customer={customer} />
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="info" className="p-6 mt-0">
                  <CustomerGeneralInfo 
                    customer={customer} 
                    isEditing={isEditing}
                    onChange={(updatedInfo) => {
                      setUpdatedCustomer({ ...customer, ...updatedInfo });
                      setIsEditing(false);
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="contacts" className="p-6 mt-0">
                  <CustomerContacts customer={customer} />
                </TabsContent>
                
                <TabsContent value="documents" className="p-6 mt-0">
                  <CustomerDocuments customer={customer} />
                </TabsContent>
                
                <TabsContent value="jobs" className="p-6 mt-0">
                  <CustomerJobHistory customer={customer} />
                </TabsContent>
                
                <TabsContent value="rate-cards" className="p-6 mt-0">
                  <RateCardManager customer={customer} />
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <CustomerActions 
                customerId={customer.id} 
                customerName={customer.name}
                onNavigateTab={handleTabChange} 
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 