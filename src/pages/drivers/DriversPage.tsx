
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { drivers } from './data/driverData';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Download, Plus, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        className="p-4 md:p-6 space-y-6"
      >
        {/* Enhanced Header Section */}
        <div className="bg-gradient-to-r from-sky-600 to-indigo-600 rounded-lg p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Driver Management</h1>
          <p className="opacity-90">Track, manage and monitor driver performance and compliance</p>
        </div>
        
        {/* Search and Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-aximo-card rounded-lg p-4 shadow-sm border border-aximo-border">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search drivers by name, email, or NI number..."
              className="pl-10 px-4 py-2 border rounded-md w-full bg-aximo-darker border-aximo-border text-aximo-text focus:ring-1 focus:ring-aximo-primary focus:border-aximo-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-aximo-dark border-aximo-border text-aximo-text">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-aximo-dark border-aximo-border text-aximo-text">
              <FileText className="h-4 w-4" />
              <span>Reports</span>
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-aximo-dark border-aximo-border text-aximo-text">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </Button>
            <Button size="sm" className="flex items-center gap-1 bg-aximo-primary text-white">
              <Plus className="h-4 w-4" />
              <span>Add Driver</span>
            </Button>
          </div>
        </div>
        
        {/* KPIs and Alerts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <DriverKPIOverview />
          <DriverAlerts />
        </div>

        {/* Enhanced Drivers Table Section */}
        <div className="bg-aximo-card rounded-lg shadow-sm border border-aximo-border overflow-hidden">
          <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="grid grid-cols-4 w-full max-w-md bg-aximo-darker">
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  All Drivers
                </TabsTrigger>
                <TabsTrigger 
                  value="active"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger 
                  value="on-leave"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  On Leave
                </TabsTrigger>
                <TabsTrigger 
                  value="inactive"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  Inactive
                </TabsTrigger>
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
