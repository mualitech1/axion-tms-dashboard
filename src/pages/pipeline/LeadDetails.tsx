import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { initialLeadsData } from './data/pipelineData';
import { Lead, LeadStatus, LeadSource, ActivityType, Activity } from './data/pipelineTypes';
import CollaborationTab from './components/collaboration/CollaborationTab';
import ReminderDialog from './components/collaboration/ReminderDialog';
import { toast } from '@/hooks/use-toast';

// Import the refactored components
import LeadHeader from './components/lead-details/LeadHeader';
import DetailsTab from './components/lead-details/DetailsTab';
import ActivityTab from './components/lead-details/ActivityTab';
import IntegrationTab from './components/lead-details/IntegrationTab';
import CustomFieldsTab from './components/lead-details/CustomFieldsTab';
import { CustomField } from './components/lead-details/CustomFieldsCard';

// Mock activities
const mockActivities: Activity[] = [
  {
    id: 'activity-1',
    leadId: 'lead-1',
    type: ActivityType.NOTE,
    description: 'Initial meeting with Jane to discuss requirements',
    timestamp: '2025-04-02T14:30:00',
    userId: 'user-1'
  },
  {
    id: 'activity-2',
    leadId: 'lead-1',
    type: ActivityType.CALL,
    description: 'Follow-up call to discuss proposal details',
    timestamp: '2025-03-28T11:15:00',
    userId: 'user-1'
  },
  {
    id: 'activity-3',
    leadId: 'lead-1',
    type: ActivityType.EMAIL,
    description: 'Sent pricing information and service details',
    timestamp: '2025-03-25T09:45:00',
    userId: 'user-2'
  },
  {
    id: 'activity-4',
    leadId: 'lead-1',
    type: ActivityType.STAGE_CHANGED,
    description: 'Moved from Initial Contact to Discovery',
    timestamp: '2025-03-22T16:30:00',
    userId: 'system'
  }
];

export default function LeadDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityText, setActivityText] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: 'field1', name: 'Decision Maker', type: 'text', value: 'Sarah Johnson' },
    { id: 'field2', name: 'Budget Confirmed', type: 'checkbox', value: true },
    { id: 'field3', name: 'Next Meeting', type: 'date', value: '2025-04-15' }
  ]);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  
  const form = useForm<Lead>({
    defaultValues: lead || undefined
  });

  useEffect(() => {
    const foundLead = initialLeadsData.find(lead => lead.id === id);
    if (foundLead) {
      setLead(foundLead);
      form.reset(foundLead);
    } else {
      toast({
        title: "Lead not found",
        description: "The lead you're looking for doesn't exist or has been deleted",
        variant: "destructive"
      });
      navigate("/sales-pipeline/board");
    }
    
    setActivities(mockActivities.filter(activity => activity.leadId === id));
  }, [id, form, navigate]);
  
  const handleSave = (data: Lead) => {
    console.log('Saving lead:', data);
    setLead(data);
    
    // Notify TMS integration
    toast({
      title: "Lead updated",
      description: "Lead information has been updated and synced with TMS"
    });
  };
  
  const addActivity = () => {
    if (!activityText.trim() || !lead) return;
    
    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      leadId: lead.id,
      type: ActivityType.NOTE,
      description: activityText,
      timestamp: new Date().toISOString(),
      userId: 'current-user'
    };
    
    setActivities([newActivity, ...activities]);
    setActivityText('');
  };
  
  const handleSetReminder = () => {
    setShowReminderDialog(true);
  };
  
  if (!lead) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <MainLayout title={`Lead: ${lead.company}`}>
      <LeadHeader lead={lead} onSetReminder={handleSetReminder} />

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Lead Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="custom">Custom Fields</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-4">
          <DetailsTab form={form} lead={lead} onSave={handleSave} />
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <ActivityTab 
            activities={activities}
            activityText={activityText}
            setActivityText={setActivityText}
            addActivity={addActivity}
          />
        </TabsContent>
        
        <TabsContent value="collaboration" className="space-y-4">
          <CollaborationTab leadId={lead.id} company={lead.company} />
        </TabsContent>
        
        <TabsContent value="integration" className="space-y-4">
          <IntegrationTab lead={lead} />
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <CustomFieldsTab 
            customFields={customFields}
            setCustomFields={setCustomFields}
          />
        </TabsContent>
      </Tabs>
      
      <ReminderDialog
        open={showReminderDialog}
        onClose={() => setShowReminderDialog(false)}
        leadId={lead.id}
        company={lead.company}
      />
    </MainLayout>
  );
}
