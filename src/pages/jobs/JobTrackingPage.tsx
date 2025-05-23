import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import {
  ArrowLeft, MapPin, Navigation, Clock, Package,
  Truck, CheckCircle, AlertCircle, Phone, 
  MessageSquare, Route, Zap, Activity
} from 'lucide-react';

type Job = Tables<'jobs'> & {
  customer?: {
    name: string;
    email: string;
    phone?: string;
  };
};

interface TrackingEvent {
  id: string;
  timestamp: string;
  status: string;
  location: string;
  description: string;
  driver?: string;
}

export default function JobTrackingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [trackingEvents, setTrackingEvents] = useState<TrackingEvent[]>([]);
  const [liveLocation, setLiveLocation] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (id) {
      loadJobDetails(id);
      loadTrackingEvents(id);
      // Simulate live tracking updates
      const interval = setInterval(() => {
        updateLiveLocation();
      }, 30000); // Update every 30 seconds

      return () => clearInterval(interval);
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

  const loadTrackingEvents = (jobId: string) => {
    // Mock tracking events - in real app, this would come from GPS tracking system
    const mockEvents: TrackingEvent[] = [
      {
        id: '1',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'dispatched',
        location: 'Depot - Manchester',
        description: 'Driver assigned and vehicle dispatched',
        driver: 'John Smith'
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 2700000).toISOString(),
        status: 'en_route_pickup',
        location: 'M60 Junction 8',
        description: 'En route to pickup location',
        driver: 'John Smith'
      },
      {
        id: '3',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: 'arrived_pickup',
        location: 'Pickup Location',
        description: 'Arrived at pickup location',
        driver: 'John Smith'
      },
      {
        id: '4',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        status: 'loaded',
        location: 'Pickup Location',
        description: 'Goods loaded and secured',
        driver: 'John Smith'
      },
      {
        id: '5',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        status: 'en_route_delivery',
        location: 'A1(M) Junction 42',
        description: 'En route to delivery location',
        driver: 'John Smith'
      }
    ];
    setTrackingEvents(mockEvents);
  };

  const updateLiveLocation = () => {
    // Mock live location updates
    const mockLocations = [
      { lat: 53.4808, lng: -2.2426 }, // Manchester
      { lat: 53.4084, lng: -2.9916 }, // Liverpool
      { lat: 53.3811, lng: -1.4701 }, // Sheffield
      { lat: 53.7997, lng: -1.5492 }  // Leeds
    ];
    const randomLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
    setLiveLocation(randomLocation);
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
      case 'dispatched': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'en_route_pickup': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'arrived_pickup': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'loaded': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'en_route_delivery': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'dispatched': return <Truck className="h-4 w-4" />;
      case 'en_route_pickup': return <Navigation className="h-4 w-4" />;
      case 'arrived_pickup': return <MapPin className="h-4 w-4" />;
      case 'loaded': return <Package className="h-4 w-4" />;
      case 'en_route_delivery': return <Route className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aximo-primary"></div>
          <span className="ml-2 text-aximo-text">Loading Tracking Information...</span>
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
              <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
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

  const currentEvent = trackingEvents[trackingEvents.length - 1];

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
                Live Tracking
              </h1>
              <p className="text-aximo-text-secondary mt-1">{job.title} - {job.reference}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/jobs/details/${job.id}`)}
              className="flex items-center gap-2"
            >
              <Package className="h-4 w-4" />
              Job Details
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Contact Driver
            </Button>
          </div>
        </motion.div>

        {/* Current Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-aximo-primary/10 rounded-full">
                    <Activity className="h-8 w-8 text-aximo-primary animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-aximo-text">Current Status</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(currentEvent?.status || 'unknown')}>
                        {getStatusIcon(currentEvent?.status || 'unknown')}
                        <span className="ml-1">
                          {currentEvent?.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown'}
                        </span>
                      </Badge>
                      <span className="text-aximo-text-secondary">•</span>
                      <span className="text-aximo-text-secondary">
                        {currentEvent ? new Date(currentEvent.timestamp).toLocaleTimeString() : 'No updates'}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-aximo-text-secondary">Current Location</p>
                  <p className="font-medium text-aximo-text">{currentEvent?.location || 'Unknown'}</p>
                  {liveLocation && (
                    <p className="text-xs text-aximo-text-secondary mt-1">
                      GPS: {liveLocation.lat.toFixed(4)}, {liveLocation.lng.toFixed(4)}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Route Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <Card className="border-aximo-border bg-aximo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Route className="h-5 w-5 text-aximo-primary" />
                  Route Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pickup */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full mt-1">
                    <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-aximo-text">Pickup</h4>
                    <p className="text-sm text-aximo-text-secondary">{formatAddress(job.pickup_location)}</p>
                    <p className="text-xs text-aximo-text-secondary mt-1">
                      {new Date(job.pickup_date).toLocaleDateString()} {job.pickup_time || ''}
                    </p>
                  </div>
                </div>

                {/* Route Line */}
                <div className="flex justify-center">
                  <div className="w-px h-8 bg-gradient-to-b from-green-500 to-red-500"></div>
                </div>

                {/* Delivery */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full mt-1">
                    <MapPin className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-aximo-text">Delivery</h4>
                    <p className="text-sm text-aximo-text-secondary">{formatAddress(job.delivery_location)}</p>
                    <p className="text-xs text-aximo-text-secondary mt-1">
                      {job.delivery_date ? new Date(job.delivery_date).toLocaleDateString() : 'TBD'} {job.delivery_time || ''}
                    </p>
                  </div>
                </div>

                {/* ETA */}
                <div className="bg-aximo-background/50 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-aximo-primary" />
                    <span className="font-medium text-aximo-text">Estimated Arrival</span>
                  </div>
                  <p className="text-lg font-bold text-aximo-primary mt-1">
                    {new Date(Date.now() + 3600000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <p className="text-xs text-aximo-text-secondary">Based on current traffic</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Tracking Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="border-aximo-border bg-aximo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-aximo-primary" />
                  Tracking Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingEvents.map((event, index) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className={`flex items-start gap-4 p-4 rounded-lg ${
                        index === trackingEvents.length - 1 
                          ? 'bg-aximo-primary/5 border border-aximo-primary/20' 
                          : 'bg-aximo-background/30'
                      }`}
                    >
                      <div className={`p-2 rounded-full ${
                        index === trackingEvents.length - 1 
                          ? 'bg-aximo-primary text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                      }`}>
                        {getStatusIcon(event.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-aximo-text">{event.description}</h4>
                          <span className="text-sm text-aximo-text-secondary">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-aximo-text-secondary mt-1">{event.location}</p>
                        {event.driver && (
                          <p className="text-xs text-aximo-text-secondary mt-1">Driver: {event.driver}</p>
                        )}
                      </div>
                      {index === trackingEvents.length - 1 && (
                        <div className="flex items-center gap-1">
                          <Zap className="h-4 w-4 text-aximo-primary animate-pulse" />
                          <span className="text-xs text-aximo-primary font-medium">LIVE</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Live Map Placeholder */}
                <div className="mt-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20 rounded-lg p-8 text-center">
                  <MapPin className="h-16 w-16 text-aximo-primary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-aximo-text mb-2">Live Map View</h3>
                  <p className="text-aximo-text-secondary mb-4">
                    Real-time GPS tracking with route optimization
                  </p>
                  <Button className="bg-aximo-primary hover:bg-aximo-primary-hover">
                    Open Full Map
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="border-aximo-border bg-aximo-card hover:bg-aximo-card/80 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-aximo-text">Contact Driver</h3>
              <p className="text-sm text-aximo-text-secondary">Direct line to driver</p>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card hover:bg-aximo-card/80 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-aximo-text">Send Message</h3>
              <p className="text-sm text-aximo-text-secondary">Update instructions</p>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card hover:bg-aximo-card/80 transition-colors cursor-pointer">
            <CardContent className="p-6 text-center">
              <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-aximo-text">Report Issue</h3>
              <p className="text-sm text-aximo-text-secondary">Flag any problems</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 