import { useEffect, Suspense, lazy, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BrainIcon, Database, FileText, Truck, Users as UsersIcon, Box, Zap, BarChart3, Shield, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboardPerformance } from '@/hooks/use-dashboard-performance';
import { setupTestEnvironment } from '@/data/customer-data';
import { useToast } from '@/hooks/use-toast';
import { SetupButton } from '@/utils/setup-utils';

// Lazy load components for better performance
const DashboardHeader = lazy(() => import('@/components/dashboard/DashboardHeader'));
const ActionableMetricsSection = lazy(() => import('@/components/dashboard/ActionableMetricsSection'));
const ChartsSection = lazy(() => import('@/components/dashboard/ChartsSection'));
const ComplianceAndAlertSection = lazy(() => import('@/components/dashboard/ComplianceAndAlertSection'));
const DashboardLoading = lazy(() => import('@/components/dashboard/DashboardLoading'));
import ErrorBoundary from '@/components/dashboard/ErrorBoundary';

// Import mock data
import { revenueData } from '@/data/chartData';
import { mockDeliveryPerformance, mockFinancialData, mockJobsData } from '@/data/dashboardData';

// Function to simulate API data fetching
const fetchDashboardData = async () => {
  // In a real app, this would be an API call
  // For now, simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return {
    jobsData: mockJobsData,
    financialData: mockFinancialData,
    revenueData,
    consignmentsData: mockDeliveryPerformance
  };
};

export default function Index() {
  const { 
    data: dashboardData, 
    isLoading, 
    error, 
    lastUpdated, 
    refresh 
  } = useDashboardPerformance(fetchDashboardData, {
    enableCaching: true,
    minRenderTime: 800
  });
  const [isLoadingEnvironment, setIsLoadingEnvironment] = useState(false);
  const { toast } = useToast();

  // Handle optional refresh logic
  useEffect(() => {
    // Refresh data when the component mounts
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refresh();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [refresh]);

  if (isLoading || !dashboardData) {
    return (
      <Suspense fallback={<div className="animate-pulse">Loading quantum matrix...</div>}>
        <DashboardLoading />
      </Suspense>
    );
  }

  if (error) {
    return (
      <ErrorBoundary>
        <div className="text-red-400 p-6">
          Error loading dashboard data: {error.message}
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="animate-fade-in relative z-0">
        <div className="bg-gradient-to-b from-aximo-darker to-transparent absolute inset-0 -z-10 h-96 opacity-80"></div>
        
        <Suspense fallback={<DashboardLoading />}>
          <DashboardHeader 
            title="Welcome to Axion AGI Command Nexus"
            subtitle="Advanced intelligence for quantum-entangled logistics operations"
            actions={<SetupButton />}
          />
        </Suspense>
        
        <div className="space-y-6">
          <div className="bg-aximo-card p-6 rounded-lg border border-aximo-border shadow-aximo mb-6">
            <Suspense fallback={<div className="h-10 bg-aximo-border rounded-md animate-pulse"></div>}>
              <DashboardHeader 
                title="Welcome to Axion AGI Command Nexus"
                subtitle="Advanced intelligence for quantum-entangled logistics operations"
                actions={
                  <div className="flex flex-wrap gap-2">
                    <Button 
                      onClick={handleSetupEnvironment} 
                      disabled={isLoadingEnvironment} 
                      className="bg-gradient-to-r from-aximo-primary to-aximo-light hover:opacity-90"
                    >
                      {isLoadingEnvironment ? (
                        <>
                          <div className="h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Setting Up...
                        </>
                      ) : (
                        <>
                          <Database className="h-4 w-4 mr-2" />
                          Setup Test Environment
                        </>
                      )}
                    </Button>
                    
                    <Link to="/jobs/create">
                      <Button className="bg-aximo-primary text-white hover:bg-aximo-primary/90">
                        <Plus className="h-4 w-4 mr-2" />
                        New Job
                      </Button>
                    </Link>
                  </div>
                }
              />
            </Suspense>
            
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
              <Link to="/analytics" className="col-span-1">
                <div className="aximo-card flex flex-col items-center text-center h-full">
                  <div className="aximo-icon-container mb-3">
                    <BrainIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-aximo-text">Quantum Analytics</h3>
                  <p className="text-sm text-aximo-text-secondary mt-2">Advanced insights with entangled intelligence</p>
                </div>
              </Link>
              
              <Link to="/customers" className="col-span-1">
                <div className="aximo-card flex flex-col items-center text-center h-full">
                  <div className="aximo-icon-container mb-3">
                    <UsersIcon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-aximo-text">Customer Relations</h3>
                  <p className="text-sm text-aximo-text-secondary mt-2">Orchestrated customer intelligence</p>
                </div>
              </Link>
              
              <Link to="/jobs" className="col-span-1">
                <div className="aximo-card flex flex-col items-center text-center h-full">
                  <div className="aximo-icon-container mb-3">
                    <Truck className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-aximo-text">Spatio-Temporal Routes</h3>
                  <p className="text-sm text-aximo-text-secondary mt-2">Probability-optimized transportation</p>
                </div>
              </Link>
              
              <Link to="/invoices" className="col-span-1">
                <div className="aximo-card flex flex-col items-center text-center h-full">
                  <div className="aximo-icon-container mb-3">
                    <FileText className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-aximo-text">Financial Matrix</h3>
                  <p className="text-sm text-aximo-text-secondary mt-2">Automated financial orchestration</p>
                </div>
              </Link>
              
              <Link to="/supply-chain" className="col-span-1">
                <div className="aximo-card flex flex-col items-center text-center h-full">
                  <div className="aximo-icon-container mb-3">
                    <Box className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-aximo-text">Supply Web</h3>
                  <p className="text-sm text-aximo-text-secondary mt-2">Hyper-connected inventory intelligence</p>
                </div>
              </Link>
              
              <Link to="/pipeline/dashboard" className="col-span-1">
                <div className="aximo-card flex flex-col items-center text-center h-full">
                  <div className="aximo-icon-container mb-3">
                    <Database className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-aximo-text">Neural Storage</h3>
                  <p className="text-sm text-aximo-text-secondary mt-2">Quantum-secured storage system</p>
                </div>
              </Link>
            </div>
          </div>
          
          <div className="bg-aximo-card p-6 rounded-lg border border-aximo-border shadow-aximo mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-aximo-text">AetherForge Integration</h2>
                <p className="text-aximo-text-secondary">Connects to AetherForge AGI platform for enhanced capabilities</p>
              </div>
              <div className="flex space-x-2 mt-3 md:mt-0">
                <Button size="sm" variant="outline" className="border-aximo-border bg-aximo-dark/30">
                  <Shield className="h-4 w-4 mr-2" />
                  Security Protocol
                </Button>
                <Button size="sm" variant="outline" className="border-aximo-border bg-aximo-dark/30">
                  <Zap className="h-4 w-4 mr-2" />
                  Neural Calibration
                </Button>
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-aximo-primary to-aximo-light hover:opacity-90"
                  onClick={refresh}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  System Status
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-aximo-darker rounded-lg p-4 border border-aximo-border">
                <h3 className="font-medium text-aximo-primary mb-2">Quantum Core</h3>
                <p className="text-sm text-aximo-text-secondary">Orchestrating complex systems with quantum-entangled operations</p>
                <div className="h-2 bg-aximo-border rounded-full mt-3">
                  <div className="h-2 bg-gradient-to-r from-aximo-primary to-aximo-light rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="text-xs text-right mt-1 text-aximo-text-secondary">92% efficiency</div>
              </div>
              
              <div className="bg-aximo-darker rounded-lg p-4 border border-aximo-border">
                <h3 className="font-medium text-aximo-primary mb-2">Neural Command Nexus</h3>
                <p className="text-sm text-aximo-text-secondary">Intuitive command and control of logistics operations</p>
                <div className="h-2 bg-aximo-border rounded-full mt-3">
                  <div className="h-2 bg-gradient-to-r from-aximo-primary to-aximo-light rounded-full" style={{ width: '87%' }}></div>
                </div>
                <div className="text-xs text-right mt-1 text-aximo-text-secondary">87% efficiency</div>
              </div>
              
              <div className="bg-aximo-darker rounded-lg p-4 border border-aximo-border">
                <h3 className="font-medium text-aximo-primary mb-2">Cognitive Calibration</h3>
                <p className="text-sm text-aximo-text-secondary">Real-time adaptive intelligence for optimal decision making</p>
                <div className="h-2 bg-aximo-border rounded-full mt-3">
                  <div className="h-2 bg-gradient-to-r from-aximo-primary to-aximo-light rounded-full" style={{ width: '95%' }}></div>
                </div>
                <div className="text-xs text-right mt-1 text-aximo-text-secondary">95% efficiency</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <h2 className="aximo-headline">Operations Overview</h2>
            <Button variant="ghost" size="sm" asChild className="text-aximo-primary hover:text-aximo-light">
              <Link to="/jobs" className="flex items-center text-sm">
                View all jobs
                <ArrowRightIcon className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          <ErrorBoundary>
            <Suspense fallback={
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 h-full">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-aximo-card border border-aximo-border rounded-lg shadow-aximo p-5 animate-pulse">
                    <div className="h-20 bg-aximo-border/30 rounded-md"></div>
                  </div>
                ))}
              </div>
            }>
              <ActionableMetricsSection 
                jobsData={dashboardData.jobsData} 
                financialData={dashboardData.financialData} 
              />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Suspense fallback={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="bg-aximo-card border border-aximo-border rounded-lg shadow-aximo p-5 animate-pulse">
                    <div className="h-60 bg-aximo-border/30 rounded-md"></div>
                  </div>
                ))}
              </div>
            }>
              <ChartsSection 
                revenueData={dashboardData.revenueData} 
                consignmentsData={dashboardData.consignmentsData}
              />
            </Suspense>
          </ErrorBoundary>
          
          <ErrorBoundary>
            <Suspense fallback={
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-pulse">
                <div className="bg-indigo-900/40 border border-indigo-700/30 rounded-lg p-6 h-60"></div>
                <div className="bg-red-900/40 border border-red-700/30 rounded-lg p-6 h-60"></div>
              </div>
            }>
              <ComplianceAndAlertSection />
            </Suspense>
          </ErrorBoundary>
          
          {lastUpdated && (
            <div className="text-xs text-aximo-text-secondary text-right mt-2">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
