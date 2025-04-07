
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

interface FleetSectionProps {
  form: UseFormReturn<RegistrationFormValues>;
  onChange: (field: string, value: any) => void;
}

export function FleetSection({ form, onChange }: FleetSectionProps) {
  return (
    <FormSection title="Fleet Information">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="fleetSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fleet Size *</FormLabel>
              <FormControl>
                <Input 
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange("fleetSize", e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="fleetType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fleet Type *</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  onChange={(e) => {
                    field.onChange(e);
                    onChange("fleetType", e.target.value);
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
