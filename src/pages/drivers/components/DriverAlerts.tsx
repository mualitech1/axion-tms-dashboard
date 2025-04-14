
import { Card } from '@/components/ui/card';
import { drivers } from '../data/driverData';
import { AlertCircle } from 'lucide-react';

export default function DriverAlerts() {
  // Get current date for comparisons
  const today = new Date();
  
  // Check for license expirations within 30 days
  const licenseExpirations = drivers.filter(driver => {
    const expiryDate = new Date(driver.license.expiryDate);
    const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft >= 0;
  });
  
  // Check for CPC expirations within 30 days
  const cpcExpirations = drivers.filter(driver => {
    const expiryDate = new Date(driver.cpc.expiryDate);
    const daysLeft = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft <= 30 && daysLeft >= 0;
  });
  
  // Check for incomplete CPC training
  const incompleteTraining = drivers.filter(driver => 
    driver.cpc.completedHours < driver.cpc.requiredHours
  );
  
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <h3 className="text-lg font-semibold">Driver Alerts</h3>
      </div>
      
      <div className="space-y-4">
        {licenseExpirations.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-red-700">License Expiring Soon</h4>
            <ul className="space-y-2">
              {licenseExpirations.map(driver => (
                <li key={`license-${driver.id}`} className="text-sm p-2 bg-red-50 rounded flex justify-between">
                  <span>{driver.name}</span>
                  <span className="font-medium">{formatDate(driver.license.expiryDate)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {cpcExpirations.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-amber-700">CPC Expiring Soon</h4>
            <ul className="space-y-2">
              {cpcExpirations.map(driver => (
                <li key={`cpc-${driver.id}`} className="text-sm p-2 bg-amber-50 rounded flex justify-between">
                  <span>{driver.name}</span>
                  <span className="font-medium">{formatDate(driver.cpc.expiryDate)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {incompleteTraining.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2 text-blue-700">Incomplete CPC Training</h4>
            <ul className="space-y-2">
              {incompleteTraining.map(driver => (
                <li key={`training-${driver.id}`} className="text-sm p-2 bg-blue-50 rounded flex justify-between">
                  <span>{driver.name}</span>
                  <span className="font-medium">{driver.cpc.completedHours}/{driver.cpc.requiredHours} hours</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {licenseExpirations.length === 0 && cpcExpirations.length === 0 && incompleteTraining.length === 0 && (
          <div className="text-sm text-gray-500 p-4 bg-gray-50 rounded text-center">
            No urgent alerts at this time.
          </div>
        )}
      </div>
    </Card>
  );
}
