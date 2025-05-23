import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InvoiceTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

export function InvoiceTabs({ activeTab, setActiveTab }: InvoiceTabsProps) {
  return (
    <TabsList className="grid w-full grid-cols-2 mb-4 mt-4 bg-aximo-darker border border-aximo-border">
      <TabsTrigger 
        value="details" 
        className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
      >
        Quantum Parameters
      </TabsTrigger>
      <TabsTrigger 
        value="items"
        className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
      >
        Energy Distribution
      </TabsTrigger>
    </TabsList>
  );
}
