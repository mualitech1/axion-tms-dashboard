
import { formatDistanceToNow } from 'date-fns';
import { ActivityType } from '../../data/pipelineTypes';

// Sample activity data
const recentActivities = [
  {
    id: 'act-1',
    leadId: 'lead-1',
    company: 'Acme Logistics',
    type: ActivityType.CALL,
    description: 'Follow-up call to discuss proposal',
    timestamp: '2025-04-06T14:30:00',
    userId: 'user-1',
    userName: 'John Doe'
  },
  {
    id: 'act-2',
    leadId: 'lead-3',
    company: 'Quick Deliveries',
    type: ActivityType.EMAIL,
    description: 'Sent revised pricing structure',
    timestamp: '2025-04-05T16:15:00',
    userId: 'user-1',
    userName: 'John Doe'
  },
  {
    id: 'act-3',
    leadId: 'lead-6',
    company: 'Food Distributors UK',
    type: ActivityType.MEETING,
    description: 'Final contract review meeting',
    timestamp: '2025-04-05T11:00:00',
    userId: 'user-3',
    userName: 'Alice Thompson'
  },
  {
    id: 'act-4',
    leadId: 'lead-4',
    company: 'Retail Solutions',
    type: ActivityType.STAGE_CHANGED,
    description: 'Moved from Proposal to Negotiation',
    timestamp: '2025-04-04T09:45:00',
    userId: 'user-2',
    userName: 'Sarah Wilson'
  },
  {
    id: 'act-5',
    leadId: 'lead-5',
    company: 'Tech Innovations',
    type: ActivityType.NOTE,
    description: 'Customer requested detailed insurance information',
    timestamp: '2025-04-03T15:20:00',
    userId: 'user-2',
    userName: 'Sarah Wilson'
  }
];

export default function RecentActivity() {
  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => {
        const activityDate = new Date(activity.timestamp);
        const timeAgo = formatDistanceToNow(activityDate, { addSuffix: true });
        
        return (
          <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b last:border-0">
            <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                {activity.company}
              </p>
              <p className="text-sm text-muted-foreground leading-snug">
                {activity.description}
              </p>
              <div className="flex items-center pt-1 text-xs text-muted-foreground">
                <span>{activity.userName}</span>
                <span className="mx-1">•</span>
                <span>{timeAgo}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getActivityIcon(type: ActivityType) {
  switch (type) {
    case ActivityType.CALL:
      return (
        <div className="rounded-full p-1 bg-blue-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </div>
      );
    case ActivityType.EMAIL:
      return (
        <div className="rounded-full p-1 bg-green-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        </div>
      );
    case ActivityType.MEETING:
      return (
        <div className="rounded-full p-1 bg-purple-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        </div>
      );
    case ActivityType.STAGE_CHANGED:
      return (
        <div className="rounded-full p-1 bg-amber-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </div>
      );
    case ActivityType.NOTE:
    default:
      return (
        <div className="rounded-full p-1 bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
          </svg>
        </div>
      );
  }
}
