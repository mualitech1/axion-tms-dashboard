
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CarrierTable from './components/CarrierTable';
import CarrierFilters from './components/filters/CarrierFilters';
import { carriers } from './data/carrierList';
import { Carrier } from './data/types/carrierTypes';
import { Button } from "@/components/ui/button";
import { 
  PlusCircle,
  MessageSquare,
  FileText, 
  UserCircle2,
  LineChart,
  Scale
} from 'lucide-react';

export default function CarriersPage() {
  const [filteredCarriers, setFilteredCarriers] = useState<Carrier[]>(carriers);
  
  const handleFiltersChange = (filtered: Carrier[]) => {
    setFilteredCarriers(filtered);
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
          <Link to="/carriers/register">
            <Button size="sm">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Carrier
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="space-y-4">
        <CarrierFilters onFiltersChange={handleFiltersChange} />
        <CarrierTable carriers={filteredCarriers} />
      </div>
    </MainLayout>
  );
}
