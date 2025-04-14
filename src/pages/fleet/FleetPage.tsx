
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { vehicles } from './data/fleetData';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VehiclesTable from './components/VehiclesTable';
import FleetOverview from './components/FleetOverview';
import MaintenanceAlerts from './components/MaintenanceAlerts';

export default function FleetPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  // Filter vehicles based on selected tab and search query
  const filteredVehicles = vehicles.filter(vehicle => {
    const matchesTab = 
      selectedTab === "all" || 
      selectedTab === vehicle.status.toLowerCase().replace(" ", "-");
      
    const matchesSearch = 
      vehicle.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesTab && matchesSearch;
  });

  return (
    <MainLayout title="Fleet Management">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Fleet Management</h1>
            <p className="text-muted-foreground">Manage vehicles, servicing and MOT records</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search vehicles..."
                className="px-3 py-2 border rounded-md w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <FleetOverview />
          <MaintenanceAlerts />
        </div>

        <div className="bg-white rounded-md shadow-sm border">
          <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="all">All Vehicles</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="out-of-service">Out of Service</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="p-0 pt-4">
              <VehiclesTable vehicles={filteredVehicles} />
            </TabsContent>
            
            <TabsContent value="active" className="p-0 pt-4">
              <VehiclesTable vehicles={filteredVehicles} />
            </TabsContent>
            
            <TabsContent value="maintenance" className="p-0 pt-4">
              <VehiclesTable vehicles={filteredVehicles} />
            </TabsContent>
            
            <TabsContent value="out-of-service" className="p-0 pt-4">
              <VehiclesTable vehicles={filteredVehicles} />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </MainLayout>
  );
}
