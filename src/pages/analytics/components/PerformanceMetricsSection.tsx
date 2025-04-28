
import React from 'react';
import { PerformanceMetricsCard } from './PerformanceMetricsCard';
import { TrendingUp, CreditCard, Truck, Package, Clock } from 'lucide-react';

interface PerformanceMetricsSectionProps {
  data: {
    revenue: {
      value: number;
      change: number;
      target: number;
      progress: number;
    };
    invoices: {
      value: number;
      change: number;
    };
    shipments: {
      value: number;
      progress: number;
      change: number;
    };
    onTimeDelivery: {
      value: number;
      change: number;
    };
  };
}

export function PerformanceMetricsSection({ data }: PerformanceMetricsSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <PerformanceMetricsCard
        title="Total Revenue"
        value={`$${data.revenue.value.toLocaleString()}`}
        target={data.revenue.target}
        progress={data.revenue.progress}
        change={{
          value: data.revenue.change,
          trend: data.revenue.change >= 0 ? 'up' : 'down'
        }}
        icon={<TrendingUp className="h-5 w-5 text-blue-600" />}
        color="default"
      />
      
      <PerformanceMetricsCard
        title="Invoices Paid"
        value={data.invoices.value}
        change={{
          value: data.invoices.change,
          trend: data.invoices.change >= 0 ? 'up' : 'down'
        }}
        icon={<CreditCard className="h-5 w-5 text-emerald-600" />}
        color="success"
      />
      
      <PerformanceMetricsCard
        title="Shipments Completed"
        value={data.shipments.value}
        progress={data.shipments.progress}
        change={{
          value: data.shipments.change,
          trend: data.shipments.change >= 0 ? 'up' : 'down'
        }}
        icon={<Truck className="h-5 w-5 text-amber-600" />}
        color="warning"
      />
      
      <PerformanceMetricsCard
        title="On-Time Delivery"
        value={data.onTimeDelivery.value}
        suffix="%"
        change={{
          value: data.onTimeDelivery.change,
          trend: data.onTimeDelivery.change >= 0 ? 'up' : 'down'
        }}
        icon={<Clock className="h-5 w-5 text-rose-600" />}
        color="danger"
      />
    </div>
  );
}
