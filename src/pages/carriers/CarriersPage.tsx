
import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { carriers } from './data/carrierList';
import { Carrier } from './data/types/carrierTypes';

import CarrierPageHeader from './components/header/CarrierPageHeader';
import CarrierActionBar from './components/actions/CarrierActionBar';
import CarrierOverview from './components/CarrierOverview';
import FleetDistribution from './components/FleetDistribution';
import UpcomingExpirations from './components/UpcomingExpirations';
import CarrierTableWithTabs from './components/tables/CarrierTableWithTabs';
import QuickActionLinks from './components/actions/QuickActionLinks';
import RegionalCoverageCard from './components/dashboard/RegionalCoverageCard';

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
      <div className="container mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Enhanced Header Section */}
          <CarrierPageHeader />
          
          {/* Action Bar */}
          <CarrierActionBar 
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />
          
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

          {/* Enhanced Carriers Table Section */}
          <CarrierTableWithTabs carriers={filteredCarriers} />
          
          {/* Quick Action Links */}
          <QuickActionLinks />
        </motion.div>
      </div>
    </MainLayout>
  );
}
