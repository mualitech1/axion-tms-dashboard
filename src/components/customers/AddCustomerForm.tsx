
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Mail, 
  Phone, 
  User, 
  CreditCard,
  FileText,
  CheckCircle,
  X,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Save,
  Map,
  Briefcase,
  ChevronsRight
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import ContactDetailsForm from './ContactDetailsForm';
import { Customer } from '@/types/customer';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const customerSchema = z.object({
  name: z.string().min(2, { message: 'Company name is required' }),
  address: z.object({
    street: z.string().min(2, { message: 'Street is required' }),
    city: z.string().min(2, { message: 'City is required' }),
    postcode: z.string().min(2, { message: 'Postcode is required' }),
    country: z.string().min(2, { message: 'Country is required' }),
  }),
  status: z.string(),
  creditLimit: z.number().min(0),
  acceptedTerms: z.boolean(),
  notes: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface AddCustomerFormProps {
  onClose: () => void;
  onAddCustomer?: (customer: Customer) => void;
}

const AddCustomerForm = ({ onClose, onAddCustomer }: AddCustomerFormProps) => {
  const [activeTab, setActiveTab] = useState('general');
  const [primaryContact, setPrimaryContact] = useState<any>(null);
  const [invoiceContact, setInvoiceContact] = useState<any>(null);
  const [operationsContact, setOperationsContact] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formCompletion, setFormCompletion] = useState(0);
  
  const { toast } = useToast();
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      address: {
        street: '',
        city: '',
        postcode: '',
        country: '',
      },
      status: 'Active',
      creditLimit: 0,
      acceptedTerms: false,
      notes: '',
    },
  });

  // Watch form fields for completion percentage calculation
  const watchedFields = form.watch();
  
  // Calculate form completion percentage
  useEffect(() => {
    const calculateCompletion = () => {
      let totalFields = 7; // Base required fields (name, street, city, postal, country, status, creditLimit)
      let completedFields = 0;
      
      const values = form.getValues();
      if (values.name) completedFields++;
      if (values.address.street) completedFields++;
      if (values.address.city) completedFields++;
      if (values.address.postcode) completedFields++;
      if (values.address.country) completedFields++;
      if (values.status) completedFields++;
      if (primaryContact) completedFields++; // Add 1 for primary contact
      
      const percentage = Math.round((completedFields / totalFields) * 100);
      return Math.min(percentage, 100); // Cap at 100%
    };

    setFormCompletion(calculateCompletion());
  }, [watchedFields, primaryContact, form]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const onSubmit = async (values: CustomerFormValues) => {
    // Validation check for required contacts
    if (!primaryContact) {
      toast({
        title: "Missing Information",
        description: "Primary contact details are required",
        variant: "destructive"
      });
      setActiveTab('contacts');
      return;
    }

    setIsSubmitting(true);

    try {
      // Create the complete customer object with contacts
      const newCustomer = {
        ...values,
        id: Date.now(), // temporary ID for demo
        contacts: [
          { ...primaryContact, isPrimary: true, role: 'Primary' },
          ...(invoiceContact ? [{ ...invoiceContact, role: 'Invoice' }] : []),
          ...(operationsContact ? [{ ...operationsContact, role: 'Operations' }] : []),
        ],
        // Add required properties from Customer type
        contact: primaryContact ? primaryContact.name : '',
        email: primaryContact ? primaryContact.email : '',
        phone: primaryContact ? primaryContact.phone : '',
        lastOrder: '-',
        // Add empty collections for related data
        documents: [],
        rateCards: [],
        jobs: []
      };
      
      console.log('New Customer:', newCustomer);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Now call the onAddCustomer prop if it exists
      if (onAddCustomer) {
        onAddCustomer(newCustomer as Customer);
      }
      
      toast({
        title: "Customer Created Successfully",
        description: `${values.name} has been added to your customer list`,
      });
      
      onClose();
    } catch (error) {
      console.error("Error creating customer:", error);
      toast({
        title: "Error",
        description: "There was a problem creating the customer. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getTabIndicatorClass = (tabName: string) => {
    // Return appropriate indicator based on tab validation status
    if (tabName === 'general') {
      return form.formState.errors.name || 
             form.formState.errors.address?.street ||
             form.formState.errors.address?.city ||
             form.formState.errors.address?.postcode ||
             form.formState.errors.address?.country ? 
              <AlertCircle className="ml-2 h-4 w-4 text-destructive animate-pulse" /> : null;
    }
    if (tabName === 'contacts') {
      return !primaryContact ? <AlertCircle className="ml-2 h-4 w-4 text-destructive animate-pulse" /> : null;
    }
    return null;
  };

  // Define color classes for the progress bar based on completion percentage
  const getProgressColor = () => {
    if (formCompletion < 30) return "bg-red-500";
    if (formCompletion < 70) return "bg-amber-500"; 
    return "bg-emerald-500";
  };

  return (
    <div className="py-6 animate-fade-in">
      {/* Header with completion status */}
      <div className="mb-6">
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold tracking-tight">Add New Customer</h2>
          <p className="text-muted-foreground">
            Fill in the details to create a new customer record
          </p>
        </div>
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Completion</span>
            <span className="text-sm font-bold text-primary">{formCompletion}%</span>
          </div>
          <Progress 
            value={formCompletion} 
            className="h-2 rounded-full bg-gray-100" 
            indicatorClassName={getProgressColor()}
          />
        </div>
      </div>

      {/* Main form with enhanced tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 p-1 bg-muted/50 rounded-xl">
          <TabsTrigger 
            value="general" 
            className={cn(
              "data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-lg py-3 transition-all duration-300",
              "flex items-center gap-2"
            )}
          >
            <Building className="h-4 w-4" />
            <span>Company Information</span>
            {getTabIndicatorClass('general')}
          </TabsTrigger>
          <TabsTrigger 
            value="contacts"
            className={cn(
              "data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-lg py-3 transition-all duration-300",
              "flex items-center gap-2"
            )}
          >
            <User className="h-4 w-4" />
            <span>Contact Details</span>
            {getTabIndicatorClass('contacts')}
          </TabsTrigger>
          <TabsTrigger 
            value="terms"
            className={cn(
              "data-[state=active]:bg-white data-[state=active]:shadow-lg rounded-lg py-3 transition-all duration-300",
              "flex items-center gap-2"
            )}
          >
            <FileText className="h-4 w-4" />
            <span>Terms & Credit</span>
          </TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="general" className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center mb-4 gap-2">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Company Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Company Name</FormLabel>
                        <FormControl>
                          <InputWithIcon icon={Building} {...field} placeholder="Enter company name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="On Hold">On Hold</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center mb-4 gap-2">
                  <Map className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Address Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Street Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter street address" className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">City</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter city" className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address.postcode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Postcode</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter postcode" className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="address.country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-medium">Country</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter country" className="bg-white" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <FormLabel className="font-medium text-gray-800">Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter any additional notes about this customer" 
                        className="resize-none min-h-[120px] bg-white border border-gray-200" 
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 flex justify-between">
                <div></div> {/* Empty div for spacing */}
                <Button 
                  type="button" 
                  onClick={() => setActiveTab("contacts")}
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center gap-2"
                >
                  Continue to Contacts 
                  <ChevronsRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="contacts" className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-800">Primary Contact</h3>
                  </div>
                  <span className="bg-red-50 text-red-600 text-xs font-medium px-2.5 py-1 rounded-full border border-red-100 flex items-center">
                    <span className="w-2 h-2 bg-red-600 rounded-full mr-1.5"></span>
                    Required
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-4">This contact will be the main point of contact for this customer</p>
                <ContactDetailsForm
                  onSave={(contact) => setPrimaryContact(contact)}
                  existingContact={primaryContact}
                  contactType="primary"
                />
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold mb-0">Invoice Contact</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">This contact will receive invoices and payment requests</p>
                <ContactDetailsForm
                  onSave={(contact) => setInvoiceContact(contact)}
                  existingContact={invoiceContact}
                  contactType="invoice"
                />
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold mb-0">Operations Contact</h3>
                </div>
                <p className="text-sm text-gray-500 mb-4">This contact will handle day-to-day operational matters</p>
                <ContactDetailsForm
                  onSave={(contact) => setOperationsContact(contact)}
                  existingContact={operationsContact}
                  contactType="operations"
                />
              </div>

              <div className="mt-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab("general")}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Company Info
                </Button>
                
                <Button 
                  type="button" 
                  onClick={() => setActiveTab("terms")}
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center gap-2"
                >
                  Continue to Terms
                  <ChevronsRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="terms" className="space-y-6 animate-fade-in">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Financial Details</h3>
                </div>
                <FormField
                  control={form.control}
                  name="creditLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-medium">Credit Limit (£)</FormLabel>
                      <FormControl>
                        <InputWithIcon 
                          icon={CreditCard} 
                          type="number"
                          {...field} 
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          placeholder="Enter credit limit" 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="acceptedTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-4 p-6 bg-white rounded-xl shadow-md border border-gray-100">
                    <FormControl>
                      <div className="flex h-6 items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                        />
                        {field.value ? (
                          <CheckCircle className="h-5 w-5 text-emerald-500" />
                        ) : (
                          <X className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                    </FormControl>
                    <div className="space-y-1">
                      <FormLabel className="text-base font-medium">Terms & Conditions</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Customer has accepted the terms and conditions of service
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-medium text-gray-800">Upload Terms & Agreements</h3>
                </div>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400">PDF, DOC, or DOCX (MAX. 10MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>

              <div className="mt-4 flex justify-between">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setActiveTab("contacts")}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Contacts
                </Button>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Customer...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4" />
                      Save Customer
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default AddCustomerForm;
