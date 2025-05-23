import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CarrierTable from '../CarrierTable';
import { Carrier } from '../../data/types/carrierTypes';
import { Loader2, AlertCircle } from 'lucide-react';

interface CarrierTableWithTabsProps {
  carriers: Carrier[];
  isLoading?: boolean;
  error?: string | null;
}

export default function CarrierTableWithTabs({ 
  carriers, 
  isLoading = false,
  error = null
}: CarrierTableWithTabsProps) {
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
              className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              All Conduits
            </TabsTrigger>
            <TabsTrigger 
              value="active"
              className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              Stabilized
            </TabsTrigger>
            <TabsTrigger 
              value="issue"
              className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              Fluctuating
            </TabsTrigger>
            <TabsTrigger 
              value="inactive"
              className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
            >
              Dormant
            </TabsTrigger>
          </TabsList>
        </div>
        
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-aximo-primary mr-2" />
            <span className="text-aximo-text">Loading quantum conduits...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center p-8">
            <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
            <p className="text-aximo-text mb-1">Failed to load carrier data</p>
            <p className="text-aximo-text-secondary text-sm">{error}</p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </Tabs>
    </motion.div>
  );
} 