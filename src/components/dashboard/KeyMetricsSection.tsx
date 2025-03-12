
import { Package, Truck, DollarSign, CreditCard } from 'lucide-react';
import MetricsCard from '@/components/dashboard/MetricsCard';

export default function KeyMetricsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricsCard
        title="Total Consignments"
        value="1,842"
        change={{ value: 12.5, direction: "up", text: "vs last month" }}
        icon={<Package className="h-5 w-5 text-tms-blue" />}
      />
      
      <MetricsCard
        title="Active Carriers"
        value="124"
        change={{ value: 4.2, direction: "up", text: "vs last month" }}
        icon={<Truck className="h-5 w-5 text-tms-blue" />}
      />
      
      <MetricsCard
        title="Monthly Revenue"
        value="£684,235"
        change={{ value: 8.7, direction: "up", text: "vs last month" }}
        icon={<DollarSign className="h-5 w-5 text-tms-blue" />}
      />
      
      <MetricsCard
        title="Pending Invoices"
        value="£42,890"
        change={{ value: 3.5, direction: "down", text: "vs last month" }}
        icon={<CreditCard className="h-5 w-5 text-tms-blue" />}
      />
    </div>
  );
}
