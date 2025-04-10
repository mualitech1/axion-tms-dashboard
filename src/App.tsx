
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import Customers from "./pages/Customers";
import CustomerPortal from "./pages/CustomerPortal";
import Carriers from "./pages/Carriers";
import Pipeline from "./pages/Pipeline";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Finance from "./pages/Finance";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";
import CarrierSelfInvoices from "./pages/finance/CarrierSelfInvoices";
import DisputeManagement from "./pages/finance/DisputeManagement";

// Customer specific pages
import CustomersList from "./pages/customers/CustomersList";
import CustomerDetails from "./pages/customers/CustomerDetails";
import CustomerDocumentsPage from "./pages/customers/CustomerDocumentsPage";
import CustomerPortalAccess from "./pages/customers/CustomerPortalAccess";

// Pipeline specific pages
import PipelineReports from "./pages/pipeline/PipelineReports";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/jobs/*" element={<Jobs />} />
            
            {/* Improved Customers routing structure */}
            <Route path="/customers" element={<Customers />}>
              <Route index element={<CustomersList />} />
              <Route path=":customerId" element={<CustomerDetails />} />
              <Route path=":customerId/documents" element={<CustomerDocumentsPage />} />
              <Route path=":customerId/portal" element={<CustomerPortalAccess />} />
            </Route>
            
            <Route path="/customer-portal/*" element={<CustomerPortal />} />
            <Route path="/carriers/*" element={<Carriers />} />
            <Route path="/pipeline/*" element={<Pipeline />} />
            <Route path="/pipeline/reports" element={<PipelineReports />} />
            <Route path="/sales-pipeline/*" element={<Pipeline />} />
            <Route path="/users/*" element={<Users />} />
            <Route path="/analytics/*" element={<Analytics />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/finance/carrier-self-invoices" element={<CarrierSelfInvoices />} />
            <Route path="/finance/disputes" element={<DisputeManagement />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
