
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AddressForm } from "../address/AddressForm";
import { AdditionalStop } from "../step-forms/AdditionalStop";
import { MapPin } from "lucide-react";
import { AdditionalStop as AdditionalStopType, JobCreationFormData } from "@/pages/jobs/types/formTypes";
import { motion } from "framer-motion";

interface AddressesStepProps {
  form: UseFormReturn<JobCreationFormData>;
  additionalStops: AdditionalStopType[];
  addStop: () => void;
  removeStop: (index: number) => void;
  updateAdditionalStop: (index: number, field: keyof AdditionalStopType, value: string) => void;
}

export function AddressesStep({ form, additionalStops, addStop, removeStop, updateAdditionalStop }: AddressesStepProps) {
  return (
    <div className="text-white">
      <div className="mb-6">
        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#081427] border border-[#1a3246] rounded-md p-1">
            <TabsTrigger 
              value="collection" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0a9bdb] data-[state=active]:to-[#0adeee] data-[state=active]:text-[#030619] data-[state=active]:font-medium text-[#6b82a6] rounded-md"
            >
              Collection Details
            </TabsTrigger>
            <TabsTrigger 
              value="delivery" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0a9bdb] data-[state=active]:to-[#0adeee] data-[state=active]:text-[#030619] data-[state=active]:font-medium text-[#6b82a6] rounded-md"
            >
              Delivery Details
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="collection" className="bg-[#05101b] p-4 sm:p-6 rounded-lg border border-[#1a3246] shadow-inner">
            <AddressForm prefix="collection" label="Collection Details" form={form} />
          </TabsContent>
          
          <TabsContent value="delivery" className="bg-[#05101b] p-4 sm:p-6 rounded-lg border border-[#1a3246] shadow-inner">
            <AddressForm prefix="delivery" label="Delivery Details" form={form} />
          </TabsContent>
        </Tabs>
      </div>
      
      {additionalStops.length > 0 && (
        <motion.div 
          className="border-t border-[#1a3246] pt-6 mt-6 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-[#0adeee] to-[#0a9bdb] mr-3 rounded-sm"></span>
            Additional Stops
          </h3>
          <div className="space-y-6">
            {additionalStops.map((stop, index) => (
              <AdditionalStop 
                key={index}
                stop={stop}
                index={index}
                updateStop={updateAdditionalStop}
                removeStop={removeStop}
              />
            ))}
          </div>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="mt-6"
      >
        <Button
          type="button"
          variant="outline"
          onClick={addStop}
          className="w-full py-6 border-dashed border-2 border-[#1a3246] hover:bg-[#0a9bdb]/5 hover:border-[#0a9bdb]/50 text-[#6b82a6] hover:text-[#0adeee] transition-colors rounded-md group"
        >
          <Plus className="mr-2 h-4 w-4 text-[#0a9bdb] group-hover:scale-125 transition-transform" /> 
          Add Additional Stop
        </Button>
      </motion.div>
    </div>
  );
}
