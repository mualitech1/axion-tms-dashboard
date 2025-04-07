
import React from 'react';
import { Tag, Mail, Phone, Users, BarChart3, History } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Activity, ActivityType } from '../../data/pipelineTypes';

interface ActivityTimelineProps {
  activities: Activity[];
  activityText: string;
  setActivityText: (text: string) => void;
  addActivity: () => void;
}

export default function ActivityTimeline({
  activities,
  activityText,
  setActivityText,
  addActivity
}: ActivityTimelineProps) {
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case ActivityType.NOTE: return <Tag className="h-4 w-4 mr-2" />;
      case ActivityType.EMAIL: return <Mail className="h-4 w-4 mr-2" />;
      case ActivityType.CALL: return <Phone className="h-4 w-4 mr-2" />;
      case ActivityType.MEETING: return <Users className="h-4 w-4 mr-2" />;
      case ActivityType.STAGE_CHANGED: return <BarChart3 className="h-4 w-4 mr-2" />;
      default: return <History className="h-4 w-4 mr-2" />;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Add Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Textarea
              placeholder="Add a note, log a call, or record an activity..."
              value={activityText}
              onChange={(e) => setActivityText(e.target.value)}
              className="flex-1"
            />
            <Button className="self-end" onClick={addActivity}>Add</Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Activity Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pl-6 border-l border-border space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="relative pb-4">
                <div className="absolute -left-[25px] p-1 rounded-full bg-background border border-border">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="bg-muted/50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium">{ActivityType[activity.type]}</span>
                    <span className="text-sm text-muted-foreground">
                      {new Date(activity.timestamp).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
