
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import CustomerDetailDialog from '@/components/customers/CustomerDetailDialog';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerHeader from '@/components/customers/CustomerHeader';
import CustomerOverview from '@/components/customers/CustomerOverview';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  return (
    <MainLayout title="Customers">
      <div className="animate-fade-in">
        <CustomerHeader />
        <CustomerTable 
          customers={customerData} 
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
