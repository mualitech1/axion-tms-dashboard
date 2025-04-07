
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "../FormSection";
import { RegistrationFormValues } from "../RegistrationFormSchema";

interface AddressSectionProps {
  form: UseFormReturn<RegistrationFormValues>;
  onChange: (field: string, value: any) => void;
}

export function AddressSection({ form, onChange }: AddressSectionProps) {
  return (
    <FormSection title="Address Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    onChange("address", e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    onChange("city", e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Region *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    onChange("region", e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postcode *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    onChange("postcode", e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
}
