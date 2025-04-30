import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Customer } from '@/types/customer';

// Import custom components
import { FormHeader } from './add-customer-form/FormHeader';
import { TabsNavigation } from './add-customer-form/TabsNavigation';
import { CompanyInfoTab } from './add-customer-form/CompanyInfoTab';
import { ContactsTab } from './add-customer-form/ContactsTab';
import { TermsTab } from './add-customer-form/TermsTab';
import { customerSchema, CustomerFormValues } from './add-customer-form/types';

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
      // Ensure address fields are not optional when creating the customer object
      const customerAddress = {
        street: values.address.street || '',
        city: values.address.city || '',
        postcode: values.address.postcode || '',
        country: values.address.country || '',
      };
      
      // Create the complete customer object with contacts
      const newCustomer: Customer = {
        ...values,
        address: customerAddress, // Use the non-optional address object
        id: Date.now().toString(), // Generate string ID from timestamp
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
        // Initialize empty collections for related data
        documents: [],
        rateCards: [],
        jobs: []
      };
      
      console.log('New Customer:', newCustomer);
      
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Now call the onAddCustomer prop if it exists
      if (onAddCustomer) {
        onAddCustomer(newCustomer);
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
    <div className="py-6 animate-fade-in">
      <FormHeader formCompletion={formCompletion} />

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsNavigation 
          activeTab={activeTab} 
          form={form} 
          primaryContact={primaryContact} 
        />
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="general">
              <CompanyInfoTab 
                form={form} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
              />
            </TabsContent>
            
            <TabsContent value="contacts">
              <ContactsTab 
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                primaryContact={primaryContact}
                setPrimaryContact={setPrimaryContact}
                invoiceContact={invoiceContact}
                setInvoiceContact={setInvoiceContact}
                operationsContact={operationsContact}
                setOperationsContact={setOperationsContact}
              />
            </TabsContent>
            
            <TabsContent value="terms">
              <TermsTab 
                form={form} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                isSubmitting={isSubmitting} 
              />
            </TabsContent>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default AddCustomerForm;
