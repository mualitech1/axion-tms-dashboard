
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CustomerHeader from '@/components/customers/CustomerHeader';
import { toast } from 'sonner';
import { Customer } from '@/types/customer';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

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

  return (
    <MainLayout title="Customers">
      <div className="animate-fade-in">
        {isRootPath && (
          <div className="mb-8">
            <CustomerHeader onAddCustomer={handleAddCustomer} />
          </div>
        )}
        
        {/* Outlet for nested routes */}
        <div className={isLoading ? 'opacity-60 pointer-events-none transition-opacity' : ''}>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}
