import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { useCustomers } from '@/hooks/use-customer';
import { useToast } from '@/hooks/use-toast';

// UI Components
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Icons
import { 
  Building, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  CreditCard, 
  FileText,
  Sparkles,
  Save,
  Loader2
} from 'lucide-react';

// EXACT SCHEMA TO MATCH SUPABASE TABLE
const formSchema = z.object({
  // Main fields matching Supabase exactly
  company_name: z.string().min(2, "Company name must be at least 2 characters"),
  status: z.string().optional().default('active'),
  currency_type: z.string().optional().default('GBP'),
  credit_limit_gbp: z.coerce.number().min(0, "Credit limit must be positive").optional().default(0),
  billing_cycle_agreement: z.string().optional(),
  restrictions_limitations: z.string().optional(),
  overdue_invoice_reminder_days: z.coerce.number().min(1).optional().default(7),
  
  // Address as JSONB object
  main_address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    postcode: z.string().min(1, "Postcode is required"),
    country: z.string().min(1, "Country is required"),
  }),
  
  // Contact objects as JSONB
  finance_contact: z.object({
    name: z.string().min(2, "Finance contact name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Phone number is required"),
  }),
  
  operations_contact: z.object({
    name: z.string().min(2, "Operations contact name is required"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(5, "Phone number is required"),
  }),
  
  pod_agreement_contact: z.object({
    name: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
  }).optional(),
  
  // Banking details as JSONB
  banking_details: z.object({
    bank_name: z.string().optional(),
    account_name: z.string().optional(),
    sort_code: z.string().optional(),
    account_number: z.string().optional(),
    iban: z.string().optional(),
  }).optional(),
  
  // Terms
  acceptedTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewCustomerForm() {
  const [activeTab, setActiveTab] = useState("company");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { createCustomer } = useCustomers();
  const isLoading = createCustomer.isPending;

  // Initialize the form with EXACT field names
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      company_name: "",
      status: "active",
      currency_type: "GBP",
      credit_limit_gbp: 5000,
      billing_cycle_agreement: "30 days",
      restrictions_limitations: "",
      overdue_invoice_reminder_days: 7,
      main_address: {
        street: "",
        city: "",
        postcode: "",
        country: "United Kingdom",
      },
      finance_contact: {
        name: "",
        email: "",
        phone: "",
      },
      operations_contact: {
        name: "",
        email: "",
        phone: "",
      },
      pod_agreement_contact: {
        name: "",
        email: "",
        phone: "",
      },
      banking_details: {
        bank_name: "",
        account_name: "",
        sort_code: "",
        account_number: "",
        iban: "",
      },
      acceptedTerms: false,
    },
  });

  // Watch form values to update completion percentage
  const watchedValues = form.watch();
  const formCompletion = Object.entries(watchedValues).reduce((acc, [key, value]) => {
    if (key === 'acceptedTerms') return acc;
    
    if (typeof value === 'object' && value !== null) {
      const nestedCompletion = Object.values(value).filter(v => !!v).length / Object.values(value).length;
      return acc + nestedCompletion / (Object.keys(watchedValues).length - 1);
    } else {
      return acc + (value ? 1 / (Object.keys(watchedValues).length - 1) : 0);
    }
  }, 0);

  // Form submission handler - NO TRANSFORMATION, DIRECT MATCH
  const onSubmit = async (data: FormValues) => {
    try {
      // Remove acceptedTerms and pass the rest directly
      const { acceptedTerms, ...customerData } = data;
      
      await createCustomer.mutateAsync(customerData);
      
      toast({
        title: "Customer Created",
        description: `${data.company_name} has been added successfully`,
      });
      
      navigate('/customers');
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  // Go to next tab
  const goToNextTab = () => {
    if (activeTab === "company") {
      form.trigger(["company_name", "status", "credit_limit_gbp"]).then((isValid) => {
        if (isValid) setActiveTab("contact");
      });
    } else if (activeTab === "contact") {
      form.trigger(["finance_contact", "operations_contact"]).then((isValid) => {
        if (isValid) setActiveTab("address");
      });
    } else if (activeTab === "address") {
      form.trigger(["main_address"]).then((isValid) => {
        if (isValid) setActiveTab("banking");
      });
    } else if (activeTab === "banking") {
      setActiveTab("terms");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Form Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-indigo-200">New Customer</h2>
            <div className="flex items-center">
              <div className="w-24 h-2 bg-indigo-900/50 rounded-full overflow-hidden mr-3">
                <motion.div 
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${formCompletion * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-sm text-indigo-300">{Math.round(formCompletion * 100)}%</span>
            </div>
          </div>
          <p className="text-indigo-400/80">Create a new customer profile</p>
        </div>

        {/* Form Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-5 mb-8 bg-indigo-900/30 p-1 border border-indigo-500/30">
            <TabsTrigger 
              value="company" 
              className="data-[state=active]:bg-indigo-600/50 data-[state=active]:text-white text-indigo-300"
            >
              <Building className="h-4 w-4 mr-2" />
              Company
            </TabsTrigger>
            <TabsTrigger 
              value="contact"
              className="data-[state=active]:bg-indigo-600/50 data-[state=active]:text-white text-indigo-300"
            >
              <User className="h-4 w-4 mr-2" />
              Contact
            </TabsTrigger>
            <TabsTrigger 
              value="address"
              className="data-[state=active]:bg-indigo-600/50 data-[state=active]:text-white text-indigo-300"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Address
            </TabsTrigger>
            <TabsTrigger 
              value="banking"
              className="data-[state=active]:bg-indigo-600/50 data-[state=active]:text-white text-indigo-300"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Banking
            </TabsTrigger>
            <TabsTrigger 
              value="terms"
              className="data-[state=active]:bg-indigo-600/50 data-[state=active]:text-white text-indigo-300"
            >
              <FileText className="h-4 w-4 mr-2" />
              Terms
            </TabsTrigger>
          </TabsList>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <Card className="bg-indigo-950/50 border-indigo-500/30">
                <CardHeader>
                <CardTitle className="text-indigo-200 flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                    Company Information
                  </CardTitle>
                <CardDescription className="text-indigo-400">
                  Basic company details and settings
                  </CardDescription>
                </CardHeader>
              <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                  name="company_name"
                    render={({ field }) => (
                      <FormItem>
                      <FormLabel className="text-indigo-300">Company Name</FormLabel>
                        <FormControl>
                            <Input 
                              {...field} 
                          placeholder="Enter company name"
                          className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                            />
                        </FormControl>
                      <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-indigo-300">Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                            <SelectTrigger className="bg-indigo-900/30 border-indigo-500/30 text-white">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                          <SelectContent>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                            </SelectContent>
                          </Select>
                        <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                    name="currency_type"
                      render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-indigo-300">Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-indigo-900/30 border-indigo-500/30 text-white">
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="USD">USD ($)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="credit_limit_gbp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Credit Limit (GBP)</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number"
                            placeholder="5000"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="overdue_invoice_reminder_days"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Overdue Reminder Days</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="number"
                            placeholder="7"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>

                <FormField
                  control={form.control}
                  name="billing_cycle_agreement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-300">Billing Cycle Agreement</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-indigo-900/30 border-indigo-500/30 text-white">
                            <SelectValue placeholder="Select billing cycle" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="30 days">30 days</SelectItem>
                          <SelectItem value="30 days EOM">30 days EOM</SelectItem>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="15 days">15 days</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="restrictions_limitations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-300">Restrictions/Limitations</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          placeholder="Any special restrictions or limitations..."
                          className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </CardContent>
              </Card>
            </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Finance Contact */}
              <Card className="bg-indigo-950/50 border-indigo-500/30">
                <CardHeader>
                  <CardTitle className="text-indigo-200 flex items-center">
                    <CreditCard className="h-5 w-5 mr-2" />
                    Finance Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="finance_contact.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Contact Name</FormLabel>
                        <FormControl>
                            <Input 
                              {...field} 
                            placeholder="Finance contact name"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                            />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="finance_contact.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Email</FormLabel>
                        <FormControl>
                            <Input 
                            {...field} 
                              type="email"
                            placeholder="finance@company.com"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                            />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="finance_contact.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Phone</FormLabel>
                        <FormControl>
                            <Input 
                            {...field} 
                              placeholder="+44 123 456 7890" 
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                            />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Operations Contact */}
              <Card className="bg-indigo-950/50 border-indigo-500/30">
                <CardHeader>
                  <CardTitle className="text-indigo-200 flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Operations Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="operations_contact.name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Contact Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Operations contact name"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operations_contact.email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Email</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="email"
                            placeholder="operations@company.com"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="operations_contact.phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Phone</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="+44 123 456 7890"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* POD Agreement Contact (Optional) */}
            <Card className="bg-indigo-950/50 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-indigo-200 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  POD Agreement Contact (Optional)
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="pod_agreement_contact.name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-300">Contact Name</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="POD contact name"
                          className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pod_agreement_contact.email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-300">Email</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          type="email"
                          placeholder="pod@company.com"
                          className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pod_agreement_contact.phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-300">Phone</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="+44 123 456 7890"
                          className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Address Tab */}
          <TabsContent value="address" className="space-y-6">
            <Card className="bg-indigo-950/50 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-indigo-200 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Main Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="main_address.street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-300">Street Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="123 Main Street"
                          className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                    name="main_address.city"
                      render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-indigo-300">City</FormLabel>
                          <FormControl>
                            <Input 
                            {...field} 
                              placeholder="London" 
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                            />
                          </FormControl>
                        <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                    name="main_address.postcode"
                      render={({ field }) => (
                        <FormItem>
                        <FormLabel className="text-indigo-300">Postcode</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                            placeholder="SW1A 1AA"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                            />
                          </FormControl>
                        <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                  name="main_address.country"
                    render={({ field }) => (
                      <FormItem>
                      <FormLabel className="text-indigo-300">Country</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                          <SelectTrigger className="bg-indigo-900/30 border-indigo-500/30 text-white">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                        <SelectContent>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Ireland">Ireland</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="Netherlands">Netherlands</SelectItem>
                          </SelectContent>
                        </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Banking Tab */}
          <TabsContent value="banking" className="space-y-6">
            <Card className="bg-indigo-950/50 border-indigo-500/30">
              <CardHeader>
                <CardTitle className="text-indigo-200 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Banking Details
                </CardTitle>
                <CardDescription className="text-indigo-400">
                  Optional banking information for payments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="banking_details.bank_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Bank Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Barclays Bank"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="banking_details.account_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Account Name</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="Company Ltd"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="banking_details.sort_code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Sort Code</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="12-34-56"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="banking_details.account_number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-300">Account Number</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            placeholder="12345678"
                            className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  </div>

                <FormField
                  control={form.control}
                  name="banking_details.iban"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-indigo-300">IBAN (Optional)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          placeholder="GB33BUKB20201555555555"
                          className="bg-indigo-900/30 border-indigo-500/30 text-white placeholder:text-indigo-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                </CardContent>
              </Card>
            </TabsContent>

          {/* Terms Tab */}
          <TabsContent value="terms" className="space-y-6">
            <Card className="bg-indigo-950/50 border-indigo-500/30">
                <CardHeader>
                <CardTitle className="text-indigo-200 flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Terms & Conditions
                  </CardTitle>
                </CardHeader>
              <CardContent>
                  <FormField
                    control={form.control}
                    name="acceptedTerms"
                    render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                        <FormLabel className="text-indigo-300">
                            I accept the terms and conditions
                          </FormLabel>
                        <FormDescription className="text-indigo-400/80">
                          You agree to our terms of service and privacy policy.
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                <FormMessage />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Form Actions */}
        <div className="flex justify-between pt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
            onClick={() => navigate('/customers')}
            className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/30"
          >
            Cancel
          </Button>

          <div className="flex space-x-2">
            {activeTab !== "terms" && (
              <Button
                type="button"
                onClick={goToNextTab}
                className="bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Next
                <Sparkles className="h-4 w-4 ml-2" />
                    </Button>
            )}

            {activeTab === "terms" && (
                    <Button 
                      type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Create Customer
                        </>
                      )}
                    </Button>
            )}
          </div>
        </div>
      </form>
    </Form>
  );
} 