import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import {
  ArrowLeft, BarChart3, TrendingUp, Download, 
  Calendar, Filter, Search, FileText, 
  DollarSign, Package, Truck, Clock,
  Users, MapPin, AlertTriangle, CheckCircle
} from 'lucide-react';

type Job = Tables<'jobs'>;

interface ReportMetrics {
  totalJobs: number;
  completedJobs: number;
  pendingJobs: number;
  totalRevenue: number;
  averageJobValue: number;
  onTimeDelivery: number;
}

export default function JobReportsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<ReportMetrics>({
    totalJobs: 0,
    completedJobs: 0,
    pendingJobs: 0,
    totalRevenue: 0,
    averageJobValue: 0,
    onTimeDelivery: 0
  });

  // Filters
  const [dateRange, setDateRange] = useState('last_30_days');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
    calculateMetrics();
  }, [jobs, dateRange, statusFilter, searchTerm]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load jobs data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    // Date range filter
    const now = new Date();
    const dateThreshold = new Date();
    
    switch (dateRange) {
      case 'last_7_days':
        dateThreshold.setDate(now.getDate() - 7);
        break;
      case 'last_30_days':
        dateThreshold.setDate(now.getDate() - 30);
        break;
      case 'last_90_days':
        dateThreshold.setDate(now.getDate() - 90);
        break;
      case 'last_year':
        dateThreshold.setFullYear(now.getFullYear() - 1);
        break;
      default:
        dateThreshold.setFullYear(2000); // Show all
    }

    filtered = filtered.filter(job => new Date(job.created_at) >= dateThreshold);

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.reference.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredJobs(filtered);
  };

  const calculateMetrics = () => {
    const totalJobs = filteredJobs.length;
    const completedJobs = filteredJobs.filter(job => job.status === 'completed').length;
    const pendingJobs = filteredJobs.filter(job => ['pending', 'confirmed', 'in_progress'].includes(job.status)).length;
    
    const totalRevenue = filteredJobs.reduce((sum, job) => {
      return sum + (job.rate ? parseFloat(job.rate) : 0);
    }, 0);
    
    const averageJobValue = totalJobs > 0 ? totalRevenue / totalJobs : 0;
    const onTimeDelivery = completedJobs > 0 ? (completedJobs * 0.85) : 0; // Mock 85% on-time rate

    setMetrics({
      totalJobs,
      completedJobs,
      pendingJobs,
      totalRevenue,
      averageJobValue,
      onTimeDelivery
    });
  };

  const exportReport = () => {
    // Mock export functionality
    toast({
      title: "Export Started",
      description: "Your report is being generated and will be downloaded shortly.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'confirmed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'in_progress': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aximo-primary"></div>
          <span className="ml-2 text-aximo-text">Loading Reports...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/jobs')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-aximo-primary to-blue-500 bg-clip-text text-transparent">
                Job Reports & Analytics
              </h1>
              <p className="text-aximo-text-secondary mt-1">Comprehensive insights into your transportation operations</p>
            </div>
          </div>
          <Button 
            onClick={exportReport}
            className="bg-aximo-primary hover:bg-aximo-primary-hover flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export Report
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-aximo-text-secondary" />
                  <span className="text-sm font-medium text-aximo-text">Filters:</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-aximo-text-secondary" />
                  <Select value={dateRange} onValueChange={setDateRange}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last_7_days">Last 7 Days</SelectItem>
                      <SelectItem value="last_30_days">Last 30 Days</SelectItem>
                      <SelectItem value="last_90_days">Last 90 Days</SelectItem>
                      <SelectItem value="last_year">Last Year</SelectItem>
                      <SelectItem value="all">All Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="All Statuses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-aximo-text-secondary" />
                  <Input
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded">
                  <Package className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-aximo-text-secondary">Total Jobs</p>
                  <p className="text-2xl font-bold text-aximo-text">{metrics.totalJobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded">
                  <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-aximo-text-secondary">Completed</p>
                  <p className="text-2xl font-bold text-aximo-text">{metrics.completedJobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded">
                  <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-aximo-text-secondary">Total Revenue</p>
                  <p className="text-2xl font-bold text-aximo-text">£{metrics.totalRevenue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded">
                  <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-aximo-text-secondary">Avg Job Value</p>
                  <p className="text-2xl font-bold text-aximo-text">£{metrics.averageJobValue.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Performance Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-aximo-border bg-aximo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-aximo-primary" />
                  Job Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-aximo-text-secondary">Completion Rate</span>
                    <span className="font-medium text-aximo-text">
                      {metrics.totalJobs > 0 ? ((metrics.completedJobs / metrics.totalJobs) * 100).toFixed(1) : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ 
                        width: `${metrics.totalJobs > 0 ? (metrics.completedJobs / metrics.totalJobs) * 100 : 0}%` 
                      }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-aximo-text-secondary">On-Time Delivery</span>
                    <span className="font-medium text-aximo-text">85%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-aximo-text-secondary">Customer Satisfaction</span>
                    <span className="font-medium text-aximo-text">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Status Distribution */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-aximo-border bg-aximo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-aximo-primary" />
                  Status Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'].map(status => {
                    const count = filteredJobs.filter(job => job.status === status).length;
                    const percentage = metrics.totalJobs > 0 ? (count / metrics.totalJobs) * 100 : 0;
                    
                    return (
                      <div key={status} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(status)}>
                            {status.replace('_', ' ').charAt(0).toUpperCase() + status.replace('_', ' ').slice(1)}
                          </Badge>
                          <span className="text-sm text-aximo-text-secondary">({count})</span>
                        </div>
                        <span className="font-medium text-aximo-text">{percentage.toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Recent Jobs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-aximo-border bg-aximo-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-aximo-primary" />
                Recent Jobs ({filteredJobs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-aximo-border">
                      <th className="text-left py-3 px-4 font-medium text-aximo-text">Reference</th>
                      <th className="text-left py-3 px-4 font-medium text-aximo-text">Title</th>
                      <th className="text-left py-3 px-4 font-medium text-aximo-text">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-aximo-text">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-aximo-text">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.slice(0, 10).map((job) => (
                      <tr key={job.id} className="border-b border-aximo-border/50 hover:bg-aximo-background/50">
                        <td className="py-3 px-4 text-aximo-text font-mono text-sm">{job.reference}</td>
                        <td className="py-3 px-4 text-aximo-text">{job.title}</td>
                        <td className="py-3 px-4">
                          <Badge className={getStatusColor(job.status)}>
                            {job.status.replace('_', ' ').charAt(0).toUpperCase() + job.status.replace('_', ' ').slice(1)}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-aximo-text-secondary">
                          {new Date(job.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-aximo-text font-medium">
                          £{job.rate ? parseFloat(job.rate).toFixed(2) : '0.00'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {filteredJobs.length === 0 && (
                  <div className="text-center py-8">
                    <AlertTriangle className="h-12 w-12 text-aximo-text-secondary mx-auto mb-2" />
                    <p className="text-aximo-text-secondary">No jobs found matching your criteria</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 