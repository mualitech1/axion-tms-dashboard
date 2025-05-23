import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { UseFormReturn } from 'react-hook-form';
import { PoundSterling, FileText, CheckCircle, X, Save } from 'lucide-react';
import { CustomerFormValues } from './types';
import { FormNavButtons } from './FormNavButtons';
import { useIsMobile } from '@/hooks/use-mobile';
import { Checkbox } from '@/components/ui/checkbox';

interface TermsTabProps {
  form: UseFormReturn<CustomerFormValues>;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSubmitting: boolean;
}

export const TermsTab = ({ form, activeTab, setActiveTab, isSubmitting }: TermsTabProps) => {
  const isMobile = useIsMobile();
  
  // Helper function to safely extract error messages as strings
  const getErrorMessage = (fieldName: string): string => {
    const error = form.formState.errors[fieldName];
    return error?.message ? String(error.message) : '';
  };
  
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md border border-gray-100">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <PoundSterling className="h-4 md:h-5 w-4 md:w-5 text-blue-600" />
          <h3 className="text-base md:text-lg font-semibold text-gray-800">Financial Details</h3>
        </div>
        <FormField
          control={form.control}
          name="creditLimit"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-medium">Credit Limit (£)</FormLabel>
              <FormControl>
                <InputWithIcon 
                  icon={<PoundSterling className="h-4 w-4 text-indigo-400" />}
                  type="number"
                  value={field.value || ''}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Enter credit limit" 
                  error={getErrorMessage('creditLimit')}
                  name={field.name}
                  onBlur={field.onBlur}
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
          <FormItem className="flex flex-row items-start space-x-3 md:space-x-4 p-4 md:p-6 bg-white rounded-lg md:rounded-xl shadow-md border border-gray-100">
            <FormControl>
              <div className="flex items-start gap-2">
                <Checkbox 
                  id="acceptTerms" 
                  checked={field.value} 
                  onCheckedChange={field.onChange}
                  aria-label="Accept Terms and Conditions"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="acceptTerms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Accept Terms and Conditions
                  </label>
                  <p className="text-sm text-muted-foreground">
                    By accepting you agree to our <a href="#" className="text-indigo-500 hover:underline">Terms of Service</a> and <a href="#" className="text-indigo-500 hover:underline">Privacy Policy</a>.
                  </p>
                </div>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      
      <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md border border-gray-100">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <FileText className="h-4 md:h-5 w-4 md:w-5 text-blue-600" />
          <h3 className="text-base md:text-lg font-medium text-gray-800">Upload Terms & Agreements</h3>
        </div>
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-28 md:h-36 border-2 border-gray-200 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
            <div className="flex flex-col items-center justify-center pt-4 md:pt-5 pb-4 md:pb-6">
              <svg className="w-8 md:w-10 h-8 md:h-10 mb-2 md:mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-1 md:mb-2 text-xs md:text-sm text-gray-500">Click to upload or drag and drop</p>
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
