
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Package2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";

interface JobTitleFieldProps {
  form: UseFormReturn<any>;
}

export function JobTitleField({ form }: JobTitleFieldProps) {
  return (
    <motion.div variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    }}>
      <FormField
        control={form.control}
        name="jobTitle"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider flex items-center">
              Job Title <span className="text-red-400 ml-1">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <Input 
                  placeholder="Enter job title" 
                  {...field} 
                  className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:ring-1 focus-visible:ring-[#0a9bdb]/30 focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6]" 
                />
                <Package2 className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
              </div>
            </FormControl>
            <FormMessage className="text-red-400" />
          </FormItem>
        )}
      />
    </motion.div>
  );
}
