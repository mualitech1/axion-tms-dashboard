
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Briefcase } from "lucide-react";
import { format } from "date-fns";
import { BasicInfoStep } from "./step-forms/BasicInfoStep";
import { AddressesStep } from "./step-forms/AddressesStep";
import { SummaryStep } from "./step-forms/SummaryStep";
import { StepIndicator } from "./StepIndicator";
import { NavigationButtons } from "./NavigationButtons";

interface Address {
  companyName: string;
  contactName: string;
  addressLine1: string;
  city: string;
  postCode: string;
}

interface JobCreationProps {
  onComplete: () => void;
}

export default function JobCreationForm({ onComplete }: JobCreationProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [additionalStops, setAdditionalStops] = useState<Address[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
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
        reference: ""
      },
      delivery: {
        companyName: "",
        contactName: "",
        addressLine1: "",
        city: "",
        postCode: "",
        reference: ""
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
      postCode: ""
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

  const handleSubmit = (data: any) => {
    // In a real app, we would save this to a database
    const fullJobData = {
      ...data,
      date,
      additionalStops
    };
    
    console.log("Saving job:", fullJobData);
    
    // Save addresses for future use
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
      description: `${data.jobTitle} has been scheduled for ${date ? format(date, "PPP") : "unspecified date"}`,
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
    <Card className="border shadow-md rounded-xl overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600/90 to-indigo-600 text-white">
        <CardTitle className="text-xl flex items-center">
          <Briefcase className="h-5 w-5 mr-2" />
          Create New Job
        </CardTitle>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {renderCurrentStep()}
            
            <NavigationButtons 
              currentStep={currentStep}
              totalSteps={totalSteps}
              isSubmitting={form.formState.isSubmitting}
              prevStep={prevStep}
              nextStep={nextStep}
              onCancel={onComplete}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
