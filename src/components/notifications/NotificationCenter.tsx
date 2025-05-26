import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { 
  Bell, 
  X, 
  Check, 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  Truck, 
  Package, 
  Users, 
  DollarSign,
  Clock,
  Zap,
  Eye,
  EyeOff
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';

interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  category: 'job' | 'carrier' | 'customer' | 'system' | 'finance';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  actions?: {
    label: string;
    action: () => void;
  }[];
  relatedId?: string;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filter, setFilter] = useState<'all' | 'unread' | 'job' | 'carrier' | 'customer' | 'finance'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      loadNotifications();
      setupRealTimeUpdates();
    }
  }, [isOpen]);

  const loadNotifications = async () => {
    setLoading(true);
    
    // Simulate loading notifications - in real app, this would come from Supabase
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        category: 'job',
        title: 'Job Completed',
        message: 'IKB-2025-001 has been successfully delivered by Swift Transport',
        read: false,
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        actions: [
          { label: 'View Job', action: () => console.log('View job') },
          { label: 'Generate Invoice', action: () => console.log('Generate invoice') }
        ]
      },
      {
        id: '2',
        type: 'warning',
        category: 'carrier',
        title: 'Document Expiry Alert',
        message: 'Swift Transport\'s insurance certificate expires in 7 days',
        read: false,
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        actions: [
          { label: 'Contact Carrier', action: () => console.log('Contact carrier') }
        ]
      },
      {
        id: '3',
        type: 'info',
        category: 'customer',
        title: 'New Customer Inquiry',
        message: 'ABC Manufacturing has submitted a quote request for 5 shipments',
        read: true,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        actions: [
          { label: 'View Quote', action: () => console.log('View quote') },
          { label: 'Contact Customer', action: () => console.log('Contact customer') }
        ]
      },
      {
        id: '4',
        type: 'error',
        category: 'system',
        title: 'System Alert',
        message: 'GPS tracking service experiencing intermittent issues',
        read: false,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
        actions: [
          { label: 'View Status', action: () => console.log('View system status') }
        ]
      },
      {
        id: '5',
        type: 'success',
        category: 'finance',
        title: 'Payment Received',
        message: 'Invoice IKB-INV-2025-123 paid by XYZ Logistics (£4,560)',
        read: true,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
        actions: [
          { label: 'View Invoice', action: () => console.log('View invoice') }
        ]
      }
    ];

    setNotifications(mockNotifications);
    setLoading(false);
  };

  const setupRealTimeUpdates = () => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: Math.random() > 0.5 ? 'info' : 'success',
        category: ['job', 'carrier', 'customer', 'finance'][Math.floor(Math.random() * 4)] as any,
        title: 'Real-time Update',
        message: `Live notification received at ${new Date().toLocaleTimeString()}`,
        read: false,
        timestamp: new Date()
      };

      setNotifications(prev => [newNotification, ...prev.slice(0, 19)]); // Keep max 20 notifications
    }, 30000); // New notification every 30 seconds

    return () => clearInterval(interval);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type: string, category: string) => {
    const iconProps = { className: "h-4 w-4" };
    
    if (category === 'job') return <Package {...iconProps} />;
    if (category === 'carrier') return <Truck {...iconProps} />;
    if (category === 'customer') return <Users {...iconProps} />;
    if (category === 'finance') return <DollarSign {...iconProps} />;
    
    switch (type) {
      case 'success': return <CheckCircle {...iconProps} />;
      case 'warning': return <AlertTriangle {...iconProps} />;
      case 'error': return <AlertTriangle {...iconProps} />;
      default: return <Info {...iconProps} />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success': return 'border-l-green-500 bg-green-50/50';
      case 'warning': return 'border-l-yellow-500 bg-yellow-50/50';
      case 'error': return 'border-l-red-500 bg-red-50/50';
      default: return 'border-l-blue-500 bg-blue-50/50';
    }
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notification.read;
    return notification.category === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-slate-900 shadow-2xl border-l border-gray-200 dark:border-slate-700">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <Bell className="h-6 w-6 text-blue-600" />
              <div>
                <h2 className="text-lg font-semibold">Notifications</h2>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                  </p>
                )}
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Filter Tabs */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-700">
            <div className="flex flex-wrap gap-2">
              {['all', 'unread', 'job', 'carrier', 'customer', 'finance'].map((filterOption) => (
                <Button
                  key={filterOption}
                  variant={filter === filterOption ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilter(filterOption as any)}
                  className="text-xs"
                >
                  {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                  {filterOption === 'unread' && unreadCount > 0 && (
                    <Badge className="ml-1 h-4 w-4 p-0 text-[10px]">{unreadCount}</Badge>
                  )}
                </Button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-4 border-b border-gray-200 dark:border-slate-700">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={markAllAsRead}
                disabled={unreadCount === 0}
                className="flex-1"
              >
                <Check className="h-3 w-3 mr-1" />
                Mark All Read
              </Button>
              <Button variant="outline" size="sm" onClick={loadNotifications}>
                <Zap className="h-3 w-3 mr-1" />
                Refresh
              </Button>
            </div>
          </div>

          {/* Notifications List */}
          <ScrollArea className="flex-1">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Loading notifications...</p>
              </div>
            ) : filteredNotifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">
                  {filter === 'all' ? 'No notifications yet' : `No ${filter} notifications`}
                </p>
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`p-4 border-l-4 transition-all hover:shadow-md ${getNotificationColor(notification.type)} ${
                      !notification.read ? 'ring-2 ring-blue-500/20' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`p-2 rounded-full ${getBadgeColor(notification.type)}`}>
                          {getNotificationIcon(notification.type, notification.category)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-sm font-medium truncate">{notification.title}</h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-600 rounded-full ml-2"></div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500">
                              {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                            </p>
                            <Badge className={`text-xs ${getBadgeColor(notification.type)}`}>
                              {notification.category}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 ml-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="h-6 w-6 p-0"
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {notification.actions && notification.actions.length > 0 && (
                      <>
                        <Separator className="my-3" />
                        <div className="flex flex-wrap gap-2">
                          {notification.actions.map((action, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={action.action}
                              className="text-xs"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      </>
                    )}
                  </Card>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
} 