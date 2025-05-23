import { Form } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavigationButtons } from "./NavigationButtons";
import { useIsMobile } from "@/hooks/use-mobile";
import { UseFormReturn } from "react-hook-form";
import { AdditionalStop, JobCreationFormData } from "@/pages/jobs/types/formTypes";
import * as React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Sparkles, BookOpen, FolderSync, Loader2 } from "lucide-react";
import { JobTemplate } from "./hooks/useJobCreationForm";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { StepIndicator } from "./StepIndicator";
import { StepOne } from "./step-forms/StepOne";
import { StepTwo } from "./step-forms/StepTwo";
import { StepThree } from "./step-forms/StepThree";
import { z } from "zod";

interface Template {
  id: string;
  name: string;
  createdAt: string;
}

interface FormContentProps {
  form: UseFormReturn<JobCreationFormData, z.ZodType<JobCreationFormData>, undefined>;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  currentStep: number;
  totalSteps: number;
  formProgress: number;
  onDocumentsChange: (files: File[]) => void;
  additionalStops: AdditionalStop[];
  addStop: () => void;
  removeStop: (index: number) => void;
  updateAdditionalStop: (index: number, data: AdditionalStop) => void;
  nextStep: () => void;
  prevStep: () => void;
  handleCancel: () => void;
  handleSubmit: () => void;
  handleTemplateSave: () => void;
  templates: Template[];
  handleTemplateLoad: (id: string) => void;
  handleTemplateDelete: (id: string) => void;
  isLoading: boolean;
  loadingMsg: string;
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
  date,
  setDate,
  currentStep,
  totalSteps,
  formProgress,
  onDocumentsChange,
  additionalStops,
  addStop,
  removeStop,
  updateAdditionalStop,
  nextStep,
  prevStep,
  handleCancel,
  handleSubmit,
  handleTemplateSave,
  templates,
  handleTemplateLoad,
  handleTemplateDelete,
  isLoading,
  loadingMsg
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

  // Render steps based on current step
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepOne
            form={form}
            date={date}
            setDate={setDate}
            templates={templates}
            onLoadTemplate={handleTemplateLoad}
            onDeleteTemplate={handleTemplateDelete}
            onSaveTemplate={handleTemplateSave}
          />
        );
      case 2:
        return (
          <StepTwo
            form={form}
            additionalStops={additionalStops}
            onAddStop={addStop}
            onRemoveStop={removeStop}
            onUpdateStop={updateAdditionalStop}
          />
        );
      case 3:
        return <StepThree form={form} onDocumentsChange={onDocumentsChange} />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[500px] text-center p-6">
        <div className="w-20 h-20 mb-6">
          <Loader2 className="h-20 w-20 animate-spin text-[#0adeee]" />
        </div>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#0adeee] to-[#0a9bdb] bg-clip-text text-transparent">
          Processing Your Request
        </h2>
        <p className="text-[#6b82a6] max-w-md">
          {loadingMsg || "Initializing quantum transport matrices..."}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form>
        <Card className="p-6 bg-transparent border-0 shadow-none">
          <StepIndicator
            currentStep={currentStep}
            totalSteps={totalSteps}
            formProgress={formProgress}
          />
          
          {formError && (
            <Alert className="mb-4 bg-red-950/30 border-red-800 text-red-300">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formError}</AlertDescription>
            </Alert>
          )}
          
          {renderStep()}

          <NavigationButtons
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrevious={handlePrev}
            onNext={handleNext}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
            submitEnabled={formProgress >= 70}
          />
        </Card>
      </form>
    </Form>
  );
}
