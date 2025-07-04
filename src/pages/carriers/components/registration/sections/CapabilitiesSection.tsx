
import { 
  FormField, 
  FormItem, 
  FormLabel, 
  FormControl,
  FormDescription 
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn } from "react-hook-form";
import { FormSection } from "../FormSection";
import { RegistrationFormValues } from "../RegistrationFormSchema";

export const capabilityOptions = [
  { id: "curtain-side", label: "Curtain-side" },
  { id: "temperature-controlled", label: "Temperature Controlled" },
  { id: "adr", label: "ADR (Hazardous Goods)" },
  { id: "container", label: "Container Transport" },
  { id: "traction-only", label: "Traction Only" },
  { id: "rigid", label: "Rigid Vehicles" },
  { id: "eu-transport", label: "EU Transport" },
  { id: "deep-sea", label: "Deep-Sea Capabilities" },
];

interface CapabilitiesSectionProps {
  form: UseFormReturn<RegistrationFormValues>;
  onChange: (field: string, value: any) => void;
}

export function CapabilitiesSection({ form, onChange }: CapabilitiesSectionProps) {
  return (
    <FormSection 
      title="Capabilities" 
      description="Select all capabilities that apply to this carrier"
    >
      <div>
        <FormField
          control={form.control}
          name="capabilities"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {capabilityOptions.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="capabilities"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                const updatedValue = checked
                                  ? [...(field.value || []), item.id]
                                  : field.value?.filter((value) => value !== item.id) || [];
                                  
                                field.onChange(updatedValue);
                                onChange("capabilities", updatedValue);
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
            </FormItem>
          )}
        />
      </div>
    </FormSection>
  );
}
