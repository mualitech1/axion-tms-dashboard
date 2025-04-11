
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InvoiceAnalytics } from '@/components/invoices/InvoiceAnalytics';
import { initialLeadsData, pipelineStages } from './pipeline/data/pipelineData';
import { SelectValue, SelectTrigger, SelectContent, SelectItem, Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download, Filter, BarChart2, PieChart, LineChart, TrendingUp, Calendar, Users, Truck } from 'lucide-react';
import PipelineMetrics from './pipeline/components/reports/PipelineMetrics';
import SalesFunnelChart from './pipeline/components/reports/SalesFunnelChart';
import LeadSourceAnalysis from './pipeline/components/reports/LeadSourceAnalysis';
import RevenueForecasting from './pipeline/components/reports/RevenueForecasting';
import DashboardMetrics from './pipeline/components/dashboard/DashboardMetrics';
import LeadsSummary from './pipeline/components/dashboard/LeadsSummary';
import { InvoiceData } from '@/components/invoices/create-invoice-dialog/types';

// Mock invoice data for the demo with corrected type
const mockInvoices: InvoiceData[] = [
  { 
    id: "INV-001", 
    customer: 'Acme Corp', 
    date: '2023-04-05', 
    dueDate: '2023-04-20', 
    amount: 2500, 
    status: 'paid',
    items: [{ description: "Consulting Services", quantity: "5", rate: "500", amount: "2500" }]
  },
  { 
    id: "INV-002", 
    customer: 'Globex', 
    date: '2023-04-12', 
    dueDate: '2023-04-27', 
    amount: 1750, 
    status: 'paid',
    items: [{ description: "Web Development", quantity: "5", rate: "350", amount: "1750" }]
  },
  { 
    id: "INV-003", 
    customer: 'Stark Industries', 
    date: '2023-04-18', 
    dueDate: '2023-05-03', 
    amount: 3200, 
    status: 'pending',
    items: [{ description: "Technical Support", quantity: "8", rate: "400", amount: "3200" }]
  },
  { 
    id: "INV-004", 
    customer: 'Wayne Enterprises', 
    date: '2023-04-25', 
    dueDate: '2023-05-10', 
    amount: 4100, 
    status: 'paid',
    items: [{ description: "Security Systems", quantity: "1", rate: "4100", amount: "4100" }]
  },
  { 
    id: "INV-005", 
    customer: 'Oscorp', 
    date: '2023-05-03', 
    dueDate: '2023-05-18', 
    amount: 2800, 
    status: 'pending',
    items: [{ description: "Research Services", quantity: "4", rate: "700", amount: "2800" }]
  },
  { 
    id: "INV-006", 
    customer: 'Umbrella Corp', 
    date: '2023-05-10', 
    dueDate: '2023-05-25', 
    amount: 1950, 
    status: 'paid',
    items: [{ description: "Laboratory Equipment", quantity: "3", rate: "650", amount: "1950" }]
  },
  { 
    id: "INV-007", 
    customer: 'LexCorp', 
    date: '2023-05-17', 
    dueDate: '2023-06-01', 
    amount: 3600, 
    status: 'paid',
    items: [{ description: "Data Analysis", quantity: "12", rate: "300", amount: "3600" }]
  },
  { 
    id: "INV-008", 
    customer: 'Cyberdyne Systems', 
    date: '2023-05-24', 
    dueDate: '2023-06-08', 
    amount: 2250, 
    status: 'pending',
    items: [{ description: "AI Implementation", quantity: "1", rate: "2250", amount: "2250" }]
  },
  { 
    id: "INV-009", 
    customer: 'Massive Dynamic', 
    date: '2023-06-01', 
    dueDate: '2023-06-16', 
    amount: 4300, 
    status: 'paid',
    items: [{ description: "Advanced Technology", quantity: "2", rate: "2150", amount: "4300" }]
  },
  { 
    id: "INV-010", 
    customer: 'Soylent Corp', 
    date: '2023-06-08', 
    dueDate: '2023-06-23', 
    amount: 1850, 
    status: 'pending',
    items: [{ description: "Food Processing", quantity: "1", rate: "1850", amount: "1850" }]
  },
];

export default function Analytics() {
  const [dateRange, setDateRange] = React.useState('30days');
  
  return (
    <MainLayout title="Analytics">
      <div className="animate-fade-in space-y-6">
        {/* Header with date range selector */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Insights and metrics to track business performance
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Select defaultValue={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last quarter</SelectItem>
                <SelectItem value="12months">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        
        {/* Main analytics tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 lg:w-[600px]">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart2 className="h-4 w-4" />
              <span className="hidden md:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden md:inline">Sales</span>
            </TabsTrigger>
            <TabsTrigger value="invoices" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              <span className="hidden md:inline">Invoices</span>
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden md:inline">Customers</span>
            </TabsTrigger>
            <TabsTrigger value="logistics" className="flex items-center gap-2">
              <Truck className="h-4 w-4" />
              <span className="hidden md:inline">Logistics</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <DashboardMetrics />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Sales Pipeline</CardTitle>
                    <CardDescription>Distribution by stage</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <SalesFunnelChart data={initialLeadsData} stages={pipelineStages} simplified={true} />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Revenue Forecast</CardTitle>
                    <CardDescription>Projected revenue for next 3 months</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <RevenueForecasting data={initialLeadsData} simplified={true} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Sales Tab */}
          <TabsContent value="sales" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <PipelineMetrics data={initialLeadsData} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Pipeline Overview</CardTitle>
                  <CardDescription>Sales funnel analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <SalesFunnelChart data={initialLeadsData} stages={pipelineStages} />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Lead Distribution</CardTitle>
                  <CardDescription>Sources breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <LeadsSummary />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Invoices Tab */}
          <TabsContent value="invoices">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Analytics</CardTitle>
                <CardDescription>Financial trends and payment analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <InvoiceAnalytics invoices={mockInvoices} />
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Customers Tab */}
          <TabsContent value="customers">
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Lead Source Analysis</CardTitle>
                  <CardDescription>Understanding customer acquisition channels</CardDescription>
                </CardHeader>
                <CardContent>
                  <LeadSourceAnalysis data={initialLeadsData} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Logistics Tab */}
          <TabsContent value="logistics">
            <Card>
              <CardHeader>
                <CardTitle>Logistics Analytics</CardTitle>
                <CardDescription>Coming soon - delivery performance metrics and route analysis</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center h-[400px] text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">Logistics Analytics Module</h3>
                <p className="text-muted-foreground max-w-md">
                  This feature is coming soon. It will include delivery performance metrics, route optimization analysis, and fleet utilization reports.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
