
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Customer } from '@/types/customer';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { profileSchema, type ProfileFormValues } from './types';
import CompanyInfoSection from './CompanyInfoSection';
import PrimaryContactSection from './PrimaryContactSection';
import AddressSection from './AddressSection';

interface CustomerProfileFormProps {
  customer: Customer;
  onUpdateCustomer: (customer: Customer) => void;
}

const CustomerProfileForm = ({ customer, onUpdateCustomer }: CustomerProfileFormProps) => {
  const { toast } = useToast();
  
  // Ensure address is never undefined for the form
  const defaultAddress = customer.address || {
    street: '',
    city: '',
    postcode: '',
    country: ''
  };
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: customer.name,
      contact: customer.contact,
      email: customer.email,
      phone: customer.phone,
      address: defaultAddress
    },
  });

  const onSubmit = (values: ProfileFormValues) => {
    const updatedCustomer: Customer = {
      ...customer,
      name: values.name,
      contact: values.contact,
      email: values.email,
      phone: values.phone,
      address: {
        street: values.address.street,
        city: values.address.city,
        postcode: values.address.postcode,
        country: values.address.country
      }
    };
    
    onUpdateCustomer(updatedCustomer);
    
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <CompanyInfoSection form={form} />
            <PrimaryContactSection form={form} />
            <AddressSection form={form} />
            
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CustomerProfileForm;
