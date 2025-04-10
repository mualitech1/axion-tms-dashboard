
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
      <TabsList>
        <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        <TabsTrigger value="pending">Pending Payments</TabsTrigger>
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
