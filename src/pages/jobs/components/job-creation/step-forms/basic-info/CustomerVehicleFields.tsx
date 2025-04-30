
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { User, Truck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";

interface CustomerVehicleFieldsProps {
  form: UseFormReturn<any>;
}

export function CustomerVehicleFields({ form }: CustomerVehicleFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
      <motion.div variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.1, duration: 0.5, ease: "easeOut" } }
      }}>
        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider flex items-center mb-2">
                Customer <span className="text-red-400 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Select or enter customer" 
                    {...field} 
                    className="pl-10 bg-[#05101b] border-[#1a3246] focus:border-[#0a9bdb] focus:ring-[#0a9bdb]/20 h-11 text-white placeholder:text-[#6b82a6] rounded-md" 
                  />
                  <User className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
            </FormItem>
          )}
        />
      </motion.div>
      
      <motion.div variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5, ease: "easeOut" } }
      }}>
        <FormField
          control={form.control}
          name="vehicleType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider flex items-center mb-2">
                Vehicle Type <span className="text-red-400 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Select vehicle type" 
                    {...field} 
                    className="pl-10 bg-[#05101b] border-[#1a3246] focus:border-[#0a9bdb] focus:ring-[#0a9bdb]/20 h-11 text-white placeholder:text-[#6b82a6] rounded-md" 
                  />
                  <Truck className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                </div>
              </FormControl>
              <FormMessage className="text-red-400 text-xs mt-1" />
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  );
}
