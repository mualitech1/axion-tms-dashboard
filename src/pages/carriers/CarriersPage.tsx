
import { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Broadcast
} from 'lucide-react';

export default function CarriersPage() {
  const [filteredCarriers, setFilteredCarriers] = useState<Carrier[]>(carriers);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);
  
  const handleFiltersChange = (filtered: Carrier[]) => {
    setFilteredCarriers(filtered);
  };
  
  const handleFilterChange = (filters: any) => {
    // Count active filters
    let count = 0;
    if (filters.status) count++;
    if (filters.region) count++;
    if (filters.fleetType) count++;
    if (filters.complianceStatus) count++;
    if (filters.favorites) count++;
    if (filters.capabilities && filters.capabilities.length) count += filters.capabilities.length;
    if (filters.regions && filters.regions.length) count += filters.regions.length;
    
    setActiveFiltersCount(count);
    
    // Apply filters
    let filtered = [...carriers];
    
    if (searchTerm) {
      filtered = filtered.filter(carrier => 
        carrier.name.toLowerCase().includes(searchTerm.toLowerCase())
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
    setSearchTerm(value);
    // Re-trigger filter logic with new search term
    handleFilterChange({});
  };

  return (
    <MainLayout title="Carrier Management">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Carriers</h1>
        <div className="flex space-x-2">
          <Link to="/carriers/portal">
            <Button variant="outline" size="sm">
              <UserCircle2 className="mr-2 h-4 w-4" />
              Carrier Portal
            </Button>
          </Link>
          <Link to="/carriers/reports">
            <Button variant="outline" size="sm">
              <LineChart className="mr-2 h-4 w-4" />
              Reports
            </Button>
          </Link>
          <Link to="/carriers/compliance">
            <Button variant="outline" size="sm">
              <Scale className="mr-2 h-4 w-4" />
              Compliance
            </Button>
          </Link>
          <Link to="/carriers/messaging">
            <Button variant="outline" size="sm">
              <MessageSquare className="mr-2 h-4 w-4" />
              Messaging
            </Button>
          </Link>
          <Link to="/carriers/broadcast">
            <Button variant="outline" size="sm">
              <Broadcast className="mr-2 h-4 w-4" />
              Broadcast
            </Button>
          </Link>
          <Link to="/carriers/register">
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Carrier
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="space-y-4">
        <CarrierFilters 
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          activeFiltersCount={activeFiltersCount}
          onFilterChange={handleFilterChange}
          className=""
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
        <CarrierTable carriers={filteredCarriers} />
      </div>
    </MainLayout>
  );
}
