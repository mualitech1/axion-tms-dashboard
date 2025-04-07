
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardMetrics from './DashboardMetrics';
import SalesFunnel from './SalesFunnel';
import RecentActivity from './RecentActivity';
import LeadsSummary from './LeadsSummary';
import UpcomingTasks from './UpcomingTasks';

interface DashboardContentProps {
  activeTab: string;
}

export default function DashboardContent({ activeTab }: DashboardContentProps) {
  if (activeTab === 'overview') {
    return (
      <div className="space-y-4">
        <DashboardMetrics />
        
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
      </div>
    );
  }
  
  if (activeTab === 'performance') {
    return (
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
    );
  }
  
  if (activeTab === 'forecasting') {
    return (
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
    );
  }
  
  return null;
}
