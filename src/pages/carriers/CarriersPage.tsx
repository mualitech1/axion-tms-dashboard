
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { carriers } from './data/carrierList';
import { Carrier } from './data/types/carrierTypes';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, UploadCloud, MessageSquare, Truck, Building2, Map, Zap, BarChart4 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import CarrierPageHeader from './components/header/CarrierPageHeader';
import CarrierActionBar from './components/actions/CarrierActionBar';
import CarrierOverview from './components/CarrierOverview';
import FleetDistribution from './components/FleetDistribution';
import UpcomingExpirations from './components/UpcomingExpirations';
import CarrierTableWithTabs from './components/tables/CarrierTableWithTabs';
import QuickActionLinks from './components/actions/QuickActionLinks';
import RegionalCoverageCard from './components/dashboard/RegionalCoverageCard';
import { CarrierFilters, CarrierFilterOptions } from './components/filters/CarrierFilters';

export default function CarriersPage() {
  const navigate = useNavigate();
  const [filteredCarriers, setFilteredCarriers] = useState<Carrier[]>(carriers);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [viewMode, setViewMode] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleFiltersChange = (filtered: Carrier[]) => {
    setFilteredCarriers(filtered);
  };
  
  const handleFilterChange = (filters: CarrierFilterOptions) => {
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
    // Fix: Create a default filter object with all required properties
    const defaultFilters: CarrierFilterOptions = {
      status: null,
      region: null,
      fleetType: null,
      complianceStatus: null,
      favorites: false,
      capabilities: [],
      regions: []
    };
    handleFilterChange(defaultFilters);
  };

  // Region options for filter
  const regionOptions = [
    { id: 'northeast', label: 'Northeast' },
    { id: 'midwest', label: 'Midwest' },
    { id: 'south', label: 'South' },
    { id: 'west', label: 'West' },
    { id: 'northwest', label: 'Northwest' },
    { id: 'southwest', label: 'Southwest' },
    { id: 'southeast', label: 'Southeast' },
    { id: 'central', label: 'Central' },
  ];

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
          <CarrierPageHeader />

          {/* View Modes and Major Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <Tabs value={viewMode} onValueChange={setViewMode} className="w-full sm:w-auto">
              <TabsList className="bg-aximo-darker">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
                <TabsTrigger value="map">Map View</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="default" 
                className="bg-indigo-600 hover:bg-indigo-700"
                onClick={() => navigate('/carriers/registration')}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Carrier
              </Button>
              <Button variant="outline">
                <UploadCloud className="mr-2 h-4 w-4" />
                Import
              </Button>
            </div>
          </div>
          
          {/* Comprehensive Filter Section */}
          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-4">
              <CarrierFilters
                searchTerm={searchQuery}
                onSearchChange={handleSearchChange}
                activeFiltersCount={activeFiltersCount}
                onFilterChange={handleFilterChange}
                regionOptions={regionOptions}
              />
            </CardContent>
          </Card>

          <Tabs value={viewMode} className="w-full">
            <TabsContent value="dashboard" className="m-0 p-0">
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
                  <RegionalCoverageCard />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="list" className="m-0 p-0">
              {/* Enhanced Carriers Table Section shown in List View */}
              <CarrierTableWithTabs carriers={filteredCarriers} />
            </TabsContent>

            <TabsContent value="map" className="m-0 p-0">
              <Card className="border-aximo-border bg-aximo-card">
                <CardContent className="p-6 min-h-[400px] flex flex-col items-center justify-center text-aximo-text-secondary">
                  <Map className="h-16 w-16 mb-4 opacity-40" />
                  <h3 className="text-xl font-medium mb-2">Carrier Map View</h3>
                  <p className="text-center max-w-md">
                    Visualize all carriers across regions with interactive map overlay.
                    This feature will be available soon.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              onClick={() => navigate('/carriers/compliance')}
              className="cursor-pointer"
            >
              <Card className="border-aximo-border bg-gradient-to-br from-aximo-card to-indigo-950/30 hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full w-12 h-12 bg-indigo-600/20 flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-aximo-text">Compliance Dashboard</h3>
                  <p className="text-sm text-aximo-text-secondary flex-grow">
                    Monitor carrier compliance, expirations and documentation status.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-4 text-indigo-500 justify-start">
                    View dashboard
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              onClick={() => navigate('/carriers/matching')}
              className="cursor-pointer"
            >
              <Card className="border-aximo-border bg-gradient-to-br from-aximo-card to-indigo-950/30 hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full w-12 h-12 bg-purple-600/20 flex items-center justify-center mb-4">
                    <Zap className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-aximo-text">Carrier Matching</h3>
                  <p className="text-sm text-aximo-text-secondary flex-grow">
                    Find the perfect carrier for your loads with AI-powered matching.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-4 text-purple-500 justify-start">
                    Start matching
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              onClick={() => navigate('/carriers/messaging')}
              className="cursor-pointer"
            >
              <Card className="border-aximo-border bg-gradient-to-br from-aximo-card to-indigo-950/30 hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full w-12 h-12 bg-blue-600/20 flex items-center justify-center mb-4">
                    <MessageSquare className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-aximo-text">Carrier Messaging</h3>
                  <p className="text-sm text-aximo-text-secondary flex-grow">
                    Communicate with all your carriers through broadcast or direct messages.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-4 text-blue-500 justify-start">
                    Open messages
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              onClick={() => navigate('/carriers/reports')}
              className="cursor-pointer"
            >
              <Card className="border-aximo-border bg-gradient-to-br from-aximo-card to-indigo-950/30 hover:shadow-md transition-all duration-300 h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full w-12 h-12 bg-green-600/20 flex items-center justify-center mb-4">
                    <BarChart4 className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="text-lg font-medium mb-2 text-aximo-text">Performance Reports</h3>
                  <p className="text-sm text-aximo-text-secondary flex-grow">
                    Analyze carrier performance, reliability, and cost metrics.
                  </p>
                  <Button variant="link" className="p-0 h-auto mt-4 text-green-500 justify-start">
                    View reports
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
          
          {/* Quick Action Links */}
          <QuickActionLinks />
        </motion.div>
      </div>
    </MainLayout>
  );
}
