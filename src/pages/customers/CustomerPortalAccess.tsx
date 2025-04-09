
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, ExternalLink, KeyRound, Mail } from 'lucide-react';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import { useToast } from '@/hooks/use-toast';

export default function CustomerPortalAccess() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [portalEnabled, setPortalEnabled] = useState(false);

  useEffect(() => {
    // In a real app, this would be an API call
    const foundCustomer = customerData.find(c => c.id === customerId);
    setCustomer(foundCustomer || null);
    // Set portal status based on customer data
    setPortalEnabled(foundCustomer?.status === 'Active');
  }, [customerId]);

  const handleSendInvite = () => {
    toast({
      title: "Invitation Sent",
      description: `Portal access invitation has been sent to ${customer?.email}`,
    });
  };

  const handleResetPassword = () => {
    toast({
      title: "Password Reset",
      description: "Password reset instructions have been sent to the customer.",
    });
  };

  if (!customer) {
    return (
      <Card className="p-6 text-center">
        <h2 className="text-xl font-semibold">Customer not found</h2>
        <p className="mt-2 text-gray-500">The customer you're looking for doesn't exist.</p>
        <Button className="mt-4" onClick={() => navigate('/customers')}>
          Back to Customers
        </Button>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate(`/customers/${customerId}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Customer
        </Button>
        <h1 className="text-2xl font-bold">{customer.name} Portal Access</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Portal Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Enable Customer Portal</h3>
              <p className="text-sm text-gray-500">Allow this customer to access the self-service portal</p>
            </div>
            <Switch 
              checked={portalEnabled}
              onCheckedChange={setPortalEnabled}
            />
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="text-lg font-medium mb-4">Portal Access</h3>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Button onClick={handleSendInvite}>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Portal Invitation
                </Button>
                <Button variant="outline" onClick={handleResetPassword}>
                  <KeyRound className="mr-2 h-4 w-4" />
                  Reset Password
                </Button>
              </div>
              
              <Button variant="outline" asChild className="w-full md:w-auto">
                <a href="/customer-portal" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Preview Customer Portal
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
