import { useState } from "react";
import { AdditionalStop } from "@/pages/jobs/types/formTypes";

// Create empty stop with all fields initialized to prevent uncontrolled input warnings
const createEmptyStop = (): AdditionalStop => ({
  companyName: "",
  contactName: "",
  addressLine1: "",
  city: "",
  postCode: "",
  reference: "",
  time: "12:00",
  additionalComments: "",
  instructions: ""
});

export function useAdditionalStops() {
  const [additionalStops, setAdditionalStops] = useState<AdditionalStop[]>([]);
  
  const addStop = () => {
    // Create a new stop with all fields initialized to empty strings
    const newStop = createEmptyStop();
    setAdditionalStops([...additionalStops, newStop]);
  };
  
  const removeStop = (index: number) => {
    const newStops = [...additionalStops];
    newStops.splice(index, 1);
    setAdditionalStops(newStops);
  };
  
  const updateAdditionalStop = (index: number, data: Partial<AdditionalStop>) => {
    const newStops = [...additionalStops];
    // Ensure we merge with existing data to keep all fields initialized
    newStops[index] = { ...newStops[index], ...data };
    setAdditionalStops(newStops);
  };
  
  return {
    additionalStops,
    addStop,
    removeStop,
    updateAdditionalStop
  };
}
