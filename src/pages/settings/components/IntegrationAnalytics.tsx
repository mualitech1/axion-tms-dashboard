
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { integrationService, ApiUsageRecord, IntegrationConfig } from '@/services/integration-service';
import { toast } from '@/hooks/use-toast';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, Legend } from 'recharts';
import { Calendar as CalendarIcon, RefreshCw } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function IntegrationAnalytics() {
  const [integrations, setIntegrations] = useState<IntegrationConfig[]>([]);
  const [selectedIntegrationId, setSelectedIntegrationId] = useState<string>('');
  const [apiUsage, setApiUsage] = useState<ApiUsageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<{ start?: Date; end?: Date }>({
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
    end: new Date(),
  });
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Load integrations on component mount
  useEffect(() => {
    loadIntegrations();
  }, []);

  // Load API usage when selected integration changes
  useEffect(() => {
    if (selectedIntegrationId) {
      loadApiUsage();
    }
  }, [selectedIntegrationId, dateRange]);

  const loadIntegrations = async () => {
    setIsLoading(true);
    try {
      const data = await integrationService.getIntegrations();
      setIntegrations(data);
      
      // Set the first integration as selected if available
      if (data.length > 0 && data[0].id) {
        setSelectedIntegrationId(data[0].id);
      }
    } catch (error) {
      console.error('Failed to load integrations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load integrations. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadApiUsage = async () => {
    if (!selectedIntegrationId || !dateRange.start || !dateRange.end) return;
    
    setIsLoading(true);
    try {
      const data = await integrationService.getApiUsage(
        selectedIntegrationId,
        {
          start: dateRange.start.toISOString(),
          end: dateRange.end.toISOString(),
        }
      );
      setApiUsage(data);
    } catch (error) {
      console.error('Failed to load API usage:', error);
      toast({
        title: 'Error',
        description: 'Failed to load API usage data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const prepareChartData = () => {
    // Group API usage by day
    const dailyUsage: { [date: string]: { count: number; avgResponseTime: number; success: number; error: number } } = {};
    
    apiUsage.forEach(record => {
      const date = format(new Date(record.timestamp), 'MMM dd');
      if (!dailyUsage[date]) {
        dailyUsage[date] = {
          count: 0,
          avgResponseTime: 0,
          success: 0,
          error: 0,
        };
      }
      
      dailyUsage[date].count += 1;
      dailyUsage[date].avgResponseTime = 
        (dailyUsage[date].avgResponseTime * (dailyUsage[date].count - 1) + record.responseTime) / 
        dailyUsage[date].count;
      
      if (record.statusCode >= 200 && record.statusCode < 300) {
        dailyUsage[date].success += 1;
      } else {
        dailyUsage[date].error += 1;
      }
    });
    
    // Convert to array for Recharts
    return Object.entries(dailyUsage).map(([date, data]) => ({
      date,
      count: data.count,
      avgResponseTime: Math.round(data.avgResponseTime),
      success: data.success,
      error: data.error,
    }));
  };

  const prepareEndpointData = () => {
    const endpointUsage: { [endpoint: string]: { count: number; avgResponseTime: number } } = {};
    
    apiUsage.forEach(record => {
      // Extract endpoint path
      const url = new URL(record.endpoint);
      const path = url.pathname;
      
      if (!endpointUsage[path]) {
        endpointUsage[path] = {
          count: 0,
          avgResponseTime: 0,
        };
      }
      
      endpointUsage[path].count += 1;
      endpointUsage[path].avgResponseTime = 
        (endpointUsage[path].avgResponseTime * (endpointUsage[path].count - 1) + record.responseTime) / 
        endpointUsage[path].count;
    });
    
    return Object.entries(endpointUsage)
      .map(([endpoint, data]) => ({
        endpoint,
        count: data.count,
        avgResponseTime: Math.round(data.avgResponseTime),
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10); // Top 10 endpoints
  };

  const prepareStatusData = () => {
    const statusCounts: { [status: string]: number } = {};
    
    apiUsage.forEach(record => {
      const statusCategory = getStatusCategory(record.statusCode);
      
      if (!statusCounts[statusCategory]) {
        statusCounts[statusCategory] = 0;
      }
      
      statusCounts[statusCategory] += 1;
    });
    
    return Object.entries(statusCounts).map(([status, count]) => ({
      status,
      count,
    }));
  };

  const getStatusCategory = (statusCode: number): string => {
    if (statusCode < 200) return 'Informational';
    if (statusCode < 300) return 'Success';
    if (statusCode < 400) return 'Redirection';
    if (statusCode < 500) return 'Client Error';
    return 'Server Error';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Success': return '#10b981';
      case 'Client Error': return '#f97316';
      case 'Server Error': return '#ef4444';
      case 'Redirection': return '#3b82f6';
      default: return '#64748b';
    }
  };

  const calculateMetrics = () => {
    if (apiUsage.length === 0) return { total: 0, success: 0, error: 0, avgResponseTime: 0 };
    
    let success = 0;
    let totalResponseTime = 0;
    
    apiUsage.forEach(record => {
      totalResponseTime += record.responseTime;
      if (record.statusCode >= 200 && record.statusCode < 300) {
        success += 1;
      }
    });
    
    return {
      total: apiUsage.length,
      success,
      error: apiUsage.length - success,
      avgResponseTime: Math.round(totalResponseTime / apiUsage.length),
    };
  };

  const metrics = calculateMetrics();
  const chartData = prepareChartData();
  const endpointData = prepareEndpointData();
  const statusData = prepareStatusData();

  const dateRangeText = dateRange.start && dateRange.end
    ? `${format(dateRange.start, 'MMM dd, yyyy')} - ${format(dateRange.end, 'MMM dd, yyyy')}`
    : 'Select date range';

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Integration Analytics</h3>
          <p className="text-sm text-muted-foreground">
            Monitor API usage and performance metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadApiUsage}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div className="w-full md:w-1/3">
          <Select 
            value={selectedIntegrationId} 
            onValueChange={setSelectedIntegrationId}
            disabled={integrations.length === 0}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an integration" />
            </SelectTrigger>
            <SelectContent>
              {integrations.map((integration) => (
                <SelectItem key={integration.id} value={integration.id || ''}>
                  {integration.name} ({integration.provider})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full md:w-auto justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRangeText}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.start}
              selected={{
                from: dateRange.start,
                to: dateRange.end,
              }}
              onSelect={(range) => {
                setDateRange({
                  start: range?.from,
                  end: range?.to,
                });
                if (range?.from && range?.to) {
                  setCalendarOpen(false);
                }
              }}
            />
          </PopoverContent>
        </Popover>
      </div>

      {selectedIntegrationId ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Total API Calls</CardTitle>
                <CardDescription>During selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{metrics.total.toLocaleString()}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Successful Calls</CardTitle>
                <CardDescription>200-299 status codes</CardDescription>
              </CardHeader>
              <CardContent className="flex items-baseline">
                <p className="text-2xl font-bold text-green-600">{metrics.success.toLocaleString()}</p>
                {metrics.total > 0 && (
                  <p className="text-sm text-muted-foreground ml-2">
                    ({Math.round((metrics.success / metrics.total) * 100)}%)
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Failed Calls</CardTitle>
                <CardDescription>400+ status codes</CardDescription>
              </CardHeader>
              <CardContent className="flex items-baseline">
                <p className="text-2xl font-bold text-red-500">{metrics.error.toLocaleString()}</p>
                {metrics.total > 0 && (
                  <p className="text-sm text-muted-foreground ml-2">
                    ({Math.round((metrics.error / metrics.total) * 100)}%)
                  </p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Avg Response Time</CardTitle>
                <CardDescription>In milliseconds</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{metrics.avgResponseTime} ms</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="usage" className="space-y-4">
            <TabsList>
              <TabsTrigger value="usage">Usage Over Time</TabsTrigger>
              <TabsTrigger value="endpoints">Top Endpoints</TabsTrigger>
              <TabsTrigger value="status">Status Codes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="usage" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>API Calls Over Time</CardTitle>
                  <CardDescription>Daily API usage during selected period</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area type="monotone" dataKey="success" stackId="1" stroke="#10b981" fill="#10b981" name="Successful Calls" />
                          <Area type="monotone" dataKey="error" stackId="1" stroke="#ef4444" fill="#ef4444" name="Failed Calls" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">No data available for the selected period</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Response Time Trend</CardTitle>
                  <CardDescription>Average response time in milliseconds</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    {chartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={chartData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="avgResponseTime" stroke="#3b82f6" fill="#3b82f6" name="Avg Response Time (ms)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">No data available for the selected period</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="endpoints">
              <Card>
                <CardHeader>
                  <CardTitle>Top Endpoints</CardTitle>
                  <CardDescription>Most frequently called API endpoints</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    {endpointData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={endpointData}
                          layout="vertical"
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="endpoint" type="category" width={150} tick={{ fontSize: 12 }} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="count" fill="#3b82f6" name="Number of Calls" />
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">No data available for the selected period</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="status">
              <Card>
                <CardHeader>
                  <CardTitle>Status Code Distribution</CardTitle>
                  <CardDescription>Breakdown of API responses by status code category</CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="h-[300px]">
                    {statusData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={statusData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="status" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" name="Number of Calls">
                            {statusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={getStatusColor(entry.status)} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-muted-foreground">No data available for the selected period</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                {integrations.length === 0
                  ? 'No integrations configured yet. Add an integration to view analytics.'
                  : 'Select an integration to view its analytics.'
                }
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
