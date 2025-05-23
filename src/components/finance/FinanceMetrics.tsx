import { MetricsCard } from "@/components/ui/metrics-card";
import { Zap, Atom, Sparkles } from "lucide-react";

export function FinanceMetrics() {
  return (
    <div className="grid gap-6 md:grid-cols-3 mb-6">
      <MetricsCard
        title="Total Quantum Flux"
        value="£146,350"
        icon={<Zap className="h-5 w-5 text-aximo-primary" />}
        change={{ value: 12.5, direction: "up", text: "from previous cycle" }}
        variant="primary"
        className="bg-gradient-to-br from-aximo-darker to-aximo-darker/80 border border-aximo-border text-aximo-text"
      />
      
      <MetricsCard
        title="Pending Entanglements"
        value="£25,550"
        icon={<Atom className="h-5 w-5 text-amber-400" />}
        description="3 unprocessed quantum transactions"
        variant="warning"
        className="bg-gradient-to-br from-aximo-darker to-aximo-darker/80 border border-aximo-border text-aximo-text"
      />
      
      <MetricsCard
        title="Energy Expenditure"
        value="£42,800"
        icon={<Sparkles className="h-5 w-5 text-red-400" />}
        change={{ value: 8.3, direction: "down", text: "from previous cycle" }}
        variant="danger"
        className="bg-gradient-to-br from-aximo-darker to-aximo-darker/80 border border-aximo-border text-aximo-text"
      />
    </div>
  );
}
