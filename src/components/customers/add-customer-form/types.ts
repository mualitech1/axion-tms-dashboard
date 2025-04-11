
import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, { message: 'Company name is required' }),
  address: z.object({
    street: z.string().min(2, { message: 'Street is required' }),
    city: z.string().min(2, { message: 'City is required' }),
    postcode: z.string().min(2, { message: 'Postcode is required' }),
    country: z.string().min(2, { message: 'Country is required' }),
  }),
  status: z.string(),
  creditLimit: z.number().min(0),
  acceptedTerms: z.boolean(),
  notes: z.string().optional(),
});

export type CustomerFormValues = z.infer<typeof customerSchema>;
