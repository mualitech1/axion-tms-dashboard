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

// Form schema
const formSchema = z.object({
  // Company Info
  name: z.string().min(2, "Company name must be at least 2 characters"),
  status: z.string().min(1, "Status is required"),
  creditLimit: z.coerce.number().min(0, "Credit limit must be a positive number"),
  notes: z.string().optional(),
  
  // Primary Contact
  contact: z.string().min(2, "Contact name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(5, "Phone number is required"),
  
  // Address
  address: z.object({
    street: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    postcode: z.string().min(1, "Postcode is required"),
    country: z.string().min(1, "Country is required"),
  }),
  
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

  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      status: "Active",
      creditLimit: 5000,
      notes: "",
      contact: "",
      email: "",
      phone: "",
      address: {
        street: "",
        city: "",
        postcode: "",
        country: "United Kingdom",
      },
      acceptedTerms: false,
    },
  });

  // Watch form values to update completion percentage
  const watchedValues = form.watch();
  const formCompletion = Object.entries(watchedValues).reduce((acc, [key, value]) => {
    // Skip checking terms for completion percentage
    if (key === 'acceptedTerms') return acc;
    
    // Check if the field has a value
    if (typeof value === 'object' && value !== null) {
      // For nested objects like address
      const nestedCompletion = Object.values(value).filter(v => !!v).length / Object.values(value).length;
      return acc + nestedCompletion / (Object.keys(watchedValues).length - 1); // -1 for acceptedTerms
    } else {
      return acc + (value ? 1 / (Object.keys(watchedValues).length - 1) : 0); // -1 for acceptedTerms
    }
  }, 0);

  // Form submission handler
  const onSubmit = async (data: FormValues) => {
    try {
      await createCustomer.mutateAsync({
        name: data.name,
        contact: data.contact,
        email: data.email,
        phone: data.phone,
        status: data.status,
        creditLimit: data.creditLimit,
        address: data.address,
        acceptedTerms: data.acceptedTerms,
        notes: data.notes,
      });
      
      toast({
        title: "Customer Created",
        description: `${data.name} has been added to your quantum network`,
      });
      
      navigate('/customers');
    } catch (error) {
      console.error("Error creating customer:", error);
      // Toast is already handled by the mutation error handler
    }
  };

  // Go to next tab
  const goToNextTab = () => {
    if (activeTab === "company") {
      // Validate company fields before proceeding
      form.trigger(["name", "status", "creditLimit"]).then((isValid) => {
        if (isValid) setActiveTab("contact");
      });
    } else if (activeTab === "contact") {
      // Validate contact fields before proceeding
      form.trigger(["contact", "email", "phone"]).then((isValid) => {
        if (isValid) setActiveTab("address");
      });
    } else if (activeTab === "address") {
      // Validate address fields before proceeding
      form.trigger(["address"]).then((isValid) => {
        if (isValid) setActiveTab("terms");
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Form Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-indigo-200">New Quantum Entity</h2>
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
          <p className="text-indigo-400/80">Create a new entity in your quantum network with full dimension access</p>
        </div>

        {/* Form Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-4 mb-8 bg-indigo-900/30 p-1 border border-indigo-500/30">
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
              value="terms"
              className="data-[state=active]:bg-indigo-600/50 data-[state=active]:text-white text-indigo-300"
            >
              <FileText className="h-4 w-4 mr-2" />
              Terms
            </TabsTrigger>
          </TabsList>

          <div>
            {/* Company Information */}
            <TabsContent value="company" className="space-y-4 animate-in fade-in-50">
              <Card className="border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm shadow-[0_0_15px_-3px] shadow-indigo-500/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-200">
                    <Building className="h-5 w-5 mr-2 text-indigo-400" />
                    Company Information
                  </CardTitle>
                  <CardDescription className="text-indigo-400/70">
                    Basic details about the organization
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200">Company Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                            <Input 
                              placeholder="Quantum Logistics Ltd" 
                              className="pl-10 bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-pink-400" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200">Status</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-indigo-900 border-indigo-500/30 text-indigo-100">
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Inactive">Inactive</SelectItem>
                              <SelectItem value="On Hold">On Hold</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-pink-400" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="creditLimit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200">Credit Limit</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                              <Input 
                                type="number" 
                                placeholder="5000" 
                                className="pl-10 bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-pink-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200">Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Additional information about this customer..." 
                            className="min-h-[100px] bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-pink-400" />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button 
                      type="button" 
                      onClick={goToNextTab}
                      className="bg-indigo-600/80 hover:bg-indigo-700/90 text-white backdrop-blur-sm border border-indigo-500/30 shadow-[0_0_15px_-3px] shadow-indigo-500/40"
                    >
                      Next
                      <Sparkles className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Information */}
            <TabsContent value="contact" className="space-y-4 animate-in fade-in-50">
              <Card className="border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm shadow-[0_0_15px_-3px] shadow-indigo-500/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-200">
                    <User className="h-5 w-5 mr-2 text-indigo-400" />
                    Primary Contact
                  </CardTitle>
                  <CardDescription className="text-indigo-400/70">
                    Main point of contact for this customer
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="contact"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200">Contact Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                            <Input 
                              placeholder="John Doe" 
                              className="pl-10 bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-pink-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200">Email Address</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                            <Input 
                              type="email"
                              placeholder="john.doe@example.com" 
                              className="pl-10 bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-pink-400" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200">Phone Number</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-400" />
                            <Input 
                              placeholder="+44 123 456 7890" 
                              className="pl-10 bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50"
                              {...field} 
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-pink-400" />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveTab("company")}
                      className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/50"
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={goToNextTab}
                      className="bg-indigo-600/80 hover:bg-indigo-700/90 text-white backdrop-blur-sm border border-indigo-500/30 shadow-[0_0_15px_-3px] shadow-indigo-500/40"
                    >
                      Next
                      <Sparkles className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Address Information */}
            <TabsContent value="address" className="space-y-4 animate-in fade-in-50">
              <Card className="border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm shadow-[0_0_15px_-3px] shadow-indigo-500/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-200">
                    <MapPin className="h-5 w-5 mr-2 text-indigo-400" />
                    Company Address
                  </CardTitle>
                  <CardDescription className="text-indigo-400/70">
                    Physical location information
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200">Street Address</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123 Quantum Road" 
                            className="bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage className="text-pink-400" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="address.city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200">City</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="London" 
                              className="bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-pink-400" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="address.postcode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-indigo-200">Postcode</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="EC1A 1BB" 
                              className="bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-pink-400" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-indigo-200">Country</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-indigo-900/20 border-indigo-500/30 text-indigo-100 focus-visible:ring-indigo-500/50">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-indigo-900 border-indigo-500/30 text-indigo-100">
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="United States">United States</SelectItem>
                            <SelectItem value="Canada">Canada</SelectItem>
                            <SelectItem value="Australia">Australia</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="Spain">Spain</SelectItem>
                            <SelectItem value="Italy">Italy</SelectItem>
                            <SelectItem value="Netherlands">Netherlands</SelectItem>
                            <SelectItem value="Belgium">Belgium</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-pink-400" />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveTab("contact")}
                      className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/50"
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={goToNextTab}
                      className="bg-indigo-600/80 hover:bg-indigo-700/90 text-white backdrop-blur-sm border border-indigo-500/30 shadow-[0_0_15px_-3px] shadow-indigo-500/40"
                    >
                      Next
                      <Sparkles className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Terms and Conditions */}
            <TabsContent value="terms" className="space-y-4 animate-in fade-in-50">
              <Card className="border-indigo-500/20 bg-indigo-950/30 backdrop-blur-sm shadow-[0_0_15px_-3px] shadow-indigo-500/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-indigo-200">
                    <FileText className="h-5 w-5 mr-2 text-indigo-400" />
                    Terms and Conditions
                  </CardTitle>
                  <CardDescription className="text-indigo-400/70">
                    Review and accept the terms of service
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-6">
                  <div className="p-4 border border-indigo-500/20 rounded-md bg-indigo-900/10 text-indigo-300 text-sm leading-relaxed h-64 overflow-y-auto">
                    <h3 className="font-medium mb-2">Quantum Transport Management System Terms</h3>
                    <p className="mb-4">
                      By accepting these terms, you acknowledge that all data entered into this 
                      system will be stored according to our data protection policies. IKB Transport LTD 
                      takes data security seriously and implements appropriate measures to protect your information.
                    </p>
                    <p className="mb-4">
                      As a customer in our system, you will be provided with appropriate access levels
                      to view your shipments, update your information, and communicate with our team.
                      All system activity is logged for security purposes.
                    </p>
                    <p className="mb-4">
                      Credit limits assigned to your account must be respected, and any changes to these
                      limits must be requested through proper channels. The company reserves the right to 
                      adjust credit terms based on payment history and financial assessments.
                    </p>
                    <p>
                      These terms can be updated from time to time, and customers will be notified of
                      any significant changes that may affect their use of the system or their relationship
                      with IKB Transport LTD.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="acceptedTerms"
                    render={({ field }) => (
                      <FormItem className="flex items-start space-x-3 space-y-0 pb-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-indigo-500/50 text-indigo-500 data-[state=checked]:bg-indigo-500"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-indigo-200">
                            I accept the terms and conditions
                          </FormLabel>
                          <FormDescription className="text-indigo-400/70">
                            You must accept these terms before creating an account
                          </FormDescription>
                          <FormMessage className="text-pink-400" />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveTab("address")}
                      className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/50"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      disabled={isLoading || !form.formState.isValid}
                      className="bg-indigo-600/80 hover:bg-indigo-700/90 text-white backdrop-blur-sm border border-indigo-500/30 shadow-[0_0_15px_-3px] shadow-indigo-500/40"
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
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </form>
    </Form>
  );
} 