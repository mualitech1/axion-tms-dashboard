
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Zap } from "lucide-react";
import { StepIndicator } from "./StepIndicator";
import { FormContent } from "./FormContent";
import { useJobCreationForm } from "./hooks/useJobCreationForm";
import { useAdditionalStops } from "./hooks/useAdditionalStops";
import { useIsMobile } from "@/hooks/use-mobile";

interface JobCreationProps {
  onComplete: () => void;
}

export default function JobCreationForm({ onComplete }: JobCreationProps) {
  const isMobile = useIsMobile();
  const {
    form,
    date,
    setDate,
    currentStep,
    nextStep,
    prevStep,
    uploadedDocuments,
    setUploadedDocuments,
    handleSubmit
  } = useJobCreationForm({ onComplete });
  
  const {
    additionalStops,
    addStop,
    removeStop,
    updateAdditionalStop
  } = useAdditionalStops();
  
  const handleDocumentsChange = (files: File[]) => {
    console.log("Documents changed:", files);
    setUploadedDocuments(files);
  };

  return (
    <>
      <CardHeader className="bg-gradient-to-r from-aximo-primary to-aximo-highlight text-white px-6 py-4 rounded-t-lg sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5" />
            <CardTitle className="text-xl font-semibold">Create New Job</CardTitle>
            <Zap className="h-4 w-4 text-yellow-300 ml-2" />
          </div>
        </div>
        <StepIndicator currentStep={currentStep} totalSteps={3} />
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 bg-aximo-dark">
        <FormContent 
          form={form}
          currentStep={currentStep}
          totalSteps={3}
          date={date}
          setDate={setDate}
          onDocumentsChange={handleDocumentsChange}
          additionalStops={additionalStops}
          addStop={addStop}
          removeStop={removeStop}
          updateAdditionalStop={updateAdditionalStop}
          nextStep={nextStep}
          prevStep={prevStep}
          onCancel={onComplete}
          onSubmit={handleSubmit}
        />
      </CardContent>
    </>
  );
}
