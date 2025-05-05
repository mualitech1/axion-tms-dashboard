
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SupplyChainHeader } from '@/components/supply-chain/SupplyChainHeader';
import { VendorManagement } from '@/components/supply-chain/VendorManagement';
import { InventoryTracking } from '@/components/supply-chain/InventoryTracking';
import { DisruptionMonitoring } from '@/components/supply-chain/DisruptionMonitoring';

export default function SupplyChain() {
  return (
    <MainLayout title="Supply Chain">
      <div className="animate-fade-in space-y-6">
        <SupplyChainHeader />
        
        <Tabs defaultValue="vendors" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-3 mb-4">
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="disruptions">Disruptions</TabsTrigger>
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
      </div>
    </MainLayout>
  );
}
