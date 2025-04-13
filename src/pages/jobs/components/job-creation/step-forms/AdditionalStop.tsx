
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Building, User, MapPin, Clock } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Address {
  companyName: string;
  contactName: string;
  addressLine1: string;
  city: string;
  postCode: string;
  reference?: string;
}

interface AdditionalStopProps {
  stop: Address;
  index: number;
  updateStop: (index: number, field: keyof Address, value: string) => void;
  removeStop: (index: number) => void;
}

export function AdditionalStop({ stop, index, updateStop, removeStop }: AdditionalStopProps) {
  return (
    <Card className="p-4 mb-4 relative">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => removeStop(index)}
        className="absolute right-2 top-2 h-8 w-8 p-0"
      >
        <X className="h-4 w-4" />
      </Button>
      
      <h4 className="text-sm font-medium mb-3">Additional Stop #{index + 1}</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <Label htmlFor={`stop-${index}-company`}>Company Name</Label>
          <div className="relative">
            <Input
              id={`stop-${index}-company`}
              value={stop.companyName}
              onChange={(e) => updateStop(index, "companyName", e.target.value)}
              className="pl-9"
              placeholder="Enter company name"
            />
            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          </div>
        </div>
        
        <div>
          <Label htmlFor={`stop-${index}-contact`}>Contact Name</Label>
          <div className="relative">
            <Input
              id={`stop-${index}-contact`}
              value={stop.contactName}
              onChange={(e) => updateStop(index, "contactName", e.target.value)}
              className="pl-9"
              placeholder="Enter contact name"
            />
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor={`stop-${index}-address`}>Address</Label>
          <div className="relative">
            <Input
              id={`stop-${index}-address`}
              value={stop.addressLine1}
              onChange={(e) => updateStop(index, "addressLine1", e.target.value)}
              className="pl-9"
              placeholder="Enter address"
            />
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          </div>
        </div>
        
        <div>
          <Label htmlFor={`stop-${index}-city`}>City</Label>
          <Input
            id={`stop-${index}-city`}
            value={stop.city}
            onChange={(e) => updateStop(index, "city", e.target.value)}
            placeholder="Enter city"
          />
        </div>
        
        <div>
          <Label htmlFor={`stop-${index}-postcode`}>Post Code</Label>
          <Input
            id={`stop-${index}-postcode`}
            value={stop.postCode}
            onChange={(e) => updateStop(index, "postCode", e.target.value)}
            placeholder="Enter post code"
          />
        </div>
        
        <div>
          <Label htmlFor={`stop-${index}-reference`}>Reference</Label>
          <Input
            id={`stop-${index}-reference`}
            value={stop.reference || ""}
            onChange={(e) => updateStop(index, "reference", e.target.value)}
            placeholder="Enter reference"
          />
        </div>
        
        <div>
          <Label htmlFor={`stop-${index}-time`}>Time</Label>
          <div className="relative">
            <Input
              id={`stop-${index}-time`}
              type="time"
              value={stop.time || ""}
              onChange={(e) => updateStop(index, "time", e.target.value)}
              className="pl-9"
            />
            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          </div>
        </div>
      </div>
    </Card>
  );
}
