
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Package2, Scale } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";

interface ProductWeightFieldsProps {
  form: UseFormReturn<any>;
}

export function ProductWeightFields({ form }: ProductWeightFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <motion.div variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5, ease: "easeOut" } }
      }}>
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider">
                Product Type
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Enter product type" 
                    {...field} 
                    className="pl-10 bg-[#05101b] border-[#1a3246] focus:border-[#0a9bdb] focus:ring-[#0a9bdb]/20 h-11 text-white placeholder:text-[#6b82a6]" 
                  />
                  <Package2 className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </motion.div>
      
      <motion.div variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.4, duration: 0.5, ease: "easeOut" } }
      }}>
        <FormField
          control={form.control}
          name="totalWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider">
                Total Weight (kg)
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type="number" 
                    min="0"
                    placeholder="Enter total weight" 
                    {...field} 
                    className="pl-10 bg-[#05101b] border-[#1a3246] focus:border-[#0a9bdb] focus:ring-[#0a9bdb]/20 h-11 text-white placeholder:text-[#6b82a6]" 
                  />
                  <Scale className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  );
}
