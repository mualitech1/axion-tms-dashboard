
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, FileText, ArrowRight } from 'lucide-react';

interface ActivityItem {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  company: string;
  description: string;
  user: string;
  time: string;
}

export default function RecentActivityPanel() {
  const activities: ActivityItem[] = [
    {
      id: '1',
      icon: <Phone className="h-4 w-4 text-blue-600" />,
      iconBg: 'bg-blue-100',
      company: 'Acme Logistics',
      description: 'Follow-up call to discuss proposal',
      user: 'John Doe',
      time: '1 day ago'
    },
    {
      id: '2',
      icon: <Mail className="h-4 w-4 text-green-600" />,
      iconBg: 'bg-green-100',
      company: 'Quick Deliveries',
      description: 'Sent revised pricing structure',
      user: 'John Doe',
      time: '2 days ago'
    },
    {
      id: '3',
      icon: <FileText className="h-4 w-4 text-purple-600" />,
      iconBg: 'bg-purple-100',
      company: 'Food Distributors UK',
      description: 'Final contract review meeting',
      user: 'Alice Thompson',
      time: '2 days ago'
    },
    {
      id: '4',
      icon: <ArrowRight className="h-4 w-4 text-yellow-600" />,
      iconBg: 'bg-yellow-100',
      company: 'Retail Solutions',
      description: 'Moved from Proposal to Negotiation',
      user: 'Sarah Wilson',
      time: '4 days ago'
    },
    {
      id: '5',
      icon: <FileText className="h-4 w-4 text-gray-600" />,
      iconBg: 'bg-gray-100',
      company: 'Tech Innovations',
      description: 'Customer requested detailed insurance information',
      user: 'Sarah Wilson',
      time: '4 days ago'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className={`${activity.iconBg} p-2 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0`}>
                {activity.icon}
              </div>
              <div className="space-y-1">
                <p className="font-medium">{activity.company}</p>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
