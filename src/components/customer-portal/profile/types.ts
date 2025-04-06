
import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(2, { message: 'Company name is required' }),
  contact: z.string().min(2, { message: 'Contact name is required' }),
  email: z.string().email({ message: 'Valid email is required' }),
  phone: z.string().min(5, { message: 'Phone number is required' }),
  address: z.object({
    street: z.string().min(2, { message: 'Street is required' }),
    city: z.string().min(2, { message: 'City is required' }),
    postcode: z.string().min(2, { message: 'Postcode is required' }),
    country: z.string().min(2, { message: 'Country is required' }),
  }),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
