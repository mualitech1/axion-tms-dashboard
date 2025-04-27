
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus, ListTodo, ArrowRightIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '@/components/navigation/Breadcrumb';
import MetricsCards from './components/dashboard/MetricsCards';
import PipelineOverview from './components/dashboard/PipelineOverview';
import LeadsByStage from './components/dashboard/LeadsByStage';
import RecentActivityPanel from './components/dashboard/RecentActivityPanel';
import UpcomingTasksPanel from './components/dashboard/UpcomingTasksPanel';
import ReminderOverviewCard from './components/dashboard/ReminderOverviewCard';

export default function PipelineDashboard() {
  const breadcrumbItems = [
    { label: 'Sales', path: '/pipeline' },
    { label: 'Pipeline Dashboard', path: '/pipeline/dashboard' }
  ];
  
  return (
    <MainLayout title="AI Logistics Pipeline">
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-aximo-text bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
              Logistics Pipeline
            </h1>
            <p className="text-aximo-text-secondary">
              Track leads, opportunities and manage your sales process.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/pipeline/board">
              <Button variant="outline" className="border-aximo-border bg-aximo-card text-aximo-text hover:bg-aximo-border">
                Board View
              </Button>
            </Link>
            <Link to="/pipeline/tasks">
              <Button variant="outline" className="border-aximo-border bg-aximo-card text-aximo-text hover:bg-aximo-border">
                <ListTodo className="h-4 w-4 mr-2" />
                Tasks
              </Button>
            </Link>
            <Link to="/pipeline/lead/new">
              <Button className="bg-aximo-primary hover:bg-aximo-highlight text-white">
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
      <div className="grid md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <PipelineOverview />
        </div>
        <div>
          <LeadsByStage />
        </div>
      </div>
      
      {/* Recent Activity, Upcoming Tasks and Reminders */}
      <div className="grid md:grid-cols-3 gap-6 mt-6">
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
      
      {/* View All Jobs Button */}
      <div className="mt-6 flex justify-end">
        <Button variant="ghost" size="sm" asChild className="text-aximo-primary hover:text-aximo-light">
          <Link to="/jobs" className="flex items-center text-sm">
            View all jobs
            <ArrowRightIcon className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </MainLayout>
  );
}
