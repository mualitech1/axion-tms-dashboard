import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Compass } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import CustomerPortalHeader from '@/components/customer-portal/CustomerPortalHeader';
import CustomerPortalNavigation from '@/components/customer-portal/CustomerPortalNavigation';
import CustomerPortalDashboard from '@/components/customer-portal/CustomerPortalDashboard';
import CustomerProfileForm from '@/components/customer-portal/profile/CustomerProfileForm';
import CustomerDocumentsSection from '@/components/customer-portal/CustomerDocumentsSection';
import CustomerEmailSystem from '@/components/customer-portal/CustomerEmailSystem';
import { Customer, Document } from '@/types/customer';
import { customerPortalData, hasExpiringDocuments } from '@/data/customerPortalData';
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function CustomerPortal() {
  const location = useLocation();
  const [customer, setCustomer] = useState<Customer>(customerPortalData);
  
  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
    toast({
      title: "Customer updated",
      description: "Customer information has been successfully updated.",
    });
  };

  const handleAddDocument = (newDocument: Document) => {
    const updatedCustomer = {
      ...customer,
      documents: [...(customer.documents || []), newDocument],
    };
    setCustomer(updatedCustomer);
  };

  const handleRemoveDocument = (documentId: string) => {
    const updatedCustomer = {
      ...customer,
      documents: (customer.documents || []).filter(doc => doc.id !== documentId),
    };
    setCustomer(updatedCustomer);
  };

  return (
    <MainLayout title="Customer Portal">
      <div className="space-y-6">
        <CustomerPortalHeader customer={customer} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <CustomerPortalNavigation hasExpiringDocuments={hasExpiringDocuments(customer)} />
          </div>
          
          <div className="lg:col-span-3">
            <Routes>
              <Route 
                path="/" 
                element={<Navigate to="/customer-portal/dashboard" replace />} 
              />
              <Route 
                path="/dashboard" 
                element={<CustomerPortalDashboard customer={customer} />} 
              />
              <Route 
                path="/profile" 
                element={
                  <CustomerProfileForm 
                    customer={customer} 
                    onUpdateCustomer={handleUpdateCustomer} 
                  />
                } 
              />
              <Route 
                path="/documents" 
                element={
                  <CustomerDocumentsSection 
                    customer={customer}
                  />
                } 
              />
              <Route 
                path="/communications" 
                element={<CustomerEmailSystem customer={customer} />} 
              />
              <Route 
                path="/rates" 
                element={
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                      <div className="text-center">
                        <Compass className="h-12 w-12 mx-auto text-gray-400" />
                        <h3 className="mt-2 text-sm font-semibold text-gray-900">Rate Cards</h3>
                        <p className="mt-1 text-sm text-gray-500">
                          Your rate cards and pricing information will appear here.
                        </p>
                      </div>
                    </div>
                  </div>
                } 
              />
              <Route path="*" element={<Navigate to="/customer-portal/dashboard" replace />} />
            </Routes>
          </div>
        </div>
      </div>
      <Toaster />
    </MainLayout>
  );
}
