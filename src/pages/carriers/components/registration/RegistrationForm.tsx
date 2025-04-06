
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define form schema
const formSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  contactName: z.string().min(2, { message: "Contact name is required" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(6, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  region: z.string().min(1, { message: "Region is required" }),
  postcode: z.string().min(1, { message: "Postcode is required" }),
  fleetSize: z.string().min(1, { message: "Fleet size is required" }),
  fleetType: z.string().min(1, { message: "Fleet type is required" }),
  capabilities: z.array(z.string()).optional(),
  regionalCoverage: z.array(z.string()).optional(),
  notes: z.string().optional(),
});

// Capability options
const capabilityOptions = [
  { id: "curtain-side", label: "Curtain-side" },
  { id: "temperature-controlled", label: "Temperature Controlled" },
  { id: "adr", label: "ADR (Hazardous Goods)" },
  { id: "container", label: "Container Transport" },
  { id: "traction-only", label: "Traction Only" },
  { id: "rigid", label: "Rigid Vehicles" },
  { id: "eu-transport", label: "EU Transport" },
  { id: "deep-sea", label: "Deep-Sea Capabilities" },
];

// Region options
const regionOptions = [
  { id: "north", label: "North" },
  { id: "south", label: "South" },
  { id: "east", label: "East" },
  { id: "west", label: "West" },
  { id: "midlands", label: "Midlands" },
  { id: "wales", label: "Wales" },
  { id: "scotland", label: "Scotland" },
  { id: "ireland", label: "Northern Ireland" },
];

interface RegistrationFormProps {
  formData: any;
  onChange: (data: any) => void;
}

export default function RegistrationForm({ formData, onChange }: RegistrationFormProps) {
  // Initialize form with existing data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  // Submit handler - just updates parent's state
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onChange(data);
  };

  // Update parent's state on form changes
  const handleFieldChange = (field: string, value: any) => {
    const updatedData = { [field]: value };
    onChange(updatedData);
  };

  return (
    <div>
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          All fields marked with * are required. Carrier accounts will not be activated until all required documents are received and verified.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onChange={() => form.handleSubmit(onSubmit)()} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("companyName", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="contactName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Person *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("contactName", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("email", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("phone", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("address", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("city", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Region *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("region", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postcode *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("postcode", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="fleetSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fleet Size *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("fleetSize", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fleetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fleet Type *</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      onChange={(e) => {
                        field.onChange(e);
                        handleFieldChange("fleetType", e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="capabilities"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Capabilities</FormLabel>
                    <FormDescription>
                      Select all capabilities that apply to this carrier
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {capabilityOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="capabilities"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...(field.value || []), item.id]
                                      : field.value?.filter((value) => value !== item.id) || [];
                                      
                                    field.onChange(updatedValue);
                                    handleFieldChange("capabilities", updatedValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div>
            <FormField
              control={form.control}
              name="regionalCoverage"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Regional Coverage</FormLabel>
                    <FormDescription>
                      Select all regions where this carrier operates
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {regionOptions.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="regionalCoverage"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    const updatedValue = checked
                                      ? [...(field.value || []), item.id]
                                      : field.value?.filter((value) => value !== item.id) || [];
                                      
                                    field.onChange(updatedValue);
                                    handleFieldChange("regionalCoverage", updatedValue);
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field}
                    rows={4}
                    onChange={(e) => {
                      field.onChange(e);
                      handleFieldChange("notes", e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
