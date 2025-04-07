
import React from 'react';
import { Users, CreditCard, BarChart2, ArrowUpRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function MetricsCards() {
  const metrics = [
    {
      title: 'Total Leads',
      value: '32',
      change: '+8% from last month',
      trend: 'up',
      icon: <Users className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: 'Pipeline Value',
      value: '£128,400',
      change: '+14.3% from last month',
      trend: 'up',
      icon: <CreditCard className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: 'Conversion Rate',
      value: '24.3%',
      change: '+3.1% from last month',
      trend: 'up',
      icon: <BarChart2 className="h-4 w-4 text-muted-foreground" />
    },
    {
      title: 'Avg. Deal Size',
      value: '£8,450',
      change: '-2.5% from last month',
      trend: 'down',
      icon: <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm text-muted-foreground">{metric.title}</p>
              {metric.icon}
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-bold">{metric.value}</h3>
              <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
