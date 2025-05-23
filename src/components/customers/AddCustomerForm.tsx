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
import { customerFormSchema, CustomerFormValues } from './add-customer-form/types';

interface AddCustomerFormProps {
  formData: Partial<Customer>;
  onChange: (field: string, value: any) => void;
}

const AddCustomerForm = ({ formData, onChange }: AddCustomerFormProps) => {
  const [activeTab, setActiveTab] = useState('general');
  const [primaryContact, setPrimaryContact] = useState<any>(null);
  const [invoiceContact, setInvoiceContact] = useState<any>(null);
  const [operationsContact, setOperationsContact] = useState<any>(null);
  const [formCompletion, setFormCompletion] = useState(0);
  
  const { toast } = useToast();
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: formData.name || '',
      address: {
        street: formData.address?.street || '',
        city: formData.address?.city || '',
        postcode: formData.address?.postcode || '',
        country: formData.address?.country || '',
      },
      status: formData.status || 'Active',
      creditLimit: formData.creditLimit || 0,
      acceptedTerms: formData.acceptedTerms || false,
      notes: formData.notes || '',
    },
  });

  // Watch form fields for completion percentage calculation
  const watchedFields = form.watch();
  
  // Update parent component when form values change
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name && type === 'change') {
        // Handle nested fields
        if (name.startsWith('address.')) {
          const field = name.split('.')[1];
          onChange('address.' + field, value.address?.[field as keyof typeof value.address] || '');
        } else {
          onChange(name, value[name as keyof typeof value] || '');
        }
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form, onChange]);
  
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
          <div className="space-y-6">
            <TabsContent value="general">
              <CompanyInfoTab 
                form={form} 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
              />
            </TabsContent>
            
            <TabsContent value="contacts">
              <ContactsTab 
                control={form.control}
                formState={form.formState}
                trigger={form.trigger}
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
                isSubmitting={false} 
              />
            </TabsContent>
          </div>
        </Form>
      </Tabs>
    </div>
  );
};

export default AddCustomerForm;
