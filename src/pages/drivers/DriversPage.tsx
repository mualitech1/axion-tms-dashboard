import { useState } from 'react';
import { drivers } from './data/driverData';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, FileText, Download, Zap, Filter, CalendarClock, Shield, Orbit, Network } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import DriversTable from './components/DriversTable';
import DriverKPIOverview from './components/DriverKPIOverview';
import DriverAlerts from './components/DriverAlerts';
import DriversVisualizer from './components/DriversVisualizer';
import DriverComplianceMetrics from './components/DriverComplianceMetrics';
import DriversMap from './components/DriversMap';
import { useToast } from '@/hooks/use-toast';

export default function DriversPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const { toast } = useToast();

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

  const handleAddDriver = () => {
    toast({
      title: "Quantum Preparation",
      description: "New operator integration matrix initializing soon",
    });
  };

  return (
    <div className="container mx-auto max-w-7xl">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Enhanced Header Section */}
        <div className="relative overflow-hidden rounded-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-aximo-primary/20 to-aximo-light/20 backdrop-blur-sm z-0"></div>
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-10 p-6 sm:p-8"
          >
            <h1 className="text-3xl font-bold text-aximo-text bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
              Quantum Operators
            </h1>
            <p className="mt-2 text-aximo-text-secondary max-w-2xl">
              Manage your quantum-enabled operators, monitor entanglement metrics, and ensure optimal synchronization with the spacetime continuum
            </p>
          </motion.div>
        </div>
        
        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-aximo-card rounded-lg p-4 shadow-sm border border-aximo-border"
        >
          <div className="relative flex-1 max-w-md">
            <Search className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search operators by name, quantum signature, or ID..."
              className="pl-10 w-full bg-aximo-darker border-aximo-border text-aximo-text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap sm:flex-nowrap">
            <Button variant="outline" size="sm" className="bg-aximo-dark border-aximo-border text-aximo-text">
              <Filter className="h-4 w-4 mr-1" />
              <span>Filter</span>
            </Button>
            <Button variant="outline" size="sm" className="bg-aximo-dark border-aximo-border text-aximo-text">
              <Network className="h-4 w-4 mr-1" />
              <span>Analytics</span>
            </Button>
            <Button variant="outline" size="sm" className="bg-aximo-dark border-aximo-border text-aximo-text">
              <Download className="h-4 w-4 mr-1" />
              <span>Export</span>
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-aximo-primary to-aximo-light text-white hover:opacity-90" onClick={handleAddDriver}>
              <Zap className="h-4 w-4 mr-1" />
              <span>New Operator</span>
            </Button>
          </div>
        </motion.div>
        
        {/* Main Content Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Key Metrics and Data Visualization */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <DriverKPIOverview />
            </motion.div>
            
            {/* Quantum Operator Field (Map) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <DriversMap drivers={filteredDrivers} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <DriverComplianceMetrics drivers={drivers} />
            </motion.div>
          </div>
          
          {/* Right Column: Alerts and Compliance Tracking */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <DriverAlerts />
            </motion.div>
            
            {/* Upcoming Expiry Calendar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-aximo-card border border-aximo-border shadow-aximo rounded-lg p-5"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-full bg-aximo-primary/20 text-aximo-primary">
                  <CalendarClock className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-aximo-text">Upcoming Expirations</h3>
                  <p className="text-sm text-aximo-text-secondary">Quantum certifications</p>
                </div>
              </div>
              
              <div className="space-y-3">
                {drivers.slice(0, 3).map(driver => (
                  <div key={`expiry-${driver.id}`} className="flex items-center justify-between p-3 bg-aximo-darker rounded-lg border border-aximo-border/50">
                    <div>
                      <p className="font-medium text-aximo-text">{driver.name}</p>
                      <p className="text-xs text-aximo-text-secondary">Cert #{driver.license.number.substring(0, 8)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-amber-500" />
                      <span className="text-sm text-amber-500">{new Date(driver.license.expiryDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Drivers Distribution Visualization */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <DriversVisualizer drivers={filteredDrivers} />
            </motion.div>
          </div>
        </div>

        {/* Enhanced Drivers Table Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-aximo-card rounded-lg shadow-sm border border-aximo-border overflow-hidden"
        >
          <Tabs defaultValue="all" onValueChange={setSelectedTab} className="w-full">
            <div className="px-4 pt-4">
              <TabsList className="grid grid-cols-4 w-full max-w-md bg-aximo-darker">
                <TabsTrigger 
                  value="all"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  All Operators
                </TabsTrigger>
                <TabsTrigger 
                  value="active"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  Entangled
                </TabsTrigger>
                <TabsTrigger 
                  value="on-leave"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  Recalibrating
                </TabsTrigger>
                <TabsTrigger 
                  value="inactive"
                  className="data-[state=active]:bg-aximo-primary/20 data-[state=active]:text-aximo-primary"
                >
                  Dormant
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
        </motion.div>
      </motion.div>
    </div>
  );
}
