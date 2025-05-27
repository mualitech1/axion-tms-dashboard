import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tables } from '@/integrations/supabase/types';
import {
  ArrowLeft, MapPin, Calendar, Package, Truck, 
  Clock, User, Phone, Mail, FileText, 
  Edit, Save, AlertTriangle, CheckCircle,
  Navigation, DollarSign, MessageSquare
} from 'lucide-react';

type Job = Tables<'jobs'> & {
  customer?: {
    company_name: string;
    finance_contact?: any;
    operations_contact?: any;
  };
};

export default function JobDetailsPage() {
  const navigate = useNavigate();
  // ✅ PROFESSIONAL: Use React Router's loader data instead of manual fetching
  const job = useLoaderData() as Job;

  const formatAddress = (location: Record<string, unknown> | string | null | any) => {
    if (typeof location === 'string') return location;
    if (typeof location === 'object' && location) {
      const loc = location as Record<string, string>;
      return `${loc.street || ''}, ${loc.city || ''}, ${loc.postcode || ''}`.trim().replace(/^,\s*|,\s*$/g, '');
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
                {job.consignment_details}
              </h1>
              <p className="text-aximo-text-secondary mt-1">Job Reference: {job.ikb_order_no}</p>
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
                <div className="p-2 bg-green-500/10 rounded">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-aximo-text-secondary">Rate</p>
                  <p className="text-lg font-bold text-aximo-text">
                    £{job.agreed_rate_gbp || '0.00'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded">
                  <Package className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-aximo-text-secondary">Weight</p>
                  <p className="text-lg font-bold text-aximo-text">
                    {job.weight_kg ? `${job.weight_kg}kg` : 'Not specified'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded">
                  <Truck className="h-6 w-6 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-aximo-text-secondary">Vehicle</p>
                  <p className="text-sm font-medium text-aximo-text">
                    {job.vehicle_trailer_requirements || 'Standard'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Job Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="locations">Locations</TabsTrigger>
              <TabsTrigger value="customer">Customer</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-aximo-primary" />
                    Job Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-aximo-text mb-2">Collection Date</h4>
                      <p className="text-aximo-text-secondary">
                        {job.collection_datetime_planned_from 
                          ? new Date(job.collection_datetime_planned_from).toLocaleDateString('en-GB', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Not scheduled'
                        }
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-aximo-text mb-2">Delivery Date</h4>
                      <p className="text-aximo-text-secondary">
                        {job.delivery_datetime_planned_from 
                          ? new Date(job.delivery_datetime_planned_from).toLocaleDateString('en-GB', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : 'Not scheduled'
                        }
                      </p>
                    </div>
                  </div>

                  {job.goods_description && (
                    <div>
                      <h4 className="font-medium text-aximo-text mb-2">Goods Description</h4>
                      <p className="text-aximo-text-secondary">{job.goods_description}</p>
                    </div>
                  )}

                  {job.driver_instructions && (
                    <div>
                      <h4 className="font-medium text-aximo-text mb-2">Collection Instructions</h4>
                      <p className="text-aximo-text-secondary">{job.driver_instructions}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Locations Tab */}
            <TabsContent value="locations" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Collection Location */}
                <Card className="border-aximo-border bg-aximo-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-green-600" />
                      Collection Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-aximo-text mb-2">Address</h4>
                      <p className="text-aximo-text-secondary">
                        {formatAddress(job.collection_address)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-aximo-text mb-2">Planned Collection</h4>
                      <p className="text-aximo-text-secondary flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {job.collection_datetime_planned_from 
                          ? new Date(job.collection_datetime_planned_from).toLocaleDateString('en-GB')
                          : 'Not scheduled'
                        }
                      </p>
                      <p className="text-aximo-text-secondary flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {job.collection_datetime_planned_from 
                          ? new Date(job.collection_datetime_planned_from).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                          : 'Not scheduled'
                        }
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Location */}
                <Card className="border-aximo-border bg-aximo-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-red-600" />
                      Delivery Location
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-aximo-text mb-2">Address</h4>
                      <p className="text-aximo-text-secondary">
                        {formatAddress(job.delivery_address)}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-aximo-text mb-2">Planned Delivery</h4>
                      <p className="text-aximo-text-secondary flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        {job.delivery_datetime_planned_from 
                          ? new Date(job.delivery_datetime_planned_from).toLocaleDateString('en-GB')
                          : 'Not scheduled'
                        }
                      </p>
                      <p className="text-aximo-text-secondary flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {job.delivery_datetime_planned_from 
                          ? new Date(job.delivery_datetime_planned_from).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
                          : 'Not scheduled'
                        }
                      </p>
                    </div>
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
                  <div>
                    <h4 className="font-medium text-aximo-text mb-2">Company</h4>
                    <p className="text-aximo-text-secondary">{job.customer?.company_name || 'No customer assigned'}</p>
                  </div>

                  {job.customer?.finance_contact && (
                    <div>
                      <h4 className="font-medium text-aximo-text mb-2">Finance Contact</h4>
                      <div className="space-y-1 text-aximo-text-secondary">
                        <p className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {typeof job.customer.finance_contact === 'object' 
                            ? (job.customer.finance_contact as any)?.name || 'Not specified'
                            : job.customer.finance_contact
                          }
                        </p>
                        {typeof job.customer.finance_contact === 'object' && (job.customer.finance_contact as any)?.email && (
                          <p className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {(job.customer.finance_contact as any).email}
                          </p>
                        )}
                        {typeof job.customer.finance_contact === 'object' && (job.customer.finance_contact as any)?.phone && (
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {(job.customer.finance_contact as any).phone}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {job.customer?.operations_contact && (
                    <div>
                      <h4 className="font-medium text-aximo-text mb-2">Operations Contact</h4>
                      <div className="space-y-1 text-aximo-text-secondary">
                        <p className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {typeof job.customer.operations_contact === 'object' 
                            ? (job.customer.operations_contact as any)?.name || 'Not specified'
                            : job.customer.operations_contact
                          }
                        </p>
                        {typeof job.customer.operations_contact === 'object' && (job.customer.operations_contact as any)?.email && (
                          <p className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {(job.customer.operations_contact as any).email}
                          </p>
                        )}
                        {typeof job.customer.operations_contact === 'object' && (job.customer.operations_contact as any)?.phone && (
                          <p className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            {(job.customer.operations_contact as any).phone}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
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
                    <FileText className="h-16 w-16 text-aximo-text-secondary mx-auto mb-4 opacity-50" />
                    <p className="text-aximo-text-secondary">No documents uploaded for this job yet.</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => {/* TODO: Implement document upload */}}
                    >
                      Upload Documents
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