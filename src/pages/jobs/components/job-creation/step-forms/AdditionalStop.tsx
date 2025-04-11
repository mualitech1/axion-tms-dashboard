
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MapPin, Building, User, Trash } from "lucide-react";
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface Address {
  companyName: string;
  contactName: string;
  addressLine1: string;
  city: string;
  postCode: string;
}

interface AdditionalStopProps {
  stop: Address;
  index: number;
  updateStop: (index: number, field: keyof Address, value: string) => void;
  removeStop: (index: number) => void;
}

export function AdditionalStop({ stop, index, updateStop, removeStop }: AdditionalStopProps) {
  return (
    <div className="p-6 border rounded-lg mb-5 shadow-sm bg-slate-50/50">
      <div className="flex justify-between mb-3">
        <h4 className="font-medium text-base flex items-center">
          <MapPin className="h-4 w-4 mr-2 text-blue-500" />
          Additional Stop {index + 1}
        </h4>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => removeStop(index)}
                className="h-8 w-8 p-0 rounded-full hover:bg-red-100 hover:text-red-600 transition-colors"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Remove this stop</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Company Name</Label>
          <InputWithIcon 
            icon={Building}
            value={stop.companyName}
            onChange={(e) => updateStop(index, "companyName", e.target.value)}
            placeholder="Enter company name"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Contact Name</Label>
          <InputWithIcon 
            icon={User}
            value={stop.contactName}
            onChange={(e) => updateStop(index, "contactName", e.target.value)}
            placeholder="Enter contact name"
          />
        </div>
        
        <div className="col-span-2 space-y-2">
          <Label>Address Line 1</Label>
          <InputWithIcon 
            icon={MapPin}
            value={stop.addressLine1}
            onChange={(e) => updateStop(index, "addressLine1", e.target.value)}
            placeholder="Enter address"
          />
        </div>
        
        <div className="space-y-2">
          <Label>City</Label>
          <Input 
            value={stop.city}
            onChange={(e) => updateStop(index, "city", e.target.value)}
            placeholder="Enter city"
          />
        </div>
        
        <div className="space-y-2">
          <Label>Post Code</Label>
          <Input 
            value={stop.postCode}
            onChange={(e) => updateStop(index, "postCode", e.target.value)}
            placeholder="Enter post code"
          />
        </div>
      </div>
    </div>
  );
}
