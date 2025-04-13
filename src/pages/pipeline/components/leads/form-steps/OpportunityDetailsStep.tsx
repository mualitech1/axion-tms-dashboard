
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { DollarSign, Percent } from 'lucide-react';
import { LeadSource } from '../../../data/pipelineTypes';
import { UseFormReturn } from 'react-hook-form';

interface OpportunityDetailsStepProps {
  form: UseFormReturn<any>;
  stages: { id: string; name: string }[];
}

export default function OpportunityDetailsStep({ form, stages }: OpportunityDetailsStepProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Opportunity Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Potential Value (£)</FormLabel>
              <FormControl>
                <InputWithIcon icon={DollarSign} {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="probability"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Win Probability (%)</FormLabel>
              <FormControl>
                <InputWithIcon icon={Percent} {...field} type="number" min="0" max="100" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead Source</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select lead source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(LeadSource).map((source) => (
                    <SelectItem key={source} value={source}>
                      {source.replace('-', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="stage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pipeline Stage</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pipeline stage" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {stages.map((stage) => (
                    <SelectItem key={stage.id} value={stage.id}>
                      {stage.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
