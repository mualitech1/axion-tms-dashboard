
import { Card } from '@/components/ui/card';
import { drivers } from '../data/driverData';
import { AlertCircle, Calendar, Clock, Shield, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

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
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <Card className="bg-aximo-card border-aximo-border shadow-aximo hover:shadow-aximo-strong transition-shadow duration-300 p-5">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-full bg-red-500/10 text-red-500">
            <AlertCircle className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-aximo-text">Driver Alerts</h3>
            <p className="text-sm text-aximo-text-secondary">Critical compliance issues requiring attention</p>
          </div>
        </div>
        <div className="relative">
          <Bell className="h-5 w-5 text-aximo-text-secondary" />
          {(licenseExpirations.length + cpcExpirations.length + incompleteTraining.length) > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {licenseExpirations.length + cpcExpirations.length + incompleteTraining.length}
            </span>
          )}
        </div>
      </div>
      
      <motion.div 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {licenseExpirations.length > 0 && (
          <motion.div 
            variants={cardVariants}
            className="bg-aximo-darker rounded-lg border border-red-500/20 p-3"
          >
            <div className="flex items-center gap-2 text-red-500 mb-2">
              <Shield className="h-4 w-4" />
              <h4 className="text-sm font-medium">License Expiring Soon</h4>
            </div>
            <motion.ul variants={containerVariants} className="space-y-2">
              {licenseExpirations.map(driver => (
                <motion.li 
                  key={`license-${driver.id}`} 
                  variants={itemVariants}
                  className="text-sm px-2.5 py-2 bg-red-500/5 rounded-md flex justify-between items-center hover:bg-red-500/10 transition-colors cursor-pointer"
                >
                  <span className="font-medium text-aximo-text">{driver.name}</span>
                  <div className="flex items-center text-red-400 gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(driver.license.expiryDate)}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
        
        {cpcExpirations.length > 0 && (
          <motion.div 
            variants={cardVariants}
            className="bg-aximo-darker rounded-lg border border-amber-500/20 p-3"
          >
            <div className="flex items-center gap-2 text-amber-500 mb-2">
              <Clock className="h-4 w-4" />
              <h4 className="text-sm font-medium">CPC Expiring Soon</h4>
            </div>
            <motion.ul variants={containerVariants} className="space-y-2">
              {cpcExpirations.map(driver => (
                <motion.li 
                  key={`cpc-${driver.id}`} 
                  variants={itemVariants}
                  className="text-sm px-2.5 py-2 bg-amber-500/5 rounded-md flex justify-between items-center hover:bg-amber-500/10 transition-colors cursor-pointer"
                >
                  <span className="font-medium text-aximo-text">{driver.name}</span>
                  <div className="flex items-center text-amber-400 gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{formatDate(driver.cpc.expiryDate)}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
        
        {incompleteTraining.length > 0 && (
          <motion.div 
            variants={cardVariants}
            className="bg-aximo-darker rounded-lg border border-blue-500/20 p-3"
          >
            <div className="flex items-center gap-2 text-blue-500 mb-2">
              <Clock className="h-4 w-4" />
              <h4 className="text-sm font-medium">Incomplete CPC Training</h4>
            </div>
            <motion.ul variants={containerVariants} className="space-y-2">
              {incompleteTraining.map(driver => (
                <motion.li 
                  key={`training-${driver.id}`} 
                  variants={itemVariants}
                  className="text-sm px-2.5 py-2 bg-blue-500/5 rounded-md flex justify-between items-center hover:bg-blue-500/10 transition-colors cursor-pointer"
                >
                  <span className="font-medium text-aximo-text">{driver.name}</span>
                  <div className="flex items-center text-blue-400">
                    <span>{driver.cpc.completedHours}/{driver.cpc.requiredHours} hours</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
            <div className="mt-2 pt-2 border-t border-aximo-border">
              <Button variant="outline" size="sm" className="w-full bg-blue-500/10 border-blue-500/20 text-blue-400 hover:bg-blue-500/20">
                Schedule Training Sessions
              </Button>
            </div>
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
      </motion.div>
    </Card>
  );
}
