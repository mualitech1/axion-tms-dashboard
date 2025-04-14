
import { Card } from '@/components/ui/card';
import { drivers } from '../data/driverData';
import { ArrowUpIcon, ArrowDownIcon, BriefcaseIcon, TruckIcon } from 'lucide-react';

export default function DriverKPIOverview() {
  // Calculate average KPIs
  const activeDrivers = drivers.filter(d => d.status === 'Active');
  
  const averageKPIs = {
    onTimeDeliveries: activeDrivers.reduce((sum, driver) => sum + driver.kpi.onTimeDeliveries, 0) / activeDrivers.length,
    fuelEfficiency: activeDrivers.reduce((sum, driver) => sum + driver.kpi.fuelEfficiency, 0) / activeDrivers.length,
    safetyScore: activeDrivers.reduce((sum, driver) => sum + driver.kpi.safetyScore, 0) / activeDrivers.length,
    customerSatisfaction: activeDrivers.reduce((sum, driver) => sum + driver.kpi.customerSatisfaction, 0) / activeDrivers.length
  };
  
  // Best performing driver
  const bestDriver = [...activeDrivers].sort((a, b) => 
    (b.kpi.onTimeDeliveries + b.kpi.fuelEfficiency + b.kpi.safetyScore + b.kpi.customerSatisfaction) - 
    (a.kpi.onTimeDeliveries + a.kpi.fuelEfficiency + a.kpi.safetyScore + a.kpi.customerSatisfaction)
  )[0];

  return (
    <Card className="col-span-1 md:col-span-2 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Driver Performance KPIs</h3>
        <span className="text-xs text-muted-foreground">{activeDrivers.length} active drivers</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-blue-600">On-time Delivery</span>
            <span className="flex items-center text-xs text-green-600">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              2%
            </span>
          </div>
          <p className="text-2xl font-semibold">{averageKPIs.onTimeDeliveries.toFixed(1)}%</p>
        </div>
        
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-green-600">Fuel Efficiency</span>
            <span className="flex items-center text-xs text-green-600">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              1%
            </span>
          </div>
          <p className="text-2xl font-semibold">{averageKPIs.fuelEfficiency.toFixed(1)}%</p>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-amber-600">Safety Score</span>
            <span className="flex items-center text-xs text-red-600">
              <ArrowDownIcon className="h-3 w-3 mr-1" />
              0.5%
            </span>
          </div>
          <p className="text-2xl font-semibold">{averageKPIs.safetyScore.toFixed(1)}%</p>
        </div>
        
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-purple-600">Customer Rating</span>
            <span className="flex items-center text-xs text-green-600">
              <ArrowUpIcon className="h-3 w-3 mr-1" />
              3%
            </span>
          </div>
          <p className="text-2xl font-semibold">{averageKPIs.customerSatisfaction.toFixed(1)}%</p>
        </div>
      </div>
      
      {bestDriver && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Top Performing Driver</h4>
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <BriefcaseIcon className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium">{bestDriver.name}</p>
              <p className="text-xs text-muted-foreground">
                Avg Score: {((bestDriver.kpi.onTimeDeliveries + bestDriver.kpi.fuelEfficiency + 
                bestDriver.kpi.safetyScore + bestDriver.kpi.customerSatisfaction) / 4).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
