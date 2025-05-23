// ULTIMATE FIX: Complete replacement for useJobCreationForm.ts 
// This addresses the setIsProcessing state issue that's causing the error

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { AdditionalStop, JobCreationFormData, AddressFormData } from "@/pages/jobs/types/formTypes";
import { useJobs } from "@/hooks/use-jobs";
import { Job, JobPriority } from "@/types/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ulid } from "ulid";

// Custom localStorage hook
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// Enhanced validation schema
const jobFormSchema = z.object({
  jobTitle: z.string().min(1, { message: "Quantum operation requires a designation" }),
  vehicleType: z.string().min(1, { message: "Transport vessel configuration is required" }),
  priority: z.string() as z.ZodType<JobPriority>,
  customer: z.string().min(1, { message: "Entity designation is required" }),
  pickupDate: z.date({
    required_error: "Temporal coordinates for pickup must be specified",
  }),
  rate: z.string().optional()
    .refine(val => !val || !isNaN(Number(val)), { message: "Rate must be a valid quantum value" }),
  productType: z.string().optional(),
  totalWeight: z.string().optional()
    .refine(val => !val || !isNaN(Number(val)), { message: "Mass must be a valid quantum measure" }),
  additionalInformation: z.string().optional(),
  saveTemplate: z.boolean(),
  collection: z.object({
    companyName: z.string().optional(),
    contactName: z.string().optional(),
    addressLine1: z.string().min(1, { message: "Origin point coordinates required" }),
    city: z.string().min(1, { message: "Origin nexus designation required" }),
    postCode: z.string().min(1, { message: "Origin spatial index required" }),
    reference: z.string().optional(),
    time: z.string(),
    additionalComments: z.string().optional(),
    instructions: z.string().optional()
  }),
  delivery: z.object({
    companyName: z.string().optional(),
    contactName: z.string().optional(),
    addressLine1: z.string().min(1, { message: "Destination point coordinates required" }),
    city: z.string().min(1, { message: "Destination nexus designation required" }),
    postCode: z.string().min(1, { message: "Destination spatial index required" }),
    reference: z.string().optional(),
    time: z.string(),
    additionalComments: z.string().optional(),
    instructions: z.string().optional()
  })
});

export interface JobTemplate {
  id: string;
  name: string;
  data: Partial<JobCreationFormData>;
  createdAt: string;
}

export function useJobCreationForm({ onComplete }: { onComplete: (data: JobCreationFormData) => void }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formProgress, setFormProgress] = useState<number>(0);
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  
  // FIXED: Properly typed state for processing and loading
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("");
  
  const { toast } = useToast();
  const { createJob } = useJobs();
  
  // Store saved templates in local storage
  const [templates, setTemplates] = useLocalStorage<JobTemplate[]>("aximo-job-templates", []);
  const [savedAddresses, setSavedAddresses] = useLocalStorage<AdditionalStop[]>("aximo-saved-addresses", []);
  
  const form = useForm<JobCreationFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      jobTitle: "",
      vehicleType: "",
      priority: "medium",
      customer: "",
      pickupDate: new Date(),
      rate: "",
      productType: "",
      totalWeight: "",
      additionalInformation: "",
      saveTemplate: false,
      collection: {
        companyName: "",
        contactName: "",
        addressLine1: "",
        city: "",
        postCode: "",
        reference: "",
        time: "09:00",
        additionalComments: "",
        instructions: ""
      },
      delivery: {
        companyName: "",
        contactName: "",
        addressLine1: "",
        city: "",
        postCode: "",
        reference: "",
        time: "14:00",
        additionalComments: "",
        instructions: ""
      }
    },
    mode: "onChange"
  });

  // Update form progress based on filled fields
  useEffect(() => {
    const formValues = form.getValues();
    const requiredFields = [
      'jobTitle', 'vehicleType', 'customer',
      'collection.addressLine1', 'collection.city', 'collection.postCode',
      'delivery.addressLine1', 'delivery.city', 'delivery.postCode'
    ];
    
    let filledCount = 0;
    requiredFields.forEach(field => {
      const value = field.includes('.') 
        ? formValues[field.split('.')[0] as keyof JobCreationFormData]?.[field.split('.')[1] as keyof AddressFormData] 
        : formValues[field as keyof JobCreationFormData];
      
      if (value) filledCount++;
    });
    
    const additionalFields = [
      'productType', 'totalWeight', 'rate', 'additionalInformation',
      'collection.companyName', 'collection.contactName', 'collection.reference',
      'delivery.companyName', 'delivery.contactName', 'delivery.reference'
    ];
    
    let additionalFilledCount = 0;
    additionalFields.forEach(field => {
      const value = field.includes('.') 
        ? formValues[field.split('.')[0] as keyof JobCreationFormData]?.[field.split('.')[1] as keyof AddressFormData] 
        : formValues[field as keyof JobCreationFormData];
      
      if (value) additionalFilledCount++;
    });
    
    const progress = Math.min(
      100,
      Math.round((filledCount / requiredFields.length) * 70) + 
      Math.round((additionalFilledCount / additionalFields.length) * 30)
    );
    
    setFormProgress(progress);
  }, [form.watch()]);

  const nextStep = async () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const saveAsTemplate = (name: string) => {
    const currentData = form.getValues();
    
    const newTemplate: JobTemplate = {
      id: ulid(),
      name,
      data: { ...currentData },
      createdAt: new Date().toISOString(),
    };
    
    setTemplates([...templates, newTemplate]);
    
    toast({
      title: "Quantum Template Saved",
      description: `Operation configuration "${name}" has been stored in the quantum matrix`,
    });
  };
  
  const loadTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (!template) return;
    
    Object.entries(template.data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        form.setValue(
          key as keyof JobCreationFormData, 
          value as JobCreationFormData[keyof JobCreationFormData]
        );
      }
    });
    
    toast({
      title: "Quantum Template Loaded",
      description: `Operation configuration "${template.name}" has been materialized`,
    });
  };
  
  const deleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
    
    toast({
      title: "Quantum Template Dissolved",
      description: "The configuration has been removed from the quantum matrix",
    });
  };

  // ULTIMATE HANDLESUBMIT - COMPLETELY REWRITTEN FOR SUCCESS
  const handleSubmit = async (data: JobCreationFormData) => {
    try {
      console.log("🔥 QUANTUM SUBMISSION - Form Data:", JSON.stringify(data, null, 2));
      
      // FIXED: Proper state management
      setIsProcessing(true);
      setLoadingMessage("Initializing quantum transport matrices...");
      
      // FIXED: Customer ID is already UUID from dropdown - no mapping needed
      const customerUuid = data.customer;
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Pickup date validation
      if (!data.pickupDate) {
        toast({
          title: "Temporal Anomaly",
          description: "Please define a temporal coordinate for pickup",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      // Enhanced validation
      if (!data || !data.collection || !data.delivery) {
        console.error("🚫 QUANTUM VALIDATION FAILURE: Missing collection or delivery objects", { data });
        toast({
          title: "Quantum Data Anomaly",
          description: "Missing required origin or destination data",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      // Check all required fields
      const missingFields = [];
      if (!data.collection?.addressLine1) missingFields.push('Collection Address');
      if (!data.collection?.city) missingFields.push('Collection City');
      if (!data.collection?.postCode) missingFields.push('Collection Postcode');
      if (!data.delivery?.addressLine1) missingFields.push('Delivery Address');
      if (!data.delivery?.city) missingFields.push('Delivery City');
      if (!data.delivery?.postCode) missingFields.push('Delivery Postcode');
      
      if (missingFields.length > 0) {
        toast({
          title: "Missing Required Fields",
          description: `Please fill in: ${missingFields.join(', ')}`,
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }
      
      setLoadingMessage("Quantum-entangling origin and destination points...");
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Generate quantum reference
      const quantumRef = `Q${Math.floor(Math.random() * 900) + 100}-${Date.now().toString(36).slice(-4).toUpperCase()}-${Math.floor(Math.random() * 900) + 100}`;
      
      // COMPLETELY FIXED JOB DATA - matches exact schema
      const jobData = {
        id: ulid(),
        reference: quantumRef,
        title: data.jobTitle,
        customer_id: customerUuid,
        pickup_date: data.pickupDate.toISOString(),
        
        pickup_location: {
          company_name: data.collection.companyName || "",
          contact_name: data.collection.contactName || "",
          address_line1: data.collection.addressLine1,
          city: data.collection.city,
          post_code: data.collection.postCode,
          reference: data.collection.reference || "",
          time: data.collection.time,
          additional_comments: data.collection.additionalComments || "",
          instructions: data.collection.instructions || ""
        },
        
        delivery_location: {
          company_name: data.delivery.companyName || "",
          contact_name: data.delivery.contactName || "",
          address_line1: data.delivery.addressLine1,
          city: data.delivery.city,
          post_code: data.delivery.postCode,
          reference: data.delivery.reference || "",
          time: data.delivery.time,
          additional_comments: data.delivery.additionalComments || "",
          instructions: data.delivery.instructions || ""
        },
        
        status: "booked",
        priority: data.priority,
        value: data.rate ? parseFloat(data.rate) : null,
        notes: data.additionalInformation || null,
        estimated_duration: null,
        pod_uploaded: false,
        carrier_id: null,
        vehicle_id: null,
        driver_id: null,
        pod_document_id: null,
        issue_details: null,
        created_by: null
      };
      
      // NUCLEAR OPTION: GUARANTEED JOB_REFERENCE REMOVAL
      // Ensure we don't have any accidental job_reference fields by removing them at multiple levels
      // 1. Explicit deletion
      const finalJobData = { ...jobData };
      if ('job_reference' in finalJobData) delete (finalJobData as any).job_reference;
      
      // 2. Strip any field with job_reference anywhere in the name (case insensitive)
      Object.keys(finalJobData).forEach(key => {
        if (key.toLowerCase().includes('job_reference')) {
          console.warn(`🔥 NUCLEAR OPTION: Found and removed field "${key}" that looks like job_reference`);
          delete (finalJobData as any)[key];
        }
      });
      
      // 3. Deep check nested objects too (for safety)
      const deepClean = (obj: any) => {
        if (!obj || typeof obj !== 'object') return;
        if ('job_reference' in obj) delete obj.job_reference;
        Object.keys(obj).forEach(key => {
          if (key.toLowerCase().includes('job_reference')) {
            delete obj[key];
          } else if (typeof obj[key] === 'object') {
            deepClean(obj[key]);
          }
        });
      };
      deepClean(finalJobData);
      
      console.log("🧩 FINAL QUANTUM JOB DATA (NUCLEAR CLEANED):", finalJobData);
      
      setLoadingMessage("Establishing quantum transport pathway...");
      await new Promise(resolve => setTimeout(resolve, 700));
      
      // Save template if requested
      if (data.saveTemplate) {
        saveAsTemplate(data.jobTitle);
      }
      
      // Save addresses
      const newAddresses = [];
      if (data.collection.addressLine1 && !savedAddresses.some(addr => addr.addressLine1 === data.collection.addressLine1)) {
        newAddresses.push(data.collection);
      }
      if (data.delivery.addressLine1 && !savedAddresses.some(addr => addr.addressLine1 === data.delivery.addressLine1)) {
        newAddresses.push(data.delivery);
      }
      
      if (newAddresses.length > 0) {
        setSavedAddresses([...savedAddresses, ...newAddresses]);
      }
      
      // Execute the createJob mutation with proper error handling - USE THE NUCLEAR CLEANED VERSION
      await createJob.mutateAsync(finalJobData as unknown as Parameters<typeof createJob.mutateAsync>[0]);
      
      setLoadingMessage("Quantum operation successfully manifested!");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Quantum Operation Manifested",
        description: `${data.jobTitle} has been scheduled within the spatio-temporal matrix`,
      });
      
      setIsProcessing(false);
      onComplete(data);
      
    } catch (error) {
      console.error("Error creating job:", error);
      setIsProcessing(false);
      
      // Enhanced error handling
      let errorMessage = "Operation creation failed due to a distortion in the probability field. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('Schema mismatch') || error.message.includes('has no field') || error.message.includes('reference')) {
          errorMessage = "Database schema mismatch detected. Please contact support.";
          console.error("SCHEMA ERROR DETAILS:", error.message);
        } else if (error.message.includes('customer_id')) {
          errorMessage = "Invalid customer selection. Please select a different customer.";
        } else if (error.message.includes('Missing required field')) {
          errorMessage = error.message; // Use the actual error message for missing fields
        } else if (error.message.includes('duplicate key')) {
          errorMessage = "This job already exists in the system. Please try again with a different reference.";
        } else {
          // Use the actual error message as a fallback
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Quantum Fluctuation Detected",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  return {
    form,
    date,
    setDate,
    currentStep,
    formProgress,
    nextStep,
    prevStep,
    uploadedDocuments,
    setUploadedDocuments,
    templates,
    savedAddresses,
    loadTemplate,
    deleteTemplate,
    isProcessing,
    loadingMessage,
    handleSubmit
  };
}