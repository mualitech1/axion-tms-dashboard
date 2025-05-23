import { JobStatus } from "@/types/job";

// Define JobPriority here since it's not being imported properly
export type JobPriority = "low" | "medium" | "high";

export interface AddressFormData {
  companyName: string;
  contactName: string;
  addressLine1: string;
  city: string;
  postCode: string;
  reference: string;
  time: string;
  additionalComments?: string;
  instructions?: string;
}

export interface AdditionalStop extends AddressFormData {}

export interface JobCreationFormData {
  jobTitle: string;
  vehicleType: string;
  priority: JobPriority;
  customer: string;
  pickupDate: Date;
  rate?: string;
  productType?: string;
  totalWeight?: string;
  additionalInformation?: string;
  saveTemplate: boolean;
  collection: AddressFormData;
  delivery: AddressFormData;
}

export interface JobFormState extends JobCreationFormData {
  date?: Date;
  additionalStops: AdditionalStop[];
  documents: File[];
  status: JobStatus;
}
