
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import CarrierTable from './components/CarrierTable';
import { CarrierFilters } from './components/filters/CarrierFilters';
import { carriers } from './data/carrierList';
import { Carrier } from './data/types/carrierTypes';
import { Button } from "@/components/ui/button";
import { 
  PlusCircle,
  MessageSquare,
  FileText, 
  UserCircle2,
  LineChart,
  Scale,
  Radio,
  Filter,
  Download,
  Search
} from 'lucide-react';
import CarrierOverview from './components/CarrierOverview';
import FleetDistribution from './components/FleetDistribution';
import UpcomingExpirations from './components/UpcomingExpirations';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CarriersPage() {
  const [filteredCarriers, setFilteredCarriers] = useState<Carrier[]>(carriers);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [selectedTab, setSelectedTab] = useState("all");
  const { toast } = useToast();
  
  const handleFiltersChange = (filtered: Carrier[]) => {
    setFilteredCarriers(filtered);
  };
  
  const handleFilterChange = (filters: any) => {
    let count = 0;
    if (filters.status) count++;
    if (filters.region) count++;
    if (filters.fleetType) count++;
    if (filters.complianceStatus) count++;
    if (filters.favorites) count++;
    if (filters.capabilities && filters.capabilities.length) count += filters.capabilities.length;
    if (filters.regions && filters.regions.length) count += filters.regions.length;
    
    setActiveFiltersCount(count);
    
    let filtered = [...carriers];
    
    if (searchQuery) {
      filtered = filtered.filter(carrier => 
        carrier.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (filters.status) {
      filtered = filtered.filter(carrier => carrier.status === filters.status);
    }
    
    if (filters.region) {
      filtered = filtered.filter(carrier => carrier.region === filters.region);
    }
    
    if (filters.fleetType) {
      filtered = filtered.filter(carrier => carrier.fleet === filters.fleetType);
    }
    
    if (filters.complianceStatus) {
      filtered = filtered.filter(carrier => carrier.complianceStatus === filters.complianceStatus);
    }
    
    if (filters.favorites) {
      filtered = filtered.filter(carrier => carrier.favorite);
    }
    
    if (filters.capabilities && filters.capabilities.length) {
      filtered = filtered.filter(carrier => 
        filters.capabilities.every((cap: string) => carrier.capabilities.includes(cap))
      );
    }
    
    if (filters.regions && filters.regions.length) {
      filtered = filtered.filter(carrier => 
        filters.regions.some((regionId: string) => carrier.operatingRegions?.includes(regionId))
      );
    }
    
    setFilteredCarriers(filtered);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    handleFilterChange({});
  };

  const handleAddCarrier = () => {
    toast({
      title: "Coming Soon",
      description: "Add carrier functionality will be available soon",
    });
  };

  return (
    <MainLayout title="Carrier Management">
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Enhanced Header Section */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm z-0"></div>
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10 p-6 sm:p-8"
            >
              <h1 className="text-3xl font-bold text-aximo-text bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Carrier Management
              </h1>
              <p className="mt-2 text-aximo-text-secondary max-w-2xl">
                Organize, track and manage all your transport carriers and their compliance with regulatory requirements
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
              <input
                type="text"
                placeholder="Search carriers by name, region or fleet type..."
                className="pl-10 px-4 py-2 border rounded-md w-full bg-aximo-darker border-aximo-border text-aximo-text focus:ring-1 focus:ring-aximo-primary focus:border-aximo-primary"
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
                <FileText className="h-4 w-4 mr-1" />
                <span>Reports</span>
              </Button>
              <Button variant="outline" size="sm" className="bg-aximo-dark border-aximo-border text-aximo-text">
                <Download className="h-4 w-4 mr-1" />
                <span>Export</span>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:opacity-90 shadow-md" onClick={handleAddCarrier}>
                <PlusCircle className="h-4 w-4 mr-1" />
                <span>Add Carrier</span>
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
                <CarrierOverview />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FleetDistribution />
              </motion.div>
            </div>
            
            {/* Right Column: Alerts and Compliance Tracking */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <UpcomingExpirations />
              </motion.div>
              
              {/* Regional Coverage Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-aximo-card border border-aximo-border shadow-aximo rounded-lg p-5 bg-gradient-to-br from-aximo-card to-indigo-900/10"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 rounded-full bg-indigo-600/20 text-indigo-600 shadow-lg shadow-indigo-600/10">
                    <Radio className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-aximo-text">Regional Coverage</h3>
                    <p className="text-sm text-aximo-text-secondary">Active carrier distribution</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-aximo-text-secondary">London</span>
                    <span className="text-aximo-text">43 carriers</span>
                  </div>
                  <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: '75%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-aximo-text-secondary">Manchester</span>
                    <span className="text-aximo-text">27 carriers</span>
                  </div>
                  <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: '55%' }}></div>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-aximo-text-secondary">Birmingham</span>
                    <span className="text-aximo-text">21 carriers</span>
                  </div>
                  <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden shadow-inner">
                    <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Enhanced Carriers Table Section */}
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
                <CarrierTable carriers={filteredCarriers} />
              </TabsContent>
              
              <TabsContent value="active" className="p-0 pt-4">
                <CarrierTable carriers={filteredCarriers.filter(c => c.status === 'Active')} />
              </TabsContent>
              
              <TabsContent value="issue" className="p-0 pt-4">
                <CarrierTable carriers={filteredCarriers.filter(c => c.status === 'Issue')} />
              </TabsContent>
              
              <TabsContent value="inactive" className="p-0 pt-4">
                <CarrierTable carriers={filteredCarriers.filter(c => c.complianceStatus === 'Non-compliant')} />
              </TabsContent>
            </Tabs>
          </motion.div>
          
          {/* Quick Action Links */}
          <div className="flex flex-wrap gap-2 justify-center mt-6">
            <Link to="/carriers/compliance">
              <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-aximo-dark to-indigo-950/30 border-aximo-border text-aximo-text-secondary hover:text-white hover:bg-indigo-600/20 transition-all duration-300">
                <Scale className="h-4 w-4" />
                <span>Compliance Dashboard</span>
              </Button>
            </Link>
            <Link to="/carriers/reports">
              <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-aximo-dark to-indigo-950/30 border-aximo-border text-aximo-text-secondary hover:text-white hover:bg-indigo-600/20 transition-all duration-300">
                <LineChart className="h-4 w-4" />
                <span>Performance Reports</span>
              </Button>
            </Link>
            <Link to="/carriers/messaging">
              <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-aximo-dark to-indigo-950/30 border-aximo-border text-aximo-text-secondary hover:text-white hover:bg-indigo-600/20 transition-all duration-300">
                <MessageSquare className="h-4 w-4" />
                <span>Message Carriers</span>
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
}
