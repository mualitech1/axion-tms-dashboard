
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const revenueData = [
  { name: 'Jan', revenue: 18500 },
  { name: 'Feb', revenue: 22400 },
  { name: 'Mar', revenue: 21300 },
  { name: 'Apr', revenue: 24200 },
  { name: 'May', revenue: 27800 },
  { name: 'Jun', revenue: 32400 }
];

const shipmentData = [
  { name: 'Jan', completed: 86, pending: 12 },
  { name: 'Feb', completed: 92, pending: 8 },
  { name: 'Mar', completed: 104, pending: 10 },
  { name: 'Apr', completed: 98, pending: 14 },
  { name: 'May', completed: 112, pending: 9 },
  { name: 'Jun', completed: 128, pending: 11 }
];

export function OverviewTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-muted-foreground">Total Revenue</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$245,680</div>
            <div className="text-xs text-muted-foreground">+18.5% from last period</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-muted-foreground">Completed Shipments</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">324</div>
            <div className="text-xs text-muted-foreground">+5.2% from last period</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-muted-foreground">Active Customers</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <div className="text-xs text-muted-foreground">+2 new this period</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-muted-foreground">On-Time Delivery</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94.7%</div>
            <div className="text-xs text-muted-foreground">+2.1% from last period</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue trends</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Shipments</CardTitle>
            <CardDescription>Completed vs. pending shipments</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shipmentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
                <Bar dataKey="completed" fill="#10b981" name="Completed" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
