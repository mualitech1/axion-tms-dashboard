
import React from 'react';
import { MetricsCard } from '@/components/ui/metrics-card';
import { DollarSign, Users, ArrowUpRight, ShoppingCart } from 'lucide-react';

export default function MetricsCardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricsCard
        title="Total Revenue"
        value="$45,231.89"
        description="Monthly revenue"
        icon={<DollarSign className="h-4 w-4" />}
        change={{ value: 20.1, direction: "up", text: "from last month" }}
        variant="primary"
      />
      
      <MetricsCard
        title="Active Users"
        value="2,543"
        description="Active users"
        icon={<Users className="h-4 w-4" />}
        change={{ value: 5.2, direction: "up", text: "from last week" }}
        variant="success"
      />
      
      <MetricsCard
        title="Sales"
        value="12,234"
        description="Total sales"
        icon={<ShoppingCart className="h-4 w-4" />}
        change={{ value: 2.3, direction: "down", text: "from yesterday" }}
        variant="warning"
      />
      
      <MetricsCard
        title="Conversion Rate"
        value="15.3%"
        description="From all visits"
        icon={<ArrowUpRight className="h-4 w-4" />}
        change={{ value: 1.1, direction: "neutral", text: "no change" }}
        variant="danger"
      />
    </div>
  );
}
