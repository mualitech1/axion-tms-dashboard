
import { useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Compass } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import CustomerPortalHeader from '@/components/customer-portal/CustomerPortalHeader';
import CustomerPortalNavigation from '@/components/customer-portal/CustomerPortalNavigation';
import CustomerPortalDashboard from '@/components/customer-portal/CustomerPortalDashboard';
import CustomerProfileForm from '@/components/customer-portal/CustomerProfileForm';
import CustomerDocumentsSection from '@/components/customer-portal/CustomerDocumentsSection';

// Updated mock customer data to match Document interface
const customerData = {
  id: 1001,
  name: "Acme Logistics Ltd",
  contact: "Jane Smith",
  email: "jane@acmelogistics.com",
  phone: "+44 7700 900123",
  status: "Active",
  creditLimit: 50000,
  lastOrder: "2023-04-01",
  documents: [
    { 
      id: "1", 
      name: "Insurance Certificate", 
      type: "contract" as const, 
      dateUploaded: "2023-01-15", 
      expiryDate: "2023-12-31",
      filePath: "/documents/insurance.pdf",
      fileSize: "1.2 MB"
    },
    { 
      id: "2", 
      name: "VAT Registration", 
      type: "terms" as const, 
      dateUploaded: "2023-02-20", 
      expiryDate: "2024-02-20",
      filePath: "/documents/vat.pdf",
      fileSize: "0.8 MB"
    },
    { 
      id: "3", 
      name: "Terms Agreement", 
      type: "terms" as const, 
      dateUploaded: "2023-03-01", 
      expiryDate: null,
      filePath: "/documents/terms.docx",
      fileSize: "0.5 MB"
    }
  ],
  jobs: [
    { id: "JOB-1001", reference: "DEL-5678", from: "London", to: "Manchester", value: 1250, date: "2023-03-28", status: "Completed" },
    { id: "JOB-1002", reference: "DEL-5679", from: "Birmingham", to: "Leeds", value: 950, date: "2023-03-15", status: "Completed" },
    { id: "JOB-1003", reference: "DEL-5680", from: "Glasgow", to: "Edinburgh", value: 650, date: "2023-03-10", status: "Completed" }
  ],
  address: {
    street: "123 Logistics Way",
    city: "Birmingham",
    postcode: "B1 1AA",
    country: "United Kingdom"
  }
};

export default function CustomerPortal() {
  const location = useLocation();
  const [customer, setCustomer] = useState(customerData);
  
  // Check if any documents are expiring soon (within 30 days)
  const hasExpiringDocuments = customer.documents?.some(
    doc => doc.expiryDate && new Date(doc.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  ) || false;

  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomer(updatedCustomer);
  };

  return (
    <MainLayout title="Customer Portal">
      <div className="space-y-6">
        <CustomerPortalHeader customer={customer} />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <CustomerPortalNavigation hasExpiringDocuments={hasExpiringDocuments} />
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
                element={<CustomerDocumentsSection customer={customer} />} 
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
    </MainLayout>
  );
}
