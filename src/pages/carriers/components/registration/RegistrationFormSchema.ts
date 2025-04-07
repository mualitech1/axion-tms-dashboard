
import * as z from "zod";

// Define form schema
export const registrationFormSchema = z.object({
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

export type RegistrationFormValues = z.infer<typeof registrationFormSchema>;
