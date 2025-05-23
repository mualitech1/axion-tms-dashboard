import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, BookOpen, Save } from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { UseFormReturn } from "react-hook-form";
import { JobCreationFormData } from "@/pages/jobs/types/formTypes";
import { z } from "zod";
import { useCompanies } from '@/hooks/use-companies';

interface Template {
  id: string;
  name: string;
  createdAt: string;
}

interface StepOneProps {
  form: UseFormReturn<JobCreationFormData, z.ZodType<JobCreationFormData>, undefined>;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  templates: Template[];
  onLoadTemplate: (id: string) => void;
  onDeleteTemplate: (id: string) => void;
  onSaveTemplate: () => void;
}

export function StepOne({
  form,
  date,
  setDate,
  templates,
  onLoadTemplate,
  onDeleteTemplate,
  onSaveTemplate
}: StepOneProps) {
  const { customers, isLoading } = useCompanies();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Basic Job Information</h3>
        
        {templates && templates.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="bg-[#0a253a] border-[#1a3246] text-[#6b82a6] hover:text-white hover:bg-[#0f3151]">
                <BookOpen className="mr-2 h-4 w-4" />
                Templates
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-[#051b2a] border-[#1a3246] text-white">
              <div className="px-2 py-1.5 text-xs text-[#0adeee]">
                SAVED TEMPLATES
              </div>
              <DropdownMenuSeparator className="bg-[#1a3246]" />
              {templates.map((template) => (
                <DropdownMenuItem
                  key={template.id}
                  className="flex justify-between items-center hover:bg-[#0a253a] cursor-pointer"
                  onClick={() => onLoadTemplate(template.id)}
                >
                  <span className="text-sm">{template.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteTemplate(template.id);
                    }}
                    className="text-[#6b82a6] hover:text-red-400"
                    aria-label={`Delete template ${template.name}`}
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-[#1a3246]" />
              <DropdownMenuItem 
                className="text-[#0adeee] hover:bg-[#0a253a] cursor-pointer" 
                onClick={onSaveTemplate}
              >
                <Save className="mr-2 h-4 w-4" />
                <span>Save Current Template</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Job Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter job title"
                  className="bg-[#0a253a] border-[#1a3246] text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customer"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Customer</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="bg-[#0a253a] border-[#1a3246] text-white">
                    <SelectValue placeholder={isLoading ? "Loading customers..." : "Select customer"} />
                  </SelectTrigger>
                  <SelectContent className="bg-[#051b2a] border-[#1a3246] text-white">
                    {isLoading ? (
                      <SelectItem value="__loading__" disabled>Loading...</SelectItem>
                    ) : customers.length === 0 ? (
                      <SelectItem value="__none__" disabled>No customers found</SelectItem>
                    ) : (
                      customers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
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
              <FormLabel className="text-white">Vehicle Type</FormLabel>
              <FormControl>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger className="bg-[#0a253a] border-[#1a3246] text-white">
                    <SelectValue placeholder="Select vehicle type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#051b2a] border-[#1a3246] text-white">
                    <SelectItem value="van">Van</SelectItem>
                    <SelectItem value="sprinter">Sprinter</SelectItem>
                    <SelectItem value="luton">Luton Van</SelectItem>
                    <SelectItem value="7.5t">7.5 Tonne</SelectItem>
                    <SelectItem value="18t">18 Tonne</SelectItem>
                    <SelectItem value="artic">Articulated</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pickupDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="text-white">Pickup Date*</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "bg-[#0a253a] border-[#1a3246] text-left font-normal",
                        !field.value && "text-[#6b82a6]",
                        field.value && "text-white"
                      )}
                    >
                      {field.value ? format(field.value, "PPP") : "Select pickup date"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-[#051b2a] border-[#1a3246]">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    classNames={{
                      day_selected: "bg-[#0adeee] text-[#051b2a] hover:bg-[#0adeee] hover:text-[#051b2a]",
                      day_today: "bg-[#0a253a] text-white",
                      day_outside: "text-[#6b82a6] opacity-50",
                      day: "text-[#f5f5f5] hover:bg-[#0a253a]",
                      head_cell: "text-[#0adeee]",
                      nav_button: "text-[#0adeee] hover:bg-[#0a253a]",
                      table: "border-[#1a3246]",
                      caption: "text-white"
                    }}
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-2">
          <span className="text-white text-sm font-medium">Delivery Date</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "bg-[#0a253a] border-[#1a3246] text-left font-normal",
                  !date && "text-[#6b82a6]",
                  date && "text-white"
                )}
              >
                {date ? format(date, "PPP") : "Select delivery date"}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-[#051b2a] border-[#1a3246]">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                classNames={{
                  day_selected: "bg-[#0adeee] text-[#051b2a] hover:bg-[#0adeee] hover:text-[#051b2a]",
                  day_today: "bg-[#0a253a] text-white",
                  day_outside: "text-[#6b82a6] opacity-50",
                  day: "text-[#f5f5f5] hover:bg-[#0a253a]",
                  head_cell: "text-[#0adeee]",
                  nav_button: "text-[#0adeee] hover:bg-[#0a253a]",
                  table: "border-[#1a3246]",
                  caption: "text-white"
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="productType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Product Type</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product type"
                  className="bg-[#0a253a] border-[#1a3246] text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="totalWeight"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Weight (kg)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter weight in kg"
                  className="bg-[#0a253a] border-[#1a3246] text-white"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="additionalInformation"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-white">Special Instructions</FormLabel>
            <FormControl>
              <textarea
                rows={3}
                placeholder="Enter any special instructions"
                className="flex min-h-[80px] w-full rounded-md border border-[#1a3246] bg-[#0a253a] px-3 py-2 text-sm text-white placeholder:text-[#6b82a6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0adeee] focus-visible:ring-offset-2 focus-visible:ring-offset-[#051b2a] disabled:cursor-not-allowed disabled:opacity-50"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
} 