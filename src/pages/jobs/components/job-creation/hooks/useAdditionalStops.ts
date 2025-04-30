
import { useState } from "react";
import { AdditionalStop } from "@/pages/jobs/types/formTypes";

export function useAdditionalStops() {
  const [additionalStops, setAdditionalStops] = useState<AdditionalStop[]>([]);

  const addStop = () => {
    setAdditionalStops([
      ...additionalStops,
      {
        companyName: "",
        contactName: "",
        addressLine1: "",
        city: "",
        postCode: "",
        reference: "",
        time: "12:00",
        additionalComments: ""
      }
    ]);
  };

  const removeStop = (index: number) => {
    const updatedStops = [...additionalStops];
    updatedStops.splice(index, 1);
    setAdditionalStops(updatedStops);
  };

  const updateAdditionalStop = (index: number, field: keyof AdditionalStop, value: string) => {
    const updatedStops = [...additionalStops];
    updatedStops[index] = {
      ...updatedStops[index],
      [field]: value
    };
    setAdditionalStops(updatedStops);
  };

  return {
    additionalStops,
    addStop,
    removeStop,
    updateAdditionalStop
  };
}
