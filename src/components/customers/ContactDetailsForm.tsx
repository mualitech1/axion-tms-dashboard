
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { User, Mail, Phone, CheckCircle } from 'lucide-react';
import { ContactPerson } from '@/types/customer';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Contact name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string().min(6, { message: 'Valid phone number is required' }),
});

type ContactFormValues = z.infer<typeof contactSchema>;

interface ContactDetailsFormProps {
  onSave: (contact: ContactPerson) => void;
  existingContact: ContactPerson | null;
  contactType: 'primary' | 'invoice' | 'operations';
}

const ContactDetailsForm = ({ 
  onSave, 
  existingContact, 
  contactType 
}: ContactDetailsFormProps) => {
  const [isSaved, setIsSaved] = useState(false);
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: existingContact?.name || '',
      email: existingContact?.email || '',
      phone: existingContact?.phone || '',
    },
  });

  // Update form when existingContact changes
  useEffect(() => {
    if (existingContact) {
      form.reset({
        name: existingContact.name,
        email: existingContact.email,
        phone: existingContact.phone,
      });
      setIsSaved(true);
    }
  }, [existingContact, form]);

  const onSubmit = (values: ContactFormValues) => {
    const contact: ContactPerson = {
      id: existingContact?.id || `temp-${Date.now()}`,
      name: values.name,
      email: values.email,
      phone: values.phone,
      role: contactType.charAt(0).toUpperCase() + contactType.slice(1),
      isPrimary: contactType === 'primary',
    };
    
    onSave(contact);
    setIsSaved(true);
  };

  const handleEdit = () => {
    setIsSaved(false);
  };

  return (
    <div>
      {isSaved ? (
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h4 className="font-medium">{form.getValues().name}</h4>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-500" />
                  <span>{form.getValues().email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-500" />
                  <span>{form.getValues().phone}</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={handleEdit}>
              Edit
            </Button>
          </div>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={User} {...field} placeholder="Contact name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={Mail} {...field} placeholder="Contact email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <InputWithIcon icon={Phone} {...field} placeholder="Contact phone" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" size="sm">Save Contact</Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};

export default ContactDetailsForm;
