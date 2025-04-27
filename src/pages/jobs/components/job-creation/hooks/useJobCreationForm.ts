
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { JobStatus } from "../../../types/jobTypes";

export function useJobCreationForm({ onComplete }: { onComplete: () => void }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [additionalStops, setAdditionalStops] = useState<Address[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);
  const { toast } = useToast();
  
  const form = useForm({
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
    }
  });

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (data: any) => {
    const fullJobData = {
      ...data,
      date,
      additionalStops,
      documents: uploadedDocuments.map(file => file.name),
      status: "booked" as JobStatus,
      createdAt: new Date().toISOString(),
    };
    
    console.log("Saving job:", fullJobData);
    
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
    
    toast({
      title: "Job Created",
      description: `${data.jobTitle} has been scheduled for ${date ? format(date, "PPP") : "unspecified date"} with status "Booked"`,
    });
    
    onComplete();
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

interface Address {
  companyName: string;
  contactName: string;
  addressLine1: string;
  city: string;
  postCode: string;
  reference: string;
  time?: string;
  additionalComments?: string;
}
