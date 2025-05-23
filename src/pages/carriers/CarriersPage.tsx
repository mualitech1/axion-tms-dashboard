import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { carriers } from './data/carrierList';
import { Carrier } from './data/types/carrierTypes';
import { useNavigate } from 'react-router-dom';
import { Plus, FileText, UploadCloud, MessageSquare, Truck, Building2, Map, Zap, BarChart4, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

import CarrierPageHeader from './components/header/CarrierPageHeader';
import CarrierActionBar from './components/actions/CarrierActionBar';
import CarrierOverview from './components/CarrierOverview';
import FleetDistribution from './components/FleetDistribution';
import UpcomingExpirations from './components/UpcomingExpirations';
import CarrierTableWithTabs from './components/tables/CarrierTableWithTabs';
import QuickActionLinks from './components/actions/QuickActionLinks';
import RegionalCoverageCard from './components/dashboard/RegionalCoverageCard';
import { CarrierFilters, CarrierFilterOptions } from './components/filters/CarrierFilters';

// Define a type for the Supabase carrier data
interface SupabaseCarrierData {
  id: number;
  name: string;
  city?: string;
  status?: string;
  email?: string;
  phone?: string;
  created_at?: string;
  type?: string;
  metadata?: {
    fleet_type?: string;
    compliance_status?: string;
    insurance_expiry?: string;
    license_expiry?: string;
    capabilities?: string[];
    operating_regions?: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export default function CarriersPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [filteredCarriers, setFilteredCarriers] = useState<Carrier[]>([]);
  const [allCarriers, setAllCarriers] = useState<Carrier[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  const [viewMode, setViewMode] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchCarriers() {
      try {
        setIsLoading(true);
        setError(null);
        
        // Try to fetch from Supabase
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq('type', 'carrier');
        
        if (error) {
          console.error("Error fetching from Supabase:", error);
          throw error;
        }
        
        if (data && data.length > 0) {
          // Map Supabase data to Carrier format with proper typing
          const mappedCarriers: Carrier[] = (data as SupabaseCarrierData[]).map((item) => ({
            id: item.id,
            name: item.name,
            region: item.city || 'Unknown',
            fleet: item.metadata?.fleet_type || 'Mixed Fleet',
            status: item.status === 'active' ? 'Active' : 
                   item.status === 'inactive' ? 'Inactive' : 'Issue',
            favorite: false,
            complianceStatus: item.metadata?.compliance_status || 'Compliant',
            insuranceExpiry: item.metadata?.insurance_expiry || new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            licenseExpiry: item.metadata?.license_expiry || new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            capabilities: item.metadata?.capabilities || ['general'],
            operatingRegions: item.metadata?.operating_regions || ['local']
          }));
          
          setAllCarriers(mappedCarriers);
          setFilteredCarriers(mappedCarriers);
        } else {
          // Fallback to mock data if no Supabase data
          console.log("No carriers found in Supabase, using mock data");
          setAllCarriers(carriers);
          setFilteredCarriers(carriers);
          
          // Show toast notification that we're using demo data
          toast({
            title: "Using demonstration data",
            description: "Connected to database but no carriers found. Using sample data for preview.",
            variant: "default"
          });
        }
      } catch (err) {
        console.error("Error loading carriers:", err);
        setError("Failed to load carrier data. Using backup data.");
        
        // Fallback to mock data on error
        setAllCarriers(carriers);
        setFilteredCarriers(carriers);
        
        toast({
          title: "Connection issue detected",
          description: "Using offline backup data while we restore the connection.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchCarriers();
  }, [toast]);
  
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
    
    let filtered = [...allCarriers];
    
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

  const handleAddNewCarrier = () => {
    navigate('/carriers/register');
  };

  const handleImportCarriers = () => {
    // This would typically open a file upload dialog or modal
    toast({
      title: "Import feature coming soon",
      description: "The carrier import feature will be available in the next update.",
      variant: "default"
    });
  };

  // Region options for filter
  const regionOptions = [
    { id: 'northeast', label: 'Quantum Sector Alpha' },
    { id: 'midwest', label: 'Quantum Sector Beta' },
    { id: 'south', label: 'Quantum Sector Gamma' },
    { id: 'west', label: 'Quantum Sector Delta' },
    { id: 'northwest', label: 'Quantum Sector Epsilon' },
    { id: 'southwest', label: 'Quantum Sector Zeta' },
    { id: 'southeast', label: 'Quantum Sector Eta' },
    { id: 'central', label: 'Quantum Sector Theta' },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 className="h-12 w-12 animate-spin text-aximo-primary mb-4" />
          <h3 className="text-xl font-medium text-aximo-text mb-2">Calibrating Quantum Conduits</h3>
          <p className="text-aximo-text-secondary">Loading carrier data from the quantum realm...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-7xl">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        {/* Enhanced Header Section */}
        <CarrierPageHeader 
          totalCarriers={allCarriers.length} 
          activeCarriers={allCarriers.filter(c => c.status === 'Active').length} 
        />

        {/* View Modes and Major Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-full sm:w-auto">
            <TabsList className="bg-aximo-darker">
              <TabsTrigger value="dashboard">Quantum Core</TabsTrigger>
              <TabsTrigger value="list">Particle Matrix</TabsTrigger>
              <TabsTrigger value="map">Spatial Grid</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="default" 
              className="bg-gradient-to-r from-aximo-primary to-aximo-light text-white hover:opacity-90"
              onClick={handleAddNewCarrier}
            >
              <Zap className="mr-2 h-4 w-4" />
              New Conduit
            </Button>
            <Button 
              variant="outline"
              onClick={handleImportCarriers}
            >
              <UploadCloud className="mr-2 h-4 w-4" />
              Entangle
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
                  <CarrierOverview carriers={allCarriers} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <FleetDistribution carriers={allCarriers} />
                </motion.div>
              </div>
              
              {/* Right Column: Alerts and Compliance Tracking */}
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <UpcomingExpirations carriers={allCarriers} />
                </motion.div>
                
                {/* Regional Coverage Card */}
                <RegionalCoverageCard carriers={allCarriers} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="m-0 p-0">
            {/* Enhanced Carriers Table Section shown in List View */}
            <CarrierTableWithTabs 
              carriers={filteredCarriers}
              isLoading={isLoading} 
              error={error}
            />
          </TabsContent>

          <TabsContent value="map" className="m-0 p-0">
            <Card className="border-aximo-border bg-aximo-card">
              <CardContent className="p-6 min-h-[400px] flex flex-col items-center justify-center text-aximo-text-secondary">
                <Map className="h-16 w-16 mb-4 opacity-40" />
                <h3 className="text-xl font-medium mb-2">Quantum Spatial Grid</h3>
                <p className="text-center max-w-md">
                  Visualize quantum conduits across all spacetime sectors. 
                  This feature will be available in the next phase shift.
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
            <Card className="border-aximo-border bg-gradient-to-br from-aximo-card to-aximo-primary/20 hover:shadow-md transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full w-12 h-12 bg-aximo-primary/20 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-aximo-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-aximo-text">Quantum Stabilization</h3>
                <p className="text-sm text-aximo-text-secondary flex-grow">
                  Track quantum stabilization status of all transport conduits
                </p>
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
            <Card className="border-aximo-border bg-gradient-to-br from-aximo-card to-aximo-primary/20 hover:shadow-md transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full w-12 h-12 bg-aximo-primary/20 flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-aximo-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-aximo-text">Carrier Matching</h3>
                <p className="text-sm text-aximo-text-secondary flex-grow">
                  Find the perfect carrier for your loads with AI-powered matching.
                </p>
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
            <Card className="border-aximo-border bg-gradient-to-br from-aximo-card to-aximo-primary/20 hover:shadow-md transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full w-12 h-12 bg-aximo-primary/20 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-aximo-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-aximo-text">Carrier Messaging</h3>
                <p className="text-sm text-aximo-text-secondary flex-grow">
                  Communicate with all your carriers through broadcast or direct messages.
                </p>
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
            <Card className="border-aximo-border bg-gradient-to-br from-aximo-card to-aximo-primary/20 hover:shadow-md transition-all duration-300 h-full">
              <CardContent className="p-6 flex flex-col h-full">
                <div className="rounded-full w-12 h-12 bg-aximo-primary/20 flex items-center justify-center mb-4">
                  <BarChart4 className="h-6 w-6 text-aximo-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2 text-aximo-text">Performance Reports</h3>
                <p className="text-sm text-aximo-text-secondary flex-grow">
                  Analyze carrier performance, reliability, and cost metrics.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
        
        {/* Quick Action Links */}
        <QuickActionLinks />
      </motion.div>
    </div>
  );
}
