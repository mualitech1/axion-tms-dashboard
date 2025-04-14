
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { drivers } from './data/driverData';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DriversTable from './components/DriversTable';
import DriverKPIOverview from './components/DriverKPIOverview';
import DriverAlerts from './components/DriverAlerts';

export default function DriversPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  // Filter drivers based on selected tab and search query
  const filteredDrivers = drivers.filter(driver => {
    const matchesTab = 
      selectedTab === "all" || 
      selectedTab === driver.status.toLowerCase().replace(" ", "-");
      
    const matchesSearch = 
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.nationalInsurance.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesTab && matchesSearch;
  });

  return (
    <MainLayout title="Driver Management">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold">Driver Management</h1>
            <p className="text-muted-foreground">Manage driver details, qualifications and performance</p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="text"
                placeholder="Search drivers..."
                className="px-3 py-2 border rounded-md w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <DriverAlerts />
          <DriverKPIOverview />
        </div>

        <div className="bg-white rounded-md shadow-sm border">
          <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="grid grid-cols-4 w-full max-w-md">
                <TabsTrigger value="all">All Drivers</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="on-leave">On Leave</TabsTrigger>
                <TabsTrigger value="inactive">Inactive</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="p-0 pt-4">
              <DriversTable drivers={filteredDrivers} />
            </TabsContent>
            
            <TabsContent value="active" className="p-0 pt-4">
              <DriversTable drivers={filteredDrivers} />
            </TabsContent>
            
            <TabsContent value="on-leave" className="p-0 pt-4">
              <DriversTable drivers={filteredDrivers} />
            </TabsContent>
            
            <TabsContent value="inactive" className="p-0 pt-4">
              <DriversTable drivers={filteredDrivers} />
            </TabsContent>
          </Tabs>
        </div>
      </motion.div>
    </MainLayout>
  );
}
