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
  ArrowLeft, Calendar, Clock, Truck, Users, 
  MapPin, Plus, Filter, Search, 
  ChevronLeft, ChevronRight, Grid, List,
  AlertTriangle, CheckCircle, Package, Route
} from 'lucide-react';

type Job = Tables<'jobs'>;

interface ScheduleEvent {
  id: string;
  jobId: string;
  title: string;
  start: Date;
  end: Date;
  status: string;
  driver?: string;
  vehicle?: string;
  priority: string;
}

export default function JobSchedulePage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [scheduleEvents, setScheduleEvents] = useState<ScheduleEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'week' | 'month'>('week');
  const [selectedDriver, setSelectedDriver] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock drivers and vehicles
  const drivers = [
    { id: '1', name: 'John Smith', status: 'available' },
    { id: '2', name: 'Sarah Johnson', status: 'busy' },
    { id: '3', name: 'Mike Wilson', status: 'available' },
    { id: '4', name: 'Emma Davis', status: 'off_duty' }
  ];

  const vehicles = [
    { id: '1', name: 'Truck 001', type: 'HGV', status: 'available' },
    { id: '2', name: 'Van 002', type: 'LGV', status: 'maintenance' },
    { id: '3', name: 'Truck 003', type: 'HGV', status: 'available' },
    { id: '4', name: 'Van 004', type: 'LGV', status: 'available' }
  ];

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    generateScheduleEvents();
  }, [jobs]);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('pickup_date', { ascending: true });

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

  const generateScheduleEvents = () => {
    const events: ScheduleEvent[] = jobs.map(job => {
      const startDate = new Date(job.pickup_date);
      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + 4); // Assume 4-hour duration

      return {
        id: job.id,
        jobId: job.id,
        title: job.title,
        start: startDate,
        end: endDate,
        status: job.status,
        driver: drivers[Math.floor(Math.random() * drivers.length)].name,
        vehicle: vehicles[Math.floor(Math.random() * vehicles.length)].name,
        priority: job.priority
      };
    });

    setScheduleEvents(events);
  };

  const getWeekDays = (date: Date) => {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }

    return week;
  };

  const getEventsForDay = (date: Date) => {
    return scheduleEvents.filter(event => {
      const eventDate = new Date(event.start);
      return eventDate.toDateString() === date.toDateString();
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    setCurrentDate(newDate);
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
      case 'low': return 'border-l-gray-400';
      case 'medium': return 'border-l-blue-400';
      case 'high': return 'border-l-orange-400';
      case 'urgent': return 'border-l-red-400';
      default: return 'border-l-gray-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-aximo-background to-aximo-background/80 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-aximo-primary"></div>
          <span className="ml-2 text-aximo-text">Loading Schedule...</span>
        </div>
      </div>
    );
  }

  const weekDays = getWeekDays(currentDate);

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
                Job Scheduler
              </h1>
              <p className="text-aximo-text-secondary mt-1">Optimize routes and allocate resources efficiently</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={() => setViewMode(viewMode === 'week' ? 'month' : 'week')}
              className="flex items-center gap-2"
            >
              {viewMode === 'week' ? <Grid className="h-4 w-4" /> : <List className="h-4 w-4" />}
              {viewMode === 'week' ? 'Month View' : 'Week View'}
            </Button>
            <Button className="bg-aximo-primary hover:bg-aximo-primary-hover flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Schedule Job
            </Button>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-6">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewMode === 'week' ? navigateWeek('prev') : navigateMonth('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-lg font-semibold text-aximo-text min-w-[200px] text-center">
                      {viewMode === 'week' 
                        ? `Week of ${weekDays[0].toLocaleDateString()}`
                        : currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
                      }
                    </h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => viewMode === 'week' ? navigateWeek('next') : navigateMonth('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                  >
                    Today
                  </Button>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-aximo-text-secondary" />
                    <Select value={selectedDriver} onValueChange={setSelectedDriver}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="All Drivers" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Drivers</SelectItem>
                        {drivers.map(driver => (
                          <SelectItem key={driver.id} value={driver.id}>
                            {driver.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Resource Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="space-y-4">
              {/* Drivers */}
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-aximo-primary" />
                    Drivers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {drivers.map(driver => (
                    <div key={driver.id} className="flex items-center justify-between p-2 rounded bg-aximo-background/50">
                      <span className="text-sm text-aximo-text">{driver.name}</span>
                      <Badge className={
                        driver.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        driver.status === 'busy' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }>
                        {driver.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Vehicles */}
              <Card className="border-aximo-border bg-aximo-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-aximo-primary" />
                    Vehicles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {vehicles.map(vehicle => (
                    <div key={vehicle.id} className="flex items-center justify-between p-2 rounded bg-aximo-background/50">
                      <div>
                        <span className="text-sm text-aximo-text block">{vehicle.name}</span>
                        <span className="text-xs text-aximo-text-secondary">{vehicle.type}</span>
                      </div>
                      <Badge className={
                        vehicle.status === 'available' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                        vehicle.status === 'maintenance' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                      }>
                        {vehicle.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Schedule Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <Card className="border-aximo-border bg-aximo-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-aximo-primary" />
                  Schedule Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                {viewMode === 'week' ? (
                  <div className="grid grid-cols-7 gap-2">
                    {/* Day Headers */}
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} className="p-2 text-center font-medium text-aximo-text-secondary border-b border-aximo-border">
                        {day}
                      </div>
                    ))}
                    
                    {/* Day Cells */}
                    {weekDays.map(day => {
                      const dayEvents = getEventsForDay(day);
                      const isToday = day.toDateString() === new Date().toDateString();
                      
                      return (
                        <div 
                          key={day.toISOString()} 
                          className={`min-h-[120px] p-2 border border-aximo-border/50 rounded ${
                            isToday ? 'bg-aximo-primary/5 border-aximo-primary/30' : 'bg-aximo-background/30'
                          }`}
                        >
                          <div className={`text-sm font-medium mb-2 ${
                            isToday ? 'text-aximo-primary' : 'text-aximo-text'
                          }`}>
                            {day.getDate()}
                          </div>
                          
                          <div className="space-y-1">
                            {dayEvents.slice(0, 3).map(event => (
                              <div 
                                key={event.id}
                                className={`p-1 rounded text-xs border-l-2 ${getPriorityColor(event.priority)} bg-aximo-card cursor-pointer hover:bg-aximo-background/50`}
                                onClick={() => navigate(`/jobs/details/${event.jobId}`)}
                              >
                                <div className="font-medium text-aximo-text truncate">{event.title}</div>
                                <div className="text-aximo-text-secondary">{event.driver}</div>
                              </div>
                            ))}
                            {dayEvents.length > 3 && (
                              <div className="text-xs text-aximo-text-secondary">
                                +{dayEvents.length - 3} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {scheduleEvents.slice(0, 10).map(event => (
                      <div 
                        key={event.id}
                        className={`p-4 rounded-lg border-l-4 ${getPriorityColor(event.priority)} bg-aximo-background/30 cursor-pointer hover:bg-aximo-background/50`}
                        onClick={() => navigate(`/jobs/details/${event.jobId}`)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-aximo-text">{event.title}</h4>
                            <div className="flex items-center gap-4 mt-1 text-sm text-aximo-text-secondary">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-3 w-3" />
                                {event.driver}
                              </span>
                              <span className="flex items-center gap-1">
                                <Truck className="h-3 w-3" />
                                {event.vehicle}
                              </span>
                            </div>
                          </div>
                          <Badge className={getStatusColor(event.status)}>
                            {event.status.replace('_', ' ').charAt(0).toUpperCase() + event.status.replace('_', ' ').slice(1)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-4 text-center">
              <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-medium text-aximo-text">Today's Jobs</h3>
              <p className="text-2xl font-bold text-aximo-primary">
                {getEventsForDay(new Date()).length}
              </p>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium text-aximo-text">Available Drivers</h3>
              <p className="text-2xl font-bold text-aximo-primary">
                {drivers.filter(d => d.status === 'available').length}
              </p>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-4 text-center">
              <Truck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-medium text-aximo-text">Available Vehicles</h3>
              <p className="text-2xl font-bold text-aximo-primary">
                {vehicles.filter(v => v.status === 'available').length}
              </p>
            </CardContent>
          </Card>

          <Card className="border-aximo-border bg-aximo-card">
            <CardContent className="p-4 text-center">
              <Route className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-medium text-aximo-text">Route Efficiency</h3>
              <p className="text-2xl font-bold text-aximo-primary">87%</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 