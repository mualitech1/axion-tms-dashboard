import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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
import CreateJobPage from './pages/jobs/CreateJobPage';
import JobDetailPage from './pages/jobs/JobDetailPage';
import CustomerDetails from './pages/customers/CustomerDetails';
import CustomerDocumentsPage from './pages/customers/CustomerDocumentsPage';
import InvoiceDetails from './pages/invoices/InvoiceDetails';
import VehicleDetailPage from './pages/fleet/VehicleDetailPage';
import UserDetailsPage from './pages/users/UserDetailsPage';
import UserLogsPage from './pages/users/UserLogsPage';
import Pipeline from './pages/pipeline/Pipeline';
import PipelineDashboard from './pages/pipeline/PipelineDashboard';
import PipelineBoard from './pages/pipeline/PipelineBoard';
import PipelineTasks from './pages/pipeline/PipelineTasks';
import PipelineReminders from './pages/pipeline/PipelineReminders';
import PipelineReports from './pages/pipeline/PipelineReports';
import PipelineSettings from './pages/pipeline/PipelineSettings';
import LeadDetails from './pages/pipeline/LeadDetails';
import AnalyticsAdvanced from './pages/analytics/AnalyticsAdvanced';
import AuthPage from './pages/AuthPage';
import CustomerPortal from './pages/portals/CustomerPortal';
import CustomerPortalAccess from './pages/customers/CustomerPortalAccess';
import CarrierRegistration from './pages/carriers/CarrierRegistration';
import CarrierCompliance from './pages/carriers/CarrierCompliance';
import CarrierMatching from './pages/carriers/CarrierMatching';
import CarrierMessaging from './pages/carriers/CarrierMessaging';
import CarrierPayments from './pages/carriers/CarrierPayments';
import CarrierPortal from './pages/carriers/CarrierPortal';
import CarrierReports from './pages/carriers/CarrierReports';
import CarrierDetails from './pages/carriers/CarrierDetails';
import PaymentRuns from './pages/finance/PaymentRuns';
import CarrierSelfInvoices from './pages/finance/CarrierSelfInvoices';
import DisputeManagement from './pages/finance/DisputeManagement';
import SupplyChain from './pages/SupplyChain';

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Index />} />
      <Route path="/jobs" element={<Jobs />} />
      <Route path="/jobs/create" element={<CreateJobPage />} />
      <Route path="/jobs/:id" element={<JobDetailPage />} />
      <Route path="/customers" element={<Customers />} />
      <Route path="/customers/documents" element={<CustomerDocumentsPage />} />
      <Route path="/customers/:id" element={<CustomerDetails />} />
      <Route path="/customers/:id/portal" element={<CustomerPortalAccess />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/analytics/advanced" element={<AnalyticsAdvanced />} />
      <Route path="/invoices" element={<Invoices />} />
      <Route path="/invoices/:id" element={<InvoiceDetails />} />
      <Route path="/carriers" element={<Carriers />} />
      <Route path="/carriers/registration" element={<CarrierRegistration />} />
      <Route path="/carriers/compliance" element={<CarrierCompliance />} />
      <Route path="/carriers/matching" element={<CarrierMatching />} />
      <Route path="/carriers/messaging" element={<CarrierMessaging />} />
      <Route path="/carriers/payments" element={<CarrierPayments />} />
      <Route path="/carriers/portal" element={<CarrierPortal />} />
      <Route path="/carriers/reports" element={<CarrierReports />} />
      <Route path="/carriers/:id" element={<CarrierDetails />} />
      <Route path="/finance" element={<Finance />} />
      <Route path="/finance/payment-runs" element={<PaymentRuns />} />
      <Route path="/finance/self-invoices" element={<CarrierSelfInvoices />} />
      <Route path="/finance/dispute-management" element={<DisputeManagement />} />
      <Route path="/fleet" element={<Fleet />} />
      <Route path="/fleet/:id" element={<VehicleDetailPage />} />
      <Route path="/drivers" element={<Drivers />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserDetailsPage />} />
      <Route path="/users/logs" element={<UserLogsPage />} />
      <Route path="/pipeline" element={<Pipeline />} />
      <Route path="/pipeline/dashboard" element={<PipelineDashboard />} />
      <Route path="/pipeline/board" element={<PipelineBoard />} />
      <Route path="/pipeline/tasks" element={<PipelineTasks />} />
      <Route path="/pipeline/reminders" element={<PipelineReminders />} />
      <Route path="/pipeline/reports" element={<PipelineReports />} />
      <Route path="/pipeline/settings" element={<PipelineSettings />} />
      <Route path="/pipeline/:id" element={<LeadDetails />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/supply-chain" element={<SupplyChain />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/customer-portal/*" element={<CustomerPortal />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </Router>
  );
}

export default App;
