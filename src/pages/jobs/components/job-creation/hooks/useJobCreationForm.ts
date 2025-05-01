
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { AdditionalStop, JobCreationFormData } from "@/pages/jobs/types/formTypes";
import { useJobs } from "@/hooks/use-job";
import { Job } from "@/types/job";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Basic validation schema for the form
const jobFormSchema = z.object({
  jobTitle: z.string().min(1, { message: "Job title is required" }),
  vehicleType: z.string().min(1, { message: "Vehicle type is required" }),
  priority: z.string(),
  customer: z.string().min(1, { message: "Customer is required" }),
  rate: z.string().optional(),
  productType: z.string().optional(),
  totalWeight: z.string().optional(),
  additionalInformation: z.string().optional(),
  saveTemplate: z.boolean(),
  collection: z.object({
    companyName: z.string().optional(),
    contactName: z.string().optional(),
    addressLine1: z.string().min(1, { message: "Collection address is required" }),
    city: z.string().min(1, { message: "Collection city is required" }),
    postCode: z.string().min(1, { message: "Collection postcode is required" }),
    reference: z.string().optional(),
    time: z.string(),
    additionalComments: z.string().optional()
  }),
  delivery: z.object({
    companyName: z.string().optional(),
    contactName: z.string().optional(),
    addressLine1: z.string().min(1, { message: "Delivery address is required" }),
    city: z.string().min(1, { message: "Delivery city is required" }),
    postCode: z.string().min(1, { message: "Delivery postcode is required" }),
    reference: z.string().optional(),
    time: z.string(),
    additionalComments: z.string().optional()
  })
});

export function useJobCreationForm({ onComplete }: { onComplete: () => void }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [savedAddresses, setSavedAddresses] = useState<AdditionalStop[]>([]);
  const [additionalStops, setAdditionalStops] = useState<AdditionalStop[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const { toast } = useToast();
  const { createJob } = useJobs();
  
  const form = useForm<JobCreationFormData>({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      jobTitle: "",
      vehicleType: "",
      priority: "medium",
      customer: "",
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
        additionalComments: ""
      },
      delivery: {
        companyName: "",
        contactName: "",
        addressLine1: "",
        city: "",
        postCode: "",
        reference: "",
        time: "14:00",
        additionalComments: ""
      }
    },
    mode: "onChange"
  });

  const nextStep = async () => {
    // Let the FormContent component handle validation
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: JobCreationFormData) => {
    try {
      if (!date) {
        toast({
          title: "Error",
          description: "Please select a pickup date",
          variant: "destructive",
        });
        return;
      }
      
      // Format the collection and delivery locations as JobLocation objects
      const pickup_location = {
        address: data.collection.addressLine1,
        city: data.collection.city,
        postcode: data.collection.postCode,
        country: "UK", // Default country
        notes: data.collection.additionalComments,
        companyName: data.collection.companyName,
        contactName: data.collection.contactName,
        reference: data.collection.reference,
        time: data.collection.time
      };
      
      const delivery_location = {
        address: data.delivery.addressLine1,
        city: data.delivery.city,
        postcode: data.delivery.postCode,
        country: "UK", // Default country
        notes: data.delivery.additionalComments,
        companyName: data.delivery.companyName,
        contactName: data.delivery.contactName,
        reference: data.delivery.reference,
        time: data.delivery.time
      };
      
      // Prepare the job data
      const jobData: Omit<Job, 'id' | 'createdAt'> = {
        title: data.jobTitle,
        client: data.customer,
        date: format(date, "yyyy-MM-dd'T'HH:mm:ss"),
        time: format(date, "HH:mm"),
        origin: data.collection.city,
        destination: data.delivery.city,
        vehicle: data.vehicleType,
        status: "booked",
        priority: data.priority,
        value: data.rate ? parseFloat(data.rate) : undefined,
        reference: `REF-${Date.now().toString().slice(-6)}`,
        notes: data.additionalInformation,
        estimatedDuration: 120, // Default 2 hours
        podUploaded: false
      };
      
      console.log("Creating job with data:", jobData);
      console.log("Pickup location:", pickup_location);
      console.log("Delivery location:", delivery_location);
      
      // Execute the createJob mutation with the prepared data
      await createJob.mutateAsync({
        ...jobData,
        pickup_location,
        delivery_location
      } as any);
      
      // Save any new addresses if the saveTemplate flag is set
      if (data.saveTemplate) {
        const newAddresses = [];
        if (!savedAddresses.some(addr => addr.addressLine1 === data.collection.addressLine1)) {
          newAddresses.push(data.collection);
        }
        if (!savedAddresses.some(addr => addr.addressLine1 === data.delivery.addressLine1)) {
          newAddresses.push(data.delivery);
        }
        
        if (newAddresses.length > 0) {
          setSavedAddresses([...savedAddresses, ...newAddresses]);
        }
      }
      
      toast({
        title: "Job Created",
        description: `${data.jobTitle} has been scheduled for ${date ? format(date, "PPP") : "unspecified date"} with status "Booked"`,
      });
      
      onComplete();
    } catch (error) {
      console.error("Error creating job:", error);
      toast({
        title: "Error",
        description: "Failed to create job. Please try again.",
        variant: "destructive",
      });
    }
  };

  return {
    form,
    date,
    setDate,
    currentStep,
    nextStep,
    prevStep,
    additionalStops,
    setAdditionalStops,
    uploadedDocuments,
    setUploadedDocuments,
    handleSubmit
  };
}
