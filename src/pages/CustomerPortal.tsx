
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Customer } from '@/types/customer';
import { customerData } from '@/data/customerMockData';
import CustomerPortalHeader from '@/components/customer-portal/CustomerPortalHeader';
import CustomerPortalDashboard from '@/components/customer-portal/CustomerPortalDashboard';
import CustomerPortalSidebar from '@/components/customer-portal/CustomerPortalSidebar';
import CustomerProfileForm from '@/components/customer-portal/CustomerProfileForm';
import CustomerDocumentsSection from '@/components/customer-portal/CustomerDocumentsSection';

// For demo purposes, we'll use the first customer as our logged-in user
const LOGGED_IN_CUSTOMER_ID = 1;

export default function CustomerPortal() {
  const [activeView, setActiveView] = useState<'dashboard' | 'profile' | 'documents' | 'rates'>('dashboard');
  const [customer, setCustomer] = useState<Customer | undefined>(
    customerData.find(c => c.id === LOGGED_IN_CUSTOMER_ID)
  );

  // Mock function to update customer data
  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
    // In a real application, you would save this to the database
  };

  if (!customer) {
    return <div>Customer not found</div>;
  }

  return (
    <MainLayout title="Customer Portal">
      <CustomerPortalHeader customer={customer} />

      <div className="mt-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64 shrink-0">
          <CustomerPortalSidebar 
            activeView={activeView} 
            setActiveView={setActiveView}
          />
        </div>
        
        <div className="flex-1">
          {activeView === 'dashboard' && (
            <CustomerPortalDashboard customer={customer} />
          )}
          
          {activeView === 'profile' && (
            <CustomerProfileForm 
              customer={customer}
              onUpdateCustomer={handleUpdateCustomer}
            />
          )}
          
          {activeView === 'documents' && (
            <CustomerDocumentsSection customer={customer} />
          )}
          
          {activeView === 'rates' && (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Rate Cards</h2>
              {customer.rateCards ? (
                <div className="space-y-4">
                  {customer.rateCards.map(rateCard => (
                    <div key={rateCard.id} className="border rounded-md p-4">
                      <h3 className="font-medium">{rateCard.name}</h3>
                      <p className="text-sm text-gray-500">Valid until {rateCard.validTo}</p>
                      <div className="flex justify-end mt-2">
                        <button className="text-tms-blue hover:underline text-sm">
                          Download PDF
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No rate cards available</p>
              )}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
