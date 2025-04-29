
import { Card } from '@/components/ui/card';
import { drivers } from '../data/driverData';
import { AlertCircle, Calendar, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Card className="col-span-1 bg-aximo-card border-aximo-border shadow-aximo p-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-full bg-red-500/10 text-red-500">
          <AlertCircle className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-aximo-text">Driver Alerts</h3>
          <p className="text-sm text-aximo-text-secondary">Critical compliance issues requiring attention</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {licenseExpirations.length > 0 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-aximo-darker rounded-lg border border-red-500/20 p-3"
          >
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <Shield className="h-4 w-4" />
              <h4 className="text-sm font-medium">License Expiring Soon</h4>
            </div>
            <ul className="space-y-2">
              {licenseExpirations.map(driver => (
                <li 
                  key={`license-${driver.id}`} 
                  className="text-sm px-2.5 py-2 bg-red-500/5 rounded-md flex justify-between items-center"
                >
                  <span className="font-medium text-aximo-text">{driver.name}</span>
                  <div className="flex items-center text-red-400 gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(driver.license.expiryDate)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {cpcExpirations.length > 0 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-aximo-darker rounded-lg border border-amber-500/20 p-3"
          >
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              <Clock className="h-4 w-4" />
              <h4 className="text-sm font-medium">CPC Expiring Soon</h4>
            </div>
            <ul className="space-y-2">
              {cpcExpirations.map(driver => (
                <li 
                  key={`cpc-${driver.id}`} 
                  className="text-sm px-2.5 py-2 bg-amber-500/5 rounded-md flex justify-between items-center"
                >
                  <span className="font-medium text-aximo-text">{driver.name}</span>
                  <div className="flex items-center text-amber-400 gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(driver.cpc.expiryDate)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {incompleteTraining.length > 0 && (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="bg-aximo-darker rounded-lg border border-blue-500/20 p-3"
          >
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Clock className="h-4 w-4" />
              <h4 className="text-sm font-medium">Incomplete CPC Training</h4>
            </div>
            <ul className="space-y-2">
              {incompleteTraining.map(driver => (
                <li 
                  key={`training-${driver.id}`} 
                  className="text-sm px-2.5 py-2 bg-blue-500/5 rounded-md flex justify-between items-center"
                >
                  <span className="font-medium text-aximo-text">{driver.name}</span>
                  <div className="flex items-center text-blue-400">
                    <span>{driver.cpc.completedHours}/{driver.cpc.requiredHours} hours</span>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        
        {licenseExpirations.length === 0 && cpcExpirations.length === 0 && incompleteTraining.length === 0 && (
          <div className="text-sm text-aximo-text-secondary px-4 py-8 bg-aximo-darker rounded-md text-center border border-dashed border-aximo-border">
            <div className="flex justify-center mb-2">
              <Shield className="h-10 w-10 text-green-500 opacity-60" />
            </div>
            <p className="font-medium">No urgent alerts at this time</p>
            <p className="text-xs mt-1">All driver documents and qualifications are up to date</p>
          </div>
        )}
      </div>
    </Card>
  );
}
