import React from 'react';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { User, Mail, Phone } from 'lucide-react';

interface ContactDetailsFormProps {
  control: any;
  formState: any;
  prefix: string;
  required: boolean;
  trigger: any;
}

export const ContactDetailsForm = ({
  control,
  formState,
  prefix,
  required,
  trigger
}: ContactDetailsFormProps) => {
  // Helper function to safely extract error messages
  const getErrorMessage = (fieldName: string): string => {
    const errorObj = formState.errors[prefix]?.[fieldName];
    return errorObj?.message || '';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField
        control={control}
        name={`${prefix}.name`}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Full Name {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <InputWithIcon
              icon={<User className="h-4 w-4 text-indigo-400" />}
              placeholder="John Doe"
              error={getErrorMessage('name')}
              className="w-full"
              value={field.value || ''}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                if (trigger) trigger(`${prefix}.name`);
              }}
              name={field.name}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`${prefix}.email`}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Email {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <InputWithIcon
              icon={<Mail className="h-4 w-4 text-indigo-400" />}
              placeholder="john.doe@example.com"
              error={getErrorMessage('email')}
              className="w-full"
              type="email"
              value={field.value || ''}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                if (trigger) trigger(`${prefix}.email`);
              }}
              name={field.name}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`${prefix}.phone`}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Phone Number {required && <span className="text-red-500">*</span>}
            </FormLabel>
            <InputWithIcon
              icon={<Phone className="h-4 w-4 text-indigo-400" />}
              placeholder="(123) 456-7890"
              error={getErrorMessage('phone')}
              className="w-full"
              type="tel"
              value={field.value || ''}
              onChange={field.onChange}
              onBlur={() => {
                field.onBlur();
                if (trigger) trigger(`${prefix}.phone`);
              }}
              name={field.name}
            />
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name={`${prefix}.position`}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Position/Title
            </FormLabel>
            <Input
              placeholder="Operations Manager"
              className="w-full"
              value={field.value || ''}
              onChange={field.onChange}
              onBlur={field.onBlur}
              name={field.name}
            />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}; 