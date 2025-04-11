
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CustomerHeader from '@/components/customers/CustomerHeader';
import { useToast } from '@/hooks/use-toast';
import { Customer } from '@/types/customer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Customers() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCustomer = (newCustomer: Customer) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Customer Added",
        description: `${newCustomer.name} has been successfully added`,
      });
      setIsLoading(false);
      
      // Could navigate to the new customer's page
      // navigate(`/customers/${newCustomer.id}`);
    }, 500);
  };

  return (
    <MainLayout title="Customers">
      <div className="animate-fade-in">
        <div className="mb-8">
          <CustomerHeader onAddCustomer={handleAddCustomer} />
        </div>
        
        {/* Outlet for nested routes */}
        <div className={isLoading ? 'opacity-60 pointer-events-none transition-opacity' : ''}>
          <Outlet />
        </div>
      </div>
    </MainLayout>
  );
}
