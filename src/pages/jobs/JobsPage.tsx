import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { 
  Plus, 
  Search, 
  Filter, 
  Truck, 
  MapPin, 
  Calendar, 
  Package, 
  User, 
  Clock,
  Eye,
  Edit,
  Trash2,
  RefreshCw,
  Download,
  MoreHorizontal,
  FileText,
  BarChart
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { motion } from 'framer-motion';

type Job = Tables<'jobs'> & {
  customer?: {
    name: string;
    email: string;
  };
};

const priorityColors = {
  low: 'bg-gray-100 text-gray-800',
  medium: 'bg-blue-100 text-blue-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  in_progress: 'bg-purple-100 text-purple-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function JobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, statusFilter, priorityFilter, dateFilter]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          customer:companies!jobs_customer_id_fkey (
            name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error loading jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load jobs",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const filterJobs = () => {
    let filtered = [...jobs];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.reference.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.customer?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (typeof job.pickup_location === 'object' && job.pickup_location?.city?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (typeof job.delivery_location === 'object' && job.delivery_location?.city?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
    }

    // Priority filter
    if (priorityFilter !== 'all') {
      filtered = filtered.filter(job => job.priority === priorityFilter);
    }

    // Date filter
    if (dateFilter !== 'all') {
      const today = new Date();
      const todayStr = today.toISOString().split('T')[0];
      
      switch (dateFilter) {
        case 'today':
          filtered = filtered.filter(job => 
            job.pickup_date === todayStr
          );
          break;
        case 'this_week': {
          const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
          filtered = filtered.filter(job => 
            new Date(job.pickup_date) <= weekFromNow
          );
          break;
        }
        case 'overdue':
          filtered = filtered.filter(job => 
            new Date(job.pickup_date) < today && job.status !== 'completed'
          );
          break;
      }
    }

    setFilteredJobs(filtered);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job deleted successfully",
      });

      loadJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive"
      });
    }
  };

  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Job status updated successfully",
      });

      loadJobs();
    } catch (error) {
      console.error('Error updating job status:', error);
      toast({
        title: "Error",
        description: "Failed to update job status",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatAddress = (location: Record<string, unknown> | string | null) => {
    if (typeof location === 'string') return location;
    if (typeof location === 'object' && location) {
      const loc = location as Record<string, string>;
      return `${loc.city || ''}, ${loc.postcode || ''}`.trim().replace(/^,\s*|,\s*$/g, '');
    }
    return 'Unknown location';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aximo-primary"></div>
          <span className="ml-2 text-aximo-text">Loading Quantum Jobs Matrix...</span>
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
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-aximo-primary to-blue-500 bg-clip-text text-transparent">
              Jobs Management
            </h1>
            <p className="text-aximo-text-secondary mt-2">
              Manage and track all transport jobs across the quantum logistics network
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/jobs/schedule')}
              className="flex items-center gap-2"
            >
              <Calendar className="h-4 w-4" />
              Schedule
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/jobs/reports')}
              className="flex items-center gap-2"
            >
              <BarChart className="h-4 w-4" />
              Reports
            </Button>
            <Button
              variant="outline"
              onClick={loadJobs}
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button
              onClick={() => navigate('/jobs/create')}
              className="bg-aximo-primary hover:bg-aximo-primary-hover flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Create Job
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { title: 'Total Jobs', value: jobs.length, icon: Package, color: 'blue' },
            { title: 'Pending', value: jobs.filter(job => job.status === 'pending').length, icon: Clock, color: 'yellow' },
            { title: 'In Progress', value: jobs.filter(job => job.status === 'in_progress').length, icon: Truck, color: 'purple' },
            { title: 'Completed', value: jobs.filter(job => job.status === 'completed').length, icon: Package, color: 'green' }
          ].map((stat, index) => (
            <Card key={index} className="border-aximo-border bg-aximo-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-aximo-text-secondary">{stat.title}</p>
                    <p className="text-2xl font-bold text-aximo-text">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${
                    stat.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                    stat.color === 'yellow' ? 'bg-yellow-100 dark:bg-yellow-900' :
                    stat.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' : 'bg-green-100 dark:bg-green-900'
                  }`}>
                    <stat.icon className={`h-6 w-6 ${
                      stat.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                      stat.color === 'yellow' ? 'text-yellow-600 dark:text-yellow-400' :
                      stat.color === 'purple' ? 'text-purple-600 dark:text-purple-400' : 'text-green-600 dark:text-green-400'
                    }`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <InputWithIcon
                    icon={Search}
                    placeholder="Search jobs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-aximo-background border-aximo-border"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="bg-aximo-background border-aximo-border">
                    <SelectValue placeholder="Filter by status" />
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

                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="bg-aximo-background border-aximo-border">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={dateFilter} onValueChange={setDateFilter}>
                  <SelectTrigger className="bg-aximo-background border-aximo-border">
                    <SelectValue placeholder="Filter by date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Dates</SelectItem>
                    <SelectItem value="today">Today</SelectItem>
                    <SelectItem value="this_week">This Week</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setStatusFilter('all');
                    setPriorityFilter('all');
                    setDateFilter('all');
                  }}
                  className="flex items-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Jobs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-aximo-border bg-aximo-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5 text-aximo-primary" />
                Jobs ({filteredJobs.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-aximo-text-secondary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-aximo-text mb-2">No jobs found</h3>
                  <p className="text-aximo-text-secondary mb-4">
                    {jobs.length === 0 
                      ? "Get started by creating your first job"
                      : "Try adjusting your filters or search terms"
                    }
                  </p>
                  {jobs.length === 0 && (
                    <Button onClick={() => navigate('/jobs/create')} className="bg-aximo-primary hover:bg-aximo-primary-hover">
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Job
                    </Button>
                  )}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Job Details</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Route</TableHead>
                        <TableHead>Dates</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                        <TableRow key={job.id} className="hover:bg-aximo-card-hover">
                          <TableCell>
                            <div>
                              <p className="font-medium text-aximo-text">{job.title}</p>
                              <p className="text-sm text-aximo-text-secondary truncate max-w-xs">
                                {job.reference}
                              </p>
                              <div className="flex gap-1 mt-1">
                                {job.pod_uploaded && (
                                  <Badge variant="outline" className="text-xs">POD</Badge>
                                )}
                                {job.issue_details && (
                                  <Badge variant="outline" className="text-xs">Issues</Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div>
                              <p className="font-medium text-aximo-text">{job.customer?.name || 'Unknown'}</p>
                              <p className="text-sm text-aximo-text-secondary">{job.customer?.email || ''}</p>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3 text-green-600" />
                                {formatAddress(job.pickup_location)}
                              </div>
                              <div className="flex items-center gap-1 text-sm">
                                <MapPin className="h-3 w-3 text-red-600" />
                                {formatAddress(job.delivery_location)}
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1 text-sm">
                                <Calendar className="h-3 w-3" />
                                Pickup: {formatDate(job.pickup_date)}
                              </div>
                            </div>
                          </TableCell>
                          
                          <TableCell>
                            <Badge className={priorityColors[job.priority || 'medium']}>
                              {job.priority ? (job.priority.charAt(0).toUpperCase() + job.priority.slice(1)) : 'Medium'}
                            </Badge>
                          </TableCell>
                          
                          <TableCell>
                            <Select
                              value={job.status || 'pending'}
                              onValueChange={(value) => handleStatusChange(job.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <Badge className={statusColors[(job.status || 'pending') as keyof typeof statusColors]}>
                                  {job.status ? (job.status.replace('_', ' ').charAt(0).toUpperCase() + job.status.replace('_', ' ').slice(1)) : 'Pending'}
                                </Badge>
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate(`/jobs/details/${job.id}`)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate(`/jobs/tracking/${job.id}`)}>
                                  <Truck className="h-4 w-4 mr-2" />
                                  Track Job
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate(`/jobs/edit/${job.id}`)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Job
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteJob(job.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete Job
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
