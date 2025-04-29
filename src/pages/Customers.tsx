
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
      <div className="animate-fade-in">
        {isRootPath && (
          <motion.div 
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CustomerHeader onAddCustomer={handleAddCustomer} />
            <motion.div 
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
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
