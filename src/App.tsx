import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import AuthPage from "@/pages/auth/AuthPage";

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
import PaymentRuns from "./pages/finance/PaymentRuns";
import Drivers from "./pages/Drivers";
import Fleet from "./pages/Fleet";

// Customer specific pages
import CustomersList from "./pages/customers/CustomersList";
import CustomerDetails from "./pages/customers/CustomerDetails";
import CustomerDocumentsPage from "./pages/customers/CustomerDocumentsPage";
import CustomerPortalAccess from "./pages/customers/CustomerPortalAccess";

// Pipeline specific pages
import PipelineReports from "./pages/pipeline/PipelineReports";
import PipelineSettings from "./pages/pipeline/PipelineSettings";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!session) {
    return <Navigate to="/auth" replace />;
  }
  
  return <>{children}</>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Protected routes */}
              <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
              <Route path="/jobs/*" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
              <Route path="/customers/*" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
              <Route path="/customer-portal/*" element={<ProtectedRoute><CustomerPortal /></ProtectedRoute>} />
              <Route path="/carriers/*" element={<ProtectedRoute><Carriers /></ProtectedRoute>} />
              <Route path="/pipeline/*" element={<ProtectedRoute><Pipeline /></ProtectedRoute>} />
              <Route path="/users/*" element={<ProtectedRoute><Users /></ProtectedRoute>} />
              <Route path="/analytics/*" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
              <Route path="/finance/*" element={<ProtectedRoute><Finance /></ProtectedRoute>} />
              <Route path="/invoices/*" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
              <Route path="/settings/*" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              <Route path="/drivers/*" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
              <Route path="/fleet/*" element={<ProtectedRoute><Fleet /></ProtectedRoute>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
