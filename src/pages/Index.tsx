
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ActionableMetricsSection from '@/components/dashboard/ActionableMetricsSection';
import ChartsSection from '@/components/dashboard/ChartsSection';
import ComplianceAndAlertSection from '@/components/dashboard/ComplianceAndAlertSection';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, BrainIcon, Database, FileText, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Import mock data
import { revenueData } from '@/data/chartData';
import { mockDeliveryPerformance, mockFinancialData, mockJobsData } from '@/data/dashboardData';

export default function Index() {
  return (
    <MainLayout title="Dashboard">
      <div className="animate-fade-in space-y-6">
        <div className="bg-aximo-card p-6 rounded-lg border border-aximo-border shadow-aximo mb-6">
          <DashboardHeader 
            title="Welcome to Aximo AI Logistics"
            subtitle="Your AI-powered transport operations platform"
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
            <Link to="/analytics" className="col-span-1">
              <div className="aximo-card flex flex-col items-center text-center h-full">
                <div className="aximo-icon-container mb-3">
                  <BrainIcon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-aximo-text">AI Analytics</h3>
                <p className="text-sm text-aximo-text-secondary mt-2">Advanced insights with predictive intelligence</p>
              </div>
            </Link>
            
            <Link to="/customers" className="col-span-1">
              <div className="aximo-card flex flex-col items-center text-center h-full">
                <div className="aximo-icon-container mb-3">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-aximo-text">Customer Management</h3>
                <p className="text-sm text-aximo-text-secondary mt-2">Centralized customer relationship platform</p>
              </div>
            </Link>
            
            <Link to="/jobs" className="col-span-1">
              <div className="aximo-card flex flex-col items-center text-center h-full">
                <div className="aximo-icon-container mb-3">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-aximo-text">Route Optimization</h3>
                <p className="text-sm text-aximo-text-secondary mt-2">Intelligent route planning system</p>
              </div>
            </Link>
            
            <Link to="/invoices" className="col-span-1">
              <div className="aximo-card flex flex-col items-center text-center h-full">
                <div className="aximo-icon-container mb-3">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-aximo-text">Invoicing</h3>
                <p className="text-sm text-aximo-text-secondary mt-2">Automated billing and payment tracking</p>
              </div>
            </Link>
            
            <Link to="/pipeline/dashboard" className="col-span-1">
              <div className="aximo-card flex flex-col items-center text-center h-full">
                <div className="aximo-icon-container mb-3">
                  <Database className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-aximo-text">Warehouse</h3>
                <p className="text-sm text-aximo-text-secondary mt-2">Digital twin warehouse orchestration</p>
              </div>
            </Link>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-2">
          <h2 className="aximo-headline">Operations Overview</h2>
          <Button variant="ghost" size="sm" asChild className="text-aximo-primary hover:text-aximo-light">
            <Link to="/jobs" className="flex items-center text-sm">
              View all jobs
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <ActionableMetricsSection jobsData={mockJobsData} financialData={mockFinancialData} />
        
        <ChartsSection 
          revenueData={revenueData} 
          consignmentsData={mockDeliveryPerformance}
        />
        
        <ComplianceAndAlertSection />
      </div>
    </MainLayout>
  );
}
