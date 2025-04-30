
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Building2, User, MapPin, Clock, FileText, Trash2 } from "lucide-react";
import { AdditionalStop as AdditionalStopType } from "@/pages/jobs/types/formTypes";
import { motion } from "framer-motion";

interface AdditionalStopProps {
  stop: AdditionalStopType;
  index: number;
  updateStop: (index: number, field: keyof AdditionalStopType, value: string) => void;
  removeStop: (index: number) => void;
}

export function AdditionalStop({ stop, index, updateStop, removeStop }: AdditionalStopProps) {
  return (
    <motion.div 
      className="bg-[#05101b] p-4 sm:p-6 rounded-lg border border-[#1a3246] shadow-inner relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute right-4 top-4">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => removeStop(index)}
          className="h-8 w-8 p-0 rounded-full hover:bg-red-950/40 hover:text-red-400 text-[#6b82a6]"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="mb-4">
        <div className="inline-flex items-center justify-center bg-[#081427] px-3 py-1 rounded-full border border-[#1a3246]">
          <span className="text-xs font-medium text-[#0adeee]">Stop {index + 1}</span>
        </div>
      </div>
      
      <div className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FormLabel className="text-[#0adeee] font-semibold text-xs uppercase tracking-wider block mb-1.5">
              Company Name
            </FormLabel>
            <div className="relative">
              <Input
                value={stop.companyName}
                onChange={(e) => updateStop(index, "companyName", e.target.value)}
                placeholder="Enter company name"
                className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md"
              />
              <Building2 className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
            </div>
          </div>
          
          <div>
            <FormLabel className="text-[#0adeee] font-semibold text-xs uppercase tracking-wider block mb-1.5">
              Contact Name
            </FormLabel>
            <div className="relative">
              <Input
                value={stop.contactName}
                onChange={(e) => updateStop(index, "contactName", e.target.value)}
                placeholder="Enter contact name"
                className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md"
              />
              <User className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
            </div>
          </div>
        </div>
        
        <div>
          <FormLabel className="text-[#0adeee] font-semibold text-xs uppercase tracking-wider block mb-1.5">
            Address <span className="text-red-400 ml-1">*</span>
          </FormLabel>
          <div className="relative">
            <Input
              value={stop.addressLine1}
              onChange={(e) => updateStop(index, "addressLine1", e.target.value)}
              placeholder="Enter address"
              className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md"
            />
            <MapPin className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FormLabel className="text-[#0adeee] font-semibold text-xs uppercase tracking-wider block mb-1.5">
              City <span className="text-red-400 ml-1">*</span>
            </FormLabel>
            <Input
              value={stop.city}
              onChange={(e) => updateStop(index, "city", e.target.value)}
              placeholder="Enter city"
              className="bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md"
            />
          </div>
          
          <div>
            <FormLabel className="text-[#0adeee] font-semibold text-xs uppercase tracking-wider block mb-1.5">
              Postcode <span className="text-red-400 ml-1">*</span>
            </FormLabel>
            <Input
              value={stop.postCode}
              onChange={(e) => updateStop(index, "postCode", e.target.value)}
              placeholder="Enter postcode"
              className="bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <FormLabel className="text-[#0adeee] font-semibold text-xs uppercase tracking-wider block mb-1.5">
              Reference
            </FormLabel>
            <div className="relative">
              <Input
                value={stop.reference}
                onChange={(e) => updateStop(index, "reference", e.target.value)}
                placeholder="Enter reference number"
                className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md"
              />
              <FileText className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
            </div>
          </div>
          
          <div>
            <FormLabel className="text-[#0adeee] font-semibold text-xs uppercase tracking-wider block mb-1.5">
              Time
            </FormLabel>
            <div className="relative">
              <Input
                type="time"
                value={stop.time}
                onChange={(e) => updateStop(index, "time", e.target.value)}
                className="pl-10 bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] h-11 text-white placeholder:text-[#6b82a6] rounded-md"
              />
              <Clock className="absolute left-3 top-3 h-5 w-5 text-[#0a9bdb]" />
            </div>
          </div>
        </div>
        
        {stop.additionalComments !== undefined && (
          <div>
            <FormLabel className="text-[#0adeee] font-semibold text-xs uppercase tracking-wider block mb-1.5">
              Additional Comments
            </FormLabel>
            <Textarea
              value={stop.additionalComments}
              onChange={(e) => updateStop(index, "additionalComments", e.target.value)}
              placeholder="Enter any additional comments or instructions"
              className="min-h-[80px] bg-[#05101b] border-[#1a3246] focus-visible:border-[#0a9bdb] text-white placeholder:text-[#6b82a6] rounded-md"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
