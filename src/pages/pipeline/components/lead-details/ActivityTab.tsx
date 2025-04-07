
import React from 'react';
import { Activity } from '../../data/pipelineTypes';
import ActivityTimeline from './ActivityTimeline';

interface ActivityTabProps {
  activities: Activity[];
  activityText: string;
  setActivityText: (text: string) => void;
  addActivity: () => void;
}

export default function ActivityTab({ 
  activities, 
  activityText, 
  setActivityText, 
  addActivity 
}: ActivityTabProps) {
  return (
    <ActivityTimeline 
      activities={activities}
      activityText={activityText}
      setActivityText={setActivityText}
      addActivity={addActivity}
    />
  );
}
