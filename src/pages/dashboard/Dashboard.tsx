import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { dashboardStateAtom, dashboardMetricsAtom, dashboardChartsAtom, dashboardActivityAtom } from '@/store/dashboard';
import DashboardLoading from '@/components/dashboard/DashboardLoading';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MetricsCard from '@/components/dashboard/MetricsCard';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { EnhancedChart } from '@/components/dashboard/EnhancedChart';
import ActivityFeed from '@/components/dashboard/ActivityFeed';
import { PieChart, BarChart, LineChart, Activity, TrendingUp, Truck, Boxes, Calendar, DollarSign, Package } from 'lucide-react';
import { KamalWelcome } from '@/components/ui/welcome';
import HazimQuantumOptimizer from '@/components/dashboard/HazimQuantumOptimizer';
import { useResponsive } from '@/hooks/use-responsive';
import { DocumentExpiryAlerts } from '@/components/dashboard/DocumentExpiryAlerts';

// Sample data for charts
const carrierPerformanceData = [
  { name: 'Carrier A', 'On-time Delivery %': 94, 'Customer Rating': 4.7 },
  { name: 'Carrier B', 'On-time Delivery %': 88, 'Customer Rating': 4.2 },
  { name: 'Carrier C', 'On-time Delivery %': 97, 'Customer Rating': 4.9 },
  { name: 'Carrier D', 'On-time Delivery %': 91, 'Customer Rating': 4.5 },
  { name: 'Carrier E', 'On-time Delivery %': 86, 'Customer Rating': 4.1 },
];

const revenueData = [
  { name: 'Jan', value: 65 },
  { name: 'Feb', value: 59 },
  { name: 'Mar', value: 80 },
  { name: 'Apr', value: 81 },
  { name: 'May', value: 72 },
  { name: 'Jun', value: 86 },
];

// Sample data for the dashboard
const metricsData = {
  todayOrders: 157,
  todayRevenue: 12750,
  weeklyOrders: 891,
  weeklyRevenue: 67800,
  monthlyOrders: 3452,
  monthlyRevenue: 292500,
  percentChange: {
    orders: 12.7,
    revenue: 16.2
  }
};

// Chart data with name field as required by EnhancedChart
const salesChartData = [
  { name: 'Jan', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 9800 },
  { name: 'Apr', value: 3908 },
  { name: 'May', value: 4800 },
  { name: 'Jun', value: 3800 },
  { name: 'Jul', value: 4300 },
];

const ordersChartData = [
  { name: 'Jan', value: 340 },
  { name: 'Feb', value: 289 },
  { name: 'Mar', value: 550 },
  { name: 'Apr', value: 490 },
  { name: 'May', value: 600 },
  { name: 'Jun', value: 470 },
  { name: 'Jul', value: 510 },
];

const activityData = [
  { id: '1', type: 'order' as const, description: 'New order #12345 received', timestamp: '2023-05-12T14:30:00Z', status: 'completed' as const },
  { id: '2', type: 'user' as const, description: 'New user Kamal registered', timestamp: '2023-05-12T13:25:00Z', status: 'completed' as const },
  { id: '3', type: 'system' as const, description: 'System backup completed', timestamp: '2023-05-12T12:00:00Z', status: 'completed' as const },
  { id: '4', type: 'order' as const, description: 'Order #12342 shipped', timestamp: '2023-05-12T11:15:00Z', status: 'completed' as const },
  { id: '5', type: 'order' as const, description: 'Order #12341 payment failed', timestamp: '2023-05-12T10:30:00Z', status: 'failed' as const },
];

export function Dashboard() {
  const { isDesktop } = useResponsive();
  const [dashboardState, setDashboardState] = useAtom(dashboardStateAtom);
  const [, setMetrics] = useAtom(dashboardMetricsAtom);
  const [, setCharts] = useAtom(dashboardChartsAtom);
  const [, setActivity] = useAtom(dashboardActivityAtom);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!dashboardState.isInitialized) {
      // Set initial metrics data
      setMetrics(metricsData);
      
      // Set chart data
      setCharts({
        salesData: salesChartData,
        ordersData: ordersChartData,
        userActivityData: [] // Will be populated later
      });
      
      // Set activity data
      setActivity({
        recentActivity: activityData
      });
      
      // Update dashboard state
      setDashboardState(prev => ({
        ...prev,
        isInitialized: true,
        isLoading: false,
        lastUpdated: new Date().toISOString()
      }));
      
      console.log('[Dashboard] Initialized with sample data');
    }
  }, [dashboardState.isInitialized, setDashboardState, setMetrics, setCharts, setActivity]);
  
  if (isLoading) {
    return <DashboardLoading />;
  }
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Invisible Quantum Optimizer */}
      <HazimQuantumOptimizer />
      
      {/* Kamal Welcome Component */}
      <KamalWelcome />
      
      {/* Dashboard Header */}
      <DashboardHeader 
        title="Axion TMS Dashboard" 
        subtitle="Welcome to your transport management system"
      />
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <MetricsCard
          title="Today's Orders"
          value={dashboardState.data.metrics?.todayOrders || 0}
          change={{
            value: dashboardState.data.metrics?.percentChange.orders || 0,
            direction: "up"
          }}
          icon={<Package className="h-5 w-5" />}
          accentColor="blue"
        />
        <MetricsCard
          title="Today's Revenue"
          value={dashboardState.data.metrics?.todayRevenue || 0}
          change={{
            value: dashboardState.data.metrics?.percentChange.revenue || 0,
            direction: "up"
          }}
          icon={<DollarSign className="h-5 w-5" />}
          accentColor="green"
        />
        <MetricsCard
          title="Weekly Orders"
          value={dashboardState.data.metrics?.weeklyOrders || 0}
          change={{
            value: 8.5,
            direction: "up"
          }}
          icon={<TrendingUp className="h-5 w-5" />}
          accentColor="blue"
        />
      </div>
      
      {/* Charts and Alerts */}
      <div className={`grid ${isDesktop ? 'grid-cols-3' : 'grid-cols-1'} gap-6 mb-6`}>
        <div className="col-span-2">
          <div className="grid grid-cols-1 gap-6">
            <DashboardCard title="Sales Overview" className="min-h-[400px]">
              <EnhancedChart
                type="area"
                data={dashboardState.data.charts?.salesData || salesChartData}
                dataKeys={["value"]}
                dataLabels={["Sales"]}
                colors={{
                  primary: "#4f46e5",
                  secondary: "#818cf8",
                  grid: "#e2e8f0"
                }}
                showLegend
                allowDownload
                allowFullscreen
                height={350}
              />
            </DashboardCard>
            
            <DashboardCard title="Orders Trend" className="min-h-[400px]">
              <EnhancedChart
                type="bar"
                data={dashboardState.data.charts?.ordersData || ordersChartData}
                dataKeys={["value"]}
                dataLabels={["Orders"]}
                colors={{
                  primary: "#0ea5e9",
                  secondary: "#38bdf8",
                  grid: "#e2e8f0"
                }}
                showLegend
                allowDownload
                allowFullscreen
                height={350}
              />
            </DashboardCard>
          </div>
        </div>
        
        {/* Document Expiry Alerts */}
        <div className="space-y-6">
          <DocumentExpiryAlerts limit={5} onViewAll={() => navigate('/compliance/documents')} />
          
          {/* Carrier Compliance Stats */}
          <DashboardCard title="Carrier Compliance" className="h-[300px]">
            <div className="flex flex-col h-full justify-center items-center">
              <div className="relative w-32 h-32">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-green-500">85%</span>
                </div>
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="2"
                    strokeDasharray="100, 100"
                  />
                  <path
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="85, 100"
                  />
                </svg>
              </div>
              <p className="mt-4 text-sm text-aximo-text-secondary">
                Overall carrier compliance rating
              </p>
            </div>
          </DashboardCard>
        </div>
      </div>
      
      {/* Activity Feed */}
      <DashboardCard title="Recent Activity" className="mb-6">
        <ActivityFeed activities={dashboardState.data.activity?.recentActivity || []} />
      </DashboardCard>
    </div>
  );
} 