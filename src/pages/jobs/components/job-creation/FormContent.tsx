
import { Form } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BasicInfoStep } from "./step-forms/BasicInfoStep";
import { AddressesStep } from "./step-forms/AddressesStep";
import { SummaryStep } from "./step-forms/SummaryStep";
import { NavigationButtons } from "./NavigationButtons";
import { useIsMobile } from "@/hooks/use-mobile";
import { UseFormReturn } from "react-hook-form";
import * as React from "react";

interface FormContentProps {
  form: UseFormReturn<any>;
  currentStep: number;
  totalSteps: number;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onDocumentsChange: (files: File[]) => void;
  additionalStops: any[];
  addStop: () => void;
  removeStop: (index: number) => void;
  updateAdditionalStop: (index: number, field: string, value: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  onCancel: () => void;
  onSubmit: (data: any) => void;
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
  // Adjusting the max height to ensure the form is always scrollable
  const scrollMaxHeight = isMobile ? "calc(65vh)" : "calc(70vh)";
  const [direction, setDirection] = React.useState(0);

  // Set direction based on step change
  React.useEffect(() => {
    const handleStepChange = (newStep: number) => {
      setDirection(newStep > currentStep ? 1 : -1);
    };
    
    return () => {
      handleStepChange(currentStep);
    };
  }, [currentStep]);

  const handleNext = () => {
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
        return <SummaryStep form={form} />;
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-4 sm:space-y-6"
      >
        <div className="bg-[#05101b] rounded-lg shadow-lg border border-[#1a3246] overflow-hidden">
          <ScrollArea 
            className="p-4 sm:p-6" 
            style={{ 
              height: scrollMaxHeight,
              overflowY: "auto"
            }}
            scrollHideDelay={100}
          >
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
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
          </ScrollArea>
        </div>
        
        <NavigationButtons 
          currentStep={currentStep}
          totalSteps={totalSteps}
          isSubmitting={form.formState.isSubmitting}
          prevStep={handlePrev}
          nextStep={handleNext}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}
