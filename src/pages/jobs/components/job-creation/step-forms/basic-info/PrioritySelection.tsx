
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";

interface PrioritySelectionProps {
  form: UseFormReturn<any>;
}

export function PrioritySelection({ form }: PrioritySelectionProps) {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.5, ease: "easeOut" } }
    }}>
      <FormField
        control={form.control}
        name="priority"
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider">
              Priority
            </FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex flex-wrap gap-3"
              >
                <div className="flex items-center space-x-2 bg-[#081427] hover:bg-[#0c1e3a] rounded-md px-4 py-2 border border-[#1a3246] transition-colors group cursor-pointer">
                  <RadioGroupItem 
                    value="low" 
                    id="low" 
                    className="text-blue-400 border-[#1a3246]" 
                  />
                  <Label 
                    htmlFor="low" 
                    className="text-[#6b82a6] group-hover:text-blue-400 cursor-pointer transition-colors"
                  >
                    Low
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-[#081427] hover:bg-[#0c1e3a] rounded-md px-4 py-2 border border-[#1a3246] transition-colors group cursor-pointer">
                  <RadioGroupItem 
                    value="medium" 
                    id="medium" 
                    className="text-amber-400 border-[#1a3246]" 
                  />
                  <Label 
                    htmlFor="medium" 
                    className="text-[#6b82a6] group-hover:text-amber-400 cursor-pointer transition-colors"
                  >
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2 bg-[#081427] hover:bg-[#0c1e3a] rounded-md px-4 py-2 border border-[#1a3246] transition-colors group cursor-pointer">
                  <RadioGroupItem 
                    value="high" 
                    id="high" 
                    className="text-red-400 border-[#1a3246]" 
                  />
                  <Label 
                    htmlFor="high" 
                    className="text-[#6b82a6] group-hover:text-red-400 cursor-pointer transition-colors"
                  >
                    High
                  </Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </motion.div>
  );
}
