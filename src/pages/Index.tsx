
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ActionableMetricsSection from '@/components/dashboard/ActionableMetricsSection';
import EnhancedChartsSection from '@/components/dashboard/EnhancedChartsSection';
import ComplianceAndAlertSection from '@/components/dashboard/ComplianceAndAlertSection';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import mock data
import { revenueData } from '@/data/chartData';
import { mockDeliveryPerformance, mockFinancialData, mockJobsData } from '@/data/dashboardData';

export default function Index() {
  return (
    <MainLayout title="Dashboard">
      <div className="animate-fade-in space-y-6">
        <DashboardHeader 
          title="Welcome back, Kamal"
          subtitle="Here's what's happening with your transport operations today."
        />
        
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Operations Overview</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/jobs" className="flex items-center text-sm text-tms-blue">
              View all jobs
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <ActionableMetricsSection jobsData={mockJobsData} financialData={mockFinancialData} />
        
        <EnhancedChartsSection 
          revenueData={revenueData} 
          deliveryPerformance={mockDeliveryPerformance}
        />
        
        <ComplianceAndAlertSection />
      </div>
    </MainLayout>
  );
}
