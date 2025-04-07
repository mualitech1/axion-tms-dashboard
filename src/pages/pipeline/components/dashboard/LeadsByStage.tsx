
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export default function LeadsByStage() {
  const data = [
    { name: 'Website', value: 10, color: '#2563EB' },
    { name: 'Referral', value: 7, color: '#10B981' },
    { name: 'Cold Call', value: 5, color: '#F59E0B' },
    { name: 'Event', value: 6, color: '#6366F1' },
    { name: 'LinkedIn', value: 4, color: '#EC4899' },
    { name: 'Email Campaign', value: 3, color: '#6B7280' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Leads by Stage</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
