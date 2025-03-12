
import MainLayout from '@/components/layout/MainLayout';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import KeyMetricsSection from '@/components/dashboard/KeyMetricsSection';
import ChartsSection from '@/components/dashboard/ChartsSection';
import AdditionalMetricsSection from '@/components/dashboard/AdditionalMetricsSection';

// Mock data - moved to separate files
import { revenueData, consignmentsData } from '@/data/chartData';
import { topCustomers } from '@/data/customerData';

export default function Index() {
  return (
    <MainLayout title="Dashboard">
      <div className="animate-fade-in">
        <DashboardHeader 
          title="Welcome back, Kamal"
          subtitle="Here's what's happening with your transport operations today."
        />
        
        <KeyMetricsSection />
        
        <ChartsSection 
          revenueData={revenueData} 
          consignmentsData={consignmentsData} 
        />
        
        <AdditionalMetricsSection 
          topCustomers={topCustomers} 
        />
      </div>
    </MainLayout>
  );
}
