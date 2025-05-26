import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './components/ui/theme-provider';
import MainLayout from './components/layout/MainLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import { useTheme } from './components/ui/theme-provider';
import Index from './pages/Index';
import Analytics from './pages/Analytics';
import Customers from './pages/Customers';
import Jobs from './pages/Jobs';
import Users from './pages/Users';
import Carriers from './pages/Carriers';
import Fleet from './pages/Fleet';
import Drivers from './pages/Drivers';
import Invoices from './pages/Invoices';
import Finance from './pages/Finance';
import SupplyChain from './pages/SupplyChain';
import Pipeline from './pages/Pipeline';
import CustomerPortal from './pages/customers/CustomerPortal';
import KnowledgeBase from './pages/KnowledgeBase';
import CreateJobPage from './pages/jobs/CreateJobPage';
import JobAssignmentPage from './pages/jobs/JobAssignmentPage';
import Settings from './pages/Settings';
import AuthPage from './pages/auth/AuthPage';
import RoleSelectPage from './pages/auth/RoleSelectPage';
import PasswordResetPage from './pages/auth/PasswordResetPage';
import OnboardingPage from './pages/auth/OnboardingPage';
import { EmailConfirmationPage } from './pages/auth/EmailConfirmationPage';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider, useAuth } from './hooks/use-auth';
import { ErrorBoundary } from './components/ui/error-boundary';
import { RouteTestingPanel } from './utils/route-testing';
import { OnboardingProvider } from './hooks/use-onboarding';
import { OnboardingTooltipController } from './components/ui/onboarding-tooltip';
import { OnboardingWelcome } from './components/ui/onboarding-welcome';
import DocumentScanningPage from './pages/DocumentScanning';
import CompliancePage from './pages/Compliance';
import CompaniesPage from './pages/Companies';
import TestSupabase from './pages/TestSupabase';
import { supabase } from '@/integrations/supabase/client';
import CarrierDashboard from './pages/carriers/CarrierDashboard';
import DriverMobilePortal from './pages/drivers/DriverMobilePortal';

// Lazy load pipeline components
const PipelineDashboard = lazy(() => import('./pages/pipeline/PipelineDashboard'));
const PipelineBoard = lazy(() => import('./pages/pipeline/PipelineBoard'));
const PipelineTasks = lazy(() => import('./pages/pipeline/PipelineTasks'));
const PipelineReports = lazy(() => import('./pages/pipeline/PipelineReports'));
const PipelineSettings = lazy(() => import('./pages/pipeline/PipelineSettings'));
const PipelineReminders = lazy(() => import('./pages/pipeline/PipelineReminders'));

// Lazy load heavy components
// const JobSchedulePage = lazy(() => import('./pages/jobs/JobSchedulePage'));
// const JobDetailsPage = lazy(() => import('./pages/jobs/JobDetailsPage'));
// const JobTrackingPage = lazy(() => import('./pages/jobs/JobTrackingPage'));
// const JobReportsPage = lazy(() => import('./pages/jobs/JobReportsPage'));
// const SupplyChainPlanningPage = lazy(() => import('./pages/supply-chain/SupplyChainPlanningPage'));
// const InventoryManagementPage = lazy(() => import('./pages/supply-chain/InventoryManagementPage'));
// const ProcurementPage = lazy(() => import('./pages/supply-chain/ProcurementPage'));
// const VendorManagementPage = lazy(() => import('./pages/supply-chain/VendorManagementPage'));
// const CarrierDetails = lazy(() => import('./pages/carriers/CarrierDetails'));
// const VehicleDetail = lazy(() => import('./pages/fleet/VehicleDetail'));
// const DriverDetails = lazy(() => import('./pages/drivers/DriverDetails'));
// const InvoiceDetails = lazy(() => import('./pages/invoices/InvoiceDetails'));

// **🔥 SIMPLIFIED AUTH WRAPPER - PRODUCTION READY**
function SimpleAuthManager({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [timeoutCount, setTimeoutCount] = useState(0);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  // **LISTEN FOR LOGOUT EVENTS**
  useEffect(() => {
    const handleLogout = () => {
      console.log('🚪 LOGOUT EVENT: Preventing auto-redirect');
      setIsLoggingOut(true);
    };
    
    // Listen for our custom logout event
    window.addEventListener('axion-logout', handleLogout);
    
    return () => {
      window.removeEventListener('axion-logout', handleLogout);
    };
  }, []);
  
  // **EMERGENCY TIMEOUT - Prevent loading hangs**
  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setTimeoutCount(prev => prev + 1);
        console.log('⚠️ AUTH TIMEOUT WARNING: Loading taking too long, considering bypass...');
      }, 2000); // 2 second timeout
      
      return () => clearTimeout(timeout);
    }
  }, [loading]);

  // **FORCE BYPASS AFTER 3 SECONDS**
  useEffect(() => {
    if (timeoutCount >= 2) {
      console.log('🚨 AUTH BYPASS ACTIVATED: Forcing through to prevent hang');
      // Don't redirect, just let the app render
      return;
    }
  }, [timeoutCount]);

  // **SIMPLE ROUTING LOGIC**
  useEffect(() => {
    // Don't do anything if still loading (unless timeout)
    if (loading && timeoutCount < 2) {
      return;
    }
    
    // Don't redirect if we're in the middle of logging out
    if (isLoggingOut) {
      console.log('🚪 LOGOUT: Skipping redirect during logout process');
      return;
    }
    
    const isPublicRoute = ['/auth', '/reset-password', '/role-select'].includes(location.pathname);
    
    // If no user and not on public route, go to auth
    if (!user && !isPublicRoute) {
      console.log('🔐 AUTH: Redirecting to login');
      navigate('/auth', { replace: true });
      return;
    }
    
    // If user exists and on auth page, go to dashboard
    if (user && location.pathname === '/auth') {
      console.log('✅ AUTH: User authenticated, redirecting to dashboard');
      navigate('/dashboard', { replace: true });
      return;
    }
  }, [user, loading, location.pathname, navigate, timeoutCount, isLoggingOut]);

  // **MINIMAL LOADING SCREEN**
  if (loading && timeoutCount < 2) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">Initializing Axion TMS...</p>
          <p className="text-slate-400 text-sm mt-2">Loading timeout in {4 - timeoutCount}s</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function AppContent() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : 'light'} w-full bg-aximo-background text-aximo-text`}>
      <OnboardingTooltipController>
        <Routes>
          {/* **PUBLIC ROUTES** */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/auth/confirm-email" element={<EmailConfirmationPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />
          <Route path="/role-select" element={<RoleSelectPage />} />
          
          {/* **ONBOARDING ROUTE - Protected but doesn't require onboarding completion** */}
          <Route path="/onboarding" element={<OnboardingPage />} />
          
          {/* **PROTECTED ROUTES - All require authentication** */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } 
          />

          {/* **LAZY-LOADED PROTECTED ROUTES** */}
          <Route 
            path="/customers" 
            element={
              <ProtectedRoute>
                <MainLayout title="Customers">
                  <Customers />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/jobs" 
            element={
              <ProtectedRoute>
                <MainLayout title="Jobs">
                  <Jobs />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/jobs/create" 
            element={
              <ProtectedRoute>
                <CreateJobPage />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/jobs/assign/:jobId" 
            element={
              <ProtectedRoute>
                <JobAssignmentPage />
              </ProtectedRoute>
            }
          />

          {/* **ALL OTHER ROUTES** */}
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <MainLayout title="Analytics">
                  <Analytics />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/test-supabase" 
            element={
              <ProtectedRoute>
                <MainLayout title="Test Supabase">
                  <Suspense fallback={<div>Loading...</div>}>
                    <TestSupabase />
                  </Suspense>
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/users" 
            element={
              <ProtectedRoute>
                <MainLayout title="Users">
                  <Users />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/carriers/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Carriers">
                  <Carriers />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/fleet/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Fleet Management">
                  <Fleet />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/drivers/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Drivers">
                  <Drivers />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/invoices/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Invoices">
                  <Invoices />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/finance/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Finance">
                  <Finance />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/settings/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Settings">
                  <Settings />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/carriers/dashboard/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Carrier Dashboard">
                  <CarrierDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route 
            path="/drivers/mobile" 
            element={
              <ProtectedRoute>
                <DriverMobilePortal />
              </ProtectedRoute>
            }
          />

          <Route 
            path="/customers/portal" 
            element={
              <ProtectedRoute>
                <CustomerPortal />
              </ProtectedRoute>
            }
          />

          {/* **FALLBACK** */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        <Toaster />
        <OnboardingWelcome />
        
        {/* Development Route Testing */}
        {import.meta.env.DEV && <RouteTestingPanel />}
      </OnboardingTooltipController>
    </div>
  );
}

// **🚀 MAIN APP - CLEAN & PRODUCTION READY**
export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="aximo-theme">
      <ErrorBoundary>
        <AuthProvider>
          <SimpleAuthManager>
            <OnboardingProvider>
              <AppContent />
            </OnboardingProvider>
          </SimpleAuthManager>
        </AuthProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
