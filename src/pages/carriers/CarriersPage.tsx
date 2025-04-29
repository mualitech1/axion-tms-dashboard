
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

export default function CarriersPage() {
  const [filteredCarriers, setFilteredCarriers] = useState<Carrier[]>(carriers);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
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

  return (
    <MainLayout title="Carrier Management">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6 space-y-6"
      >
        {/* Enhanced Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Carrier Management</h1>
          <p className="opacity-90">Organize, track and manage all your transport carriers and their compliance</p>
        </div>
        
        {/* Search and Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-aximo-card rounded-lg p-4 shadow-sm border border-aximo-border">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search carriers by name, region or fleet type..."
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
            <Link to="/carriers/register">
              <Button size="sm" className="flex items-center gap-1 bg-aximo-primary text-white">
                <PlusCircle className="h-4 w-4" />
                <span>Add Carrier</span>
              </Button>
            </Link>
          </div>
        </div>

        {/* KPIs and Alerts Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <CarrierOverview />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FleetDistribution />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <UpcomingExpirations />
          </motion.div>
        </div>
        
        {/* Filters */}
        <CarrierFilters 
          searchTerm={searchQuery}
          onSearchChange={handleSearchChange}
          activeFiltersCount={activeFiltersCount}
          onFilterChange={handleFilterChange}
          className="bg-aximo-card rounded-lg p-4 shadow-sm border border-aximo-border"
          regionOptions={[
            { id: "london", label: "London" },
            { id: "manchester", label: "Manchester" },
            { id: "birmingham", label: "Birmingham" },
            { id: "glasgow", label: "Glasgow" },
            { id: "liverpool", label: "Liverpool" },
            { id: "belfast", label: "Belfast" },
            { id: "cardiff", label: "Cardiff" },
            { id: "edinburgh", label: "Edinburgh" },
            { id: "newcastle", label: "Newcastle" },
            { id: "bristol", label: "Bristol" }
          ]}
        />

        {/* Enhanced Carriers Table Section */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-aximo-card rounded-lg shadow-sm border border-aximo-border overflow-hidden"
        >
          <CarrierTable carriers={filteredCarriers} />
        </motion.div>
        
        {/* Quick Action Links */}
        <div className="flex flex-wrap gap-2 justify-center mt-6">
          <Link to="/carriers/compliance">
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-aximo-dark border-aximo-border text-aximo-text-secondary">
              <Scale className="h-4 w-4" />
              <span>Compliance Dashboard</span>
            </Button>
          </Link>
          <Link to="/carriers/reports">
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-aximo-dark border-aximo-border text-aximo-text-secondary">
              <LineChart className="h-4 w-4" />
              <span>Performance Reports</span>
            </Button>
          </Link>
          <Link to="/carriers/messaging">
            <Button variant="outline" size="sm" className="flex items-center gap-1 bg-aximo-dark border-aximo-border text-aximo-text-secondary">
              <MessageSquare className="h-4 w-4" />
              <span>Message Carriers</span>
            </Button>
          </Link>
        </div>
      </motion.div>
    </MainLayout>
  );
}
