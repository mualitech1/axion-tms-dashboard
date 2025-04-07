
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Lead, LeadSource } from '../../data/pipelineTypes';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { formatCurrency } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

interface LeadSourceAnalysisProps {
  data: Lead[];
}

export default function LeadSourceAnalysis({ data }: LeadSourceAnalysisProps) {
  // Prepare data by source
  const sourceData = Object.values(LeadSource).map(source => {
    const sourceLeads = data.filter(lead => lead.source === source);
    const totalLeads = sourceLeads.length;
    const totalValue = sourceLeads.reduce((sum, lead) => sum + lead.value, 0);
    const wonLeads = sourceLeads.filter(lead => lead.stage === 'won').length;
    const wonValue = sourceLeads
      .filter(lead => lead.stage === 'won')
      .reduce((sum, lead) => sum + lead.value, 0);
    const conversionRate = totalLeads > 0 ? (wonLeads / totalLeads) * 100 : 0;
    
    return {
      name: formatSourceName(source),
      value: totalValue,
      count: totalLeads,
      won: wonLeads,
      wonValue,
      conversionRate,
      avgDeal: totalLeads > 0 ? totalValue / totalLeads : 0
    };
  }).filter(item => item.count > 0);
  
  // Sort by value for better visualization
  const sortedSourceData = [...sourceData].sort((a, b) => b.value - a.value);
  
  // Generate data for pie chart
  const pieData = sortedSourceData.map(item => ({
    name: item.name,
    value: item.count
  }));
  
  // Colors for charts
  const COLORS = ['#3b82f6', '#10b981', '#6366f1', '#f97316', '#8b5cf6', '#ec4899', '#64748b'];
  
  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded p-3 shadow-md">
          <p className="font-medium">{label || payload[0].name}</p>
          {payload[0].payload.count !== undefined && (
            <p className="text-sm text-muted-foreground">
              Leads: {payload[0].payload.count}
            </p>
          )}
          {payload[0].payload.value !== undefined && (
            <p className="text-sm text-muted-foreground">
              Value: {formatCurrency(payload[0].payload.value)}
            </p>
          )}
          {payload[0].payload.conversionRate !== undefined && (
            <p className="text-sm text-muted-foreground">
              Conversion: {payload[0].payload.conversionRate.toFixed(1)}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Tabs defaultValue="value" className="space-y-6">
        <TabsList>
          <TabsTrigger value="value">Value by Source</TabsTrigger>
          <TabsTrigger value="count">Lead Count</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Rate</TabsTrigger>
        </TabsList>
        
        <TabsContent value="value" className="pt-2">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedSourceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis
                  tickFormatter={(value) => `£${value / 1000}k`}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="value"
                  fill="#3b82f6"
                  radius={[4, 4, 0, 0]}
                >
                  {sortedSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <Separator className="my-6" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-lg font-medium mb-4">Best Performing Source</div>
                {sortedSourceData.length > 0 && (
                  <div>
                    <div className="text-2xl font-bold">{sortedSourceData[0].name}</div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Total Value</div>
                        <div className="text-xl font-bold">{formatCurrency(sortedSourceData[0].value)}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Lead Count</div>
                        <div className="text-xl font-bold">{sortedSourceData[0].count}</div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Avg. Deal Size</div>
                        <div className="text-xl font-bold">
                          {formatCurrency(sortedSourceData[0].avgDeal)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Conversion Rate</div>
                        <div className="text-xl font-bold">
                          {sortedSourceData[0].conversionRate.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="text-lg font-medium mb-4">Source Distribution</div>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
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
          </div>
        </TabsContent>
        
        <TabsContent value="count">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedSourceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="count"
                  fill="#10b981"
                  radius={[4, 4, 0, 0]}
                >
                  {sortedSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        
        <TabsContent value="conversion">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedSourceData}
                margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis 
                  tickFormatter={(value) => `${value}%`}
                  tick={{ fontSize: 12 }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar
                  dataKey="conversionRate"
                  fill="#6366f1"
                  radius={[4, 4, 0, 0]}
                >
                  {sortedSourceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </Tabs>
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
