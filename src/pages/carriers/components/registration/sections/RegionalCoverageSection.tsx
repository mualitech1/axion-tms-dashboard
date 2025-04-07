
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

export const regionOptions = [
  { id: "north", label: "North" },
  { id: "south", label: "South" },
  { id: "east", label: "East" },
  { id: "west", label: "West" },
  { id: "midlands", label: "Midlands" },
  { id: "wales", label: "Wales" },
  { id: "scotland", label: "Scotland" },
  { id: "ireland", label: "Northern Ireland" },
];

interface RegionalCoverageSectionProps {
  form: UseFormReturn<RegistrationFormValues>;
  onChange: (field: string, value: any) => void;
}

export function RegionalCoverageSection({ form, onChange }: RegionalCoverageSectionProps) {
  return (
    <FormSection 
      title="Regional Coverage" 
      description="Select all regions where this carrier operates"
    >
      <div>
        <FormField
          control={form.control}
          name="regionalCoverage"
          render={() => (
            <FormItem>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {regionOptions.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="regionalCoverage"
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
                                onChange("regionalCoverage", updatedValue);
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
