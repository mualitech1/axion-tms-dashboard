
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CustomerDetailDialog from '@/components/customers/CustomerDetailDialog';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerHeader from '@/components/customers/CustomerHeader';
import CustomerOverview from '@/components/customers/CustomerOverview';
import CustomerAlertsDashboard from '@/components/customers/CustomerAlertsDashboard';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import { useToast } from '@/hooks/use-toast';

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [customers, setCustomers] = useState(customerData);
  const { toast } = useToast();
  
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  const handleAddCustomer = (newCustomer: Customer) => {
    setCustomers([...customers, newCustomer]);
    toast({
      title: "Customer Added",
      description: `${newCustomer.name} has been successfully added`,
    });
  };

  return (
    <MainLayout title="Customers">
      <div className="animate-fade-in">
        <CustomerHeader />
        
        {/* Customer Alerts Dashboard */}
        <div className="mb-6">
          <CustomerAlertsDashboard customers={customers} />
        </div>
        
        <CustomerTable 
          customers={customers} 
          onViewDetails={handleViewDetails} 
        />
        <CustomerOverview />
      </div>

      {/* Customer Detail Dialog */}
      <CustomerDetailDialog 
        customer={selectedCustomer}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </MainLayout>
  );
}
