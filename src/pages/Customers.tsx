
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CustomerHeader from '@/components/customers/CustomerHeader';
import { Customer } from '@/types/customer';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import CustomerMetrics from '@/components/customers/CustomerMetrics';
import { motion } from 'framer-motion';

export default function Customers() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  
  // If we're at the root customers path, show the list view
  const isRootPath = location.pathname === '/customers';

  const handleAddCustomer = (newCustomer: Customer) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Customer Added",
        description: `${newCustomer.name} has been successfully added`,
      });
      setIsLoading(false);
      
      // Navigate to the new customer's page
      navigate(`/customers/${newCustomer.id}`);
    }, 500);
  };

  // Define metrics values for CustomerMetrics
  const metricsData = {
    totalCalls: 68,
    totalEmails: 173,
    newCustomers: 24,
    scheduledMeetings: 12,
    activityTimestamp: 'Today, 10:30 AM'
  };

  return (
    <MainLayout title="Customers">
      <div className="animate-fade-in px-1 md:px-4">
        {isRootPath && (
          <motion.div 
            className="mb-8 space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <CustomerHeader onAddCustomer={handleAddCustomer} />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="bg-gradient-to-br from-white to-indigo-50/50 dark:from-indigo-950/20 dark:to-indigo-900/10 p-6 rounded-xl shadow-md border border-indigo-100/50 dark:border-indigo-800/30"
            >
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-300 mb-4">Key Performance Metrics</h3>
              <CustomerMetrics {...metricsData} />
            </motion.div>
          </motion.div>
        )}
        
        {/* Outlet for nested routes */}
        <div className={isLoading ? 'opacity-60 pointer-events-none transition-opacity' : ''}>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}
