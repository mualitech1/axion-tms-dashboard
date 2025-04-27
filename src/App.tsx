
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import AuthPage from "@/pages/auth/AuthPage";
import { useEffect } from "react";
import { networkStateService } from "@/services/cache-service";
import { queryClient } from "@/config/query-client";
import { useToast } from "@/hooks/use-toast";

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

// Network status monitor component
function NetworkMonitor() {
  const { toast } = useToast();
  
  useEffect(() => {
    // Initial check
    if (!navigator.onLine) {
      toast({
        title: "You are offline",
        description: "Some features may be limited until connection is restored",
        variant: "destructive",
      });
    }
    
    // Monitor online/offline status
    const handleOffline = () => {
      toast({
        title: "You are offline",
        description: "Some features may be limited until connection is restored",
        variant: "destructive",
      });
    };
    
    const handleOnline = () => {
      toast({
        title: "You are back online",
        description: "Syncing pending changes...",
      });
      // Process any pending operations
      networkStateService.processPendingOperations();
    };
    
    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);
    
    // Set up network listener for pending operations
    const cleanup = networkStateService.setupNetworkListener();
    
    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
      cleanup();
    };
  }, [toast]);
  
  return null;
}

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
            <NetworkMonitor />
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
              {/* Update this line to support both URL paths */}
              <Route path={["/pipeline/*", "/sales-pipeline/*"]} element={<ProtectedRoute><Pipeline /></ProtectedRoute>} />
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
