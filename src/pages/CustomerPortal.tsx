import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState } from "react";
import CustomerPortalLayout from "@/components/customer-portal/CustomerPortalLayout";
import CustomerPortalDashboard from "@/components/customer-portal/CustomerPortalDashboard";
import CustomerProfileForm from "@/components/customer-portal/profile/CustomerProfileForm";
import CustomerDocumentsSection from "@/components/customer-portal/CustomerDocumentsSection";
import CustomerEmailSystem from "@/components/customer-portal/CustomerEmailSystem";
import { QuickNavigation } from "@/components/navigation/QuickNavigation";
import { Customer } from "@/types/customer";
import CustomerPortalNavigation from "@/components/customer-portal/CustomerPortalNavigation";
import IslamicBlessingBanner from "@/components/customer-portal/IslamicBlessingBanner";

// Mock customer data for demonstration
const mockCustomer: Customer = {
  id: "1001", // Changed from number to string
  name: "Acme Logistics",
  contact: "John Doe",
  email: "john@acmelogistics.com",
  phone: "+1 (555) 123-4567",
  status: "active",
  creditLimit: 25000,
  documents: [
    {
      id: "doc-1",
      name: "Insurance Certificate",
      type: "insurance", // Added required type property
      filePath: "/documents/insurance.pdf",
      dateUploaded: "2024-01-15",
      expiryDate: "2025-01-15",
      fileSize: "1.2 MB",
      verificationStatus: "pending" // Using verificationStatus instead of status
    },
    {
      id: "doc-2",
      name: "Terms Agreement",
      type: "terms", // Added required type property
      filePath: "/documents/agreement.pdf",
      dateUploaded: "2023-12-10",
      fileSize: "0.5 MB"
    }
  ],
  address: {
    street: "123 Shipping Lane",
    city: "Logistics City",
    postcode: "LOG123",
    country: "United States"
  },
  jobs: [
    {
      id: "JOB-1001",
      reference: "JOB-2024-001",
      from: "Chicago, IL",
      to: "Detroit, MI",
      date: "2024-03-20",
      value: 3200,
      status: "Completed"
    },
    {
      id: "JOB-1002",
      reference: "JOB-2024-002",
      from: "Detroit, MI",
      to: "Columbus, OH",
      date: "2024-03-25",
      value: 2700,
      status: "Completed"
    }
  ],
  lastOrder: "2024-03-25"
};

export default function CustomerPortal() {
  const [customer, setCustomer] = useState<Customer>(mockCustomer);
  const location = useLocation();

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
  };

  // Check if any documents are expiring soon (within 30 days)
  const hasExpiringDocuments = customer.documents?.some(
    doc => doc.expiryDate && new Date(doc.expiryDate) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  ) || false;

  // If at the root customer portal path, redirect to dashboard
  if (location.pathname === '/customer-portal') {
    return <Navigate to="/customer-portal/dashboard" replace />;
  }
  
  return (
    <CustomerPortalLayout>
      {/* Add Islamic Blessing Banner at the top */}
      <IslamicBlessingBanner />
      
      {/* Add temporary navigation for testing */}
      <QuickNavigation />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <CustomerPortalNavigation hasExpiringDocuments={hasExpiringDocuments} />
        </div>
        
        <div className="md:col-span-3">
          <Routes>
            <Route path="dashboard" element={<CustomerPortalDashboard customer={customer} />} />
            <Route path="profile" element={<CustomerProfileForm customer={customer} onUpdateCustomer={handleUpdateCustomer} />} />
            <Route path="documents" element={<CustomerDocumentsSection customer={customer} />} />
            <Route path="communications" element={<CustomerEmailSystem customer={customer} />} />
            <Route path="rates" element={<div>Rate Cards</div>} />
            <Route path="*" element={<Navigate to="/customer-portal/dashboard" replace />} />
          </Routes>
        </div>
      </div>
    </CustomerPortalLayout>
  );
}
