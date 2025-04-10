
import { MetricsCard } from "@/components/ui/metrics-card";
import { DollarSign } from "lucide-react";

export function FinanceMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-3 mb-6">
      <MetricsCard
        title="Total Revenue"
        value="$146,350"
        icon={<DollarSign className="h-5 w-5" />}
        change={{ value: 12.5, direction: "up", text: "from previous month" }}
        variant="primary"
      />
      
      <MetricsCard
        title="Outstanding Payments"
        value="$25,550"
        icon={<DollarSign className="h-5 w-5" />}
        description="3 pending invoices"
        variant="warning"
      />
      
      <MetricsCard
        title="Monthly Expenses"
        value="$42,800"
        icon={<DollarSign className="h-5 w-5" />}
        change={{ value: 8.3, direction: "down", text: "from previous month" }}
        variant="danger"
      />
    </div>
  );
}
