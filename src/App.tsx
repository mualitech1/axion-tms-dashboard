import { createBrowserRouter, RouterProvider, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider, useTheme } from './components/ui/theme-provider';
import MainLayout from './components/layout/MainLayout';
import { Dashboard } from './pages/dashboard/Dashboard';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
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
import { ErrorBoundary, JobErrorBoundary } from './components/ui/ErrorBoundary';
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
import AuthCallback from '@/pages/auth/AuthCallback';
import JobDetailsPage from './pages/jobs/JobDetailsPage';
import { jobDetailsLoader, jobEditLoader } from './loaders/jobLoader';

// Lazy load pipeline components
const PipelineDashboard = lazy(() => import('./pages/pipeline/PipelineDashboard'));
const PipelineBoard = lazy(() => import('./pages/pipeline/PipelineBoard'));
const PipelineTasks = lazy(() => import('./pages/pipeline/PipelineTasks'));
const PipelineReports = lazy(() => import('./pages/pipeline/PipelineReports'));
const PipelineSettings = lazy(() => import('./pages/pipeline/PipelineSettings'));
const PipelineReminders = lazy(() => import('./pages/pipeline/PipelineReminders'));

// **🔥 SIMPLIFIED AUTH WRAPPER - PRODUCTION READY**
function SimpleAuthManager({ children }: { children: React.ReactNode }) {
  const { user, loading, isInitialized } = useAuth();
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
  
  // **IMPROVED TIMEOUT - More patient with OAuth flows**
  useEffect(() => {
    if (loading && isInitialized) {
      // Be more patient if we're on an OAuth callback route
      const isOAuthCallback = location.pathname.includes('/auth/callback');
      const timeoutDuration = isOAuthCallback ? 5000 : 3000; // 5s for OAuth, 3s for regular
      
      const timeout = setTimeout(() => {
        setTimeoutCount(prev => prev + 1);
        console.log('⚠️ AUTH TIMEOUT WARNING: Loading taking too long, considering bypass...', {
          isOAuthCallback,
          timeoutCount: timeoutCount + 1
        });
      }, timeoutDuration);
      
      return () => clearTimeout(timeout);
    }
  }, [loading, isInitialized, location.pathname, timeoutCount]);

  // **FORCE BYPASS AFTER MULTIPLE TIMEOUTS**
  useEffect(() => {
    if (timeoutCount >= 3) {
      console.log('🚨 AUTH BYPASS ACTIVATED: Forcing through to prevent hang');
      // Don't redirect, just let the app render
      return;
    }
  }, [timeoutCount]);

  // **SIMPLE ROUTING LOGIC**
  useEffect(() => {
    // Wait for auth to initialize first
    if (!isInitialized) {
      return;
    }
    
    // Don't do anything if still loading (unless timeout)
    if (loading && timeoutCount < 3) {
      return;
    }
    
    // Don't redirect if we're in the middle of logging out
    if (isLoggingOut) {
      console.log('🚪 LOGOUT: Skipping redirect during logout process');
      return;
    }
    
    const isPublicRoute = ['/auth', '/reset-password', '/role-select', '/auth/callback'].includes(location.pathname);
    
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
  }, [user, loading, location.pathname, navigate, timeoutCount, isLoggingOut, isInitialized]);

  // **IMPROVED LOADING SCREEN - Show initialization status**
  if (!isInitialized || (loading && timeoutCount < 3)) {
    const loadingMessage = !isInitialized 
      ? "Initializing authentication..." 
      : location.pathname.includes('/auth/callback')
        ? "Processing OAuth authentication..."
        : "Initializing Axion TMS...";
        
    const timeoutMessage = !isInitialized 
      ? "Connecting to authentication service..."
      : `Loading timeout in ${6 - timeoutCount}s`;
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white text-lg">{loadingMessage}</p>
          <p className="text-slate-400 text-sm mt-2">{timeoutMessage}</p>
          {location.pathname.includes('/auth/callback') && (
            <p className="text-blue-400 text-xs mt-2">
              🔄 Processing Google OAuth...
            </p>
          )}
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

function AppContentShell() {
  const { theme } = useTheme();
  const isDev = import.meta.env?.DEV || false;
  
  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark' : 'light'} w-full bg-aximo-background text-aximo-text`}>
      <OnboardingTooltipController>
        <Outlet />
        <Toaster />
        <OnboardingWelcome />
        {/* Development Route Testing */}
        {isDev && <RouteTestingPanel />}
      </OnboardingTooltipController>
    </div>
  );
}

const RootLayout = () => {
  return (
    <SimpleAuthManager>
      <OnboardingProvider>
        <AppContentShell />
      </OnboardingProvider>
    </SimpleAuthManager>
  );
};

// **🚀 MODERN REACT ROUTER V6 CONFIGURATION**
const router = createBrowserRouter([
  {
    element: <RootLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      // **PUBLIC ROUTES**
      { path: "/auth", element: <AuthPage /> },
      { path: "/auth/callback", element: <AuthCallback /> },
      { path: "/auth/confirm-email", element: <EmailConfirmationPage /> },
      { path: "/reset-password", element: <PasswordResetPage /> },
      { path: "/role-select", element: <RoleSelectPage /> },
      
      // **ONBOARDING ROUTE - Protected but doesn't require onboarding completion**
      { path: "/onboarding", element: <OnboardingPage /> },
      
      // **PROTECTED ROUTES WITH MAIN LAYOUT**
      {
        element: <ProtectedRoute><MainLayout><Outlet /></MainLayout></ProtectedRoute>,
        children: [
          { path: "/", element: <Dashboard /> },
          { path: "/dashboard", element: <Dashboard /> },
          { path: "/customers", element: <Customers /> },
          { path: "/jobs", element: <Jobs /> },
          
          // **🔥 PROFESSIONAL JOB ROUTES WITH ERROR BOUNDARIES & LOADERS**
          {
            path: "/jobs/details/:id",
            element: <JobDetailsPage />,
            loader: jobDetailsLoader,
            errorElement: <JobErrorBoundary />
          },
          {
            path: "/jobs/edit/:id",
            element: <CreateJobPage />,
            loader: jobEditLoader,
            errorElement: <JobErrorBoundary />
          },
          { path: "/jobs/assign/:id", element: <JobAssignmentPage /> },
          
          { path: "/analytics", element: <Analytics /> },
          { 
            path: "/test-supabase", 
            element: <Suspense fallback={<div>Loading...</div>}><TestSupabase /></Suspense> 
          },
          { path: "/users", element: <Users /> },
          { path: "/carriers/*", element: <Carriers /> },
          { path: "/fleet/*", element: <Fleet /> },
          { path: "/drivers/*", element: <Drivers /> },
          { path: "/invoices/*", element: <Invoices /> },
          { path: "/finance/*", element: <Finance /> },
          { path: "/settings/*", element: <Settings /> },
          { path: "/carriers/dashboard/*", element: <CarrierDashboard /> },
          { path: "/customers/portal", element: <CustomerPortal /> },
          
          // **LAZY LOADED PIPELINE ROUTES**
          { 
            path: "/pipeline/dashboard", 
            async lazy() { 
              const { default: Component } = await import('./pages/pipeline/PipelineDashboard'); 
              return { Component }; 
            }
          },
          { 
            path: "/pipeline/board", 
            async lazy() { 
              const { default: Component } = await import('./pages/pipeline/PipelineBoard'); 
              return { Component }; 
            }
          },
          { 
            path: "/pipeline/tasks", 
            async lazy() { 
              const { default: Component } = await import('./pages/pipeline/PipelineTasks'); 
              return { Component }; 
            }
          },
          { 
            path: "/pipeline/reports", 
            async lazy() { 
              const { default: Component } = await import('./pages/pipeline/PipelineReports'); 
              return { Component }; 
            }
          },
          { 
            path: "/pipeline/settings", 
            async lazy() { 
              const { default: Component } = await import('./pages/pipeline/PipelineSettings'); 
              return { Component }; 
            }
          },
          { 
            path: "/pipeline/reminders", 
            async lazy() { 
              const { default: Component } = await import('./pages/pipeline/PipelineReminders'); 
              return { Component }; 
            }
          },
        ]
      },
      
      // **STANDALONE PROTECTED ROUTES (without MainLayout)**
      {
        path: "/jobs/create", 
        element: <ProtectedRoute><CreateJobPage /></ProtectedRoute>
      },
      {
        path: "/drivers/mobile", 
        element: <ProtectedRoute><DriverMobilePortal /></ProtectedRoute>
      },
      
      // **FALLBACK**
      { path: "*", element: <NotFound /> }
    ]
  }
]);

// **🚀 MAIN APP - CLEAN & PRODUCTION READY**
export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="aximo-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
