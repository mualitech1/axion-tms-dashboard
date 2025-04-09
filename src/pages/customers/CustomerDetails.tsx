
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  ArrowLeft, FileText, LayoutDashboard, Users, 
  Receipt, Clock, ExternalLink, Bell
} from 'lucide-react';
import CustomerGeneralInfo from '@/components/customers/CustomerGeneralInfo';
import CustomerContacts from '@/components/customers/CustomerContacts';
import CustomerDocuments from '@/components/customers/CustomerDocuments';
import CustomerJobHistory from '@/components/customers/CustomerJobHistory';
import CustomerRateCards from '@/components/customers/CustomerRateCards';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import { Badge } from '@/components/ui/badge';

export default function CustomerDetails() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState('general');

  useEffect(() => {
    // In a real app, this would be an API call
    // Convert the string ID from URL params to a number for comparison
    const numericId = customerId ? parseInt(customerId, 10) : -1;
    const foundCustomer = customerData.find(c => c.id === numericId);
    setCustomer(foundCustomer || null);
  }, [customerId]);

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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/customers')}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{customer.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge 
                className={`${
                  customer.status === 'Active' ? 'bg-tms-green-light text-tms-green' :
                  customer.status === 'On Hold' ? 'bg-tms-yellow-light text-tms-yellow' :
                  'bg-tms-gray-200 text-tms-gray-600'
                }`}
              >
                {customer.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Last order: {new Date(customer.lastOrder).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/customers/${customerId}/portal`)}>
            <ExternalLink className="h-4 w-4 mr-2" /> Portal Access
          </Button>
          <Button variant="outline" onClick={() => navigate(`/customers/${customerId}/documents`)}>
            <FileText className="h-4 w-4 mr-2" /> Documents
          </Button>
          <Button>
            <Bell className="h-4 w-4 mr-2" /> Send Notification
          </Button>
        </div>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <Card>
          <CardHeader className="border-b pb-3">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="general" className="data-[state=active]:bg-muted">
                <LayoutDashboard className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="contacts" className="data-[state=active]:bg-muted">
                <Users className="h-4 w-4 mr-2" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-muted">
                <FileText className="h-4 w-4 mr-2" />
                Documents
              </TabsTrigger>
              <TabsTrigger value="rates" className="data-[state=active]:bg-muted">
                <Receipt className="h-4 w-4 mr-2" />
                Rate Cards
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-muted">
                <Clock className="h-4 w-4 mr-2" />
                Job History
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <CardContent className="pt-6 pb-4">
            <TabsContent value="general" className="mt-0">
              <CustomerGeneralInfo customer={customer} />
            </TabsContent>
            
            <TabsContent value="contacts" className="mt-0">
              <CustomerContacts customer={customer} />
            </TabsContent>
            
            <TabsContent value="documents" className="mt-0">
              <CustomerDocuments customer={customer} />
            </TabsContent>
            
            <TabsContent value="rates" className="mt-0">
              <CustomerRateCards customer={customer} />
            </TabsContent>
            
            <TabsContent value="history" className="mt-0">
              <CustomerJobHistory customer={customer} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
