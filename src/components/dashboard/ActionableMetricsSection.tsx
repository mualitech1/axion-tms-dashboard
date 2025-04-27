
import { Link } from 'react-router-dom';
import { Package, AlertCircle, FileCheck, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import MetricsCard from './MetricsCard';

interface ActionableMetricsSectionProps {
  jobsData: {
    inTransit: number;
    requireAction: number;
    readyForInvoicing: number;
  };
  financialData: {
    monthlyRevenue: number;
    upcomingPayments: number;
    invoiceDisputes: {
      count: number;
      value: number;
    };
  };
}

export default function ActionableMetricsSection({ jobsData, financialData }: ActionableMetricsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 h-full">
      <Link to="/jobs?status=in-progress" className="transition-transform hover:scale-[1.02] h-full">
        <MetricsCard
          title="Jobs In Progress"
          value={jobsData.inTransit}
          change={{ value: 8.5, direction: "up", text: "vs last week" }}
          icon={<Package className="h-5 w-5 text-aximo-primary" />}
          accentColor="blue"
          className="h-full"
        />
      </Link>
      
      <Link to="/jobs?status=requires-action" className="transition-transform hover:scale-[1.02] h-full">
        <MetricsCard
          title="Jobs Requiring Action"
          value={jobsData.requireAction}
          change={{ value: 15, direction: "up", text: "from yesterday" }}
          icon={<AlertCircle className="h-5 w-5 text-amber-500" />}
          accentColor="amber"
          className="h-full"
        />
      </Link>
      
      <Link to="/jobs?status=finished" className="transition-transform hover:scale-[1.02] h-full">
        <MetricsCard
          title="Ready for Invoicing"
          value={jobsData.readyForInvoicing}
          icon={<FileCheck className="h-5 w-5 text-green-500" />}
          accentColor="green"
          className="h-full"
        />
      </Link>

      <Link to="/finance" className="transition-transform hover:scale-[1.02] h-full">
        <MetricsCard
          title="Monthly Revenue"
          value={`£${financialData.monthlyRevenue.toLocaleString()}`}
          change={{ value: 8.5, direction: "up", text: "vs last month" }}
          icon={<DollarSign className="h-5 w-5 text-aximo-primary" />}
          accentColor="blue"
          className="h-full"
        />
      </Link>
      
      <Link to="/finance/payment-runs" className="transition-transform hover:scale-[1.02] h-full">
        <MetricsCard
          title="Upcoming Carrier Payments"
          value={`£${financialData.upcomingPayments.toLocaleString()}`}
          icon={<Clock className="h-5 w-5 text-amber-500" />}
          accentColor="amber"
          className="h-full"
        />
      </Link>
      
      <Link to="/finance/dispute-management" className="transition-transform hover:scale-[1.02] h-full">
        <MetricsCard
          title="Invoice Disputes"
          value={financialData.invoiceDisputes.count}
          change={{ value: 12, direction: "down", text: `Worth £${financialData.invoiceDisputes.value.toLocaleString()}` }}
          icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
          accentColor="red"
          className="h-full"
        />
      </Link>
    </div>
  );
}
