
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from './components/dashboard/DashboardHeader';
import DashboardContent from './components/dashboard/DashboardContent';
import NotificationsPanel from './components/collaboration/NotificationsPanel';

export default function PipelineDashboard() {
  return (
    <MainLayout title="Pipeline Dashboard">
      <div className="flex justify-between items-start">
        <DashboardHeader />
        <NotificationsPanel />
      </div>
      
      <DashboardContent />
    </MainLayout>
  );
}
