
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, FileCheck, CreditCard } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-tms-gray-800">Carrier Management</h1>
            <p className="text-tms-gray-600">Manage your carrier network and compliance</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link to="/carriers/compliance">
                <FileCheck className="h-4 w-4 mr-2" />
                Compliance
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/carriers/payments">
                <CreditCard className="h-4 w-4 mr-2" />
                Payments
              </Link>
            </Button>
            <Button asChild className="bg-tms-blue hover:bg-tms-blue/90">
              <Link to="/carriers/register">
                <PlusCircle className="h-4 w-4 mr-2" />
                Add Carrier
              </Link>
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All Carriers</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="issues">Compliance Issues</TabsTrigger>
            <TabsTrigger value="favorite">Favorites</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-2">
            <CarrierTable 
              carriers={filteredCarriers} 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm}
            />
          </TabsContent>
          <TabsContent value="active" className="mt-2">
            <CarrierTable 
              carriers={filteredCarriers.filter(c => c.status === 'Active')} 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm}
            />
          </TabsContent>
          <TabsContent value="issues" className="mt-2">
            <CarrierTable 
              carriers={filteredCarriers.filter(c => c.status === 'Issue')} 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm}
            />
          </TabsContent>
          <TabsContent value="favorite" className="mt-2">
            <CarrierTable 
              carriers={filteredCarriers.filter(c => c.favorite)} 
              searchTerm={searchTerm} 
              onSearchChange={setSearchTerm}
            />
          </TabsContent>
        </Tabs>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <CarrierOverview />
          <FleetDistribution />
          <UpcomingExpirations />
        </div>
      </div>
    </MainLayout>
  );
}
