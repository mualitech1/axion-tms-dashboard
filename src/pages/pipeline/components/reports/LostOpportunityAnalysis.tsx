
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Lead, LeadSource } from '../../data/pipelineTypes';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';

interface LostOpportunityAnalysisProps {
  data: Lead[];
}

// Loss reasons (would be from actual data in a real app)
const lossReasons = [
  { reason: 'Price', count: 12, value: 83000 },
  { reason: 'Competitor', count: 9, value: 67500 },
  { reason: 'Budget', count: 7, value: 42000 },
  { reason: 'Timing', count: 5, value: 35000 },
  { reason: 'Feature Gaps', count: 3, value: 28000 },
  { reason: 'Other', count: 2, value: 15000 },
];

// Loss by stage (would be from actual data in a real app)
const stageAnalysis = [
  { stage: 'Initial Contact', count: 8, value: 48000 },
  { stage: 'Discovery', count: 11, value: 92000 },
  { stage: 'Proposal Sent', count: 14, value: 105000 },
  { stage: 'Negotiation', count: 5, value: 26000 },
];

export default function LostOpportunityAnalysis({ data }: LostOpportunityAnalysisProps) {
  const [view, setView] = useState<'reasons' | 'stages' | 'sources'>('reasons');
  
  // Get lost leads
  const lostLeads = data.filter(lead => lead.stage === 'lost');
  
  // Aggregate lost leads by source
  const sourceData = Object.values(LeadSource).map(source => {
    const matchingLeads = lostLeads.filter(lead => lead.source === source);
    return {
      name: formatSourceName(source),
      count: matchingLeads.length,
      value: matchingLeads.reduce((sum, lead) => sum + lead.value, 0)
    };
  }).filter(item => item.count > 0);
  
  // Calculate total lost value
  const totalLostValue = lostLeads.reduce((sum, lead) => sum + lead.value, 0);
  const totalLostCount = lostLeads.length;
  
  // Colors for charts
  const COLORS = ['#f43f5e', '#f97316', '#eab308', '#3b82f6', '#6366f1', '#8b5cf6'];
  
  // Custom tooltip for pie chart
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-3 shadow-md">
          <p className="font-medium">{payload[0].name}</p>
          <p className="text-sm text-muted-foreground">
            Count: {payload[0].payload.count} ({((payload[0].payload.count / totalLostCount) * 100).toFixed(1)}%)
          </p>
          <p className="text-sm text-muted-foreground">
            Value: {formatCurrency(payload[0].payload.value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <div className="mb-6">
        <Tabs value={view} onValueChange={(v: any) => setView(v)}>
          <TabsList className="mb-4">
            <TabsTrigger value="reasons">Loss Reasons</TabsTrigger>
            <TabsTrigger value="stages">Loss by Stage</TabsTrigger>
            <TabsTrigger value="sources">Loss by Source</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Lost Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalLostCount}</div>
            <p className="text-sm text-muted-foreground">
              {((totalLostCount / data.length) * 100).toFixed(1)}% of all leads
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Lost Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(totalLostValue)}</div>
            <p className="text-sm text-muted-foreground">
              Average of {formatCurrency(totalLostValue / totalLostCount)} per opportunity
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Top Loss Reason</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{lossReasons[0].reason}</div>
            <p className="text-sm text-muted-foreground">
              {((lossReasons[0].count / totalLostCount) * 100).toFixed(1)}% of lost opportunities
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Loss Breakdown</CardTitle>
            <CardDescription>
              {view === 'reasons' 
                ? 'Why opportunities were lost' 
                : view === 'stages' 
                ? 'At which stage opportunities were lost'
                : 'Which sources had the highest loss rates'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={view === 'reasons' ? lossReasons : view === 'stages' ? stageAnalysis : sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey={view === 'sources' ? 'name' : view === 'stages' ? 'stage' : 'reason'}
                  >
                    {(view === 'reasons' ? lossReasons : view === 'stages' ? stageAnalysis : sourceData).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Loss Value by {view === 'reasons' ? 'Reason' : view === 'stages' ? 'Stage' : 'Source'}</CardTitle>
            <CardDescription>
              Total value of lost opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={view === 'reasons' ? lossReasons : view === 'stages' ? stageAnalysis : sourceData}
                  margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis
                    type="number"
                    tickFormatter={(value) => `£${value / 1000}k`}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    type="category"
                    dataKey={view === 'sources' ? 'name' : view === 'stages' ? 'stage' : 'reason'}
                    width={100}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value: number) => [formatCurrency(value), 'Value']}
                    labelFormatter={(label) => label}
                  />
                  <Bar dataKey="value" fill="#f43f5e" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recommended Actions</CardTitle>
          <CardDescription>Based on lost opportunity analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-red-500 h-2 w-2 mt-2"></div>
              <span>Review pricing strategy to address the top reason for lost opportunities</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-red-500 h-2 w-2 mt-2"></div>
              <span>Focus on improving conversion during the Proposal stage where most deals are lost</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="rounded-full bg-red-500 h-2 w-2 mt-2"></div>
              <span>Investigate why leads from Website source have the highest loss rate</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper function to format source names
function formatSourceName(source: string): string {
  return source
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
