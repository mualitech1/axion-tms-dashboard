
import { CardContent, CardHeader } from "@/components/ui/card";
import { Package2, Zap } from "lucide-react";
import { StepIndicator } from "./job-creation/StepIndicator";
import { FormContent } from "./job-creation/FormContent";
import { useJobCreationForm } from "./job-creation/hooks/useJobCreationForm";
import { useAdditionalStops } from "./job-creation/hooks/useAdditionalStops";
import { useIsMobile } from "@/hooks/use-mobile";
import { motion } from "framer-motion";

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
      <CardHeader className="p-0 z-10">
        <div className="bg-gradient-to-r from-[#051b2a] to-[#081830] border-b border-[#1a3246]">
          <motion.div 
            className="px-5 py-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-to-br from-[#0a9bdb] to-[#0adeee] p-2 rounded-lg">
                  <Package2 className="h-5 w-5 text-[#030619]" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-[#0adeee] to-[#0a9bdb] bg-clip-text text-transparent">
                  Create New Job
                </h2>
                <div className="flex items-center bg-[#162233] rounded-full py-0.5 px-2 text-xs text-[#0adeee]">
                  <Zap className="h-3 w-3 mr-1 text-[#0adeee]" />
                  AXIMO
                </div>
              </div>
            </div>
            <StepIndicator currentStep={currentStep} totalSteps={3} />
          </motion.div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 bg-[#030619] flex flex-col h-[calc(100%-70px)]">
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
