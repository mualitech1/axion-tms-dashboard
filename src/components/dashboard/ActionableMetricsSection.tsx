
import { Link } from 'react-router-dom';
import { MetricsCard } from '@/components/ui/metrics-card';
import { TruckIcon, AlertCircle, FileCheck, DollarSign, AlertTriangle, Clock, ShieldAlert } from 'lucide-react';

interface JobsData {
  inTransit: number;
  requireAction: number;
  readyForInvoicing: number;
}

interface FinancialData {
  monthlyRevenue: number;
  upcomingPayments: number;
  invoiceDisputes: {
    count: number;
    value: number;
  };
  overdueInvoices: {
    count: number;
    value: number;
  };
}

interface ActionableMetricsSectionProps {
  jobsData: JobsData;
  financialData: FinancialData;
}

export default function ActionableMetricsSection({ jobsData, financialData }: ActionableMetricsSectionProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3 mb-6">
      {/* Jobs Status Cards */}
      <Link to="/jobs?status=in-transit" className="transition-transform hover:scale-[1.02]">
        <MetricsCard
          title="Jobs In Transit"
          value={jobsData.inTransit}
          description="Currently being transported"
          icon={<TruckIcon className="h-4 w-4" />}
          variant="primary"
        />
      </Link>
      
      <Link to="/jobs?status=requires-action" className="transition-transform hover:scale-[1.02]">
        <MetricsCard
          title="Jobs Requiring Action"
          value={jobsData.requireAction}
          description="Awaiting your input"
          icon={<AlertCircle className="h-4 w-4" />}
          variant="warning"
          change={{ value: 15, direction: "up", text: "from yesterday" }}
        />
      </Link>
      
      <Link to="/jobs?status=ready-for-invoicing" className="transition-transform hover:scale-[1.02]">
        <MetricsCard
          title="Ready for Invoicing"
          value={jobsData.readyForInvoicing}
          description="Jobs ready to be invoiced"
          icon={<FileCheck className="h-4 w-4" />}
          variant="success"
        />
      </Link>

      {/* Financial Status Cards */}
      <Link to="/finance" className="transition-transform hover:scale-[1.02]">
        <MetricsCard
          title="Monthly Revenue"
          value={`£${financialData.monthlyRevenue.toLocaleString()}`}
          description="This month"
          icon={<DollarSign className="h-4 w-4" />}
          variant="primary"
          change={{ value: 8.5, direction: "up", text: "vs last month" }}
        />
      </Link>
      
      <Link to="/finance/payment-runs" className="transition-transform hover:scale-[1.02]">
        <MetricsCard
          title="Upcoming Carrier Payments"
          value={`£${financialData.upcomingPayments.toLocaleString()}`}
          description="Next 7 days"
          icon={<Clock className="h-4 w-4" />}
          variant="warning"
        />
      </Link>
      
      <Link to="/finance/dispute-management" className="transition-transform hover:scale-[1.02]">
        <MetricsCard
          title="Invoice Disputes"
          value={financialData.invoiceDisputes.count}
          description={`Worth £${financialData.invoiceDisputes.value.toLocaleString()}`}
          icon={<AlertTriangle className="h-4 w-4" />}
          variant="danger"
        />
      </Link>
    </div>
  );
}
