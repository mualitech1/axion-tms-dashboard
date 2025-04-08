
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus, ListTodo } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetricsCards from './components/dashboard/MetricsCards';
import PipelineOverview from './components/dashboard/PipelineOverview';
import LeadsByStage from './components/dashboard/LeadsByStage';
import RecentActivityPanel from './components/dashboard/RecentActivityPanel';
import UpcomingTasksPanel from './components/dashboard/UpcomingTasksPanel';
import ReminderOverviewCard from './components/dashboard/ReminderOverviewCard';

export default function PipelineDashboard() {
  return (
    <MainLayout title="Pipeline Dashboard">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-2xl font-bold">Sales Pipeline</h1>
            <p className="text-muted-foreground">
              Track leads, opportunities and manage your sales process.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/sales-pipeline/board">
              <Button variant="outline">Board View</Button>
            </Link>
            <Link to="/sales-pipeline/tasks">
              <Button variant="outline">
                <ListTodo className="h-4 w-4 mr-2" />
                Tasks
              </Button>
            </Link>
            <Link to="/sales-pipeline/lead/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Lead
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Metrics Cards */}
      <MetricsCards />
      
      {/* Pipeline Overview and Leads by Stage */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <PipelineOverview />
        </div>
        <div>
          <LeadsByStage />
        </div>
      </div>
      
      {/* Recent Activity, Upcoming Tasks and Reminders */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <RecentActivityPanel />
        </div>
        <div className="md:col-span-1">
          <UpcomingTasksPanel />
        </div>
        <div className="md:col-span-1">
          <ReminderOverviewCard />
        </div>
      </div>
    </MainLayout>
  );
}
