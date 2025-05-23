import { z } from 'zod';

// Define the contact schema
const contactSchema = z.object({
  name: z.string().optional(),
  email: z.string().email("Invalid email address").optional(),
  phone: z.string().optional(),
  position: z.string().optional(),
});

// Define the address schema
const addressSchema = z.object({
  street: z.string().optional(),
  city: z.string().optional(),
  postcode: z.string().optional(),
  country: z.string().optional(),
});

// Define the main form schema
export const customerFormSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  status: z.string().min(1, "Status is required"),
  creditLimit: z.string().optional(),
  industry: z.string().optional(),
  address: addressSchema,
  notes: z.string().optional(),
  acceptedTerms: z.boolean().optional(),
  contacts: z.object({
    primary: contactSchema.extend({
      name: z.string().min(2, "Primary contact name is required"),
      email: z.string().email("Invalid email address").min(1, "Primary contact email is required"),
      phone: z.string().min(1, "Primary contact phone is required"),
    }),
    invoice: contactSchema,
    operations: contactSchema,
  }),
});

// Infer the form values type from the schema
export type CustomerFormValues = z.infer<typeof customerFormSchema>;
