
import { Card } from '@/components/ui/card';
import { Truck, Wrench, AlertCircle } from 'lucide-react';
import { vehicles } from '../data/fleetData';
import { Progress } from '@/components/ui/progress';

export default function FleetOverview() {
  // Calculate fleet statistics
  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter(v => v.status === 'Active').length;
  const maintenanceVehicles = vehicles.filter(v => v.status === 'Maintenance').length;
  const outOfServiceVehicles = vehicles.filter(v => v.status === 'Out of Service').length;
  
  // Calculate percentages
  const activePercentage = (activeVehicles / totalVehicles) * 100;
  const maintenancePercentage = (maintenanceVehicles / totalVehicles) * 100;
  const outOfServicePercentage = (outOfServiceVehicles / totalVehicles) * 100;
  
  // Calculate upcoming services
  const today = new Date();
  const nextMonthDate = new Date();
  nextMonthDate.setMonth(today.getMonth() + 1);
  
  const upcomingServices = vehicles.filter(vehicle => {
    const nextService = new Date(vehicle.nextServiceDate);
    return nextService >= today && nextService <= nextMonthDate;
  }).length;

  // Get expired MOTs
  const expiredMots = vehicles.filter(vehicle => {
    return new Date(vehicle.motExpiryDate) < today;
  }).length;

  return (
    <Card className="col-span-1 md:col-span-2 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Fleet Overview</h3>
        <span className="text-xs text-muted-foreground">Total: {totalVehicles} vehicles</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-5 w-5 text-green-600" />
            <h4 className="text-sm font-medium text-green-700">Active Vehicles</h4>
          </div>
          <p className="text-2xl font-semibold">{activeVehicles}</p>
          <Progress value={activePercentage} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-1">{activePercentage.toFixed(0)}% of fleet</p>
        </div>
        
        <div className="p-4 bg-amber-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-5 w-5 text-amber-600" />
            <h4 className="text-sm font-medium text-amber-700">In Maintenance</h4>
          </div>
          <p className="text-2xl font-semibold">{maintenanceVehicles}</p>
          <Progress value={maintenancePercentage} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-1">{maintenancePercentage.toFixed(0)}% of fleet</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <h4 className="text-sm font-medium text-red-700">Out of Service</h4>
          </div>
          <p className="text-2xl font-semibold">{outOfServiceVehicles}</p>
          <Progress value={outOfServicePercentage} className="h-2 mt-2" />
          <p className="text-xs text-muted-foreground mt-1">{outOfServicePercentage.toFixed(0)}% of fleet</p>
        </div>
        
        <div className="grid grid-rows-2 gap-2">
          <div className="p-3 bg-blue-50 rounded-lg flex items-center justify-between">
            <div>
              <h4 className="text-xs font-medium text-blue-700">Upcoming Services</h4>
              <p className="text-lg font-semibold">{upcomingServices}</p>
            </div>
            <Wrench className="h-8 w-8 text-blue-300" />
          </div>
          
          <div className="p-3 bg-purple-50 rounded-lg flex items-center justify-between">
            <div>
              <h4 className="text-xs font-medium text-purple-700">Expired MOTs</h4>
              <p className="text-lg font-semibold">{expiredMots}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-purple-300" />
          </div>
        </div>
      </div>
    </Card>
  );
}
