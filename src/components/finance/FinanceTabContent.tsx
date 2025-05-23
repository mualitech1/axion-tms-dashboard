import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RecentTransactionsTable } from "./RecentTransactionsTable";
import { PendingPaymentsTable } from "./PendingPaymentsTable";

export function FinanceTabContent() {
  const [activeTab, setActiveTab] = useState("transactions");
  
  return (
    <Tabs 
      defaultValue="transactions" 
      className="mb-6"
      value={activeTab}
      onValueChange={setActiveTab}
    >
      <TabsList className="bg-aximo-darker border border-aximo-border">
        <TabsTrigger 
          value="transactions"
          className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
        >
          Recent Quantum Exchanges
        </TabsTrigger>
        <TabsTrigger 
          value="pending"
          className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
        >
          Pending Entanglements
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="transactions" className="mt-4">
        <RecentTransactionsTable />
      </TabsContent>
      
      <TabsContent value="pending" className="mt-4">
        <PendingPaymentsTable />
      </TabsContent>
    </Tabs>
  );
}
