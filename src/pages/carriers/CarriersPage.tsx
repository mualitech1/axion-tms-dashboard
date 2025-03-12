
import { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import CarrierTable from './components/CarrierTable';
import CarrierOverview from './components/CarrierOverview';
import FleetDistribution from './components/FleetDistribution';
import UpcomingExpirations from './components/UpcomingExpirations';
import { carrierData } from './data/carrierData';

export default function CarriersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter carriers based on search term
  const filteredCarriers = carrierData.filter(
    carrier => 
      carrier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carrier.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
      carrier.fleet.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <MainLayout title="Carriers">
      <div className="animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">Carrier Management</h1>
            <p className="text-tms-gray-600">Manage your carrier network and compliance</p>
          </div>
          
          <Button className="bg-tms-blue hover:bg-tms-blue/90">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Carrier
          </Button>
        </div>
        
        <CarrierTable 
          carriers={filteredCarriers} 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CarrierOverview />
          <FleetDistribution />
          <UpcomingExpirations />
        </div>
      </div>
    </MainLayout>
  );
}
