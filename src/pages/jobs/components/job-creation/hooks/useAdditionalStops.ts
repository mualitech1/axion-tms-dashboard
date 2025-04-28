
import { useState } from "react";

interface AdditionalStop {
  companyName: string;
  contactName: string;
  addressLine1: string;
  city: string;
  postCode: string;
  reference: string;
  time: string;
}

export function useAdditionalStops() {
  const [additionalStops, setAdditionalStops] = useState<AdditionalStop[]>([]);

  const addStop = () => {
    const newStop: AdditionalStop = {
      companyName: "",
      contactName: "",
      addressLine1: "",
      city: "",
      postCode: "",
      reference: "",
      time: "12:00"
    };
    setAdditionalStops([...additionalStops, newStop]);
  };

  const removeStop = (index: number) => {
    const newStops = [...additionalStops];
    newStops.splice(index, 1);
    setAdditionalStops(newStops);
  };

  const updateAdditionalStop = (index: number, field: keyof AdditionalStop, value: string) => {
    const newStops = [...additionalStops];
    newStops[index] = {
      ...newStops[index],
      [field]: value
    };
    setAdditionalStops(newStops);
  };

  return {
    additionalStops,
    addStop,
    removeStop,
    updateAdditionalStop
  };
}
