
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';
import { Building, FileText, Mail, Phone, MapPin, CreditCard, CheckCircle, User, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import CustomerEmailSystem from '@/components/customer-portal/CustomerEmailSystem';
import CustomerDocumentsSection from '@/components/customer-portal/CustomerDocumentsSection';
import { customerData } from '@/data/customerMockData';
import { ContactPerson } from '@/types/customer';

export default function CustomerDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const customerId = id ? parseInt(id) : 0;
  
  // Find the customer from the mock data
  const customer = customerData.find(c => c.id === customerId);

  if (!customer) {
    return (
      <MainLayout title="Customer Not Found">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Customer Not Found</h2>
          <p>The customer you're looking for doesn't exist or has been removed.</p>
          <Button 
            onClick={() => window.history.back()} 
            className="mt-4"
          >
            Go Back
          </Button>
        </div>
      </MainLayout>
    );
  }

  // Mock contact persons if not available
  const contacts: ContactPerson[] = customer.contacts || [
    {
      id: 'cp1',
      name: customer.contact,
      role: 'Primary Contact',
      email: customer.email,
      phone: customer.phone,
      isPrimary: true
    }
  ];

  const handleStatusChange = (newStatus: string) => {
    toast.success(`Customer status changed to ${newStatus}`);
  };

  return (
    <MainLayout title={`${customer.name} Details`}>
      <div className="p-4 md:p-6 space-y-6 max-w-7xl mx-auto">
        {/* Animated Header with Gradient */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-6 text-white shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-full">
                <Building className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{customer.name}</h1>
                <p className="text-blue-100">{customer.email}</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge className={`text-sm px-3 py-1 ${
                customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                customer.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {customer.status}
              </Badge>
              
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white/10 hover:bg-white/20"
                onClick={() => handleStatusChange('Active')}
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Set Active
              </Button>
              
              <Button 
                size="sm" 
                variant="secondary" 
                className="bg-white/10 hover:bg-white/20"
                onClick={() => handleStatusChange('On Hold')}
              >
                <Clock className="h-4 w-4 mr-1" />
                Set On Hold
              </Button>
            </div>
          </div>
        </motion.div>
        
        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 lg:w-[600px] bg-muted/50 rounded-lg p-1">
            <TabsTrigger value="overview" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Building className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="contacts" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <User className="h-4 w-4 mr-2" />
              Contacts
            </TabsTrigger>
            <TabsTrigger value="documents" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="communication" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Mail className="h-4 w-4 mr-2" />
              Communication
            </TabsTrigger>
            <TabsTrigger value="billing" className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            {/* Overview Tab Content */}
            <TabsContent value="overview" className="mt-0 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Customer Info Card */}
                <Card className="md:col-span-2 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="h-5 w-5 mr-2 text-blue-600" />
                      Company Information
                    </CardTitle>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Company Name</h3>
                          <p className="mt-1 font-medium">{customer.name}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                          <div className="mt-1">
                            <Badge className={`${
                              customer.status === 'Active' ? 'bg-green-100 text-green-800' :
                              customer.status === 'On Hold' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {customer.status}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                          <p className="mt-1 font-medium">{customer.email}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Phone</h3>
                          <p className="mt-1 font-medium">{customer.phone}</p>
                        </div>
                      </div>

                      {customer.address && (
                        <>
                          <Separator />
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              Address
                            </h3>
                            <div className="mt-2 p-3 bg-gray-50 rounded-md">
                              <p>{customer.address.street}</p>
                              <p>{customer.address.city}, {customer.address.postcode}</p>
                              <p>{customer.address.country}</p>
                            </div>
                          </div>
                        </>
                      )}

                      {customer.notes && (
                        <>
                          <Separator />
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                            <p className="mt-2 text-gray-600">{customer.notes}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Summary */}
                <Card className="shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                      Financial Summary
                    </CardTitle>
                  </CardHeader>
                  <Separator />
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Credit Limit</h3>
                        <p className="mt-1 text-2xl font-bold text-blue-600">£{customer.creditLimit.toLocaleString()}</p>
                      </div>
                      <Separator />
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Last Order</h3>
                        <p className="mt-1 font-medium">{new Date(customer.lastOrder).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
                      </div>
                      <Separator />
                      <div className="pt-2">
                        <Button variant="outline" className="w-full">
                          <CreditCard className="h-4 w-4 mr-2" />
                          Adjust Credit Limit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            {/* Contacts Tab Content */}
            <TabsContent value="contacts" className="mt-0 animate-fade-in">
              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Contact Persons</CardTitle>
                  <Button size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="space-y-6">
                    {contacts.map(contact => (
                      <div key={contact.id} className="flex items-start justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 p-2 rounded-full">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="font-medium flex items-center">
                              {contact.name}
                              {contact.isPrimary && (
                                <Badge className="ml-2 bg-blue-100 text-blue-600 text-xs">Primary</Badge>
                              )}
                            </h3>
                            <p className="text-sm text-muted-foreground">{contact.role}</p>
                            <div className="mt-2 space-y-1">
                              <p className="text-sm flex items-center">
                                <Mail className="h-3 w-3 mr-2 text-muted-foreground" />
                                {contact.email}
                              </p>
                              <p className="text-sm flex items-center">
                                <Phone className="h-3 w-3 mr-2 text-muted-foreground" />
                                {contact.phone}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm">Edit</Button>
                          {!contact.isPrimary && (
                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50">Delete</Button>
                          )}
                        </div>
                      </div>
                    ))}

                    {contacts.length === 0 && (
                      <div className="text-center py-8">
                        <User className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                        <h3 className="text-lg font-medium">No Contacts</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          This customer doesn't have any contacts yet
                        </p>
                        <Button size="sm" className="mt-4">
                          <User className="h-4 w-4 mr-2" />
                          Add First Contact
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Documents Tab Content */}
            <TabsContent value="documents" className="mt-0 animate-fade-in">
              <CustomerDocumentsSection customer={customer} />
            </TabsContent>
            
            {/* Communication Tab Content */}
            <TabsContent value="communication" className="mt-0 animate-fade-in">
              <CustomerEmailSystem customer={customer} />
            </TabsContent>
            
            {/* Billing Tab Content */}
            <TabsContent value="billing" className="mt-0 animate-fade-in">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                    Billing Information
                  </CardTitle>
                </CardHeader>
                <Separator />
                <CardContent className="pt-6">
                  <div className="text-center py-8">
                    <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-2 opacity-50" />
                    <h3 className="text-lg font-medium">Billing Section</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      This section is under development
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
}
