import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables, Database } from '@/integrations/supabase/types';
import { 
  Plus, 
  Search, 
  Filter, 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  User, 
  Clock,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Download,
  MoreHorizontal,
  Users
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useFormValidation } from '@/hooks/use-form-validation';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Customer = Tables<'customers'>;

// Define JSONB field interfaces
interface ContactData {
  name?: string;
  email?: string;
  phone?: string;
}

interface AddressData {
  street?: string;
  city?: string;
  postcode?: string;
  country?: string;
}

// Customer schema matching EXACT database structure
const customerSchema = z.object({
  // Basic Info
  name: z.string().min(1, "Company name is required"),
  contact_name: z.string().optional(),
  email: z.union([z.string().email("Invalid email"), z.literal("")]).optional(),
  phone: z.string().optional(),
  status: z.string().optional(),
  
  // Address fields for address JSONB
  street: z.string().optional(),
  city: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
  
  // Financial Info
  credit_limit: z.union([z.string(), z.number()]).optional(),
});

type CustomerFormData = z.infer<typeof customerSchema>;

const statusColors = {
  active: 'bg-green-100 text-green-800',
  inactive: 'bg-gray-100 text-gray-800',
  pending: 'bg-yellow-100 text-yellow-800',
  suspended: 'bg-red-100 text-red-800',
};

export default function Customers() {
  console.log('[Customers] Component rendering');
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const {
    formData,
    errors,
    handleChange,
    validateForm,
    resetForm,
    setFormValues,
  } = useFormValidation<typeof customerSchema>(customerSchema, {
    // Basic Info
    name: '',
    contact_name: '',
    email: '',
    phone: '',
    status: 'active',
    
    // Address
    street: '',
    city: '',
    postcode: '',
    country: 'United Kingdom',
    
    // Financial
    credit_limit: '',
  });

  useEffect(() => {
    console.log('[Customers] useEffect for loadCustomers running');
    loadCustomers();
  }, []);

  useEffect(() => {
    console.log('[Customers] useEffect for filterCustomers running. Dependencies:', { customersLength: customers.length, searchTerm, statusFilter });
    filterCustomers();
  }, [customers, searchTerm, statusFilter]);

  const loadCustomers = async () => {
    console.log('[DEBUG] loadCustomers: Starting - about to query CUSTOMERS table');
    console.log('[DEBUG] Supabase client:', supabase);
    console.log('[DEBUG] Current timestamp:', new Date().toISOString());
    
    setLoading(true);
    try {
      console.log('[DEBUG] About to call Supabase query...');
      
      // Check if table exists first
      const { data: tableCheck, error: tableError } = await supabase
        .from('customers')
        .select('id, company_name, created_at')
        .limit(1);
        
      console.log('[DEBUG] Table check result:', { data: tableCheck, error: tableError });
      
      if (tableError) {
        console.error('[DEBUG] Table check failed:', tableError);
        throw tableError;
      }
      
      console.log('[DEBUG] Table exists, proceeding with full query...');
      
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .order('created_at', { ascending: false });
        
      console.log('[DEBUG] Full query result:', { data, error });
      console.log('[DEBUG] Data length:', data?.length);

      if (error) {
        console.error('[DEBUG] Database error:', error);
        throw error;
      }

      setCustomers(data || []);
      console.log('[DEBUG] Customers loaded successfully:', data?.length || 0);
    } catch (error) {
      console.error('[DEBUG] Caught error in loadCustomers:', error);
      setCustomers([]);
      toast({
        title: 'Error loading customers',
        description: error instanceof Error ? error.message : 'Failed to load customers from customers table',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
      console.log('[DEBUG] loadCustomers finished');
    }
  };

  // Production-ready sample data creation
  const createSampleCustomers = async () => {
    try {
      setLoading(true);
      toast({ title: "Creating Sample Data", description: "Adding sample customers..." });
      
      const sampleCustomers = [
        {
          company_name: "Acme Logistics Ltd",
          main_address: {
            street: "123 Business Park Way",
            city: "London",
            postcode: "SW1A 1AA",
            country: "United Kingdom"
          },
          operations_contact: {
            name: "John Smith",
            email: "john.smith@acmelogistics.co.uk",
            phone: "+44 20 7123 4567"
          },
          finance_contact: {
            name: "John Smith",
            email: "john.smith@acmelogistics.co.uk",
            phone: "+44 20 7123 4567"
          },
          credit_limit_gbp: 50000,
          currency_type: "GBP",
          status: "active"
        },
        {
          company_name: "Global Trade Solutions",
          main_address: {
            street: "456 Industrial Estate",
            city: "Manchester",
            postcode: "M1 1AB",
            country: "United Kingdom"
          },
          operations_contact: {
            name: "Sarah Johnson",
            email: "sarah.johnson@globaltrade.com",
            phone: "+44 161 987 6543"
          },
          finance_contact: {
            name: "Sarah Johnson",
            email: "sarah.johnson@globaltrade.com",
            phone: "+44 161 987 6543"
          },
          credit_limit_gbp: 75000,
          currency_type: "GBP",
          status: "active"
        },
        {
          company_name: "Premium Freight Co",
          main_address: {
            street: "789 Transport Hub",
            city: "Birmingham",
            postcode: "B1 2CD",
            country: "United Kingdom"
          },
          operations_contact: {
            name: "Michael Brown",
            email: "m.brown@premiumfreight.co.uk",
            phone: "+44 121 555 0123"
          },
          finance_contact: {
            name: "Michael Brown",
            email: "m.brown@premiumfreight.co.uk",
            phone: "+44 121 555 0123"
          },
          credit_limit_gbp: 100000,
          currency_type: "GBP",
          status: "active"
        }
      ];

      const { data, error } = await supabase
        .from('customers')
        .insert(sampleCustomers)
        .select();

      if (error) {
        console.error('[Customers] Sample data creation error:', error);
        toast({ 
          title: "Creation Error", 
          description: `Failed to create sample data: ${error.message}`,
          variant: "destructive" 
        });
      } else {
        console.log('[Customers] Sample data created successfully:', data);
        toast({ 
          title: "Success", 
          description: `Created ${data?.length || 0} sample customers successfully!` 
        });
        loadCustomers(); // Reload the list
      }
    } catch (error: unknown) {
      console.error('[Customers] Sample data creation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast({
        title: "Error",
        description: `Failed to create sample data: ${errorMessage}`,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterCustomers = () => {
    let filtered = customers;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(customer => {
        const opsContact = customer.operations_contact as ContactData;
        const financeContact = customer.finance_contact as ContactData;
        
        return customer.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opsContact?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          opsContact?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          financeContact?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          financeContact?.name?.toLowerCase().includes(searchTerm.toLowerCase());
      });
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(customer => customer.status === statusFilter);
    }

    setFilteredCustomers(filtered);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('[Customers] handleSubmit: Form submitted. FormData:', formData);
    console.log('[Customers] handleSubmit: Current errors:', errors);

    const validationResult = customerSchema.safeParse(formData);
    console.log('[Customers] handleSubmit: Validation result:', validationResult);

    if (!validationResult.success) {
      console.log('[Customers] handleSubmit: Validation failed. ZodError:', validationResult.error.issues);
      const validationErrors: Record<string, string> = {};
      validationResult.error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          validationErrors[issue.path[0] as string] = issue.message;
        }
      });
      toast({
        title: "Validation Error",
        description: "Please check the form fields and try again.",
        variant: "destructive"
      });
      return;
    }

    try {
      setSubmitting(true);
      
      // Transform form data to match customers table schema
      const customerData = {
        company_name: formData.name,
        main_address: {
          street: formData.street || "",
          city: formData.city || "",
          postcode: formData.postcode || "",
          country: formData.country || "United Kingdom"
        },
        operations_contact: {
          name: formData.contact_name || "",
          email: formData.email || "",
          phone: formData.phone || ""
        },
        finance_contact: {
          name: formData.contact_name || "",
          email: formData.email || "", 
          phone: formData.phone || ""
        },
        credit_limit_gbp: formData.credit_limit ? Number(formData.credit_limit) : 0,
        currency_type: "GBP",
        status: formData.status || 'active'
      };

      console.log('[DEBUG] customerData being sent to Supabase:', customerData);

      if (editingCustomer) {
        const { error } = await supabase
          .from('customers')
          .update(customerData)
          .eq('id', editingCustomer.id);

        if (error) {
          console.error('[Customers] Update error:', error);
          toast({ title: "Update Error", description: error.message, variant: "destructive" });
          return;
        }
        toast({ title: "Success", description: "Customer updated successfully!" });
      } else {
        const { error } = await supabase
          .from('customers')
          .insert([customerData]);

        if (error) {
          console.error('[Customers] Insert error:', error);
          toast({ title: "Insert Error", description: error.message, variant: "destructive" });
          return;
        }
        toast({ title: "Success", description: "Customer created successfully!" });
      }

      // Reset form and reload
      resetForm();
      setEditingCustomer(null);
      setIsCreateDialogOpen(false);
      loadCustomers();

    } catch (error: unknown) {
      console.error('[Customers] handleSubmit: CAUGHT error:', error);
      const errorMessage = error instanceof Error ? error.message : "Failed to save customer";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (customer: any) => {
    console.log('[Customers] handleEdit: Editing customer:', customer);
    const addressData = customer.main_address || {};
    const contactData = customer.operations_contact || {};
    setFormValues({
      name: customer.company_name || '',
      contact_name: contactData.name || '',
      email: contactData.email || '',
      phone: contactData.phone || '',
      street: addressData.street || '',
      city: addressData.city || '',
      postcode: addressData.postcode || '',
      country: addressData.country || '',
      credit_limit: customer.credit_limit_gbp?.toString() || '',
      status: customer.status || 'active'
    });
    setEditingCustomer(customer);
    setIsCreateDialogOpen(true);
  };

  const handleDelete = async (customerId: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;

    try {
      const { error } = await supabase
        .from('customers')
        .delete()
        .eq('id', customerId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Customer deleted successfully",
      });

      loadCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      toast({
        title: "Error",
        description: "Failed to delete customer",
        variant: "destructive"
      });
    }
  };

  const handleStatusChange = async (customerId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('customers')
        .update({ 
          status: newStatus
        })
        .eq('id', customerId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Customer status updated successfully",
      });

      loadCustomers();
    } catch (error) {
      console.error('Error updating customer status:', error);
      toast({
        title: "Error",
        description: "Failed to update customer status",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const closeDialog = () => {
    setIsCreateDialogOpen(false);
    setEditingCustomer(null);
    resetForm();
  };

  // TEMPORARY TEST FUNCTION
  const testSupabaseQuery = async () => {
    console.log('[TEMP TEST] testSupabaseQuery: Button clicked, attempting query...');
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('id, company_name')
        .limit(5);

      console.log('[TEMP TEST] testSupabaseQuery: Query finished.');
      console.log('[TEMP TEST] testSupabaseQuery: Data:', data);
      console.log('[TEMP TEST] testSupabaseQuery: Error:', error);
      if (error) {
        toast({ title: "Temp Test Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Temp Test Success", description: `Fetched ${data?.length || 0} records.` });
      }
    } catch (catchError: unknown) {
      console.error('[TEMP TEST] testSupabaseQuery: CAUGHT error:', catchError);
      const errorMessage = catchError instanceof Error ? catchError.message : "Unknown error";
      toast({ title: "Temp Test Catch Error", description: errorMessage, variant: "destructive" });
    }
  };

  console.log('[Customers] About to render. Loading state:', loading);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading customers...</p>
          </div>
        </div>
      </div>
    );
  }

  console.log('[Customers] Rendering main content. Filtered customers count:', filteredCustomers.length);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Customers</h1>
        <div className="flex gap-2">
          {customers.length === 0 && (
            <Button 
              onClick={createSampleCustomers}
              variant="outline"
              className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Sample Data
            </Button>
          )}
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Empty State */}
      {customers.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No customers found</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Get started by adding your first customer or create some sample data to explore the features.
          </p>
          <div className="flex gap-3 justify-center">
            <Button onClick={createSampleCustomers} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Create Sample Data
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Customer
            </Button>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      {customers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customers.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.status === 'active').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {customers.filter(c => c.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Credit</CardTitle>
              <div className="h-4 w-4 text-muted-foreground">£</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                £{customers.reduce((sum, c) => sum + (Number(c.credit_limit_gbp) || 0), 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Customers Table */}
      {filteredCustomers.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Customer List ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Credit Limit</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => {
                  const address = customer.main_address as AddressData;
                  return (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{customer.company_name}</div>
                          <div className="text-sm text-gray-500">{(customer.operations_contact as ContactData)?.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{(customer.operations_contact as ContactData)?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{(customer.operations_contact as ContactData)?.phone || 'N/A'}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {address?.city && address?.country ? 
                            `${address.city}, ${address.country}` : 
                            'No address'
                          }
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[customer.status as keyof typeof statusColors] || statusColors.inactive}>
                          {customer.status || 'inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        £{Number(customer.credit_limit_gbp || 0).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleEdit(customer)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDelete(customer.id)}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Create/Edit Customer Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingCustomer ? 'Edit Customer' : 'Add New Customer'}
            </DialogTitle>
            <DialogDescription>
              {editingCustomer 
                ? 'Update customer information below.'
                : 'Enter the customer details below to add them to your database.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="address">Address</TabsTrigger>
                <TabsTrigger value="financial">Financial</TabsTrigger>
              </TabsList>
              
              {/* Basic Info Tab */}
              <TabsContent value="basic" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Company Name *</Label>
                    <InputWithIcon
                      id="name"
                      name="name"
                      icon={Building2}
                      placeholder="Enter company name"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact_name">Contact Person</Label>
                    <InputWithIcon
                      id="contact_name"
                      name="contact_name"
                      icon={User}
                      placeholder="Enter contact person name"
                      value={formData.contact_name || ''}
                      onChange={handleChange}
                      error={errors.contact_name}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <InputWithIcon
                      id="email"
                      name="email"
                      type="email"
                      icon={Mail}
                      placeholder="Enter email address"
                      value={formData.email || ''}
                      onChange={handleChange}
                      error={errors.email}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <InputWithIcon
                      id="phone"
                      name="phone"
                      icon={Phone}
                      placeholder="Enter phone number"
                      value={formData.phone || ''}
                      onChange={handleChange}
                      error={errors.phone}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status || 'active'}
                      onValueChange={(value) => handleChange({ target: { name: 'status', value } } as React.ChangeEvent<HTMLInputElement>)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.status && (
                      <p className="text-sm text-red-600 mt-1">{errors.status}</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Address Tab */}
              <TabsContent value="address" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="street">Street Address</Label>
                    <InputWithIcon
                      id="street"
                      name="street"
                      icon={MapPin}
                      placeholder="Enter full address"
                      value={formData.street || ''}
                      onChange={handleChange}
                      error={errors.street}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      placeholder="Enter city"
                      value={formData.city || ''}
                      onChange={handleChange}
                    />
                    {errors.city && (
                      <p className="text-sm text-red-600 mt-1">{errors.city}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="postcode">Postal Code</Label>
                    <Input
                      id="postcode"
                      name="postcode"
                      placeholder="Enter postal code"
                      value={formData.postcode || ''}
                      onChange={handleChange}
                    />
                    {errors.postcode && (
                      <p className="text-sm text-red-600 mt-1">{errors.postcode}</p>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="country">Country</Label>
                    <Select
                      value={formData.country || 'United Kingdom'}
                      onValueChange={(value) => handleChange({ target: { name: 'country', value } } as React.ChangeEvent<HTMLInputElement>)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                        <SelectItem value="Ireland">Ireland</SelectItem>
                        <SelectItem value="France">France</SelectItem>
                        <SelectItem value="Germany">Germany</SelectItem>
                        <SelectItem value="Netherlands">Netherlands</SelectItem>
                        <SelectItem value="Belgium">Belgium</SelectItem>
                        <SelectItem value="Spain">Spain</SelectItem>
                        <SelectItem value="Italy">Italy</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.country && (
                      <p className="text-sm text-red-600 mt-1">{errors.country}</p>
                    )}
                  </div>
                </div>
              </TabsContent>
              
              {/* Financial Tab */}
              <TabsContent value="financial" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="credit_limit">Credit Limit</Label>
                    <Input
                      id="credit_limit"
                      name="credit_limit"
                      type="number"
                      placeholder="Enter credit limit"
                      value={formData.credit_limit || ''}
                      onChange={handleChange}
                    />
                    {errors.credit_limit && (
                      <p className="text-sm text-red-600 mt-1">{errors.credit_limit}</p>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {editingCustomer ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  editingCustomer ? 'Update Customer' : 'Create Customer'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
