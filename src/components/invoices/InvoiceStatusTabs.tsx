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
        <TabsList className="grid w-full grid-cols-3 bg-aximo-darker">
          <TabsTrigger 
            value="all"
            className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
          >
            All Transactions
          </TabsTrigger>
          <TabsTrigger 
            value="pending"
            className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
          >
            Pending Entanglement
          </TabsTrigger>
          <TabsTrigger 
            value="paid"
            className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
          >
            Entangled
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="sm:hidden w-full">
        <Select 
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <SelectTrigger className="w-full bg-aximo-darker border-aximo-border text-aximo-text">
            <SelectValue placeholder="Select Quantum State" />
          </SelectTrigger>
          <SelectContent className="bg-aximo-darker border-aximo-border">
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="pending">Pending Entanglement</SelectItem>
            <SelectItem value="paid">Entangled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
