
import React from 'react';
import { CardTitle, CardDescription } from "@/components/ui/card";
import { Phone } from "lucide-react";

export function MobileOperationsHeader() {
  return (
    <>
      <CardTitle className="flex items-center gap-2">
        <Phone className="h-5 w-5" /> Mobile Operations
      </CardTitle>
      <CardDescription>
        Track mobile operations activities, check-ins, location history, and app interactions
      </CardDescription>
    </>
  );
}
