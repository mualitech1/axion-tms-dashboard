
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { Building2, User, MapPin, Clock, FileText } from "lucide-react";

interface AddressFormProps {
  prefix: string;
  label: string;
  form: UseFormReturn<any>;
}

export function AddressForm({ prefix, label, form }: AddressFormProps) {
  const staggerDelay = 0.1;

  return (
    <div className="space-y-6">
      <motion.h3 
        className="text-lg font-semibold text-white mb-6 flex items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <span className={`inline-block w-1.5 h-6 bg-gradient-to-b from-[#0adeee] to-[#0a9bdb] mr-3 rounded-sm`}></span>
        {label}
      </motion.h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: staggerDelay * 1, duration: 0.4 }}
        >
          <FormField
            control={form.control}
            name={`${prefix}.companyName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider mb-1.5">
                  Company Name <span className="text-red-400 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="Enter company name" 
                      {...field} 
                      className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md" 
                    />
                    <Building2 className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: staggerDelay * 2, duration: 0.4 }}
        >
          <FormField
            control={form.control}
            name={`${prefix}.contactName`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider mb-1.5">
                  Contact Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="Enter contact name" 
                      {...field} 
                      className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md" 
                    />
                    <User className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: staggerDelay * 3, duration: 0.4 }}
      >
        <FormField
          control={form.control}
          name={`${prefix}.addressLine1`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider mb-1.5">
                Address <span className="text-red-400 ml-1">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Enter address" 
                    {...field} 
                    className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md" 
                  />
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: staggerDelay * 4, duration: 0.4 }}
        >
          <FormField
            control={form.control}
            name={`${prefix}.city`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider mb-1.5">
                  City <span className="text-red-400 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter city" 
                    {...field} 
                    className="bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md" 
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: staggerDelay * 5, duration: 0.4 }}
        >
          <FormField
            control={form.control}
            name={`${prefix}.postCode`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider mb-1.5">
                  Postcode <span className="text-red-400 ml-1">*</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter postcode" 
                    {...field} 
                    className="bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md" 
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: staggerDelay * 6, duration: 0.4 }}
        >
          <FormField
            control={form.control}
            name={`${prefix}.reference`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider mb-1.5">
                  Reference
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="Enter reference number" 
                      {...field} 
                      className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md" 
                    />
                    <FileText className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: staggerDelay * 7, duration: 0.4 }}
        >
          <FormField
            control={form.control}
            name={`${prefix}.time`}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider mb-1.5">
                  Time
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      type="time"
                      {...field} 
                      className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md" 
                    />
                    <Clock className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: staggerDelay * 8, duration: 0.4 }}
      >
        <FormField
          control={form.control}
          name={`${prefix}.additionalComments`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider mb-1.5">
                Additional Comments
              </FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter any additional comments or instructions" 
                  {...field} 
                  className="min-h-[80px] bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] text-white placeholder:text-[#6b82a6] rounded-md" 
                />
              </FormControl>
            </FormItem>
          )}
        />
      </motion.div>
    </div>
  );
}
