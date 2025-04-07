
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import DashboardMetrics from './DashboardMetrics';
import LeadsSummary from './LeadsSummary';
import SalesFunnel from './SalesFunnel';
import RecentActivity from './RecentActivity';
import UpcomingTasks from './UpcomingTasks';

export default function DashboardContent() {
  return (
    <div className="space-y-6">
      <DashboardMetrics />
      
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <SalesFunnel />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Leads by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadsSummary />
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingTasks />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
