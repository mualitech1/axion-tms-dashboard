
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart2 } from 'lucide-react';
import DashboardHeader from './components/dashboard/DashboardHeader';
import DashboardContent from './components/dashboard/DashboardContent';

export default function PipelineDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <MainLayout title="Sales Pipeline">
      <DashboardHeader />

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <DashboardContent activeTab={activeTab} />
        </TabsContent>
        
        <TabsContent value="performance">
          <DashboardContent activeTab={activeTab} />
        </TabsContent>
        
        <TabsContent value="forecasting">
          <DashboardContent activeTab={activeTab} />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
