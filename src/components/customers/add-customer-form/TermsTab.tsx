
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { UseFormReturn } from 'react-hook-form';
import { CreditCard, FileText, CheckCircle, X, Save } from 'lucide-react';
import { CustomerFormValues } from './types';
import { FormNavButtons } from './FormNavButtons';

interface TermsTabProps {
  form: UseFormReturn<CustomerFormValues>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSubmitting: boolean;
}

export const TermsTab = ({ form, activeTab, setActiveTab, isSubmitting }: TermsTabProps) => {
  return (
    <div className="space-y-6 animate-fade-in">
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

      <FormNavButtons 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        prevStep="contacts"
        isLastStep={true}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};
