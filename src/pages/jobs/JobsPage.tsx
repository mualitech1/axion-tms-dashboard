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
  BarChart,
  Building2
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
    company_name: string;
    finance_contact: {
      name?: string;
      email?: string;
    };
  };
};

interface AddressType {
  company_name?: string;
  contact_name?: string;
  street?: string;
  city?: string;
  postcode?: string;
  country?: string;
  special_instructions?: string;
  ref_number_if_any?: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  allocated: 'bg-purple-100 text-purple-800',
  in_transit: 'bg-orange-100 text-orange-800',
  at_collection: 'bg-cyan-100 text-cyan-800',
  at_delivery: 'bg-indigo-100 text-indigo-800',
  completed: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
  disputed: 'bg-gray-100 text-gray-800',
};

export default function JobsPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchTerm, statusFilter]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          customer:customers!jobs_customer_id_fkey (
            company_name,
            finance_contact
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data as Job[] || []);
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
      filtered = filtered.filter(job => {
        const collectionAddr = job.collection_address as AddressType;
        const deliveryAddr = job.delivery_address as AddressType;
        
        return (
          job.ikb_order_no?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.consignment_details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.customer?.company_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          collectionAddr?.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          deliveryAddr?.city?.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(job => job.status === statusFilter);
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAddress = (address: unknown): string => {
    if (!address) return 'Not set';
    const addr = address as AddressType;
    return [addr.city, addr.postcode].filter(Boolean).join(', ');
  };

  if (loading) {
    return (
        <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
          <h1 className="text-3xl font-bold text-white">Jobs Management</h1>
          <p className="text-gray-400">Manage transport orders and deliveries</p>
          </div>
            <Button
              onClick={() => navigate('/jobs/create')}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
          <Plus className="h-4 w-4 mr-2" />
              Create Job
            </Button>
          </div>

        {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                  <p className="text-gray-400 text-sm">Total Jobs</p>
                  <p className="text-2xl font-bold text-white">{jobs.length}</p>
                  </div>
                <FileText className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {jobs.filter(j => j.status === 'pending').length}
                  </p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">In Transit</p>
                  <p className="text-2xl font-bold text-orange-400">
                    {jobs.filter(j => j.status === 'in_transit').length}
                  </p>
                </div>
                <Truck className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Completed</p>
                  <p className="text-2xl font-bold text-green-400">
                    {jobs.filter(j => j.status === 'completed').length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Filters */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <InputWithIcon
                icon={Search}
                placeholder="Search jobs by order number, customer, location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="allocated">Allocated</SelectItem>
                <SelectItem value="in_transit">In Transit</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              variant="outline" 
              onClick={loadJobs}
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Jobs Table */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
            <CardHeader>
          <CardTitle className="text-white">Jobs List</CardTitle>
            </CardHeader>
            <CardContent>
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No jobs found</p>
              <Button 
                className="mt-4"
                onClick={() => navigate('/jobs/create')}
              >
                      Create First Job
                    </Button>
                </div>
              ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                  <TableHead className="text-gray-300">Order #</TableHead>
                  <TableHead className="text-gray-300">Customer</TableHead>
                  <TableHead className="text-gray-300">Route</TableHead>
                  <TableHead className="text-gray-300">Collection Date</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Value</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredJobs.map((job) => (
                  <TableRow key={job.id} className="border-gray-700">
                    <TableCell className="text-white font-medium">
                      {job.ikb_order_no || 'N/A'}
                          </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4" />
                        <span>{job.customer?.company_name || 'Unknown'}</span>
                            </div>
                          </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center space-x-1 text-sm">
                        <MapPin className="h-3 w-3" />
                        <span>{formatAddress(job.collection_address)}</span>
                        <span>→</span>
                        <span>{formatAddress(job.delivery_address)}</span>
                            </div>
                          </TableCell>
                    <TableCell className="text-gray-300">
                      <div className="flex items-center space-x-1 text-sm">
                                <Calendar className="h-3 w-3" />
                        <span>{formatDate(job.collection_datetime_planned_from)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                      <Badge className={statusColors[job.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}>
                        {job.status}
                            </Badge>
                          </TableCell>
                    <TableCell className="text-gray-300">
                      £{job.agreed_rate_gbp?.toFixed(2) || '0.00'}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate(`/jobs/details/${job.id}`)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                          {(job.status === 'pending' || job.status === 'confirmed') && (
                            <DropdownMenuItem onClick={() => navigate(`/jobs/assign/${job.id}`)}>
                                  <Truck className="h-4 w-4 mr-2" />
                              Assign to Carrier
                                </DropdownMenuItem>
                          )}
                                <DropdownMenuItem onClick={() => navigate(`/jobs/edit/${job.id}`)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Job
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleDeleteJob(job.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
              )}
            </CardContent>
          </Card>
    </div>
  );
}
