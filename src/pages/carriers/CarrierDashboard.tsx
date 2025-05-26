import React, { useState, useEffect } from 'react';
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
  Truck, Package, MapPin, Calendar, Clock, 
  Star, TrendingUp, AlertTriangle, CheckCircle,
  FileText, Phone, Mail, Building2, Target,
  Zap, Award, DollarSign, Route, Filter,
  Search, RefreshCw, Eye, Download
} from 'lucide-react';

type Job = Tables<'jobs'> & {
  customer?: {
    company_name: string;
  };
};

type Carrier = Tables<'carriers'>;

interface CarrierStats {
  totalJobs: number;
  completedJobs: number;
  activeJobs: number;
  totalEarnings: number;
  averageRating: number;
  onTimeDelivery: number;
}

export default function CarrierDashboard() {
  const [availableJobs, setAvailableJobs] = useState<Job[]>([]);
  const [assignedJobs, setAssignedJobs] = useState<Job[]>([]);
  const [carrier, setCarrier] = useState<Carrier | null>(null);
  const [stats, setStats] = useState<CarrierStats>({
    totalJobs: 0,
    completedJobs: 0,
    activeJobs: 0,
    totalEarnings: 0,
    averageRating: 4.8,
    onTimeDelivery: 96
  });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [regionFilter, setRegionFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    loadCarrierData();
  }, []);

  const loadCarrierData = async () => {
    try {
      setLoading(true);
      
      // For demo purposes, we'll use the first carrier
      // In production, this would be based on the logged-in carrier user
      const { data: carriersData, error: carriersError } = await supabase
        .from('carriers')
        .select('*')
        .limit(1);

      if (carriersError) throw carriersError;
      
      if (carriersData && carriersData.length > 0) {
        const carrierData = carriersData[0];
        setCarrier(carrierData);
        
        // Load available jobs (not assigned to any carrier)
        const { data: availableJobsData, error: availableError } = await supabase
          .from('jobs')
          .select(`
            *,
            customer:customers!jobs_customer_id_fkey (
              company_name
            )
          `)
          .is('carrier_id', null)
          .in('status', ['pending', 'confirmed'])
          .order('created_at', { ascending: false });

        if (availableError) throw availableError;
        setAvailableJobs(availableJobsData as Job[] || []);

        // Load assigned jobs for this carrier
        const { data: assignedJobsData, error: assignedError } = await supabase
          .from('jobs')
          .select(`
            *,
            customer:customers!jobs_customer_id_fkey (
              company_name
            )
          `)
          .eq('carrier_id', carrierData.id)
          .order('created_at', { ascending: false });

        if (assignedError) throw assignedError;
        setAssignedJobs(assignedJobsData as Job[] || []);

        // Calculate stats
        const completed = assignedJobsData?.filter(j => j.status === 'completed').length || 0;
        const active = assignedJobsData?.filter(j => ['allocated', 'in_transit'].includes(j.status)).length || 0;
        const totalEarnings = assignedJobsData?.reduce((sum, job) => sum + (job.agreed_rate_gbp || 0), 0) || 0;

        setStats({
          totalJobs: assignedJobsData?.length || 0,
          completedJobs: completed,
          activeJobs: active,
          totalEarnings,
          averageRating: 4.8, // Mock data
          onTimeDelivery: 96 // Mock data
        });
      }

    } catch (error) {
      console.error('Error loading carrier data:', error);
      toast({
        title: "Error",
        description: "Failed to load carrier dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptJob = async (jobId: string) => {
    if (!carrier) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .update({
          carrier_id: carrier.id,
          status: 'allocated',
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

      if (error) throw error;

      toast({
        title: "Success! 🚀",
        description: "Job accepted successfully!",
      });

      loadCarrierData(); // Refresh data
    } catch (error) {
      console.error('Error accepting job:', error);
      toast({
        title: "Error",
        description: "Failed to accept job",
        variant: "destructive"
      });
    }
  };

  const formatAddress = (address: any): string => {
    if (!address) return 'Not set';
    return [address.city, address.postcode].filter(Boolean).join(', ');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getJobMatchScore = (job: Job): number => {
    if (!carrier) return 0;
    
    let score = 0;
    const collectionAddr = job.collection_address as any;
    const deliveryAddr = job.delivery_address as any;
    
    // Region matching
    const jobRegions = [collectionAddr?.city, deliveryAddr?.city].filter(Boolean);
    const regionMatch = carrier.regions_of_interest.some(region => 
      jobRegions.some(jobRegion => 
        jobRegion?.toLowerCase().includes(region.toLowerCase()) ||
        region.toLowerCase().includes(jobRegion?.toLowerCase())
      )
    );
    
    if (regionMatch) score += 40;
    
    // Fleet type matching
    const requiredVehicle = job.vehicle_trailer_requirements?.toLowerCase() || '';
    const hasMatchingFleet = carrier.fleet_type.some(fleet =>
      requiredVehicle.includes(fleet.toLowerCase()) ||
      fleet.toLowerCase().includes(requiredVehicle)
    );
    
    if (hasMatchingFleet) score += 30;
    
    // Service type matching
    if (carrier.service_type === 'Road Freight' || carrier.service_type === 'Both') {
      score += 20;
    }
    
    // Distance bonus (mock calculation)
    score += Math.random() * 10;
    
    return Math.min(100, Math.max(0, score));
  };

  const filteredAvailableJobs = availableJobs.filter(job => {
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!job.ikb_order_no?.toLowerCase().includes(searchLower) &&
          !job.customer?.company_name?.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    
    if (regionFilter !== 'all') {
      const collectionAddr = job.collection_address as any;
      const deliveryAddr = job.delivery_address as any;
      const jobRegions = [collectionAddr?.city, deliveryAddr?.city].filter(Boolean);
      
      if (!jobRegions.some(region => 
        region?.toLowerCase().includes(regionFilter.toLowerCase())
      )) {
        return false;
      }
    }
    
    return true;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return getJobMatchScore(b) - getJobMatchScore(a);
      case 'value':
        return (b.agreed_rate_gbp || 0) - (a.agreed_rate_gbp || 0);
      case 'date':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!carrier) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-400">Carrier profile not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Carrier Dashboard</h1>
          <p className="text-gray-400">Welcome back, {carrier.company_name}</p>
        </div>
        <Button 
          onClick={loadCarrierData}
          variant="outline"
          className="border-gray-600 text-gray-300 hover:bg-gray-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-blue-900 to-blue-800 border-blue-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-200 text-sm">Active Jobs</p>
                  <p className="text-3xl font-bold text-white">{stats.activeJobs}</p>
                </div>
                <Truck className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-200 text-sm">Completed</p>
                  <p className="text-3xl font-bold text-white">{stats.completedJobs}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gradient-to-br from-purple-900 to-purple-800 border-purple-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-200 text-sm">Total Earnings</p>
                  <p className="text-3xl font-bold text-white">£{stats.totalEarnings.toFixed(0)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-200 text-sm">Rating</p>
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-bold text-white">{stats.averageRating}</p>
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  </div>
                </div>
                <Award className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">On-Time Delivery</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-green-400 h-2 rounded-full" 
                    style={{ width: `${stats.onTimeDelivery}%` }}
                  ></div>
                </div>
                <span className="text-green-400 font-medium">{stats.onTimeDelivery}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Customer Rating</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    className={`h-4 w-4 ${star <= stats.averageRating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} 
                  />
                ))}
                <span className="text-yellow-400 ml-2">{stats.averageRating}/5</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Total Jobs Completed</span>
              <span className="text-white font-medium">{stats.completedJobs}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Document Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Insurance Certificate</span>
              <Badge className="bg-green-100 text-green-800">✅ Valid</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Operator License</span>
              <Badge className="bg-green-100 text-green-800">✅ Valid</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">ADR Certificate</span>
              <Badge className="bg-yellow-100 text-yellow-800">⚠️ Expires Soon</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Vehicle MOT</span>
              <Badge className="bg-green-100 text-green-800">✅ Valid</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Available Jobs */}
      <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              Available Jobs ({filteredAvailableJobs.length})
            </CardTitle>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-48 bg-gray-800 border-gray-600 text-white"
              />
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="london">London</SelectItem>
                  <SelectItem value="manchester">Manchester</SelectItem>
                  <SelectItem value="birmingham">Birmingham</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 bg-gray-800 border-gray-600 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="match">Best Match</SelectItem>
                  <SelectItem value="value">Highest Value</SelectItem>
                  <SelectItem value="date">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {filteredAvailableJobs.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No available jobs found</p>
              <p className="text-gray-500 text-sm">Check back later for new opportunities</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredAvailableJobs.map((job, index) => {
                const matchScore = getJobMatchScore(job);
                const collectionAddr = job.collection_address as any;
                const deliveryAddr = job.delivery_address as any;
                
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 hover:border-blue-500 transition-all duration-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-blue-400" />
                            <span className="text-white font-medium">{job.ikb_order_no}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={`${
                              matchScore >= 80 ? 'bg-green-100 text-green-800' :
                              matchScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {matchScore.toFixed(0)}% Match
                            </Badge>
                            {matchScore >= 80 && <Star className="h-4 w-4 text-yellow-400" />}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Building2 className="h-4 w-4" />
                          <span className="text-sm">{job.customer?.company_name}</span>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <MapPin className="h-3 w-3" />
                            <span>From: {formatAddress(collectionAddr)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <Route className="h-3 w-3" />
                            <span>To: {formatAddress(deliveryAddr)}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-gray-300 text-sm">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(job.collection_datetime_planned_from)}</span>
                          </div>
                          <div className="text-green-400 font-medium">
                            £{job.agreed_rate_gbp?.toFixed(2) || '0.00'}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 pt-2">
                          <Button
                            onClick={() => handleAcceptJob(job.id)}
                            className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                          >
                            <Zap className="h-4 w-4 mr-2" />
                            Accept Job
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Assigned Jobs */}
      {assignedJobs.length > 0 && (
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Truck className="h-5 w-5 text-orange-400" />
              My Assigned Jobs ({assignedJobs.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {assignedJobs.slice(0, 4).map((job, index) => {
                const collectionAddr = job.collection_address as any;
                const deliveryAddr = job.delivery_address as any;
                
                return (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-white font-medium">{job.ikb_order_no}</span>
                          <Badge className={
                            job.status === 'allocated' ? 'bg-blue-100 text-blue-800' :
                            job.status === 'in_transit' ? 'bg-orange-100 text-orange-800' :
                            job.status === 'completed' ? 'bg-green-100 text-green-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {job.status}
                          </Badge>
                        </div>
                        
                        <div className="text-gray-300 text-sm">
                          {formatAddress(collectionAddr)} → {formatAddress(deliveryAddr)}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-sm">{formatDate(job.collection_datetime_planned_from)}</span>
                          <span className="text-green-400 font-medium">£{job.agreed_rate_gbp?.toFixed(2) || '0.00'}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 