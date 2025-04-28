
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Building, User, MapPin, MessageSquare, Clock } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";

interface AddressFormProps {
  prefix: "collection" | "delivery";
  label: string;
  form: UseFormReturn<any>;
}

export function AddressForm({ prefix, label, form }: AddressFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-4 text-aximo-text">
      <h3 className="text-md font-medium flex items-center gap-2">
        <span className="text-aximo-primary">{label}</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`${prefix}.companyName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-aximo-text">Company Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Enter company name" 
                    {...field}
                    className="pl-9 bg-aximo-dark border-aximo-border text-aximo-text"
                  />
                  <Building className="absolute left-3 top-3 h-4 w-4 text-aximo-primary" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${prefix}.contactName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-aximo-text">Contact Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Enter contact name" 
                    {...field}
                    className="pl-9 bg-aximo-dark border-aximo-border text-aximo-text"
                  />
                  <User className="absolute left-3 top-3 h-4 w-4 text-aximo-primary" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${prefix}.reference`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-aximo-text">
                {prefix === "collection" ? "Collection Reference" : "Delivery Reference"}
              </FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder={`Enter ${prefix === "collection" ? "collection" : "delivery"} reference`}
                  className="bg-aximo-dark border-aximo-border text-aximo-text"
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <Label htmlFor={`${prefix}-date`} className="text-aximo-text">Date & Time Window</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={`${prefix}-date`}
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal bg-aximo-dark border-aximo-border text-aximo-text",
                    !date && "text-aximo-text-secondary"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4 text-aximo-primary" />
                  {date ? format(date, "PP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-aximo-darker border-aximo-border" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  className="bg-aximo-darker"
                />
              </PopoverContent>
            </Popover>
            <FormField
              control={form.control}
              name={`${prefix}.time`}
              render={({ field }) => (
                <FormControl>
                  <div className="relative">
                    <Input
                      type="time"
                      className="w-full bg-aximo-dark border-aximo-border text-aximo-text pl-9"
                      {...field}
                    />
                    <Clock className="absolute left-3 top-3 h-4 w-4 text-aximo-primary" />
                  </div>
                </FormControl>
              )}
            />
          </div>
        </div>
        
        <FormField
          control={form.control}
          name={`${prefix}.addressLine1`}
          render={({ field }) => (
            <FormItem className="col-span-full">
              <FormLabel className="text-aximo-text">Address Line 1</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    placeholder="Enter address" 
                    {...field}
                    className="pl-9 bg-aximo-dark border-aximo-border text-aximo-text"
                  />
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-aximo-primary" />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${prefix}.city`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-aximo-text">City</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter city"
                  className="bg-aximo-dark border-aximo-border text-aximo-text"
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${prefix}.postCode`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-aximo-text">Post Code</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="Enter post code"
                  className="bg-aximo-dark border-aximo-border text-aximo-text"
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        {/* Additional Comments Field */}
        <FormField
          control={form.control}
          name={`${prefix}.additionalComments`}
          render={({ field }) => (
            <FormItem className="col-span-full mt-2">
              <FormLabel className="flex items-center gap-2 text-aximo-text">
                <MessageSquare className="h-4 w-4 text-aximo-primary" /> 
                Additional Comments
              </FormLabel>
              <FormControl>
                <Textarea 
                  {...field} 
                  placeholder="Enter any special instructions or additional information"
                  className="min-h-[100px] bg-aximo-dark border-aximo-border text-aximo-text resize-none"
                />
              </FormControl>
              <FormDescription className="text-aximo-text-secondary">
                Include access codes, contact preferences, or special handling instructions
              </FormDescription>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
