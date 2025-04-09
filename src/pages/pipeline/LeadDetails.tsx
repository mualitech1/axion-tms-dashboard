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
import { useAutomatedTriggers } from './hooks/useAutomatedTriggers';
import { useEnhancedEmailIntegration } from './hooks/useEnhancedEmailIntegration';
import { useEnhancedCalendarIntegration } from './hooks/useEnhancedCalendarIntegration';
import { useTMSIntegration } from './hooks/useTMSIntegration';
import AutomationPanel from './components/automation/AutomationPanel';

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
  const [prevLead, setPrevLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityText, setActivityText] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: 'field1', name: 'Decision Maker', type: 'text', value: 'Sarah Johnson' },
    { id: 'field2', name: 'Budget Confirmed', type: 'checkbox', value: true },
    { id: 'field3', name: 'Next Meeting', type: 'date', value: '2025-04-15' }
  ]);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  
  // Initialize integration hooks
  const automatedTriggers = useAutomatedTriggers({
    onCreateTask: (taskData) => {
      toast({
        title: "Task created automatically",
        description: `"${taskData.title}" for ${lead?.company}`
      });
    },
    onCreateReminder: (reminderData) => {
      toast({
        title: "Reminder set automatically",
        description: `"${reminderData.title}" for ${lead?.company}`
      });
    },
    onSendEmail: (emailData) => {
      enhancedEmail.sendEmail(emailData);
    }
  });
  
  const enhancedEmail = useEnhancedEmailIntegration();
  const enhancedCalendar = useEnhancedCalendarIntegration();
  const tmsIntegration = useTMSIntegration();
  
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
  
  // Check for changes in lead data to trigger automations
  useEffect(() => {
    if (prevLead && lead && prevLead !== lead) {
      automatedTriggers.processLeadChange(prevLead, lead, activities);
      
      // If lead stage changed to "closed-won", suggest TMS onboarding
      if (prevLead.stage !== 'closed-won' && lead.stage === 'closed-won') {
        toast({
          title: "Deal won! 🎉",
          description: "Start the TMS onboarding process for this customer?"
        });
      }
    }
    
    // Update prevLead after processing changes
    if (lead !== prevLead) {
      setPrevLead(lead);
    }
  }, [lead, prevLead, automatedTriggers, activities]);
  
  const handleSave = (data: Lead) => {
    console.log('Saving lead:', data);
    
    // Store previous lead data for change detection
    setPrevLead(lead);
    
    // Update lead data
    setLead(data);
    
    // Notify TMS integration if status changed to "closed-won"
    if (data.stage === 'closed-won') {
      if (tmsIntegration.status === 'connected') {
        tmsIntegration.startOnboardingProcess(data);
      } else {
        toast({
          title: "TMS integration not connected",
          description: "Connect TMS to begin customer onboarding",
          variant: "destructive"
        });
      }
    }
    
    // Add activity for the update
    const newActivity: Activity = {
      id: `activity-${Date.now()}`,
      leadId: data.id,
      type: ActivityType.NOTE,
      description: 'Lead information updated',
      timestamp: new Date().toISOString(),
      userId: 'current-user'
    };
    
    setActivities(prev => [newActivity, ...prev]);
    
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
  
  const handleStartTMSOnboarding = () => {
    if (!lead) return;
    
    if (tmsIntegration.status !== 'connected') {
      tmsIntegration.connectToTMS().then(connected => {
        if (connected) {
          setTimeout(() => tmsIntegration.startOnboardingProcess(lead), 500);
        }
      });
    } else {
      tmsIntegration.startOnboardingProcess(lead);
    }
  };
  
  if (!lead) {
    return null; // Will redirect via useEffect
  }
  
  return (
    <MainLayout title={`Lead: ${lead.company}`}>
      <LeadHeader 
        lead={lead} 
        onSetReminder={handleSetReminder} 
        onStartOnboarding={lead.stage === 'closed-won' ? handleStartTMSOnboarding : undefined}
      />

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Lead Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
          <TabsTrigger value="integration">Integration</TabsTrigger>
          <TabsTrigger value="custom">Custom Fields</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
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
          <IntegrationTab 
            leadId={lead.id} 
            lead={lead}
            enhancedEmail={enhancedEmail}
            enhancedCalendar={enhancedCalendar}
            tmsIntegration={tmsIntegration}
          />
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <CustomFieldsTab 
            customFields={customFields}
            setCustomFields={setCustomFields}
          />
        </TabsContent>
        
        <TabsContent value="automation" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <AutomationPanel 
              onCreateTask={(taskData) => {
                toast({
                  title: "Task created",
                  description: `"${taskData.title}" for ${lead.company}`
                });
              }}
              onCreateReminder={(reminderData) => {
                toast({
                  title: "Reminder set",
                  description: `"${reminderData.title}" for ${lead.company}`
                });
              }}
              onSendEmail={(emailData) => {
                enhancedEmail.sendEmail(emailData);
              }}
            />
          </div>
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
