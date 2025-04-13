
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Tag } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';

interface AdditionalInfoStepProps {
  form: UseFormReturn<any>;
}

export default function AdditionalInfoStep({ form }: AdditionalInfoStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Additional Information</h2>
      
      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes</FormLabel>
            <FormControl>
              <Textarea 
                {...field} 
                placeholder="Enter any additional notes about this lead"
                className="min-h-[120px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Tags</FormLabel>
            <FormControl>
              <InputWithIcon 
                icon={Tag} 
                {...field} 
                placeholder="Enter tags separated by commas (e.g., urgent, high-value)" 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
