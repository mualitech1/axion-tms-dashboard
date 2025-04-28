
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";

interface SummaryStepProps {
  form: UseFormReturn<any>;
}

export function SummaryStep({ form }: SummaryStepProps) {
  return (
    <div className="space-y-6 text-aximo-text">
      <div className="bg-aximo-card p-4 sm:p-6 rounded-lg border border-aximo-border shadow-sm">
        <FormField
          control={form.control}
          name="additionalInformation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-aximo-text">Additional Information</FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Enter any additional information about this job"
                  className="min-h-[150px] bg-aximo-dark border-aximo-border text-aximo-text resize-none"
                />
              </FormControl>
              <FormDescription className="text-aximo-text-secondary">
                Include any special instructions or requirements for this job
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
      
      <div className="bg-aximo-card p-4 sm:p-6 rounded-lg border border-aximo-border shadow-sm">
        <h3 className="text-lg font-medium mb-4 text-aximo-text">Job Summary</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-aximo-text-secondary">Job Title</h4>
              <p className="font-medium text-aximo-text">{form.watch('jobTitle') || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-aximo-text-secondary">Customer</h4>
              <p className="font-medium text-aximo-text">{form.watch('customer') || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-aximo-text-secondary">Vehicle Type</h4>
              <p className="font-medium text-aximo-text">{form.watch('vehicleType') || 'Not specified'}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-aximo-text-secondary">Priority</h4>
              <p className="font-medium text-aximo-text capitalize">{form.watch('priority') || 'Not specified'}</p>
            </div>
          </div>
          
          <FormField
            control={form.control}
            name="saveTemplate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-aximo-border bg-aximo-dark p-4 mt-6">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-aximo-text">
                    Save as template
                  </FormLabel>
                  <FormDescription className="text-aximo-text-secondary">
                    Use these settings for future jobs
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
