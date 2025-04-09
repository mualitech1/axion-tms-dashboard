
import { Outlet } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import CustomerHeader from '@/components/customers/CustomerHeader';
import { useToast } from '@/hooks/use-toast';
import { Customer } from '@/types/customer';

export default function Customers() {
  const { toast } = useToast();

  const handleAddCustomer = (newCustomer: Customer) => {
    toast({
      title: "Customer Added",
      description: `${newCustomer.name} has been successfully added`,
    });
  };

  return (
    <MainLayout title="Customers">
      <div className="animate-fade-in">
        <div className="mb-6">
          <CustomerHeader onAddCustomer={handleAddCustomer} />
        </div>
        
        {/* Outlet for nested routes */}
        <Outlet />
      </div>
    </MainLayout>
  );
}
