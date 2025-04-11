
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Building, User, MapPin } from "lucide-react";
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
    <div className="space-y-4">
      <h3 className="text-md font-medium">{label}</h3>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name={`${prefix}.companyName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <InputWithIcon icon={Building} placeholder="Enter company name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${prefix}.contactName`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Name</FormLabel>
              <FormControl>
                <InputWithIcon icon={User} placeholder="Enter contact name" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${prefix}.reference`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{prefix === "collection" ? "Collection Reference" : "Delivery Reference"}</FormLabel>
              <FormControl>
                <Input {...field} placeholder={`Enter ${prefix === "collection" ? "collection" : "delivery"} reference`} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <div className="space-y-2">
          <Label htmlFor={`${prefix}-date`}>Date & Time Window</Label>
          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id={`${prefix}-date`}
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning</SelectItem>
                <SelectItem value="afternoon">Afternoon</SelectItem>
                <SelectItem value="specific">Specific Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <FormField
          control={form.control}
          name={`${prefix}.addressLine1`}
          render={({ field }) => (
            <FormItem className="col-span-2">
              <FormLabel>Address Line 1</FormLabel>
              <FormControl>
                <InputWithIcon icon={MapPin} placeholder="Enter address" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${prefix}.city`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter city" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name={`${prefix}.postCode`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Code</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter post code" />
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
