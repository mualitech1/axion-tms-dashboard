import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SupplyChainHeader } from '@/components/supply-chain/SupplyChainHeader';
import { VendorManagement } from '@/components/supply-chain/VendorManagement';
import { InventoryTracking } from '@/components/supply-chain/InventoryTracking';
import { DisruptionMonitoring } from '@/components/supply-chain/DisruptionMonitoring';
import { motion } from "framer-motion";

export default function SupplyChain() {
  return (
    <div className="animate-fade-in space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <SupplyChainHeader />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Tabs defaultValue="vendors" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-4 bg-aximo-darker border border-aximo-border">
            <TabsTrigger 
              value="vendors"
              className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              Quantum Providers
            </TabsTrigger>
            <TabsTrigger 
              value="inventory"
              className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              Energy Reserves
            </TabsTrigger>
            <TabsTrigger 
              value="disruptions"
              className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              Field Anomalies
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="vendors" className="space-y-4">
            <VendorManagement />
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4">
            <InventoryTracking />
          </TabsContent>
          
          <TabsContent value="disruptions" className="space-y-4">
            <DisruptionMonitoring />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
