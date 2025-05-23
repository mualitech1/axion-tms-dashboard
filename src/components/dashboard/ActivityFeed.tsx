import React from 'react';
import { Activity, Package, User, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface ActivityItem {
  id: string;
  type: 'order' | 'user' | 'system';
  description: string;
  timestamp: string;
  status?: 'pending' | 'completed' | 'failed';
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  maxItems?: number;
}

const ActivityFeed = ({ activities, maxItems = 10 }: ActivityFeedProps) => {
  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'order':
        return <Package className="h-4 w-4" />;
      case 'user':
        return <User className="h-4 w-4" />;
      case 'system':
        return <Activity className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };
  
  const getStatusClass = (status?: ActivityItem['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'pending':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  const displayActivities = activities.slice(0, maxItems);

  return (
    <div className="space-y-4">
      {displayActivities.length === 0 ? (
        <div className="text-center p-4 text-gray-500">
          <Activity className="h-10 w-10 mx-auto mb-2 opacity-50" />
          <p>No recent activity</p>
        </div>
      ) : (
        displayActivities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-start gap-3 p-3 rounded-md hover:bg-aximo-hover transition-colors"
          >
            <div className="mt-1 bg-aximo-accent/10 p-2 rounded-full text-aximo-accent">
              {getActivityIcon(activity.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <p className="font-medium text-sm">{activity.description}</p>
                {activity.status && (
                  <span className={cn("text-xs px-2 py-1 rounded-full", getStatusClass(activity.status))}>
                    {activity.status}
                  </span>
                )}
              </div>
              <p className="text-xs text-aximo-text-secondary mt-1">
                {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))
      )}
      
      {activities.length > maxItems && (
        <button className="w-full text-center py-2 text-sm text-aximo-accent hover:underline">
          View all activities
        </button>
      )}
    </div>
  );
};

export default ActivityFeed; 