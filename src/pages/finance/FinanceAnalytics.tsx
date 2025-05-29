import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Target
} from "lucide-react";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

/**
 * 📊 QUANTUM FINANCE ANALYTICS - ADVANCED FINANCIAL INTELLIGENCE
 * 
 * Comprehensive financial analytics with quantum-level insights
 * Real-time data visualization and predictive analytics
 * 
 * SPACETOON PRODUCTION QUALITY! 📈⚡
 */
export default function FinanceAnalytics() {
  const [timeRange, setTimeRange] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  // Mock analytics data - will be replaced with real Supabase data
  const analytics = {
    revenue: {
      current: 45250.75,
      previous: 38120.50,
      growth: 18.7,
      trend: "up"
    },
    expenses: {
      current: 12800.25,
      previous: 15200.80,
      growth: -15.8,
      trend: "down"
    },
    profit: {
      current: 32450.50,
      previous: 22919.70,
      growth: 41.6,
      trend: "up"
    },
    cashFlow: {
      current: 28750.25,
      previous: 25680.40,
      growth: 12.0,
      trend: "up"
    }
  };

  const breadcrumbItems = [
    { label: "Quantum Hub", path: "/" },
    { label: "Financial Matrix", path: "/finance" },
    { label: "Financial Analytics", path: "/finance/analytics" }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-500" : "text-red-500";
  };

  const MetricCard = ({ title, current, previous, growth, trend }: {
    title: string;
    current: number;
    previous: number;
    growth: number;
    trend: string;
  }) => (
    <Card className="bg-aximo-card border-aximo-border shadow-aximo p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-aximo-text-secondary">{title}</p>
          <p className="text-2xl font-bold text-aximo-text">£{current.toLocaleString()}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getTrendIcon(trend)}
          <span className={`text-sm font-medium ${getTrendColor(trend)}`}>
            {growth > 0 ? "+" : ""}{growth.toFixed(1)}%
          </span>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-xs text-aximo-text-secondary">
          vs. previous period: £{previous.toLocaleString()}
        </p>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-r from-aximo-primary/20 to-blue-600/10 p-6 rounded-lg border border-aximo-border"
      >
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex items-center justify-between">
          <DashboardHeader
            title="Quantum Financial Analytics"
            subtitle="Advanced insights into financial patterns and quantum entanglement metrics"
          />
          <div className="flex gap-2">
            <Button variant="outline" className="border-aximo-border">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Time Range Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="bg-aximo-card border-aximo-border shadow-aximo p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Calendar className="h-5 w-5 text-aximo-text-secondary" />
              <span className="text-sm font-medium text-aximo-text">Time Range:</span>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40 border-aximo-border bg-aximo-darker">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-aximo-darker border-aximo-border">
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                  <SelectItem value="90d">Last 90 Days</SelectItem>
                  <SelectItem value="1y">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-aximo-border">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="border-aximo-border">
                <Eye className="mr-2 h-4 w-4" />
                View Options
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Key Metrics Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <MetricCard 
          title="Total Revenue"
          current={analytics.revenue.current}
          previous={analytics.revenue.previous}
          growth={analytics.revenue.growth}
          trend={analytics.revenue.trend}
        />
        <MetricCard 
          title="Total Expenses"
          current={analytics.expenses.current}
          previous={analytics.expenses.previous}
          growth={analytics.expenses.growth}
          trend={analytics.expenses.trend}
        />
        <MetricCard 
          title="Net Profit"
          current={analytics.profit.current}
          previous={analytics.profit.previous}
          growth={analytics.profit.growth}
          trend={analytics.profit.trend}
        />
        <MetricCard 
          title="Cash Flow"
          current={analytics.cashFlow.current}
          previous={analytics.cashFlow.previous}
          growth={analytics.cashFlow.growth}
          trend={analytics.cashFlow.trend}
        />
      </motion.div>

      {/* Analytics Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="bg-aximo-card border-aximo-border shadow-aximo">
          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-aximo-darker">
                <TabsTrigger value="overview" className="data-[state=active]:bg-aximo-primary">
                  Overview
                </TabsTrigger>
                <TabsTrigger value="revenue" className="data-[state=active]:bg-aximo-primary">
                  Revenue
                </TabsTrigger>
                <TabsTrigger value="expenses" className="data-[state=active]:bg-aximo-primary">
                  Expenses
                </TabsTrigger>
                <TabsTrigger value="forecasting" className="data-[state=active]:bg-aximo-primary">
                  Forecasting
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Revenue vs Expenses Chart Placeholder */}
                  <Card className="bg-aximo-darker border-aximo-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-aximo-text">Revenue vs Expenses</h3>
                      <BarChart3 className="h-5 w-5 text-aximo-primary" />
                    </div>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-aximo-border rounded-lg">
                      <div className="text-center">
                        <BarChart3 className="h-12 w-12 mx-auto mb-2 text-aximo-text-secondary" />
                        <p className="text-aximo-text-secondary">Chart visualization will be here</p>
                        <p className="text-xs text-aximo-text-secondary mt-1">Interactive revenue and expense trends</p>
                      </div>
                    </div>
                  </Card>

                  {/* Profit Margin Chart Placeholder */}
                  <Card className="bg-aximo-darker border-aximo-border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-aximo-text">Profit Margin Analysis</h3>
                      <PieChart className="h-5 w-5 text-aximo-primary" />
                    </div>
                    <div className="h-64 flex items-center justify-center border-2 border-dashed border-aximo-border rounded-lg">
                      <div className="text-center">
                        <PieChart className="h-12 w-12 mx-auto mb-2 text-aximo-text-secondary" />
                        <p className="text-aximo-text-secondary">Pie chart visualization will be here</p>
                        <p className="text-xs text-aximo-text-secondary mt-1">Profit margin breakdown and trends</p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="revenue" className="mt-6">
                <Card className="bg-aximo-darker border-aximo-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-aximo-text">Revenue Analytics</h3>
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="h-80 flex items-center justify-center border-2 border-dashed border-aximo-border rounded-lg">
                    <div className="text-center">
                      <TrendingUp className="h-16 w-16 mx-auto mb-4 text-aximo-text-secondary" />
                      <p className="text-aximo-text-secondary">Detailed revenue analytics coming soon</p>
                      <p className="text-xs text-aximo-text-secondary mt-1">Revenue streams, growth patterns, and forecasting</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="expenses" className="mt-6">
                <Card className="bg-aximo-darker border-aximo-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-aximo-text">Expense Analytics</h3>
                    <TrendingDown className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="h-80 flex items-center justify-center border-2 border-dashed border-aximo-border rounded-lg">
                    <div className="text-center">
                      <TrendingDown className="h-16 w-16 mx-auto mb-4 text-aximo-text-secondary" />
                      <p className="text-aximo-text-secondary">Detailed expense analytics coming soon</p>
                      <p className="text-xs text-aximo-text-secondary mt-1">Expense categories, trends, and optimization opportunities</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="forecasting" className="mt-6">
                <Card className="bg-aximo-darker border-aximo-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-aximo-text">Quantum Financial Forecasting</h3>
                    <Target className="h-5 w-5 text-aximo-primary" />
                  </div>
                  <div className="h-80 flex items-center justify-center border-2 border-dashed border-aximo-border rounded-lg">
                    <div className="text-center">
                      <Target className="h-16 w-16 mx-auto mb-4 text-aximo-text-secondary" />
                      <p className="text-aximo-text-secondary">AI-powered forecasting coming soon</p>
                      <p className="text-xs text-aximo-text-secondary mt-1">Predictive analytics and future financial projections</p>
                    </div>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 