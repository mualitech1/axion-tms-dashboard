
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Building } from 'lucide-react';
import FormSectionHeader from './FormSectionHeader';
import { UseFormReturn } from 'react-hook-form';
import { ProfileFormValues } from './types';

interface CompanyInfoSectionProps {
  form: UseFormReturn<ProfileFormValues>;
}

const CompanyInfoSection = ({ form }: CompanyInfoSectionProps) => {
  return (
    <div className="space-y-4">
      <FormSectionHeader title="Company Information" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input {...field} className="pl-10" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default CompanyInfoSection;
