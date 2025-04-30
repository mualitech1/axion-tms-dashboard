
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { cn } from "@/lib/utils";
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
          <FormItem className="space-y-3">
            <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider block mb-1">
              Priority
            </FormLabel>
            <FormControl>
              <div className="flex flex-wrap gap-3">
                <label 
                  className={cn(
                    "flex items-center justify-center w-24 h-11 rounded-md border transition-all cursor-pointer",
                    field.value === "low" 
                      ? "bg-blue-900/30 border-blue-500 text-blue-400" 
                      : "bg-[#081427] border-[#1a3246] text-[#6b82a6] hover:bg-[#0c1e3a]"
                  )}
                >
                  <input 
                    type="radio" 
                    value="low" 
                    className="sr-only" 
                    checked={field.value === "low"}
                    onChange={() => field.onChange("low")}
                  />
                  <span>Low</span>
                </label>
                
                <label 
                  className={cn(
                    "flex items-center justify-center w-24 h-11 rounded-md border transition-all cursor-pointer",
                    field.value === "medium" 
                      ? "bg-amber-900/30 border-amber-500 text-amber-400" 
                      : "bg-[#081427] border-[#1a3246] text-[#6b82a6] hover:bg-[#0c1e3a]"
                  )}
                >
                  <input 
                    type="radio" 
                    value="medium" 
                    className="sr-only" 
                    checked={field.value === "medium"}
                    onChange={() => field.onChange("medium")}
                  />
                  <span>Medium</span>
                </label>
                
                <label 
                  className={cn(
                    "flex items-center justify-center w-24 h-11 rounded-md border transition-all cursor-pointer",
                    field.value === "high" 
                      ? "bg-red-900/30 border-red-500 text-red-400" 
                      : "bg-[#081427] border-[#1a3246] text-[#6b82a6] hover:bg-[#0c1e3a]"
                  )}
                >
                  <input 
                    type="radio" 
                    value="high" 
                    className="sr-only" 
                    checked={field.value === "high"}
                    onChange={() => field.onChange("high")}
                  />
                  <span>High</span>
                </label>
              </div>
            </FormControl>
          </FormItem>
        )}
      />
    </motion.div>
  );
}
