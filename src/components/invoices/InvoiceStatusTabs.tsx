
import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface InvoiceStatusTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function InvoiceStatusTabs({ activeTab, setActiveTab }: InvoiceStatusTabsProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Tabs 
        value={activeTab}
        onValueChange={setActiveTab}
        className="hidden sm:flex"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="paid">Paid</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="sm:hidden w-full">
        <Select 
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
