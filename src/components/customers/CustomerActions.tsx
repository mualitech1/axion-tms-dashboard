import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, FileText, Phone, PlusCircle, Send, User, Users, Loader2, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Customer } from "@/types/customer";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { createCustomerUrl } from "@/utils/slug-utils";

interface CustomerActionsProps {
  onAddCustomer?: (customer: Customer) => void;
  customerId?: string;
  customerName?: string;
  onNavigateTab?: (tabId: string) => void;
}

const CustomerActions = ({ 
  onAddCustomer, 
  customerId, 
  customerName = "Customer", 
  onNavigateTab 
}: CustomerActionsProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  
  const handleAddCustomer = () => {
    if (onAddCustomer) {
      // If we have a callback for adding customers, create a new customer template
      // and pass it to the callback
      const newCustomer: Customer = {
        id: '', // Will be assigned by the backend
        name: 'New Customer',
        contact: '',
        email: '',
        phone: '',
        status: 'Active',
        creditLimit: 5000,
        address: {
          street: '',
          city: '',
          postcode: '',
          country: 'United Kingdom'
        }
      };
      
      onAddCustomer(newCustomer);
    } else {
      // Otherwise, navigate to the new customer page
      navigate('/customers/new');
    }
  };
  
  const handleLogCall = async () => {
    setLoadingAction('call');
    try {
      // In a real implementation, this would open a modal or form to log a call
      // For now, we'll just show a toast as a placeholder
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      toast({
        title: 'Log Call',
        description: 'Call logging feature will be available soon.',
      });
    } finally {
      setLoadingAction(null);
    }
  };
  
  const handleScheduleMeeting = async () => {
    setLoadingAction('meeting');
    try {
      // In a real implementation, this would open a meeting scheduler interface
      // For now, we'll just show a toast as a placeholder
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      toast({
        title: 'Schedule Meeting',
        description: 'Meeting scheduler will be available soon.',
      });
    } finally {
      setLoadingAction(null);
    }
  };
  
  const handleSendEmail = async () => {
    setLoadingAction('email');
    try {
      // In a real implementation, this would open an email composition interface
      // For now, we'll just navigate to a placeholder
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      
      toast({
        title: 'Send Email',
        description: 'Email sending feature will be available soon.',
      });
    } finally {
      setLoadingAction(null);
    }
  };
  
  const handleCreateInvoice = () => {
    if (!customerId) {
      toast({
        title: 'Action unavailable',
        description: 'You need to save the customer first before creating an invoice.',
        variant: 'destructive'
      });
      return;
    }
    
    setLoadingAction('invoice');
    try {
      navigate(`/invoices/create/${customerId}`);
    } catch (error) {
      console.error('Error navigating to invoice creation:', error);
      toast({
        title: 'Navigation error',
        description: 'Failed to navigate to invoice creation page.',
        variant: 'destructive'
      });
    } finally {
      setLoadingAction(null);
    }
  };
  
  const handlePortalAccess = () => {
    setLoadingAction('portal');
    try {
      navigate('/customer-portal');
    } catch (error) {
      console.error('Error navigating to customer portal:', error);
      toast({
        title: 'Navigation error',
        description: 'Failed to navigate to customer portal.',
        variant: 'destructive'
      });
    } finally {
      setLoadingAction(null);
    }
  };
  
  const handleManageRateCards = () => {
    if (!customerId) {
      toast({
        title: 'Action unavailable',
        description: 'Rate card management is only available for existing customers.',
        variant: 'destructive'
      });
      return;
    }
    
    setLoadingAction('rateCards');
    try {
      if (onNavigateTab) {
        // Use the callback to navigate to the rate cards tab
        onNavigateTab('rate-cards');
      } else {
        // If no callback but we have a customer ID, navigate to customer detail with rate-cards tab
        navigate(createCustomerUrl(customerId, customerName, 'rate-cards'));
      }
    } catch (error) {
      console.error('Error navigating to rate cards:', error);
      toast({
        title: 'Navigation error',
        description: 'Failed to navigate to rate cards section.',
        variant: 'destructive'
      });
    } finally {
      setLoadingAction(null);
    }
  };
  
  return (
    <Card className="bg-white dark:bg-indigo-950/20 shadow-sm border border-indigo-100/50 dark:border-indigo-800/30">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-indigo-900 dark:text-indigo-200">
          Quick Actions
        </CardTitle>
        <CardDescription className="text-indigo-500 dark:text-indigo-400">
          Common customer management tasks
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-2">
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
          onClick={handleAddCustomer}
          disabled={loadingAction === 'add'}
        >
          {loadingAction === 'add' ? (
            <Loader2 className="h-5 w-5 text-green-500 dark:text-green-400 animate-spin" />
          ) : (
            <PlusCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
          )}
          <span className="text-xs font-medium">Add Customer</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
          onClick={handleLogCall}
          disabled={loadingAction === 'call'}
        >
          {loadingAction === 'call' ? (
            <Loader2 className="h-5 w-5 text-blue-500 dark:text-blue-400 animate-spin" />
          ) : (
            <Phone className="h-5 w-5 text-blue-500 dark:text-blue-400" />
          )}
          <span className="text-xs font-medium">Log Call</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
          onClick={handleScheduleMeeting}
          disabled={loadingAction === 'meeting'}
        >
          {loadingAction === 'meeting' ? (
            <Loader2 className="h-5 w-5 text-amber-500 dark:text-amber-400 animate-spin" />
          ) : (
            <Calendar className="h-5 w-5 text-amber-500 dark:text-amber-400" />
          )}
          <span className="text-xs font-medium">Schedule Meeting</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
          onClick={handleSendEmail}
          disabled={loadingAction === 'email'}
        >
          {loadingAction === 'email' ? (
            <Loader2 className="h-5 w-5 text-indigo-500 dark:text-indigo-400 animate-spin" />
          ) : (
            <Send className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />
          )}
          <span className="text-xs font-medium">Send Email</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
          onClick={handleCreateInvoice}
          disabled={loadingAction === 'invoice' || !customerId}
        >
          {loadingAction === 'invoice' ? (
            <Loader2 className="h-5 w-5 text-pink-500 dark:text-pink-400 animate-spin" />
          ) : (
            <FileText className="h-5 w-5 text-pink-500 dark:text-pink-400" />
          )}
          <span className="text-xs font-medium">Create Invoice</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
          onClick={handleManageRateCards}
          disabled={loadingAction === 'rateCards' || !customerId}
        >
          {loadingAction === 'rateCards' ? (
            <Loader2 className="h-5 w-5 text-teal-500 dark:text-teal-400 animate-spin" />
          ) : (
            <Calculator className="h-5 w-5 text-teal-500 dark:text-teal-400" />
          )}
          <span className="text-xs font-medium">Manage Rate Cards</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-indigo-100 hover:border-indigo-300 dark:border-indigo-800/50 dark:hover:border-indigo-700"
          onClick={handlePortalAccess}
          disabled={loadingAction === 'portal'}
        >
          {loadingAction === 'portal' ? (
            <Loader2 className="h-5 w-5 text-purple-500 dark:text-purple-400 animate-spin" />
          ) : (
            <User className="h-5 w-5 text-purple-500 dark:text-purple-400" />
          )}
          <span className="text-xs font-medium">Portal Access</span>
        </Button>
      </CardContent>
    </Card>
  );
};

export default CustomerActions;
