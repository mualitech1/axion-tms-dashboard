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
import CustomerPortal from './pages/CustomerPortal';
import KnowledgeBase from './pages/KnowledgeBase';
import CreateJobPage from './pages/jobs/CreateJobPage';
import Settings from './pages/Settings';
import AuthPage from './pages/auth/AuthPage';
import RoleSelectPage from './pages/auth/RoleSelectPage';
import PasswordResetPage from './pages/auth/PasswordResetPage';
import OnboardingPage from './pages/auth/OnboardingPage';
import React, { lazy, Suspense, useEffect } from 'react';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AuthProvider } from './hooks/use-auth';
import { ErrorBoundary } from './components/ui/error-boundary';
import { RouteTestingPanel } from './utils/route-testing';
import { useAuthStore } from './store/authStore';
import { OnboardingProvider } from './hooks/use-onboarding';
import { OnboardingTooltipController } from './components/ui/onboarding-tooltip';
import { OnboardingWelcome } from './components/ui/onboarding-welcome';
import DocumentScanningPage from './pages/DocumentScanning';
import CompliancePage from './pages/Compliance';
import CompaniesPage from './pages/Companies';

// Lazy load pipeline components
const PipelineDashboard = lazy(() => import('./pages/pipeline/PipelineDashboard'));
const PipelineBoard = lazy(() => import('./pages/pipeline/PipelineBoard'));
const PipelineTasks = lazy(() => import('./pages/pipeline/PipelineTasks'));
const PipelineReports = lazy(() => import('./pages/pipeline/PipelineReports'));
const PipelineSettings = lazy(() => import('./pages/pipeline/PipelineSettings'));
const PipelineReminders = lazy(() => import('./pages/pipeline/PipelineReminders'));

// Replace AuthProvider with RBAC system
function RBACProvider({ children }: { children: React.ReactNode }) {
  const { initialize, isInitialized, user, activeRole } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize auth state
  useEffect(() => {
    initialize();
  }, []);
  
  // Handle routing based on auth state
  useEffect(() => {
    if (!isInitialized) {
      return; // Still initializing
    }
    
    const publicPaths = ['/auth', '/reset-password'];
    const isPublicPath = publicPaths.includes(location.pathname);
    
    if (!user && !isPublicPath) {
      // User not logged in and trying to access protected route
      navigate('/auth');
      return;
    }
    
    if (user && !activeRole && location.pathname !== '/role-select') {
      // User logged in but no role selected
      navigate('/role-select');
      return;
    }
  }, [isInitialized, user, activeRole, location.pathname, navigate]);
  
  if (!isInitialized) {
    // Show loading state while initializing
    return (
      <div className="min-h-screen flex items-center justify-center bg-aximo-darker">
        <div className="text-center">
          <div className="animate-pulse text-aximo-primary text-xl">
            Initializing Quantum Matrix...
          </div>
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
          {/* Authentication Routes */}
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />
          <Route path="/role-select" element={<RoleSelectPage />} />
          <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
          
          {/* Main dashboard pages - Protected */}
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
          
          <Route 
            path="/index" 
            element={
              <ProtectedRoute>
                <MainLayout>
                  <Index />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Main sections - All protected */}
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
            path="/customers/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Customers">
                  <Customers />
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
            path="/finance" 
            element={
              <ProtectedRoute>
                <MainLayout title="Finance">
                  <Finance />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/supply-chain" 
            element={
              <ProtectedRoute>
                <MainLayout title="Supply Chain">
                  <SupplyChain />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/document-scanning" 
            element={
              <ProtectedRoute>
                <MainLayout title="Document Scanning">
                  <DocumentScanningPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/compliance" 
            element={
              <ProtectedRoute>
                <MainLayout title="Compliance">
                  <CompliancePage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/companies" 
            element={
              <ProtectedRoute>
                <MainLayout title="Companies">
                  <CompaniesPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/pipeline/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Pipeline">
                  <Pipeline />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/customer-portal/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Customer Portal">
                  <CustomerPortal />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          <Route 
            path="/knowledge-base" 
            element={
              <ProtectedRoute>
                <MainLayout title="Knowledge Base">
                  <KnowledgeBase />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Settings - Using our new Settings component */}
          <Route 
            path="/settings/*" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
          
          {/* Jobs section */}
          <Route 
            path="/jobs/*" 
            element={
              <ProtectedRoute>
                <MainLayout title="Jobs">
                  <Jobs />
                </MainLayout>
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        
        {/* Welcome Modal */}
        <OnboardingWelcome />
      </OnboardingTooltipController>
      
      <Toaster />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="aximo-theme">
      <ErrorBoundary>
        <RBACProvider>
          <OnboardingProvider>
            <AppContent />
          </OnboardingProvider>
        </RBACProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
}
