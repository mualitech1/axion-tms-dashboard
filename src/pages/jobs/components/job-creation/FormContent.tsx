
import { Form } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BasicInfoStep } from "./step-forms/BasicInfoStep";
import { AddressesStep } from "./step-forms/AddressesStep";
import { SummaryStep } from "./step-forms/SummaryStep";
import { NavigationButtons } from "./NavigationButtons";
import { useIsMobile } from "@/hooks/use-mobile";
import { UseFormReturn } from "react-hook-form";
import { AdditionalStop, JobCreationFormData } from "@/pages/jobs/types/formTypes";
import * as React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface FormContentProps {
  form: UseFormReturn<JobCreationFormData>;
  currentStep: number;
  totalSteps: number;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onDocumentsChange: (files: File[]) => void;
  additionalStops: AdditionalStop[];
  addStop: () => void;
  removeStop: (index: number) => void;
  updateAdditionalStop: (index: number, field: keyof AdditionalStop, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  onCancel: () => void;
  onSubmit: (data: JobCreationFormData) => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 20 : -20,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 20 : -20,
    opacity: 0
  })
};

export function FormContent({
  form,
  currentStep,
  totalSteps,
  date,
  setDate,
  onDocumentsChange,
  additionalStops,
  addStop,
  removeStop,
  updateAdditionalStop,
  nextStep,
  prevStep,
  onCancel,
  onSubmit
}: FormContentProps) {
  const isMobile = useIsMobile();
  const [direction, setDirection] = React.useState(0);
  const [formError, setFormError] = React.useState<string | null>(null);

  // Set direction based on step change
  React.useEffect(() => {
    const handleStepChange = (newStep: number) => {
      setDirection(newStep > currentStep ? 1 : -1);
    };
    
    return () => {
      handleStepChange(currentStep);
    };
  }, [currentStep]);

  const handleNext = async () => {
    setFormError(null);
    
    // Validate the current step before proceeding
    if (currentStep === 1) {
      const result = await form.trigger(["jobTitle", "vehicleType", "customer"]);
      if (!result) {
        setFormError("Please fill in all required fields before continuing");
        return;
      }
    } else if (currentStep === 2) {
      const result = await form.trigger(["collection.addressLine1", "collection.city", "collection.postCode", "delivery.addressLine1", "delivery.city", "delivery.postCode"]);
      if (!result) {
        setFormError("Please complete both collection and delivery addresses");
        return;
      }
    }
    
    setDirection(1);
    nextStep();
  };

  const handlePrev = () => {
    setDirection(-1);
    prevStep();
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep 
            form={form} 
            date={date} 
            setDate={setDate}
            onDocumentsChange={onDocumentsChange} 
          />
        );
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
        return <SummaryStep form={form} date={date} />;
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4 px-4 sm:px-6 py-6"
      >
        <div className="flex flex-col">
          {formError && (
            <Alert variant="destructive" className="mb-4 bg-red-900/20 border-red-800 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          
          <div className="bg-[#05101b] rounded-lg shadow-lg border border-[#1a3246] mb-4">
            <div className="p-4 sm:p-6">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="relative">
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="max-h-[calc(100vh-320px)] overflow-y-auto pr-2 custom-scrollbar"
                    >
                      {renderCurrentStep()}
                    </motion.div>
                    
                    {/* Step indicator */}
                    <div className="absolute right-0 top-0">
                      <div className="bg-[#0a9bdb]/10 text-[#0adeee] text-xs font-mono px-2.5 py-1 rounded-md border border-[#1a3246]">
                        Step {currentStep} of {totalSteps}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          {/* Navigation buttons - now positioned correctly */}
          <NavigationButtons 
            currentStep={currentStep}
            totalSteps={totalSteps}
            isSubmitting={form.formState.isSubmitting}
            prevStep={handlePrev}
            nextStep={handleNext}
            onCancel={onCancel}
          />
        </div>
      </form>
    </Form>
  );
}
