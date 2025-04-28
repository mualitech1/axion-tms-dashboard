
import { z } from 'zod';

// Schema for job location validation
export const jobLocationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  postcode: z.string().min(1, "Postcode is required"),
  country: z.string().min(1, "Country is required"),
  notes: z.string().optional(),
});

// Schema for the entire job
export const jobSchema = z.object({
  title: z.string().min(2, "Job title is required and must be at least 2 characters"),
  reference: z.string().min(1, "Reference is required"),
  status: z.string().default("booked"),
  priority: z.string().default("medium"),
  pickup_date: z.string().min(1, "Pickup date is required"),
  pickup_location: jobLocationSchema,
  delivery_location: jobLocationSchema,
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
