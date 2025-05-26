import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  Phone, 
  MessageSquare, 
  FileText,
  CheckCircle,
  AlertCircle,
  Navigation,
  Star,
  Calendar,
  User,
  Building2,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface CustomerJob {
  id: string;
  ikb_order_no: string;
  status: string;
  collection_address: any;
  delivery_address: any;
  customer_company: string;
  consignment_ref: string;
  notes?: string;
  collection_date: string;
  collection_time: string;
  delivery_date: string;
  delivery_time: string;
  created_at: string;
  carrier?: {
    company_name: string;
    contact_name: string;
    contact_phone: string;
    contact_email: string;
  };
}

interface CustomerStats {
  totalJobs: number;
  activeJobs: number;
  completedJobs: number;
  pendingJobs: number;
  avgDeliveryTime: string;
  onTimeRate: number;
}

export default function CustomerPortal() {
  const [jobs, setJobs] = useState<CustomerJob[]>([]);
  const [activeTab, setActiveTab] = useState('tracking');
  const [stats, setStats] = useState<CustomerStats>({
    totalJobs: 0,
    activeJobs: 0,
    completedJobs: 0,
    pendingJobs: 0,
    avgDeliveryTime: '2.3 days',
    onTimeRate: 95.8
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<CustomerJob | null>(null);

  useEffect(() => {
    loadCustomerJobs();
    const interval = setInterval(loadCustomerJobs, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadCustomerJobs = async () => {
    try {
      const { data: jobsData, error } = await supabase
        .from('jobs')
        .select(`
          *,
          carriers (
            company_name,
            contact_name,
            contact_phone,
            contact_email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const customerJobs = jobsData?.map(job => ({
        ...job,
        carrier: job.carriers
      })) || [];

      setJobs(customerJobs);
      
      // Calculate stats
      const totalJobs = customerJobs.length;
      const activeJobs = customerJobs.filter(job => 
        ['allocated', 'in_transit', 'collecting'].includes(job.status)
      ).length;
      const completedJobs = customerJobs.filter(job => job.status === 'delivered').length;
      const pendingJobs = customerJobs.filter(job => job.status === 'pending').length;

      setStats({
        totalJobs,
        activeJobs,
        completedJobs,
        pendingJobs,
        avgDeliveryTime: '2.3 days',
        onTimeRate: 95.8
      });

      setLoading(false);
    } catch (error) {
      console.error('Error loading customer jobs:', error);
      toast({
        title: "Error",
        description: "Failed to load jobs. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      allocated: 'bg-blue-100 text-blue-800 border-blue-200',
      collecting: 'bg-purple-100 text-purple-800 border-purple-200',
      in_transit: 'bg-orange-100 text-orange-800 border-orange-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      allocated: User,
      collecting: Package,
      in_transit: Truck,
      delivered: CheckCircle,
      cancelled: AlertCircle
    };
    const Icon = icons[status as keyof typeof icons] || Clock;
    return <Icon className="h-4 w-4" />;
  };

  const formatAddress = (address: any) => {
    if (typeof address === 'string') {
      try {
        address = JSON.parse(address);
      } catch {
        return address;
      }
    }
    
    if (!address || typeof address !== 'object') return 'Address not available';
    
    const { street, city, postal_code, country } = address;
    return `${street || ''}, ${city || ''} ${postal_code || ''}, ${country || ''}`.replace(/^,\s*/, '').replace(/,\s*$/, '');
  };

  const formatDateTime = (date: string, time: string) => {
    if (!date) return 'TBC';
    try {
      const dateObj = new Date(date);
      const timeStr = time ? ` at ${time}` : '';
      return `${dateObj.toLocaleDateString('en-GB')}${timeStr}`;
    } catch {
      return 'TBC';
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.ikb_order_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.consignment_ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.customer_company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg font-medium text-gray-700">Loading your shipments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Customer Portal</h1>
                <p className="text-sm text-gray-600">Track your shipments in real-time</p>
              </div>
            </div>
            <Button onClick={loadCustomerJobs} variant="outline" className="flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm font-medium">Total Jobs</p>
                <p className="text-2xl font-bold">{stats.totalJobs}</p>
              </div>
              <Package className="h-8 w-8 text-blue-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm font-medium">Active</p>
                <p className="text-2xl font-bold">{stats.activeJobs}</p>
              </div>
              <Truck className="h-8 w-8 text-orange-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm font-medium">Delivered</p>
                <p className="text-2xl font-bold">{stats.completedJobs}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">{stats.pendingJobs}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm font-medium">Avg Time</p>
                <p className="text-xl font-bold">{stats.avgDeliveryTime}</p>
              </div>
              <Calendar className="h-8 w-8 text-purple-200" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-100 text-sm font-medium">On-Time Rate</p>
                <p className="text-xl font-bold">{stats.onTimeRate}%</p>
              </div>
              <Star className="h-8 w-8 text-indigo-200" />
            </div>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tracking" className="flex items-center space-x-2">
              <Navigation className="h-4 w-4" />
              <span>Live Tracking</span>
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center space-x-2">
              <Package className="h-4 w-4" />
              <span>All Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Documents</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tracking" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Shipment Tracking</h3>
              
              <div className="space-y-4">
                {jobs.filter(job => ['allocated', 'collecting', 'in_transit'].includes(job.status)).map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          {getStatusIcon(job.status)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{job.ikb_order_no}</h4>
                          <p className="text-sm text-gray-600">{job.consignment_ref}</p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(job.status)}>
                        {job.status.replace('_', ' ').toUpperCase()}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-green-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Collection</p>
                          <p className="text-sm text-gray-600">{formatAddress(job.collection_address)}</p>
                          <p className="text-xs text-gray-500">{formatDateTime(job.collection_date, job.collection_time)}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-red-600 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Delivery</p>
                          <p className="text-sm text-gray-600">{formatAddress(job.delivery_address)}</p>
                          <p className="text-xs text-gray-500">{formatDateTime(job.delivery_date, job.delivery_time)}</p>
                        </div>
                      </div>
                    </div>

                    {job.carrier && (
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                          <Truck className="h-4 w-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-900">{job.carrier.company_name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline" className="flex items-center space-x-1">
                            <Phone className="h-3 w-3" />
                            <span>Contact</span>
                          </Button>
                          <Button size="sm" variant="outline" className="flex items-center space-x-1">
                            <MessageSquare className="h-3 w-3" />
                            <span>Message</span>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">All Shipments</h3>
                <Input
                  placeholder="Search jobs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="max-w-sm"
                />
              </div>

              <div className="space-y-3">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-100 rounded-lg">
                          {getStatusIcon(job.status)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{job.ikb_order_no}</h4>
                          <p className="text-sm text-gray-600">{job.customer_company}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge className={getStatusColor(job.status)}>
                          {job.status.replace('_', ' ').toUpperCase()}
                        </Badge>
                        <Button size="sm" variant="outline" onClick={() => setSelectedJob(job)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Center</h3>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Document management coming soon!</p>
                <p className="text-sm text-gray-500 mt-2">
                  Access delivery confirmations, invoices, and shipping documents.
                </p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Support</h3>
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Support center coming soon!</p>
                <p className="text-sm text-gray-500 mt-2">
                  Chat with our support team and track your queries.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 