
import { useState } from 'react';
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
  AlertCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import ContactDetailsForm from './ContactDetailsForm';
import { Customer } from '@/types/customer';
import { Progress } from '@/components/ui/progress';

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

  // Calculate form completion percentage
  const calculateCompletionPercentage = () => {
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
    
    return Math.round((completedFields / totalFields) * 100);
  };

  const completion = calculateCompletionPercentage();

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

  return (
    <div className="py-4">
      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-muted-foreground">Completion</span>
          <span className="text-sm font-medium">{completion}%</span>
        </div>
        <Progress value={completion} className="h-2" />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="general">
            General Information
            {form.formState.errors.name || 
             form.formState.errors.address?.street ||
             form.formState.errors.address?.city ||
             form.formState.errors.address?.postcode ||
             form.formState.errors.address?.country ? 
              <AlertCircle className="ml-2 h-4 w-4 text-destructive" /> : null}
          </TabsTrigger>
          <TabsTrigger value="contacts">
            Contact Details
            {!primaryContact ? <AlertCircle className="ml-2 h-4 w-4 text-destructive" /> : null}
          </TabsTrigger>
          <TabsTrigger value="terms">
            Terms & Credit
          </TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="general" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
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
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
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
              
              <div>
                <h3 className="text-md font-medium mb-2">Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="address.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Street Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter street address" />
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
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter city" />
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
                        <FormLabel>Postcode</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter postcode" />
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
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter country" />
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
                  <FormItem>
                    <FormLabel>Additional Notes</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter any additional notes about this customer" 
                        className="resize-none" 
                        {...field}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </TabsContent>
            
            <TabsContent value="contacts" className="space-y-6">
              <div className="space-y-6">
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="text-md font-semibold mb-2 flex items-center">
                    Primary Contact 
                    <span className="text-red-500 ml-1">*</span>
                    <span className="text-xs text-gray-500 ml-2 font-normal">(Required)</span>
                  </h3>
                  <ContactDetailsForm
                    onSave={(contact) => setPrimaryContact(contact)}
                    existingContact={primaryContact}
                    contactType="primary"
                  />
                </div>
                
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="text-md font-semibold mb-2">Invoice Contact</h3>
                  <ContactDetailsForm
                    onSave={(contact) => setInvoiceContact(contact)}
                    existingContact={invoiceContact}
                    contactType="invoice"
                  />
                </div>
                
                <div className="border border-gray-200 rounded-md p-4">
                  <h3 className="text-md font-semibold mb-2">Operations Contact</h3>
                  <ContactDetailsForm
                    onSave={(contact) => setOperationsContact(contact)}
                    existingContact={operationsContact}
                    contactType="operations"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="terms" className="space-y-6">
              <FormField
                control={form.control}
                name="creditLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Credit Limit (£)</FormLabel>
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
              
              <FormField
                control={form.control}
                name="acceptedTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <div className="flex h-6 items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={field.onChange}
                          className="h-5 w-5 rounded border-gray-300 text-tms-blue focus:ring-tms-blue"
                        />
                        {field.value ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Terms & Conditions</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Customer has accepted the terms and conditions
                      </p>
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="border rounded-md p-4">
                <div className="flex items-center mb-4">
                  <FileText className="h-5 w-5 mr-2 text-tms-blue" />
                  <h3 className="text-md font-medium">Upload Terms & Agreements</h3>
                </div>
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="mb-1 text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, DOC, or DOCX (MAX. 10MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>
            </TabsContent>
            
            {/* Form action buttons that are always visible */}
            <div className="flex justify-between pt-4 border-t">
              <div className="space-x-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    if (activeTab === "general") return;
                    if (activeTab === "contacts") setActiveTab("general");
                    if (activeTab === "terms") setActiveTab("contacts");
                  }}
                  disabled={activeTab === "general"}
                >
                  Previous
                </Button>
                
                <Button 
                  type="button" 
                  onClick={() => {
                    if (activeTab === "terms") return;
                    if (activeTab === "general") setActiveTab("contacts");
                    if (activeTab === "contacts") setActiveTab("terms");
                  }}
                  disabled={activeTab === "terms"}
                  variant="secondary"
                >
                  Next
                </Button>
              </div>
              
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Save Customer"}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default AddCustomerForm;
