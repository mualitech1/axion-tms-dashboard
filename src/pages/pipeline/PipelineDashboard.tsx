
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import MetricsCards from './components/dashboard/MetricsCards';
import PipelineOverview from './components/dashboard/PipelineOverview';
import LeadsByStage from './components/dashboard/LeadsByStage';
import RecentActivityPanel from './components/dashboard/RecentActivityPanel';
import UpcomingTasksPanel from './components/dashboard/UpcomingTasksPanel';

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
            <Link to="/pipeline/board">
              <Button variant="outline">Board View</Button>
            </Link>
            <Link to="/pipeline/lead/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Lead
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
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
        
        {/* Recent Activity and Upcoming Tasks */}
        <div className="grid md:grid-cols-2 gap-6">
          <RecentActivityPanel />
          <UpcomingTasksPanel />
        </div>
      </div>
    </MainLayout>
  );
}
