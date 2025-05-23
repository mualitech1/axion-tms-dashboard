import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { LineChart, BarChart, PieChart } from '@/components/charts';
import { Button } from '@/components/ui/button';
import { dashboardStateAtom, useDashboardMetrics, useDashboardCharts, useDashboardActivity } from '@/store/dashboard';
import { initializeDashboardState } from '@/store/dashboard/actions';
import { useAtom } from 'jotai';
import { NotificationBell } from '@/components/notifications/NotificationBell';
import { AppRole } from '@/types/permissions';
import { usePermissions } from '@/hooks/use-permissions';
import { useAuthStore } from '@/store/authStore';

export default function DashboardPage() {
  const [dashboardState, setDashboardState] = useAtom(dashboardStateAtom);
  const metrics = useDashboardMetrics();
  const charts = useDashboardCharts();
  const activity = useDashboardActivity();
  const { can, hasRole } = usePermissions();
  const userRole = useAuthStore(state => state.activeRole);
  
  useEffect(() => {
    if (!dashboardState.isInitialized) {
      initializeDashboardState(setDashboardState);
    }
  }, [dashboardState.isInitialized, setDashboardState]);

  if (dashboardState.isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-aximo-primary"></div>
      </div>
    );
  }

  const getWelcomeMessage = () => {
    const userName = useAuthStore.getState().user?.user_metadata?.full_name || 'User';
    
    switch (userRole) {
      case AppRole.Admin:
        return `Welcome back, ${userName}. You have full administrative access.`;
      case AppRole.Operations:
        return `Welcome, ${userName}. Operations dashboard is ready.`;
      case AppRole.Accounts:
        return `Welcome, ${userName}. Financial overview is available.`;
      case AppRole.Sales:
        return `Welcome, ${userName}. Sales performance metrics are updated.`;
      case AppRole.Driver:
        return `Welcome, ${userName}. Your driving assignments are ready.`;
      case AppRole.Customer:
        return `Welcome, ${userName}. Your shipment status is available below.`;
      default:
        return `Welcome back, ${userName}.`;
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Axion TMS</title>
      </Helmet>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">{getWelcomeMessage()}</p>
        </div>
        <NotificationBell />
      </div>

      <div className="space-y-6">
        {/* Role-specific metric cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Show all metrics for Admin */}
          {hasRole([AppRole.Admin]) && (
            <>
              <MetricCard 
                title="Total Revenue" 
                value={metrics.totalRevenue} 
                change={metrics.revenueChange} 
                changeType={metrics.revenueChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Active Jobs" 
                value={metrics.activeJobs.toString()} 
                change={metrics.jobsChange} 
                changeType={metrics.jobsChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Customers" 
                value={metrics.customers.toString()} 
                change={metrics.customersChange} 
                changeType={metrics.customersChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Carriers" 
                value={metrics.carriers.toString()} 
                change={metrics.carriersChange} 
                changeType={metrics.carriersChange >= 0 ? "positive" : "negative"} 
              />
            </>
          )}
          
          {/* Financial metrics for Accounts */}
          {hasRole([AppRole.Accounts]) && !hasRole([AppRole.Admin]) && (
            <>
              <MetricCard 
                title="Total Revenue" 
                value={metrics.totalRevenue} 
                change={metrics.revenueChange} 
                changeType={metrics.revenueChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Outstanding Invoices" 
                value={`$${metrics.outstandingInvoices}`} 
                change={metrics.invoicesChange} 
                changeType={metrics.invoicesChange <= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Profit Margin" 
                value={`${metrics.profitMargin}%`} 
                change={metrics.marginChange} 
                changeType={metrics.marginChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Operating Costs" 
                value={`$${metrics.operatingCosts}`} 
                change={metrics.costsChange} 
                changeType={metrics.costsChange <= 0 ? "positive" : "negative"} 
              />
            </>
          )}
          
          {/* Operations metrics */}
          {hasRole([AppRole.Operations]) && !hasRole([AppRole.Admin]) && (
            <>
              <MetricCard 
                title="Active Jobs" 
                value={metrics.activeJobs.toString()} 
                change={metrics.jobsChange} 
                changeType={metrics.jobsChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="On-Time Delivery" 
                value={`${metrics.onTimeDelivery}%`} 
                change={metrics.deliveryChange} 
                changeType={metrics.deliveryChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Available Drivers" 
                value={metrics.availableDrivers.toString()} 
                change={metrics.driversChange} 
                changeType={metrics.driversChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Fleet Utilization" 
                value={`${metrics.fleetUtilization}%`} 
                change={metrics.utilizationChange} 
                changeType={metrics.utilizationChange >= 0 ? "positive" : "negative"} 
              />
            </>
          )}
          
          {/* Sales metrics */}
          {hasRole([AppRole.Sales]) && !hasRole([AppRole.Admin, AppRole.Accounts]) && (
            <>
              <MetricCard 
                title="Total Revenue" 
                value={metrics.totalRevenue} 
                change={metrics.revenueChange} 
                changeType={metrics.revenueChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="New Customers" 
                value={metrics.newCustomers.toString()} 
                change={metrics.newCustomersChange} 
                changeType={metrics.newCustomersChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Conversion Rate" 
                value={`${metrics.conversionRate}%`} 
                change={metrics.conversionChange} 
                changeType={metrics.conversionChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Lead Generation" 
                value={metrics.leads.toString()} 
                change={metrics.leadsChange} 
                changeType={metrics.leadsChange >= 0 ? "positive" : "negative"} 
              />
            </>
          )}
          
          {/* Driver metrics */}
          {hasRole([AppRole.Driver]) && (
            <>
              <MetricCard 
                title="Assigned Jobs" 
                value={metrics.driverJobs?.toString() || "0"} 
                change={metrics.driverJobsChange || 0} 
                changeType={metrics.driverJobsChange && metrics.driverJobsChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Miles Driven" 
                value={`${metrics.milesDriven || 0}`} 
                change={metrics.mileageChange || 0} 
                changeType={metrics.mileageChange && metrics.mileageChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="On-Time Rate" 
                value={`${metrics.driverOnTimeRate || 0}%`} 
                change={metrics.driverOnTimeChange || 0} 
                changeType={metrics.driverOnTimeChange && metrics.driverOnTimeChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Fuel Efficiency" 
                value={`${metrics.fuelEfficiency || 0} mpg`} 
                change={metrics.efficiencyChange || 0} 
                changeType={metrics.efficiencyChange && metrics.efficiencyChange >= 0 ? "positive" : "negative"} 
              />
            </>
          )}
          
          {/* Customer metrics */}
          {hasRole([AppRole.Customer]) && (
            <>
              <MetricCard 
                title="Active Shipments" 
                value={metrics.customerShipments?.toString() || "0"} 
                badge="Status" 
              />
              <MetricCard 
                title="On-Time Deliveries" 
                value={`${metrics.customerOnTimeRate || 0}%`} 
                change={metrics.customerOnTimeChange || 0} 
                changeType={metrics.customerOnTimeChange && metrics.customerOnTimeChange >= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Total Spend" 
                value={`$${metrics.customerSpend || 0}`} 
                change={metrics.customerSpendChange || 0} 
                changeType={metrics.customerSpendChange && metrics.customerSpendChange <= 0 ? "positive" : "negative"} 
              />
              <MetricCard 
                title="Shipment History" 
                value={metrics.customerCompletedShipments?.toString() || "0"} 
                badge="View All" 
              />
            </>
          )}
        </div>

        {/* Charts Section - Show based on role */}
        <Tabs defaultValue="overview" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {can('finance', 'view') && <TabsTrigger value="financial">Financial</TabsTrigger>}
              {can('jobs', 'view') && <TabsTrigger value="operations">Operations</TabsTrigger>}
              {hasRole([AppRole.Sales, AppRole.Admin]) && <TabsTrigger value="sales">Sales</TabsTrigger>}
              {hasRole([AppRole.Driver]) && <TabsTrigger value="driver">Driver</TabsTrigger>}
              {hasRole([AppRole.Customer]) && <TabsTrigger value="customer">Shipments</TabsTrigger>}
            </TabsList>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                Download Report
              </Button>
              <Button variant="outline" size="sm">
                Share
              </Button>
            </div>
          </div>

          {/* Overview Tab - Visible to everyone */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Performance Overview</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <LineChart 
                    data={charts.performanceData} 
                    index="period" 
                    categories={["revenue", "costs", "profit"]} 
                    colors={["#2563eb", "#ef4444", "#10b981"]} 
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Job Distribution</CardTitle>
                </CardHeader>
                <CardContent className="h-80">
                  <PieChart 
                    data={charts.jobDistribution} 
                    index="name" 
                    category="value" 
                    valueFormatter={(number) => `${number.toFixed(1)}%`}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financial Tab - Only for financial roles */}
          {can('finance', 'view') && (
            <TabsContent value="financial" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Revenue & Expenses</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <BarChart 
                      data={charts.financialData} 
                      index="month" 
                      categories={["revenue", "expenses", "profit"]} 
                      colors={["#2563eb", "#ef4444", "#10b981"]} 
                      valueFormatter={(number) => `$${Intl.NumberFormat("us").format(number)}`}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Profit Margins</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <LineChart 
                      data={charts.marginTrends} 
                      index="period" 
                      categories={["margin"]} 
                      colors={["#8b5cf6"]} 
                      valueFormatter={(number) => `${number.toFixed(1)}%`}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Operations Tab - For operations team */}
          {can('jobs', 'view') && (
            <TabsContent value="operations" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Job Completion Rates</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <LineChart 
                      data={charts.completionRates} 
                      index="period" 
                      categories={["onTime", "delayed", "canceled"]} 
                      colors={["#10b981", "#f59e0b", "#ef4444"]} 
                      valueFormatter={(number) => `${number.toFixed(1)}%`}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Resource Utilization</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <PieChart 
                      data={charts.utilizationData} 
                      index="name" 
                      category="value" 
                      valueFormatter={(number) => `${number.toFixed(1)}%`}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Sales Tab - For sales team */}
          {hasRole([AppRole.Sales, AppRole.Admin]) && (
            <TabsContent value="sales" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Sales Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <BarChart 
                      data={charts.salesPerformance} 
                      index="period" 
                      categories={["targets", "actual"]} 
                      colors={["#8b5cf6", "#2563eb"]} 
                      valueFormatter={(number) => `$${Intl.NumberFormat("us").format(number)}`}
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Acquisition</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <LineChart 
                      data={charts.customerAcquisition} 
                      index="period" 
                      categories={["newCustomers", "churn"]} 
                      colors={["#10b981", "#ef4444"]} 
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Driver Tab - For drivers */}
          {hasRole([AppRole.Driver]) && (
            <TabsContent value="driver" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Your Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <LineChart 
                      data={charts.driverPerformance || []} 
                      index="period" 
                      categories={["mileage", "efficiency", "onTime"]} 
                      colors={["#2563eb", "#10b981", "#8b5cf6"]} 
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Job Types</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <PieChart 
                      data={charts.driverJobTypes || []} 
                      index="name" 
                      category="value" 
                      valueFormatter={(number) => `${number.toFixed(0)}`}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}

          {/* Customer Tab - For customers */}
          {hasRole([AppRole.Customer]) && (
            <TabsContent value="customer" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Shipment History</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <LineChart 
                      data={charts.customerShipmentHistory || []} 
                      index="period" 
                      categories={["shipments", "onTime"]} 
                      colors={["#2563eb", "#10b981"]} 
                    />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Shipment Types</CardTitle>
                  </CardHeader>
                  <CardContent className="h-80">
                    <PieChart 
                      data={charts.customerShipmentTypes || []} 
                      index="name" 
                      category="value" 
                      valueFormatter={(number) => `${number.toFixed(0)}`}
                    />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          )}
        </Tabs>

        {/* Recent Activity - Only show relevant activity for the user's role */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {activity.length === 0 ? (
                <div className="text-center text-muted-foreground py-6">
                  No recent activity
                </div>
              ) : (
                <div className="space-y-4">
                  {activity.map((item, index) => {
                    // Filter activity based on role permissions
                    if (
                      (item.type === 'finance' && !can('finance', 'view')) ||
                      (item.type === 'job' && !can('jobs', 'view')) ||
                      (item.type === 'user' && !can('users', 'view')) ||
                      (item.type === 'customer' && !hasRole([AppRole.Admin, AppRole.Sales, AppRole.Operations, AppRole.Customer]))
                    ) {
                      return null;
                    }
                    
                    return (
                      <div key={index}>
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${getActivityColor(item.type)}`}></div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">{item.description}</p>
                              <Badge variant="outline" className="text-xs">
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.user} • {item.time}
                            </p>
                          </div>
                        </div>
                        {index < activity.length - 1 && <Separator className="my-4" />}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  badge 
}: { 
  title: string; 
  value: string; 
  change?: number; 
  changeType?: 'positive' | 'negative' | 'neutral';
  badge?: string;
}) {
  return (
    <Card>
      <CardHeader className="p-4 pb-0 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {badge && (
          <Badge className="text-xs" variant="outline">
            {badge}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-4 pt-4">
        <div className="text-2xl font-bold">{value}</div>
        {change !== undefined && (
          <p className={`text-xs flex items-center ${getChangeColor(changeType)}`}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function getChangeColor(type?: 'positive' | 'negative' | 'neutral') {
  switch (type) {
    case 'positive':
      return 'text-emerald-600';
    case 'negative':
      return 'text-rose-600';
    default:
      return 'text-muted-foreground';
  }
}

function getActivityColor(type: string) {
  switch (type) {
    case 'job':
      return 'bg-blue-500';
    case 'finance':
      return 'bg-emerald-500';
    case 'user':
      return 'bg-purple-500';
    case 'customer':
      return 'bg-amber-500';
    case 'system':
      return 'bg-slate-500';
    default:
      return 'bg-gray-500';
  }
} 