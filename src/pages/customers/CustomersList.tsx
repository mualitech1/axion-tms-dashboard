
import { useState } from 'react';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import CustomerTable from '@/components/customers/CustomerTable';
import CustomerDetailDialog from '@/components/customers/CustomerDetailDialog';
import CustomerAlertsDashboard from '@/components/customers/CustomerAlertsDashboard';
import CustomerOverview from '@/components/customers/CustomerOverview';

export default function CustomersList() {
  const [customers, setCustomers] = useState(customerData);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  
  const handleViewDetails = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };
  
  return (
    <div>
      {/* Customer Alerts Dashboard */}
      <div className="mb-6">
        <CustomerAlertsDashboard customers={customers} />
      </div>
      
      <CustomerTable 
        customers={customers} 
        onViewDetails={handleViewDetails} 
      />
      
      <CustomerOverview />
      
      {/* Customer Detail Dialog */}
      <CustomerDetailDialog 
        customer={selectedCustomer}
        open={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
