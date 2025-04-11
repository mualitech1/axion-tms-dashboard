
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Building, Map, Briefcase, ChevronsRight } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { CustomerFormValues } from './types';
import { FormNavButtons } from './FormNavButtons';

interface CompanyInfoTabProps {
  form: UseFormReturn<CustomerFormValues>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CompanyInfoTab = ({ form, activeTab, setActiveTab }: CompanyInfoTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
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

      <FormNavButtons 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        nextStep="contacts"
      />
    </div>
  );
};
