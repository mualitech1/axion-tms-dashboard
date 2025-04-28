
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Briefcase, PackageOpen, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FileUploader } from "../file-upload/FileUploader";

interface BasicInfoStepProps {
  form: UseFormReturn<any>;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onDocumentsChange: (files: File[]) => void;
}

export function BasicInfoStep({ form, date, setDate, onDocumentsChange }: BasicInfoStepProps) {
  return (
    <div className="space-y-6 text-aximo-text">
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-aximo-text">Job Title <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Enter job title" 
                    {...field} 
                    className="pl-9 bg-aximo-dark border-aximo-border text-aximo-text" 
                  />
                  <Briefcase className="absolute left-3 top-3 h-4 w-4 text-aximo-primary" />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="customer"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-aximo-text">Customer <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Select or enter customer" 
                    {...field} 
                    className="bg-aximo-dark border-aximo-border text-aximo-text" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="vehicleType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-aximo-text">Vehicle Type <span className="text-red-500">*</span></FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input 
                      placeholder="Select vehicle type" 
                      {...field} 
                      className="pl-9 bg-aximo-dark border-aximo-border text-aximo-text" 
                    />
                    <PackageOpen className="absolute left-3 top-3 h-4 w-4 text-aximo-primary" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="productType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-aximo-text">Product Type</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Enter product type" 
                    {...field} 
                    className="bg-aximo-dark border-aximo-border text-aximo-text" 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="totalWeight"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-aximo-text">Total Weight (kg)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    placeholder="Enter total weight" 
                    {...field} 
                    className="bg-aximo-dark border-aximo-border text-aximo-text" 
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormItem>
            <FormLabel className="text-aximo-text">Pickup Date <span className="text-red-500">*</span></FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full pl-9 relative text-left font-normal bg-aximo-dark border-aximo-border text-aximo-text hover:bg-aximo-darker",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarDays className="absolute left-3 top-2 h-4 w-4 text-aximo-primary" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-aximo-darker border-aximo-border" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-aximo-darker text-aximo-text"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
          
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-aximo-text">Rate (£)</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="0"
                    step="0.01"
                    placeholder="Enter rate" 
                    {...field} 
                    className="bg-aximo-dark border-aximo-border text-aximo-text" 
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-aximo-text">Priority</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-2 sm:gap-3"
                >
                  <div className="flex items-center space-x-2 bg-aximo-darker rounded-md px-4 py-2 border border-aximo-border">
                    <RadioGroupItem value="low" id="low" className="text-blue-500" />
                    <Label htmlFor="low" className="text-aximo-text">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-aximo-darker rounded-md px-4 py-2 border border-aximo-border">
                    <RadioGroupItem value="medium" id="medium" className="text-amber-500" />
                    <Label htmlFor="medium" className="text-aximo-text">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-aximo-darker rounded-md px-4 py-2 border border-aximo-border">
                    <RadioGroupItem value="high" id="high" className="text-red-500" />
                    <Label htmlFor="high" className="text-aximo-text">High</Label>
                  </div>
                </RadioGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
      
      <div className="space-y-2">
        <FormLabel className="text-aximo-text">Documents</FormLabel>
        <FileUploader onFilesChange={onDocumentsChange} />
      </div>
    </div>
  );
}
