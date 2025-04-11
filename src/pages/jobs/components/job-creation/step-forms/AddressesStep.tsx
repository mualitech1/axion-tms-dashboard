
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AddressForm } from "../address/AddressForm";
import { AdditionalStop } from "./AdditionalStop";
import { MapPin } from "lucide-react";

interface Address {
  companyName: string;
  contactName: string;
  addressLine1: string;
  city: string;
  postCode: string;
}

interface AddressesStepProps {
  form: UseFormReturn<any>;
  additionalStops: Address[];
  addStop: () => void;
  removeStop: (index: number) => void;
  updateAdditionalStop: (index: number, field: keyof Address, value: string) => void;
}

export function AddressesStep({ form, additionalStops, addStop, removeStop, updateAdditionalStop }: AddressesStepProps) {
  return (
    <div>
      <div className="mb-6">
        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="collection">Collection Details</TabsTrigger>
            <TabsTrigger value="delivery">Delivery Details</TabsTrigger>
          </TabsList>
          
          <TabsContent value="collection" className="bg-white p-6 rounded-lg border shadow-sm">
            <AddressForm prefix="collection" label="Collection Details" form={form} />
          </TabsContent>
          
          <TabsContent value="delivery" className="bg-white p-6 rounded-lg border shadow-sm">
            <AddressForm prefix="delivery" label="Delivery Details" form={form} />
          </TabsContent>
        </Tabs>
      </div>
      
      {additionalStops.length > 0 && (
        <div className="border-t pt-6 mt-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <MapPin className="h-5 w-5 mr-2 text-blue-500" />
            Additional Stops
          </h3>
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
      )}
      
      <Button
        type="button"
        variant="outline"
        onClick={addStop}
        className="w-full mt-4 py-6 border-dashed border-2 hover:bg-blue-50 hover:border-blue-300 transition-colors"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Additional Stop
      </Button>
    </div>
  );
}
