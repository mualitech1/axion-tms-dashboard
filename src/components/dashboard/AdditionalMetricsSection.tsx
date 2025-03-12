
import DashboardCard from '@/components/dashboard/DashboardCard';
import TopCustomersCard from '@/components/dashboard/TopCustomersCard';
import DeliveryPerformanceCard from '@/components/dashboard/DeliveryPerformanceCard';
import RegionsCard from '@/components/dashboard/RegionsCard';

interface TopCustomer {
  id: number;
  name: string;
  revenue: number;
  growth: number;
}

interface AdditionalMetricsSectionProps {
  topCustomers: TopCustomer[];
}

export default function AdditionalMetricsSection({ topCustomers }: AdditionalMetricsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <TopCustomersCard customers={topCustomers} />
      <DeliveryPerformanceCard />
      <RegionsCard />
    </div>
  );
}
