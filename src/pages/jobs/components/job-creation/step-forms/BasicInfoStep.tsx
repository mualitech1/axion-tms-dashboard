
import { UseFormReturn } from "react-hook-form";
import { motion } from "framer-motion";
import { JobTitleField } from "./basic-info/JobTitleField";
import { CustomerVehicleFields } from "./basic-info/CustomerVehicleFields";
import { ProductWeightFields } from "./basic-info/ProductWeightFields";
import { DateRateFields } from "./basic-info/DateRateFields";
import { PrioritySelection } from "./basic-info/PrioritySelection";
import { FileUploader } from "../file-upload/FileUploader";
import { FormLabel } from "@/components/ui/form";

interface BasicInfoStepProps {
  form: UseFormReturn<any>;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onDocumentsChange: (files: File[]) => void;
}

export function BasicInfoStep({ form, date, setDate, onDocumentsChange }: BasicInfoStepProps) {
  return (
    <div className="space-y-6 text-white pb-8">
      <motion.div 
        className="space-y-5"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: { staggerChildren: 0.1 }
          }
        }}
      >
        <JobTitleField form={form} />
        <CustomerVehicleFields form={form} />
        <ProductWeightFields form={form} />
        <DateRateFields form={form} date={date} setDate={setDate} />
        <PrioritySelection form={form} />
      </motion.div>
      
      <motion.div
        className="pt-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <FormLabel className="text-[#0adeee] font-semibold text-sm uppercase tracking-wider mb-3 block">
          Documents
        </FormLabel>
        <FileUploader onFilesChange={onDocumentsChange} />
      </motion.div>
    </div>
  );
}
