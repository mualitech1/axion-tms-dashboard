
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Core pages
import Index from './pages/Index';
import Jobs from './pages/Jobs';
import Customers from './pages/Customers';
import Analytics from './pages/analytics/Analytics';
import Invoices from './pages/Invoices';
import Carriers from './pages/Carriers';
import Finance from './pages/Finance';
import Fleet from './pages/Fleet';
import Drivers from './pages/Drivers';
import Users from './pages/Users';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import SupplyChain from './pages/SupplyChain';

// Job pages
import CreateJobPage from './pages/jobs/CreateJobPage';
import JobDetailPage from './pages/jobs/JobDetailPage';

// Customer pages
import CustomerDetails from './pages/customers/CustomerDetails';
import CustomerDocumentsPage from './pages/customers/CustomerDocumentsPage';
import CustomerPortalAccess from './pages/customers/CustomerPortalAccess';

// Invoice pages
import InvoiceDetails from './pages/invoices/InvoiceDetails';

// Fleet pages
import VehicleDetailPage from './pages/fleet/VehicleDetailPage';

// User pages
import UserDetailsPage from './pages/users/UserDetailsPage';
import UserLogsPage from './pages/users/UserLogsPage';

// Pipeline was removed since it was causing errors
// import Pipeline from './pages/Pipeline';
// import PipelineDashboard from './pages/pipeline/PipelineDashboard';
// import PipelineBoard from './pages/pipeline/PipelineBoard';
// import PipelineTasks from './pages/pipeline/PipelineTasks';
// import PipelineReminders from './pages/pipeline/PipelineReminders';
// import PipelineReports from './pages/pipeline/PipelineReports';
// import PipelineSettings from './pages/pipeline/PipelineSettings';
// import LeadDetails from './pages/pipeline/LeadDetails';

// Analytics pages
import AnalyticsAdvanced from './pages/analytics/AnalyticsAdvanced';

// Auth pages
import AuthPage from './pages/auth/AuthPage';

// Portal pages
import CustomerPortal from './pages/portals/CustomerPortal';

// Carrier pages
import CarrierRegistration from './pages/carriers/CarrierRegistration';
import CarrierCompliance from './pages/carriers/CarrierCompliance';
import CarrierMatching from './pages/carriers/CarrierMatching';
import CarrierMessaging from './pages/carriers/CarrierMessaging';
import CarrierPayments from './pages/carriers/CarrierPayments';
import CarrierPortal from './pages/carriers/CarrierPortal';
import CarrierReports from './pages/carriers/CarrierReports';
import CarrierDetails from './pages/carriers/CarrierDetails';
import BroadcastMessaging from './pages/carriers/BroadcastMessaging';

// Finance pages
import PaymentRuns from './pages/finance/PaymentRuns';
import CarrierSelfInvoices from './pages/finance/CarrierSelfInvoices';
import DisputeManagement from './pages/finance/DisputeManagement';

function App() {
  return (
    <Router>
    <Routes>
      {/* Main routes */}
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Index />} />
      
      {/* Jobs routes */}
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/create" element={<CreateJobPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      
      {/* Customer routes */}
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/documents" element={<CustomerDocumentsPage />} />
      <Route path="/customers/:id" element={<CustomerDetails />} />
      <Route path="/customers/:id/portal" element={<CustomerPortalAccess />} />
      
      {/* Analytics routes */}
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/analytics/advanced" element={<AnalyticsAdvanced />} />
      
      {/* Invoice routes */}
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/invoices/:id" element={<InvoiceDetails />} />
      
      {/* Carrier routes - detailed section */}
      <Route path="/carriers" element={<Carriers />} />
      <Route path="/carriers/registration" element={<CarrierRegistration />} />
      <Route path="/carriers/compliance" element={<CarrierCompliance />} />
      <Route path="/carriers/matching" element={<CarrierMatching />} />
      <Route path="/carriers/messaging" element={<CarrierMessaging />} />
      <Route path="/carriers/broadcast" element={<BroadcastMessaging />} />
      <Route path="/carriers/payments" element={<CarrierPayments />} />
      <Route path="/carriers/portal" element={<CarrierPortal />} />
      <Route path="/carriers/reports" element={<CarrierReports />} />
      <Route path="/carriers/details/:id" element={<CarrierDetails />} />
      
      {/* Finance routes */}
      <Route path="/finance" element={<Finance />} />
      <Route path="/finance/payment-runs" element={<PaymentRuns />} />
      <Route path="/finance/self-invoices" element={<CarrierSelfInvoices />} />
      <Route path="/finance/dispute-management" element={<DisputeManagement />} />
      
      {/* Fleet routes */}
      <Route path="/fleet" element={<Fleet />} />
      <Route path="/fleet/:id" element={<VehicleDetailPage />} />
      
      {/* Driver routes */}
      <Route path="/drivers" element={<Drivers />} />
      
      {/* User routes */}
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserDetailsPage />} />
      <Route path="/users/logs" element={<UserLogsPage />} />
      
      {/* Supply Chain route */}
      <Route path="/supply-chain" element={<SupplyChain />} />
      
      {/* Auth routes */}
      <Route path="/auth" element={<AuthPage />} />
      
      {/* Portal routes */}
      <Route path="/customer-portal/*" element={<CustomerPortal />} />
      
      {/* Catch-all for unknown routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Router>
  );
}

export default App;
