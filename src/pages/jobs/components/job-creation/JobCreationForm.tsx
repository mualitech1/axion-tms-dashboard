import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, Zap } from "lucide-react";
import { format } from "date-fns";
import { BasicInfoStep } from "./step-forms/BasicInfoStep";
import { AddressesStep } from "./step-forms/AddressesStep";
import { SummaryStep } from "./step-forms/SummaryStep";
import { StepIndicator } from "./StepIndicator";
import { NavigationButtons } from "./NavigationButtons";
import { motion } from "framer-motion";
import { JobStatus } from "../../types/jobTypes";

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

interface JobCreationProps {
  onComplete: () => void;
}

export default function JobCreationForm({ onComplete }: JobCreationProps) {
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

  const totalSteps = 3;
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const addStop = () => {
    setAdditionalStops([...additionalStops, {
      companyName: "",
      contactName: "",
      addressLine1: "",
      city: "",
      postCode: "",
      reference: "",
      time: "12:00"
    }]);
  };

  const removeStop = (index: number) => {
    const newStops = [...additionalStops];
    newStops.splice(index, 1);
    setAdditionalStops(newStops);
  };

  const updateAdditionalStop = (index: number, field: keyof Address, value: string) => {
    const newStops = [...additionalStops];
    newStops[index] = { ...newStops[index], [field]: value };
    setAdditionalStops(newStops);
  };
  
  const handleDocumentsChange = (files: File[]) => {
    setUploadedDocuments(files);
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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep form={form} date={date} setDate={setDate} />;
      case 2:
        return (
          <AddressesStep 
            form={form} 
            additionalStops={additionalStops} 
            addStop={addStop}
            removeStop={removeStop}
            updateAdditionalStop={updateAdditionalStop}
          />
        );
      case 3:
        return <SummaryStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <>
      <CardHeader className="bg-gradient-to-r from-blue-600/90 to-indigo-600 text-white px-6 py-4">
        <CardTitle className="text-xl flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Create New Job
          <Zap className="h-4 w-4 ml-2 text-yellow-300" />
        </CardTitle>
        <StepIndicator currentStep={currentStep} totalSteps={3} />
      </CardHeader>
      <CardContent className="p-6 bg-aximo-dark">
        <Form {...form}>
          <motion.form 
            onSubmit={form.handleSubmit(handleSubmit)} 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            key={currentStep}
          >
            {renderCurrentStep()}
            
            <NavigationButtons 
              currentStep={currentStep}
              totalSteps={3}
              isSubmitting={form.formState.isSubmitting}
              prevStep={prevStep}
              nextStep={nextStep}
              onCancel={onComplete}
            />
          </motion.form>
        </Form>
      </CardContent>
    </>
  );
}
