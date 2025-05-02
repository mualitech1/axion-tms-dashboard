
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarrierTable from '../CarrierTable';
import { Carrier } from '../../data/types/carrierTypes';

interface CarrierTableWithTabsProps {
  carriers: Carrier[];
}

export default function CarrierTableWithTabs({ carriers }: CarrierTableWithTabsProps) {
  const [selectedTab, setSelectedTab] = useState("all");
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.7 }}
      className="bg-aximo-card rounded-lg shadow-md border border-aximo-border overflow-hidden"
    >
      <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full">
        <div className="px-4 pt-4">
          <TabsList className="grid grid-cols-4 w-full max-w-md bg-aximo-darker">
            <TabsTrigger 
              value="all"
              className="data-[state=active]:bg-indigo-600/20 data-[state=active]:text-indigo-600"
            >
              All Carriers
            </TabsTrigger>
            <TabsTrigger 
              value="active"
              className="data-[state=active]:bg-indigo-600/20 data-[state=active]:text-indigo-600"
            >
              Active
            </TabsTrigger>
            <TabsTrigger 
              value="issue"
              className="data-[state=active]:bg-indigo-600/20 data-[state=active]:text-indigo-600"
            >
              Issue
            </TabsTrigger>
            <TabsTrigger 
              value="inactive"
              className="data-[state=active]:bg-indigo-600/20 data-[state=active]:text-indigo-600"
            >
              Inactive
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="all" className="p-0 pt-4">
          <CarrierTable carriers={carriers} />
        </TabsContent>
        
        <TabsContent value="active" className="p-0 pt-4">
          <CarrierTable carriers={carriers.filter(c => c.status === 'Active')} />
        </TabsContent>
        
        <TabsContent value="issue" className="p-0 pt-4">
          <CarrierTable carriers={carriers.filter(c => c.status === 'Issue')} />
        </TabsContent>
        
        <TabsContent value="inactive" className="p-0 pt-4">
          <CarrierTable carriers={carriers.filter(c => c.complianceStatus === 'Non-compliant')} />
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}
