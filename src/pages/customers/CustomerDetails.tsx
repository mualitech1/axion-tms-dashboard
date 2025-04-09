
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText, LayoutDashboard, Users } from 'lucide-react';
import CustomerGeneralInfo from '@/components/customers/CustomerGeneralInfo';
import CustomerContacts from '@/components/customers/CustomerContacts';
import CustomerDocuments from '@/components/customers/CustomerDocuments';
import CustomerJobHistory from '@/components/customers/CustomerJobHistory';
import CustomerRateCards from '@/components/customers/CustomerRateCards';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';

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
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={() => navigate('/customers')}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Back
        </Button>
        <h1 className="text-2xl font-bold">{customer.name}</h1>
      </div>

      <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="general">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="contacts">
            <Users className="h-4 w-4 mr-2" />
            Contacts
          </TabsTrigger>
          <TabsTrigger value="documents">
            <FileText className="h-4 w-4 mr-2" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="rates">Rate Cards</TabsTrigger>
          <TabsTrigger value="history">Job History</TabsTrigger>
        </TabsList>
        
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
      </Tabs>
    </div>
  );
}
