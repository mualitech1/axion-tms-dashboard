
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Package2, Truck, CalendarDays, User, Scale, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileUploader } from "../file-upload/FileUploader";
import { motion } from "framer-motion";
import { InputWithIcon } from "@/components/ui/input-with-icon";

interface BasicInfoStepProps {
  form: UseFormReturn<any>;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onDocumentsChange: (files: File[]) => void;
}

const inputContainer = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: custom * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

export function BasicInfoStep({ form, date, setDate, onDocumentsChange }: BasicInfoStepProps) {
  return (
    <div className="space-y-6 text-white pb-8">
      <motion.div 
        className="space-y-5"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        <motion.div variants={inputContainer} custom={0}>
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
                      className="pl-10 bg-[#05101b] border-[#1a3246] focus:border-[#0a9bdb] focus:ring-[#0a9bdb]/20 h-11 text-white placeholder:text-[#6b82a6]" 
                    />
                    <Package2 className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                  </div>
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div variants={inputContainer} custom={1}>
            <FormField
              control={form.control}
              name="customer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider flex items-center">
                    Customer <span className="text-red-400 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Select or enter customer" 
                        {...field} 
                        className="pl-10 bg-[#05101b] border-[#1a3246] focus:border-[#0a9bdb] focus:ring-[#0a9bdb]/20 h-11 text-white placeholder:text-[#6b82a6]" 
                      />
                      <User className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </motion.div>
          
          <motion.div variants={inputContainer} custom={2}>
            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider flex items-center">
                    Vehicle Type <span className="text-red-400 ml-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        placeholder="Select vehicle type" 
                        {...field} 
                        className="pl-10 bg-[#05101b] border-[#1a3246] focus:border-[#0a9bdb] focus:ring-[#0a9bdb]/20 h-11 text-white placeholder:text-[#6b82a6]" 
                      />
                      <Truck className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div variants={inputContainer} custom={3}>
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider">Product Type</FormLabel>
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
          
          <motion.div variants={inputContainer} custom={4}>
            <FormField
              control={form.control}
              name="totalWeight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider">Total Weight (kg)</FormLabel>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <motion.div variants={inputContainer} custom={5}>
            <FormItem>
              <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider flex items-center">
                Pickup Date <span className="text-red-400 ml-1">*</span>
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-10 relative text-left font-normal h-11 border-[#1a3246] bg-[#05101b] hover:bg-[#162233]",
                        !date && "text-[#6b82a6]"
                      )}
                    >
                      <CalendarDays className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#05101b] border-[#1a3246] z-50" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="bg-[#05101b] text-white pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-red-400" />
            </FormItem>
          </motion.div>
          
          <motion.div variants={inputContainer} custom={6}>
            <FormField
              control={form.control}
              name="rate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider">Rate (£)</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type="number" 
                        min="0"
                        step="0.01"
                        placeholder="Enter rate" 
                        {...field} 
                        className="pl-10 bg-[#05101b] border-[#1a3246] focus:border-[#0a9bdb] focus:ring-[#0a9bdb]/20 h-11 text-white placeholder:text-[#6b82a6]" 
                      />
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </motion.div>
        </div>
        
        <motion.div variants={inputContainer} custom={7}>
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider">Priority</FormLabel>
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
      </motion.div>
      
      <motion.div
        className="pt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider mb-3 block">Documents</FormLabel>
        <FileUploader onFilesChange={onDocumentsChange} />
      </motion.div>
    </div>
  );
}
