import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Sparkles, Zap, Network, Activity } from 'lucide-react';

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
        <Card className="bg-aximo-darker border-aximo-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-aximo-text-secondary flex items-center">
              <Zap className="h-4 w-4 mr-2 text-aximo-primary" />
              Total Quantum Flux
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-aximo-text">$245,680</div>
            <div className="text-xs text-aximo-text-secondary">+18.5% from previous cycle</div>
          </CardContent>
        </Card>
        <Card className="bg-aximo-darker border-aximo-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-aximo-text-secondary flex items-center">
              <Network className="h-4 w-4 mr-2 text-green-400" />
              Completed Transmissions
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-aximo-text">324</div>
            <div className="text-xs text-aximo-text-secondary">+5.2% from previous cycle</div>
          </CardContent>
        </Card>
        <Card className="bg-aximo-darker border-aximo-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-aximo-text-secondary flex items-center">
              <Activity className="h-4 w-4 mr-2 text-blue-400" />
              Active Entities
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-aximo-text">48</div>
            <div className="text-xs text-aximo-text-secondary">+2 new this cycle</div>
          </CardContent>
        </Card>
        <Card className="bg-aximo-darker border-aximo-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div className="text-sm font-medium text-aximo-text-secondary flex items-center">
              <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
              Temporal Precision
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-aximo-text">94.7%</div>
            <div className="text-xs text-aximo-text-secondary">+2.1% from previous cycle</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-aximo-darker border-aximo-border">
          <CardHeader>
            <CardTitle className="text-aximo-text">Quantum Flux Patterns</CardTitle>
            <CardDescription className="text-aximo-text-secondary">Temporal energy distribution</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#6E7191" />
                <YAxis stroke="#6E7191" />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Energy Flux']}
                  contentStyle={{
                    backgroundColor: '#1C1D35',
                    border: '1px solid #2D2D3A',
                    borderRadius: '4px',
                    color: '#E5E7EB'
                  }}
                  itemStyle={{color: '#E5E7EB'}}
                  labelStyle={{color: '#E5E7EB'}}
                />
                <Line type="monotone" dataKey="revenue" stroke="#5D5FEF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-aximo-darker border-aximo-border">
          <CardHeader>
            <CardTitle className="text-aximo-text">Spatial Operations</CardTitle>
            <CardDescription className="text-aximo-text-secondary">Processed vs. pending transmissions</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={shipmentData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="name" stroke="#6E7191" />
                <YAxis stroke="#6E7191" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1C1D35',
                    border: '1px solid #2D2D3A',
                    borderRadius: '4px',
                    color: '#E5E7EB'
                  }}
                  itemStyle={{color: '#E5E7EB'}}
                  labelStyle={{color: '#E5E7EB'}}
                />
                <Bar dataKey="completed" fill="#10b981" name="Processed" />
                <Bar dataKey="pending" fill="#f59e0b" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
