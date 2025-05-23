import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Truck, Users, Building2, CircleCheck } from "lucide-react";
import { Carrier } from "../data/types/carrierTypes";

interface CarrierOverviewProps {
  carriers: Carrier[];
}

export default function CarrierOverview({ carriers }: CarrierOverviewProps) {
  // Calculate statistics based on actual carrier data
  const totalCarriers = carriers.length;
  const activeCarriers = carriers.filter(c => c.status === 'Active').length;
  const complianceRate = totalCarriers 
    ? Math.round((carriers.filter(c => c.complianceStatus === 'Compliant').length / totalCarriers) * 100) 
    : 0;
  
  // Count unique regions
  const uniqueRegions = new Set(carriers.map(c => c.region)).size;

  return (
    <Card className="border-aximo-border bg-aximo-card shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Truck className="h-5 w-5 mr-2 text-aximo-primary" />
          Quantum Conduit Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex items-center">
              <Truck className="h-4 w-4 text-aximo-text-secondary mr-1" />
              <span className="text-sm text-aximo-text-secondary">Total Conduits</span>
            </div>
            <p className="text-2xl font-semibold text-aximo-text">{totalCarriers}</p>
            <p className="text-xs text-aximo-text-secondary">
              {activeCarriers} active · {totalCarriers - activeCarriers} inactive
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <CircleCheck className="h-4 w-4 text-aximo-text-secondary mr-1" />
              <span className="text-sm text-aximo-text-secondary">Compliance Rate</span>
            </div>
            <p className="text-2xl font-semibold text-aximo-text">{complianceRate}%</p>
            <p className="text-xs text-aximo-text-secondary">
              {carriers.filter(c => c.complianceStatus === 'Compliant').length} fully compliant
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <Building2 className="h-4 w-4 text-aximo-text-secondary mr-1" />
              <span className="text-sm text-aximo-text-secondary">Sectors</span>
            </div>
            <p className="text-2xl font-semibold text-aximo-text">{uniqueRegions}</p>
            <p className="text-xs text-aximo-text-secondary">
              Across quantum sectors
            </p>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center">
              <Users className="h-4 w-4 text-aximo-text-secondary mr-1" />
              <span className="text-sm text-aximo-text-secondary">Critical Mass</span>
            </div>
            <p className="text-2xl font-semibold text-aximo-text">{totalCarriers > 0 ? '98%' : '0%'}</p>
            <p className="text-xs text-aximo-text-secondary">
              Quantum stability threshold
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
