
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { Bell, X, User, Calendar, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'task' | 'reminder' | 'system' | 'mention';
}

// Sample notifications (in a real app, this would come from an API)
const initialNotifications: Notification[] = [
  {
    id: 'notif-1',
    title: 'Task Due Today',
    description: 'Send follow-up email to Acme Logistics',
    timestamp: '2025-04-07T09:15:00',
    read: false,
    type: 'task'
  },
  {
    id: 'notif-2',
    title: 'Meeting Reminder',
    description: 'Contract negotiation with Quick Deliveries in 30 minutes',
    timestamp: '2025-04-07T08:30:00',
    read: false,
    type: 'reminder'
  },
  {
    id: 'notif-3',
    title: 'Task Assigned',
    description: 'John assigned you a new task: "Prepare proposal for Global Freight Ltd"',
    timestamp: '2025-04-06T16:45:00',
    read: false,
    type: 'task'
  },
  {
    id: 'notif-4',
    title: 'Lead Status Updated',
    description: 'Tech Innovations moved to Negotiation stage',
    timestamp: '2025-04-06T14:22:00',
    read: true,
    type: 'system'
  },
  {
    id: 'notif-5',
    title: 'You were mentioned',
    description: 'Sarah mentioned you in a note on Retail Solutions',
    timestamp: '2025-04-05T11:05:00',
    read: true,
    type: 'mention'
  }
];

export default function NotificationsPanel() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [open, setOpen] = useState(false);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === notificationId ? { ...notification, read: true } : notification
    ));
  };
  
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, read: true })));
  };
  
  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(notification => notification.id !== notificationId));
  };
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <CheckCircle className="h-4 w-4" />;
      case 'reminder':
        return <Clock className="h-4 w-4" />;
      case 'mention':
        return <User className="h-4 w-4" />;
      case 'system':
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-sm">
        <SheetHeader className="flex-row items-center justify-between">
          <SheetTitle>Notifications</SheetTitle>
          <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            Mark all as read
          </Button>
        </SheetHeader>
        
        <div className="mt-6 space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <p className="mt-2 text-sm text-muted-foreground">No notifications</p>
            </div>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id}
                className={`flex items-start p-3 rounded-lg relative ${
                  notification.read ? 'bg-background' : 'bg-muted/40'
                }`}
              >
                <div className={`p-2 rounded-full mr-3 ${
                  notification.read ? 'bg-muted' : 'bg-primary/10'
                }`}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div className="flex-1" onClick={() => markAsRead(notification.id)}>
                  <div className="flex justify-between items-start">
                    <h4 className={`text-sm font-medium ${notification.read ? '' : 'text-primary'}`}>
                      {notification.title}
                    </h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 -mt-1 -mr-1 opacity-60 hover:opacity-100"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <p className="text-sm mt-1 text-muted-foreground">
                    {notification.description}
                  </p>
                  
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                    </span>
                    
                    {!notification.read && (
                      <Badge variant="outline" className="text-xs">New</Badge>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
