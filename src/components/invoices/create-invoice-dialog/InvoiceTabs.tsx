
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InvoiceTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function InvoiceTabs({ activeTab, setActiveTab }: InvoiceTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4 mt-4">
        <TabsTrigger value="details">Invoice Details</TabsTrigger>
        <TabsTrigger value="items">Line Items</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
