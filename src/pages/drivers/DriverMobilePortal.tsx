import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/lib/supabase';
import { 
  MapPin, 
  Clock, 
  Truck, 
  CheckCircle, 
  AlertTriangle, 
  Camera, 
  Phone, 
  MessageSquare, 
  Navigation, 
  Zap,
  Package,
  Star,
  TrendingUp,
  Bell,
  Calendar,
  Route,
  Shield,
  Fuel,
  Timer,
  Target
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Job {
  id: string;
  ikb_order_no: string;
  customer_company: string;
  consignment_details: string;
  status: string;
  collection_address: any;
  delivery_address: any;
  collection_datetime_planned_from: string;
  delivery_datetime_planned_from: string;
  agreed_rate_gbp: number;
  vehicle_trailer_requirements: string;
  driver_instructions: string;
}

interface DriverStats {
  activeJobs: number;
  completedToday: number;
  totalEarnings: number;
  rating: number;
  onTimeDelivery: number;
}

const STATUS_COLORS = {
  'allocated': 'bg-blue-500',
  'collected': 'bg-yellow-500',
  'in_transit': 'bg-purple-500',
  'delivered': 'bg-green-500',
  'completed': 'bg-emerald-500'
};

const STATUS_LABELS = {
  'allocated': 'Ready to Collect',
  'collected': 'Collected',
  'in_transit': 'In Transit',
  'delivered': 'Delivered',
  'completed': 'Completed'
};

export default function DriverMobilePortal() {
  const [activeJobs, setActiveJobs] = useState<Job[]>([]);
  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);
  const [driverStats, setDriverStats] = useState<DriverStats>({
    activeJobs: 0,
    completedToday: 2,
    totalEarnings: 1250.00,
    rating: 4.8,
    onTimeDelivery: 96
  });
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [currentLocation, setCurrentLocation] = useState({ lat: 52.4862, lng: -1.8904 }); // Birmingham
  const { toast } = useToast();

  useEffect(() => {
    loadDriverJobs();
    simulateLocationUpdates();
  }, []);

  const loadDriverJobs = async () => {
    try {
      // Simulate driver ID - in real implementation, this would come from auth
      const driverId = 'driver_001';
      
      const { data: jobs, error } = await supabase
        .from('jobs')
        .select(`
          *,
          customers!inner(company_name)
        `)
        .eq('carrier_id', 'carrier_swift_transport') // Simulate logged-in driver's carrier
        .in('status', ['allocated', 'collected', 'in_transit', 'delivered']);

      if (error) throw error;

      const activeJobsList = jobs?.filter(job => 
        ['allocated', 'collected', 'in_transit'].includes(job.status)
      ) || [];
      
      const completedJobsList = jobs?.filter(job => 
        ['delivered', 'completed'].includes(job.status)
      ) || [];

      setActiveJobs(activeJobsList.map(job => ({
        ...job,
        customer_company: job.customers?.company_name || 'Unknown Customer'
      })));
      
      setCompletedJobs(completedJobsList.map(job => ({
        ...job,
        customer_company: job.customers?.company_name || 'Unknown Customer'
      })));

      setDriverStats(prev => ({
        ...prev,
        activeJobs: activeJobsList.length
      }));

    } catch (error) {
      console.error('Error loading driver jobs:', error);
      toast({
        title: "Connection Error",
        description: "Failed to load your jobs. Check your connection.",
        variant: "destructive"
      });
    }
  };

  const simulateLocationUpdates = () => {
    // Simulate GPS updates every 30 seconds
    setInterval(() => {
      setCurrentLocation(prev => ({
        lat: prev.lat + (Math.random() - 0.5) * 0.01,
        lng: prev.lng + (Math.random() - 0.5) * 0.01
      }));
    }, 30000);
  };

  const updateJobStatus = async (jobId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('jobs')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', jobId);

      if (error) throw error;

      await loadDriverJobs();
      
      toast({
        title: "Status Updated! ⚡",
        description: `Job ${newStatus.replace('_', ' ')} successfully`,
      });

    } catch (error) {
      console.error('Error updating job status:', error);
      toast({
        title: "Update Failed",
        description: "Failed to update job status. Try again.",
        variant: "destructive"
      });
    }
  };

  const formatAddress = (address: any): string => {
    if (typeof address === 'string') {
      try {
        address = JSON.parse(address);
      } catch {
        return address;
      }
    }
    
    if (typeof address === 'object' && address !== null) {
      const parts = [address.street, address.city, address.postcode].filter(Boolean);
      return parts.join(', ');
    }
    
    return 'Address not available';
  };

  const formatTime = (dateTime: string): string => {
    return new Date(dateTime).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateTime: string): string => {
    return new Date(dateTime).toLocaleDateString('en-GB', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  const JobCard = ({ job, isActive = true }: { job: Job; isActive?: boolean }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 border-slate-700 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-cyan-400 text-lg">
                {job.ikb_order_no}
              </CardTitle>
              <p className="text-slate-300 text-sm mt-1">{job.customer_company}</p>
            </div>
            <Badge 
              className={`${STATUS_COLORS[job.status as keyof typeof STATUS_COLORS]} text-white font-medium`}
            >
              {STATUS_LABELS[job.status as keyof typeof STATUS_LABELS]}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Collection Info */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Package className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-400">Collection</span>
            </div>
            <p className="text-slate-300 text-sm">{formatAddress(job.collection_address)}</p>
            <p className="text-cyan-400 text-sm font-medium">
              {formatDate(job.collection_datetime_planned_from)} at {formatTime(job.collection_datetime_planned_from)}
            </p>
          </div>

          {/* Delivery Info */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">Delivery</span>
            </div>
            <p className="text-slate-300 text-sm">{formatAddress(job.delivery_address)}</p>
            <p className="text-cyan-400 text-sm font-medium">
              {formatDate(job.delivery_datetime_planned_from)} at {formatTime(job.delivery_datetime_planned_from)}
            </p>
          </div>

          {/* Job Details */}
          <div className="flex justify-between items-center pt-2">
            <div>
              <p className="text-slate-400 text-xs">Consignment</p>
              <p className="text-white text-sm font-medium">{job.consignment_details}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-xs">Rate</p>
              <p className="text-emerald-400 text-sm font-bold">£{job.agreed_rate_gbp}</p>
            </div>
          </div>

          {/* Driver Instructions */}
          {job.driver_instructions && (
            <div className="bg-blue-900/30 border border-blue-700/50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <AlertTriangle className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-400">Instructions</span>
              </div>
              <p className="text-slate-300 text-sm">{job.driver_instructions}</p>
            </div>
          )}

          {/* Action Buttons */}
          {isActive && (
            <div className="flex gap-2 pt-2">
              {job.status === 'allocated' && (
                <Button 
                  onClick={() => updateJobStatus(job.id, 'collected')}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Confirm Collection
                </Button>
              )}
              
              {job.status === 'collected' && (
                <Button 
                  onClick={() => updateJobStatus(job.id, 'in_transit')}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Truck className="h-4 w-4 mr-1" />
                  Start Journey
                </Button>
              )}
              
              {job.status === 'in_transit' && (
                <Button 
                  onClick={() => updateJobStatus(job.id, 'delivered')}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Confirm Delivery
                </Button>
              )}

              <Button 
                variant="outline" 
                size="sm"
                className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Navigation className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="bg-slate-800 border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-800 to-slate-900 border-b border-slate-700 p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 border-2 border-cyan-400">
              <AvatarImage src="/driver-avatar.jpg" />
              <AvatarFallback className="bg-cyan-600 text-white">JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-white font-bold text-lg">John Driver</h1>
              <p className="text-slate-400 text-sm">Swift Transport Solutions</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-green-600/20 border border-green-600/40 rounded-full px-2 py-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-xs font-medium">Online</span>
            </div>
            <Button variant="ghost" size="sm" className="text-slate-400">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Dashboard */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-4"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 border-blue-700/50">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full mx-auto mb-2">
                <Target className="h-4 w-4 text-white" />
              </div>
              <p className="text-2xl font-bold text-blue-400">{driverStats.activeJobs}</p>
              <p className="text-slate-400 text-sm">Active Jobs</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-900/50 to-green-800/50 border-green-700/50">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-full mx-auto mb-2">
                <CheckCircle className="h-4 w-4 text-white" />
              </div>
              <p className="text-2xl font-bold text-green-400">{driverStats.completedToday}</p>
              <p className="text-slate-400 text-sm">Completed Today</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-900/50 to-emerald-800/50 border-emerald-700/50">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-emerald-600 rounded-full mx-auto mb-2">
                <TrendingUp className="h-4 w-4 text-white" />
              </div>
              <p className="text-2xl font-bold text-emerald-400">£{driverStats.totalEarnings}</p>
              <p className="text-slate-400 text-sm">This Week</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-900/50 to-yellow-800/50 border-yellow-700/50">
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-yellow-600 rounded-full mx-auto mb-2">
                <Star className="h-4 w-4 text-white" />
              </div>
              <p className="text-2xl font-bold text-yellow-400">{driverStats.rating}</p>
              <p className="text-slate-400 text-sm">Rating</p>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="px-4 pb-4">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800 border-slate-700">
            <TabsTrigger 
              value="active" 
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-300"
            >
              Active Jobs ({activeJobs.length})
            </TabsTrigger>
            <TabsTrigger 
              value="completed" 
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white text-slate-300"
            >
              Completed ({completedJobs.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="active" className="mt-4 space-y-4">
            <AnimatePresence>
              {activeJobs.length > 0 ? (
                activeJobs.map((job) => (
                  <JobCard key={job.id} job={job} isActive={true} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Truck className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">No Active Jobs</h3>
                  <p className="text-slate-500">You're all caught up! New jobs will appear here.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-4 space-y-4">
            <AnimatePresence>
              {completedJobs.length > 0 ? (
                completedJobs.map((job) => (
                  <JobCard key={job.id} job={job} isActive={false} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="h-16 w-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-slate-400 mb-2">No Completed Jobs</h3>
                  <p className="text-slate-500">Completed jobs will appear here.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </div>

      {/* Quick Actions Floating Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="fixed bottom-4 left-4 right-4"
      >
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 rounded-xl p-3 shadow-2xl">
          <div className="flex justify-around items-center">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-slate-300 hover:text-cyan-400">
              <Camera className="h-5 w-5" />
              <span className="text-xs">POD</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-slate-300 hover:text-cyan-400">
              <MessageSquare className="h-5 w-5" />
              <span className="text-xs">Chat</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-slate-300 hover:text-cyan-400">
              <Phone className="h-5 w-5" />
              <span className="text-xs">Call</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1 text-slate-300 hover:text-cyan-400">
              <Route className="h-5 w-5" />
              <span className="text-xs">Navigate</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 