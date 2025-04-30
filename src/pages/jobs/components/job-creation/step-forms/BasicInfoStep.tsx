
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { JobTitleField } from "./basic-info/JobTitleField";
import { CustomerVehicleFields } from "./basic-info/CustomerVehicleFields";
import { ProductWeightFields } from "./basic-info/ProductWeightFields";
import { DateRateFields } from "./basic-info/DateRateFields";
import { PrioritySelection } from "./basic-info/PrioritySelection";
import { FileUploader } from "../file-upload/FileUploader";
import { FormLabel } from "@/components/ui/form";
import { CircleAlertIcon } from "lucide-react";

interface BasicInfoStepProps {
  form: UseFormReturn<any>;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onDocumentsChange: (files: File[]) => void;
}

export function BasicInfoStep({ form, date, setDate, onDocumentsChange }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <motion.div 
        className="space-y-6"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        <div>
          <h3 className="text-lg font-semibold text-white mb-5 flex items-center">
            <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-[#0adeee] to-[#0a9bdb] mr-3 rounded-sm"></span>
            Basic Information
          </h3>
          <JobTitleField form={form} />
          <CustomerVehicleFields form={form} />
          <ProductWeightFields form={form} />
        </div>

        <div className="pt-2 border-t border-[#1a3246]">
          <h3 className="text-lg font-semibold text-white mb-5 flex items-center">
            <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-[#0adeee] to-[#0a9bdb] mr-3 rounded-sm"></span>
            Schedule & Priority
          </h3>
          <DateRateFields form={form} date={date} setDate={setDate} />
          <div className="mt-5">
            <PrioritySelection form={form} />
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="pt-4 border-t border-[#1a3246]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="flex items-center justify-between mb-3">
          <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider">
            Documents
          </FormLabel>
          <div className="flex items-center text-xs text-[#6b82a6]">
            <CircleAlertIcon className="h-3 w-3 mr-1" />
            Optional
          </div>
        </div>
        <FileUploader onFilesChange={onDocumentsChange} />
        {/* Spacer div to ensure content doesn't get cut off when scrolling */}
        <div className="h-2"></div>
      </motion.div>
    </div>
  );
}
