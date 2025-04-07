
import { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { BarChart2, Plus, PieChart, Kanban } from 'lucide-react';
import SalesFunnel from './components/dashboard/SalesFunnel';
import LeadsSummary from './components/dashboard/LeadsSummary';
import RecentActivity from './components/dashboard/RecentActivity';
import UpcomingTasks from './components/dashboard/UpcomingTasks';

export default function PipelineDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <MainLayout title="Sales Pipeline">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground">
            Track leads, opportunities and manage your sales process.
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/pipeline/board">
            <Button variant="outline">
              <Kanban className="mr-2 h-4 w-4" />
              Board View
            </Button>
          </Link>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add New Lead
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">
                  +8% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£128,400</div>
                <p className="text-xs text-muted-foreground">
                  +14.3% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24.3%</div>
                <p className="text-xs text-muted-foreground">
                  +5.1% from last month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Deal Size</CardTitle>
                <BarChart2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">£8,450</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% from last month
                </p>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1 md:col-span-2">
              <CardHeader>
                <CardTitle>Sales Funnel</CardTitle>
                <CardDescription>
                  Leads by stage with conversion rates
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesFunnel />
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates and interactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentActivity />
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Lead Summary</CardTitle>
                <CardDescription>
                  Breakdown by stage and source
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <LeadsSummary />
              </CardContent>
            </Card>
            
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>
                  Tasks and follow-ups due soon
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UpcomingTasks />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
              <CardDescription>
                Comparative analysis of sales representatives performance
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <p>Performance metrics will be displayed here...</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="forecasting" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Forecast</CardTitle>
              <CardDescription>
                Projected revenue for upcoming quarters
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <p>Forecasting charts will be displayed here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
