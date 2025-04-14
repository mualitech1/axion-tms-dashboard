
import { Card } from '@/components/ui/card';
import { vehicles } from '../data/fleetData';
import { AlertTriangle, Calendar, Gauge, Wrench } from 'lucide-react';

export default function MaintenanceAlerts() {
  // Get current date for comparisons
  const today = new Date();
  
  // Check for MOT expirations within 30 days
  const motExpirations = vehicles.filter(vehicle => {
    const expiryDate = new Date(vehicle.motExpiryDate);
    const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft >= 0;
  });
  
  // Check for overdue servicing
  const overdueService = vehicles.filter(vehicle => {
    return new Date(vehicle.nextServiceDate) <= today;
  });
  
  // Check for high mileage vehicles
  const highMileage = vehicles.filter(vehicle => vehicle.currentMileage > 100000);
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-semibold">Maintenance Alerts</h3>
      </div>
      
      <div className="space-y-4">
        {motExpirations.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-red-700">MOT Expiring Soon</h4>
            <ul className="space-y-2">
              {motExpirations.map(vehicle => (
                <li key={`mot-${vehicle.id}`} className="text-sm p-2 bg-red-50 rounded flex justify-between">
                  <span>{vehicle.registration}</span>
                  <span className="font-medium">{formatDate(vehicle.motExpiryDate)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {overdueService.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-amber-700">Overdue Service</h4>
            <ul className="space-y-2">
              {overdueService.map(vehicle => (
                <li key={`service-${vehicle.id}`} className="text-sm p-2 bg-amber-50 rounded flex justify-between">
                  <span>{vehicle.registration}</span>
                  <div className="flex items-center gap-1">
                    <Wrench className="h-3 w-3" />
                    <span className="font-medium">{formatDate(vehicle.nextServiceDate)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {highMileage.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-blue-700">High Mileage Vehicles</h4>
            <ul className="space-y-2">
              {highMileage.map(vehicle => (
                <li key={`mileage-${vehicle.id}`} className="text-sm p-2 bg-blue-50 rounded flex justify-between">
                  <span>{vehicle.registration}</span>
                  <div className="flex items-center gap-1">
                    <Gauge className="h-3 w-3" />
                    <span className="font-medium">{vehicle.currentMileage.toLocaleString()} miles</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {motExpirations.length === 0 && overdueService.length === 0 && highMileage.length === 0 && (
          <div className="text-sm text-gray-500 p-4 bg-gray-50 rounded text-center">
            No maintenance alerts at this time.
          </div>
        )}
      </div>
    </Card>
  );
}
