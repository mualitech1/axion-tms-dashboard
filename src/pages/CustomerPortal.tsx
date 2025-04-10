
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import CustomerPortalLayout from "@/components/customer-portal/CustomerPortalLayout";
import CustomerPortalDashboard from "@/components/customer-portal/CustomerPortalDashboard";
import CustomerProfileForm from "@/components/customer-portal/profile/CustomerProfileForm";
import CustomerDocumentsSection from "@/components/customer-portal/CustomerDocumentsSection";
import CustomerEmailSystem from "@/components/customer-portal/CustomerEmailSystem";
import { QuickNavigation } from "@/components/navigation/QuickNavigation";
import { Customer } from "@/types/customer";

// Mock customer data for demonstration
const mockCustomer: Customer = {
  id: 1001, // Changed from string to number to match Customer type
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
      filePath: "/documents/insurance.pdf",
      dateUploaded: "2024-01-15",
      expiryDate: "2025-01-15",
      fileSize: "1.2 MB", // Changed from number to string to match type
      status: "valid"
    },
    {
      id: "doc-2",
      name: "Terms Agreement",
      filePath: "/documents/agreement.pdf",
      dateUploaded: "2023-12-10",
      fileSize: "0.5 MB" // Changed from number to string to match type
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
      id: "JOB-1001", // Changed from number to string to match type
      reference: "JOB-2024-001",
      from: "Chicago, IL",
      to: "Detroit, MI",
      date: "2024-03-20",
      value: 3200,
      status: "Completed" // Added status to match expected job format
    },
    {
      id: "JOB-1002", // Changed from number to string to match type
      reference: "JOB-2024-002",
      from: "Detroit, MI",
      to: "Columbus, OH",
      date: "2024-03-25",
      value: 2700,
      status: "Completed" // Added status to match expected job format
    }
  ],
  lastOrder: "2024-03-25"
};

export default function CustomerPortal() {
  const [customer, setCustomer] = useState<Customer>(mockCustomer);

  const handleUpdateCustomer = (updatedCustomer: Customer) => {
    setCustomer(updatedCustomer);
  };

  return (
    <CustomerPortalLayout>
      {/* Add temporary navigation for testing */}
      <QuickNavigation />
      
      <Routes>
        <Route path="dashboard" element={<CustomerPortalDashboard customer={customer} />} />
        <Route path="profile" element={<CustomerProfileForm customer={customer} onUpdateCustomer={handleUpdateCustomer} />} />
        <Route path="documents" element={<CustomerDocumentsSection customer={customer} />} />
        <Route path="communications" element={<CustomerEmailSystem customer={customer} />} />
        <Route path="rates" element={<div>Rate Cards</div>} />
        <Route path="*" element={<Navigate to="/customer-portal/dashboard" replace />} />
      </Routes>
    </CustomerPortalLayout>
  );
}
