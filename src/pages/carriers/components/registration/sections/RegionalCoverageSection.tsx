
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
import { MapPin } from "lucide-react";

export const regionOptions = [
  { id: "north", label: "North", description: "Includes Northumberland, Durham, Cumbria" },
  { id: "south", label: "South", description: "Includes Hampshire, Sussex, Kent" },
  { id: "east", label: "East", description: "Includes Norfolk, Suffolk, Essex" },
  { id: "west", label: "West", description: "Includes Cornwall, Devon, Somerset" },
  { id: "midlands", label: "Midlands", description: "Includes Leicestershire, Nottinghamshire, Derbyshire" },
  { id: "wales", label: "Wales", description: "All of Wales" },
  { id: "scotland", label: "Scotland", description: "All of Scotland" },
  { id: "ireland", label: "Northern Ireland", description: "All of Northern Ireland" },
];

interface RegionalCoverageSectionProps {
  form: UseFormReturn<RegistrationFormValues>;
  onChange: (field: string, value: any) => void;
}

export function RegionalCoverageSection({ form, onChange }: RegionalCoverageSectionProps) {
  // Calculate the number of regions selected
  const selectedCount = form.watch("regionalCoverage")?.length || 0;
  const totalRegions = regionOptions.length;
  
  return (
    <FormSection 
      title="Regional Coverage" 
      description="Select all regions where this carrier operates"
      icon={<MapPin className="h-5 w-5" />}
    >
      <div>
        <FormField
          control={form.control}
          name="regionalCoverage"
          render={() => (
            <FormItem>
              <div className="mb-3 flex items-center">
                <div 
                  className="h-2 flex-grow rounded-full bg-gray-100 mr-2"
                  role="progressbar"
                  aria-valuenow={(selectedCount / totalRegions) * 100}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div 
                    className="h-2 rounded-full bg-blue-500" 
                    style={{ width: `${(selectedCount / totalRegions) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {selectedCount} of {totalRegions} regions
                </span>
              </div>

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
                          className="flex flex-col items-start space-y-2 rounded-md border p-3 hover:bg-muted/50"
                        >
                          <div className="flex items-start space-x-3 space-y-0">
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
                            <div className="space-y-1">
                              <FormLabel className="font-medium">
                                {item.label}
                              </FormLabel>
                              <FormDescription className="text-xs">
                                {item.description}
                              </FormDescription>
                            </div>
                          </div>
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
