import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import {
  ArrowLeft, MapPin, Calendar, Package, Truck, 
  Clock, User, Phone, Mail, FileText, 
  Edit, Save, AlertTriangle, CheckCircle,
  Navigation, DollarSign, MessageSquare
} from 'lucide-react';

type Job = Tables<'jobs'> & {
  customer?: {
    name: string;
    email: string;
    phone?: string;
  };
};

export default function JobDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadJobDetails(id);
    }
  }, [id]);

  const loadJobDetails = async (jobId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          *,
          customer:companies!jobs_customer_id_fkey (
            name,
            email,
            phone
          )
        `)
        .eq('id', jobId)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error('Error loading job details:', error);
      toast({
        title: "Error",
        description: "Failed to load job details",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const formatAddress = (location: Record<string, unknown> | string | null) => {
    if (typeof location === 'string') return location;
    if (typeof location === 'object' && location) {
      const loc = location as Record<string, string>;
      return `${loc.address || ''}, ${loc.city || ''}, ${loc.postcode || ''}`.trim().replace(/^,\s*|,\s*$/g, '');
    }
    return 'Unknown location';
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      case 'medium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'urgent': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aximo-primary"></div>
          <span className="ml-2 text-aximo-text">Loading Job Details...</span>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="text-center py-12">
              <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-aximo-text mb-2">Job Not Found</h2>
              <p className="text-aximo-text-secondary mb-4">The requested job could not be found.</p>
              <Button onClick={() => navigate('/jobs')} className="bg-aximo-primary hover:bg-aximo-primary-hover">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Jobs
              </Button>
            </CardContent>
          </Card>
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
                {job.title}
              </h1>
              <p className="text-aximo-text-secondary mt-1">Job Reference: {job.reference}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/jobs/tracking/${job.id}`)}
              className="flex items-center gap-2"
            >
              <Navigation className="h-4 w-4" />
              Track
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate(`/jobs/edit/${job.id}`)}
              className="flex items-center gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit
            </Button>
          </div>
        </motion.div>

        {/* Status Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-aximo-primary/10 rounded">
                  <Package className="h-6 w-6 text-aximo-primary" />
                </div>
                <div>
                  <p className="text-sm text-aximo-text-secondary">Status</p>
                  <Badge className={getStatusColor(job.status)}>
                    {job.status.replace('_', ' ').charAt(0).toUpperCase() + job.status.replace('_', ' ').slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded">
                  <AlertTriangle className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-sm text-aximo-text-secondary">Priority</p>
                  <Badge className={getPriorityColor(job.priority)}>
                    {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded">
                  <Calendar className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-aximo-text-secondary">Pickup Date</p>
                  <p className="font-medium text-aximo-text">
                    {new Date(job.pickup_date).toLocaleDateString()}
                  </p>
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
                  <p className="text-sm text-aximo-text-secondary">Value</p>
                  <p className="font-medium text-aximo-text">
                    £{job.rate ? parseFloat(job.rate).toFixed(2) : '0.00'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5 bg-aximo-card border-aximo-border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="route">Route</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-aximo-border bg-aximo-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="h-5 w-5 text-aximo-primary" />
                      Job Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-aximo-text-secondary">Description</label>
                      <p className="text-aximo-text">{job.description || 'No description provided'}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-aximo-text-secondary">Created</label>
                        <p className="text-aximo-text">
                          {new Date(job.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-aximo-text-secondary">Last Updated</label>
                        <p className="text-aximo-text">
                          {new Date(job.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-aximo-border bg-aximo-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5 text-aximo-primary" />
                      Service Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-aximo-text-secondary">Service Type</label>
                      <p className="text-aximo-text">{job.service_type || 'Standard Transport'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-aximo-text-secondary">Vehicle Requirements</label>
                      <p className="text-aximo-text">{job.vehicle_requirements || 'Standard Vehicle'}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Route Tab */}
            <TabsContent value="route" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-aximo-border bg-aximo-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      Pickup Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-aximo-text-secondary">Address</label>
                      <p className="text-aximo-text">{formatAddress(job.pickup_location)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-aximo-text-secondary">Date</label>
                        <p className="text-aximo-text">{new Date(job.pickup_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <label className="text-sm text-aximo-text-secondary">Time</label>
                        <p className="text-aximo-text">{job.pickup_time || 'Not specified'}</p>
                      </div>
                    </div>
                    {job.pickup_instructions && (
                      <div>
                        <label className="text-sm text-aximo-text-secondary">Instructions</label>
                        <p className="text-aximo-text">{job.pickup_instructions}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="border-aximo-border bg-aximo-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-600" />
                      Delivery Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm text-aximo-text-secondary">Address</label>
                      <p className="text-aximo-text">{formatAddress(job.delivery_location)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-aximo-text-secondary">Date</label>
                        <p className="text-aximo-text">
                          {job.delivery_date ? new Date(job.delivery_date).toLocaleDateString() : 'Not specified'}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm text-aximo-text-secondary">Time</label>
                        <p className="text-aximo-text">{job.delivery_time || 'Not specified'}</p>
                      </div>
                    </div>
                    {job.delivery_instructions && (
                      <div>
                        <label className="text-sm text-aximo-text-secondary">Instructions</label>
                        <p className="text-aximo-text">{job.delivery_instructions}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Customer Tab */}
            <TabsContent value="customer" className="space-y-6">
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5 text-aximo-primary" />
                    Customer Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm text-aximo-text-secondary">Company Name</label>
                      <p className="text-lg font-medium text-aximo-text">{job.customer?.name || 'Unknown'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-aximo-text-secondary flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        Email
                      </label>
                      <p className="text-aximo-text">{job.customer?.email || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm text-aximo-text-secondary flex items-center gap-1">
                        <Phone className="h-4 w-4" />
                        Phone
                      </label>
                      <p className="text-aximo-text">{job.customer?.phone || 'Not provided'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-aximo-primary" />
                    Job Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="h-16 w-16 text-aximo-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-aximo-text mb-2">Document Management</h3>
                    <p className="text-aximo-text-secondary mb-4">
                      POD uploads, CMR documents, and other job-related files
                    </p>
                    <Button className="bg-aximo-primary hover:bg-aximo-primary-hover">
                      Upload Documents
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Notes Tab */}
            <TabsContent value="notes" className="space-y-6">
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-aximo-primary" />
                    Job Notes & Updates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <MessageSquare className="h-16 w-16 text-aximo-text-secondary mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-aximo-text mb-2">Communication Log</h3>
                    <p className="text-aximo-text-secondary mb-4">
                      Track all communications, updates, and notes for this job
                    </p>
                    <Button className="bg-aximo-primary hover:bg-aximo-primary-hover">
                      Add Note
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
} 