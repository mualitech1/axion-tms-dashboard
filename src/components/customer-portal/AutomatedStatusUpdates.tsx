
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Bell, Clock, Calendar, CalendarCheck, Check } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Customer } from '@/types/customer';
import { Badge } from '@/components/ui/badge';
import { toast } from "@/hooks/use-toast";

interface AutomatedStatusUpdatesProps {
  customer: Customer;
}

export default function AutomatedStatusUpdates({ customer }: AutomatedStatusUpdatesProps) {
  const [emailPreferences, setEmailPreferences] = useState({
    documentUpdates: true,
    invoiceIssued: true,
    paymentReceived: false,
    orderStatusChanges: true,
    deliveryUpdates: true
  });
  
  const [jobNotifications, setJobNotifications] = useState({
    booked: true,
    inTransit: true,
    delivered: true,
    exceptions: true,
    delayed: false
  });

  const recentActivity = [
    { 
      type: "document", 
      title: "Insurance Document", 
      status: "expiring soon", 
      date: "2025-04-20", 
      autoNotified: true 
    },
    { 
      type: "job", 
      title: "Delivery #JB5592", 
      status: "in transit", 
      date: "2025-04-05", 
      autoNotified: true 
    },
    { 
      type: "invoice", 
      title: "Invoice #INV-2254", 
      status: "issued", 
      date: "2025-04-02", 
      autoNotified: true 
    },
    { 
      type: "job", 
      title: "Pickup #JB5590", 
      status: "completed", 
      date: "2025-03-30", 
      autoNotified: true 
    },
  ];

  const handleTogglePreference = (category: string, key: string) => {
    if (category === 'email') {
      setEmailPreferences(prev => ({
        ...prev,
        [key]: !prev[key as keyof typeof prev]
      }));
    } else if (category === 'job') {
      setJobNotifications(prev => ({
        ...prev,
        [key]: !prev[key as keyof typeof prev]
      }));
    }
    
    toast({
      title: "Preferences updated",
      description: "Your notification preferences have been updated.",
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'expiring soon':
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'expired':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'in transit':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'issued':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <CalendarCheck className="h-4 w-4 text-orange-500" />;
      case 'job':
        return <Clock className="h-4 w-4 text-blue-500" />;
      case 'invoice':
        return <Calendar className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="p-2 bg-blue-50 rounded-full">
            <Bell className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <CardTitle className="text-xl font-semibold">Automated Status Updates</CardTitle>
            <CardDescription>Configure how you receive updates about your account</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preferences" className="space-y-6">
          <TabsList>
            <TabsTrigger value="preferences">Notification Preferences</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Email Notifications</h3>
              <div className="space-y-3">
                {Object.entries(emailPreferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={`email-${key}`} className="flex items-center gap-2">
                      {key === 'documentUpdates' && <CalendarCheck className="h-4 w-4 text-gray-500" />}
                      {key === 'invoiceIssued' && <Calendar className="h-4 w-4 text-gray-500" />}
                      {key === 'paymentReceived' && <Check className="h-4 w-4 text-gray-500" />}
                      {key === 'orderStatusChanges' && <Clock className="h-4 w-4 text-gray-500" />}
                      {key === 'deliveryUpdates' && <Bell className="h-4 w-4 text-gray-500" />}
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <Switch 
                      id={`email-${key}`} 
                      checked={value} 
                      onCheckedChange={() => handleTogglePreference('email', key)}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Job Status Notifications</h3>
              <div className="space-y-3">
                {Object.entries(jobNotifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <Label htmlFor={`job-${key}`} className="flex items-center gap-2">
                      {key === 'booked' && <Calendar className="h-4 w-4 text-gray-500" />}
                      {key === 'inTransit' && <Clock className="h-4 w-4 text-gray-500" />}
                      {key === 'delivered' && <Check className="h-4 w-4 text-gray-500" />}
                      {key === 'exceptions' && <Bell className="h-4 w-4 text-gray-500" />}
                      {key === 'delayed' && <Clock className="h-4 w-4 text-gray-500" />}
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
                    </Label>
                    <Switch 
                      id={`job-${key}`} 
                      checked={value} 
                      onCheckedChange={() => handleTogglePreference('job', key)}
                    />
                  </div>
                ))}
              </div>
            </div>
            
            <Button className="w-full">Save Preferences</Button>
          </TabsContent>
          
          <TabsContent value="activity">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">Recent Automated Notifications</h3>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                    <div className="flex items-center gap-3">
                      {getActivityIcon(activity.type)}
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusBadgeColor(activity.status)}>
                            {activity.status}
                          </Badge>
                          <span className="text-xs text-gray-500">{formatDate(activity.date)}</span>
                        </div>
                      </div>
                    </div>
                    {activity.autoNotified && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1">
                        <Bell className="h-3 w-3" />
                        <span>Auto-notified</span>
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
