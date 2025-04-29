import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, ExternalLink, KeyRound, Mail, Eye, 
  UserCheck, AlertCircle, CheckCircle, Settings 
} from 'lucide-react';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CustomerPortalAccess() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [portalEnabled, setPortalEnabled] = useState(false);
  const [invitesSent, setInvitesSent] = useState(0);
  const [activeTab, setActiveTab] = useState('access');

  useEffect(() => {
    // Find customer by string ID
    const foundCustomer = customerData.find(c => c.id === customerId);
    setCustomer(foundCustomer || null);
    
    // Set portal status based on customer data
    setPortalEnabled(foundCustomer?.status === 'Active');
  }, [customerId]);

  const handleSendInvite = () => {
    setInvitesSent(invitesSent + 1);
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

  const handlePortalToggle = (checked: boolean) => {
    setPortalEnabled(checked);
    toast({
      title: checked ? "Portal Access Enabled" : "Portal Access Disabled",
      description: checked ? 
        `${customer?.name} now has access to the portal.` : 
        `${customer?.name} no longer has access to the portal.`,
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
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate(`/customers/${customerId}`)}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Customer
        </Button>
        <h1 className="text-2xl font-bold">{customer.name} Portal Access</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Customer Portal Settings</CardTitle>
                <Badge 
                  className={portalEnabled ? 
                    'bg-tms-green-light text-tms-green' : 
                    'bg-tms-gray-200 text-tms-gray-600'
                  }
                >
                  {portalEnabled ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
              <CardDescription>
                Manage portal access settings for this customer
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="access">Access Controls</TabsTrigger>
                  <TabsTrigger value="permissions">Permissions</TabsTrigger>
                  <TabsTrigger value="activity">Activity Log</TabsTrigger>
                </TabsList>
                
                <TabsContent value="access" className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-md bg-muted/50">
                    <div>
                      <h3 className="text-lg font-medium">Enable Customer Portal</h3>
                      <p className="text-sm text-muted-foreground">Allow this customer to access the self-service portal</p>
                    </div>
                    <Switch 
                      checked={portalEnabled}
                      onCheckedChange={handlePortalToggle}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <h3 className="text-lg font-medium mb-4">Portal Access</h3>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <Button onClick={handleSendInvite} disabled={!portalEnabled}>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Portal Invitation
                        </Button>
                        <Button variant="outline" onClick={handleResetPassword} disabled={!portalEnabled}>
                          <KeyRound className="mr-2 h-4 w-4" />
                          Reset Password
                        </Button>
                      </div>
                      
                      <Button variant="outline" asChild className="w-full md:w-auto" disabled={!portalEnabled}>
                        <a href="/customer-portal" target="_blank" rel="noopener noreferrer">
                          <Eye className="mr-2 h-4 w-4" />
                          Preview Customer Portal
                        </a>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="permissions" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">View Documents</h4>
                            <p className="text-sm text-muted-foreground">Access to view all uploaded documents</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Upload Documents</h4>
                            <p className="text-sm text-muted-foreground">Permission to upload new documents</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">View Invoices</h4>
                            <p className="text-sm text-muted-foreground">Access to view invoices and payment history</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">Book New Jobs</h4>
                            <p className="text-sm text-muted-foreground">Permission to create new job requests</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        {invitesSent > 0 ? (
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              <Mail className="h-5 w-5 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-medium">Portal invitation sent</p>
                              <p className="text-sm text-muted-foreground">
                                Sent to {customer.email} just now
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="py-8 text-center text-muted-foreground">
                            No recent activity to display
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portal Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                {portalEnabled ? (
                  <>
                    <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Portal Active</h3>
                      <p className="text-sm text-muted-foreground">Customer can access the portal</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">Portal Inactive</h3>
                      <p className="text-sm text-muted-foreground">Enable access above</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Portal Users</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <UserCheck className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{customer.contact}</h3>
                    <p className="text-xs text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
                <Badge>Primary</Badge>
              </div>
              
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="/customer-portal" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open Portal
                </a>
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Mail className="h-4 w-4 mr-2" />
                Contact Customer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
