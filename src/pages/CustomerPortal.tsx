
import { Routes, Route, Navigate } from "react-router-dom";
import CustomerPortalLayout from "@/components/customer-portal/CustomerPortalLayout";
import CustomerPortalDashboard from "@/components/customer-portal/CustomerPortalDashboard";
import CustomerProfileForm from "@/components/customer-portal/profile/CustomerProfileForm";
import CustomerDocumentsSection from "@/components/customer-portal/CustomerDocumentsSection";
import CustomerEmailSystem from "@/components/customer-portal/CustomerEmailSystem";
import { QuickNavigation } from "@/components/navigation/QuickNavigation";

export default function CustomerPortal() {
  return (
    <CustomerPortalLayout>
      {/* Add temporary navigation for testing */}
      <QuickNavigation />
      
      <Routes>
        <Route path="dashboard" element={<CustomerPortalDashboard />} />
        <Route path="profile" element={<CustomerProfileForm />} />
        <Route path="documents" element={<CustomerDocumentsSection />} />
        <Route path="communications" element={<CustomerEmailSystem />} />
        <Route path="rates" element={<div>Rate Cards</div>} />
        <Route path="*" element={<Navigate to="/customer-portal/dashboard" replace />} />
      </Routes>
    </CustomerPortalLayout>
  );
}
