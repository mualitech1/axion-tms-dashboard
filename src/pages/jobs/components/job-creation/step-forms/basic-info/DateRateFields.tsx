
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { CalendarDays, DollarSign } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DateRateFieldsProps {
  form: UseFormReturn<any>;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DateRateFields({ form, date, setDate }: DateRateFieldsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <motion.div variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5, ease: "easeOut" } }
      }}>
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
        </FormItem>
      </motion.div>
      
      <motion.div variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.5, ease: "easeOut" } }
      }}>
        <FormField
          control={form.control}
          name="rate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider">
                Rate (£)
              </FormLabel>
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
  );
}
