
import { 
  Truck, Package, CreditCard, DollarSign, 
  TrendingUp, Users, ShoppingBag, MapPin 
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import MetricsCard from '@/components/dashboard/MetricsCard';
import Chart from '@/components/dashboard/Chart';
import DashboardCard from '@/components/dashboard/DashboardCard';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

// Mock data for charts
const revenueData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 5000 },
  { name: 'Mar', value: 3000 },
  { name: 'Apr', value: 7000 },
  { name: 'May', value: 5000 },
  { name: 'Jun', value: 6000 },
  { name: 'Jul', value: 8000 },
];

const consignmentsData = [
  { name: 'Week 1', value: 156 },
  { name: 'Week 2', value: 142 },
  { name: 'Week 3', value: 187 },
  { name: 'Week 4', value: 201 },
  { name: 'Week 5', value: 178 },
  { name: 'Week 6', value: 193 },
];

const topCustomers = [
  { id: 1, name: 'Acme Corporation', revenue: 125000, growth: 12.4 },
  { id: 2, name: 'Globex Industries', revenue: 98000, growth: 8.7 },
  { id: 3, name: 'Wayne Enterprises', revenue: 84500, growth: -2.3 },
  { id: 4, name: 'Stark Industries', revenue: 76000, growth: 15.2 },
];

export default function Index() {
  return (
    <MainLayout title="Dashboard">
      <div className="animate-fade-in">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-tms-gray-800">Welcome back, John</h1>
          <p className="text-tms-gray-600">Here's what's happening with your transport operations today.</p>
        </div>
        
        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Consignments"
            value="1,842"
            change={{ value: 12.5, direction: "up", text: "vs last month" }}
            icon={<Package className="h-5 w-5 text-tms-blue" />}
          />
          
          <MetricsCard
            title="Active Carriers"
            value="124"
            change={{ value: 4.2, direction: "up", text: "vs last month" }}
            icon={<Truck className="h-5 w-5 text-tms-blue" />}
          />
          
          <MetricsCard
            title="Monthly Revenue"
            value="£684,235"
            change={{ value: 8.7, direction: "up", text: "vs last month" }}
            icon={<DollarSign className="h-5 w-5 text-tms-blue" />}
          />
          
          <MetricsCard
            title="Pending Invoices"
            value="£42,890"
            change={{ value: 3.5, direction: "down", text: "vs last month" }}
            icon={<CreditCard className="h-5 w-5 text-tms-blue" />}
          />
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Chart 
            title="Revenue Trend" 
            data={revenueData} 
            type="line" 
          />
          
          <Chart 
            title="Weekly Consignments" 
            data={consignmentsData} 
            type="bar" 
          />
        </div>
        
        {/* Additional Metrics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <DashboardCard title="Top Customers">
            <div className="space-y-4">
              {topCustomers.map((customer) => (
                <div key={customer.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="bg-tms-gray-200 h-8 w-8 rounded-full flex items-center justify-center mr-3">
                      <ShoppingBag className="h-4 w-4 text-tms-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-tms-gray-800">{customer.name}</p>
                      <p className="text-xs text-tms-gray-500">£{customer.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className={`text-xs font-medium ${customer.growth >= 0 ? 'text-tms-green' : 'text-tms-red'}`}>
                    {customer.growth >= 0 ? '+' : ''}{customer.growth}%
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
          
          <DashboardCard title="Delivery Performance">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-tms-gray-700">On-Time Delivery</span>
                  <span className="text-sm font-medium text-tms-green">92%</span>
                </div>
                <Progress value={92} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-green" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-tms-gray-700">POD Compliance</span>
                  <span className="text-sm font-medium text-tms-blue">87%</span>
                </div>
                <Progress value={87} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-blue" />
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-tms-gray-700">Customer Satisfaction</span>
                  <span className="text-sm font-medium text-tms-blue">94%</span>
                </div>
                <Progress value={94} className="h-2 bg-tms-gray-200" indicatorClassName="bg-tms-blue" />
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Active Regions">
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="bg-tms-blue-light p-2 rounded-full mr-3">
                  <MapPin className="h-4 w-4 text-tms-blue" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">London & South East</span>
                    <span className="text-xs font-medium text-tms-gray-500">42%</span>
                  </div>
                  <Progress value={42} className="h-1.5 mt-1 bg-tms-gray-200" indicatorClassName="bg-tms-blue" />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-tms-green-light p-2 rounded-full mr-3">
                  <MapPin className="h-4 w-4 text-tms-green" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Midlands</span>
                    <span className="text-xs font-medium text-tms-gray-500">28%</span>
                  </div>
                  <Progress value={28} className="h-1.5 mt-1 bg-tms-gray-200" indicatorClassName="bg-tms-green" />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-tms-yellow-light p-2 rounded-full mr-3">
                  <MapPin className="h-4 w-4 text-tms-yellow" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">North West</span>
                    <span className="text-xs font-medium text-tms-gray-500">18%</span>
                  </div>
                  <Progress value={18} className="h-1.5 mt-1 bg-tms-gray-200" indicatorClassName="bg-tms-yellow" />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-tms-red-light p-2 rounded-full mr-3">
                  <MapPin className="h-4 w-4 text-tms-red" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Scotland</span>
                    <span className="text-xs font-medium text-tms-gray-500">12%</span>
                  </div>
                  <Progress value={12} className="h-1.5 mt-1 bg-tms-gray-200" indicatorClassName="bg-tms-red" />
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </MainLayout>
  );
}
