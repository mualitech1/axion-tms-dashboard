
import { z } from 'zod';
import { JobLocation, Job, Company, Vehicle } from '@/types/database';

// Common location schema that can be reused
export const locationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),
});

// Job validation schema
export const jobSchema = z.object({
  title: z.string().min(2, "Job title is required and must be at least 2 characters"),
  reference: z.string().min(1, "Reference is required"),
  status: z.string().default("booked"),
  priority: z.string().default("medium"),
  pickup_date: z.string().min(1, "Pickup date is required"),
  pickup_location: locationSchema,
  delivery_location: locationSchema,
  customer_id: z.string().nullable().optional(),
  carrier_id: z.string().nullable().optional(),
  vehicle_id: z.string().nullable().optional(),
  driver_id: z.string().nullable().optional(),
  estimated_duration: z.number().nullable().optional(),
  value: z.number().nullable().optional(),
  notes: z.string().nullable().optional(),
  issue_details: z.string().nullable().optional(),
  pod_document_id: z.string().nullable().optional(),
  pod_uploaded: z.boolean().nullable().optional().default(false),
});

// Company validation schema
export const companySchema = z.object({
  name: z.string().min(2, "Company name is required"),
  type: z.enum(["customer", "carrier"], {
    errorMap: () => ({ message: "Type must be either customer or carrier" })
  }),
  contact_name: z.string().nullable().optional(),
  email: z.string().email("Invalid email address").nullable().optional(),
  phone: z.string().nullable().optional(),
  status: z.string().default("active"),
  credit_limit: z.number().nullable().optional().default(0),
  address: z.object({
    street: z.string().optional(),
    city: z.string().optional(),
    postcode: z.string().optional(),
    country: z.string().optional(),
  }).nullable().optional(),
  metadata: z.record(z.any()).nullable().optional().default({}),
});

// Vehicle validation schema
export const vehicleSchema = z.object({
  registration: z.string().min(1, "Registration is required"),
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  type: z.string().min(1, "Type is required"),
  year: z.number().nullable().optional(),
  status: z.string().default("active"),
  mot_expiry_date: z.string().nullable().optional(),
  tax_expiry_date: z.string().nullable().optional(),
  insurance_expiry_date: z.string().nullable().optional(),
  last_service_date: z.string().nullable().optional(),
  next_service_date: z.string().nullable().optional(),
  current_mileage: z.number().nullable().optional(),
  acquisition_date: z.string().nullable().optional(),
  assigned_driver_id: z.string().nullable().optional(),
});

// Validate data against a schema with helpful error messages
export function validateData<T>(data: T, schema: z.ZodType<any>): {
  isValid: boolean;
  errors?: Record<string, string>;
  validatedData?: any;
} {
  try {
    const validatedData = schema.parse(data);
    return { isValid: true, validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format ZodError into a more usable structure
      const errorMap = error.format();
      const flattenedErrors: Record<string, string> = {};
      
      // Flatten nested error objects
      function flattenErrors(obj: any, path = '') {
        if (obj && typeof obj === 'object') {
          Object.entries(obj).forEach(([key, value]) => {
            const newPath = path ? `${path}.${key}` : key;
            if (key === '_errors' && Array.isArray(value) && value.length > 0) {
              flattenedErrors[path] = value[0];
            } else if (typeof value === 'object') {
              flattenErrors(value, newPath);
            }
          });
        }
      }
      
      flattenErrors(errorMap);
      return { isValid: false, errors: flattenedErrors };
    }
    
    return { 
      isValid: false, 
      errors: { general: 'Validation failed with unexpected error' }
    };
  }
}
