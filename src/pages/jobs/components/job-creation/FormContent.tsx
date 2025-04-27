
import { Form } from "@/components/ui/form";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BasicInfoStep } from "./step-forms/BasicInfoStep";
import { AddressesStep } from "./step-forms/AddressesStep";
import { SummaryStep } from "./step-forms/SummaryStep";
import { NavigationButtons } from "./NavigationButtons";
import { useIsMobile } from "@/hooks/use-mobile";
import { UseFormReturn } from "react-hook-form";

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
  const scrollMaxHeight = isMobile ? "calc(70vh - 200px)" : "calc(80vh - 200px)";

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
      <AnimatePresence mode="wait">
        <motion.form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          key={currentStep}
        >
          <div className="bg-aximo-card rounded-lg shadow-lg border border-aximo-border">
            <ScrollArea className="p-4 sm:p-6" style={{ maxHeight: scrollMaxHeight }}>
              {renderCurrentStep()}
            </ScrollArea>
          </div>
          
          <NavigationButtons 
            currentStep={currentStep}
            totalSteps={totalSteps}
            isSubmitting={form.formState.isSubmitting}
            prevStep={prevStep}
            nextStep={nextStep}
            onCancel={onCancel}
          />
        </motion.form>
      </AnimatePresence>
    </Form>
  );
}
