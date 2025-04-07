import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { initialLeadsData } from './data/pipelineData';
import { Lead, LeadStatus, LeadSource, ActivityType, Activity } from './data/pipelineTypes';
import CollaborationTab from './components/collaboration/CollaborationTab';
import ReminderDialog from './components/collaboration/ReminderDialog';
import { toast } from '@/hooks/use-toast';
import { Calendar, CalendarDays, Mail, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Import the refactored components
import LeadHeader from './components/lead-details/LeadHeader';
import LeadContactInfo from './components/lead-details/LeadContactInfo';
import LeadDealInfo from './components/lead-details/LeadDealInfo';
import LeadNotesCard from './components/lead-details/LeadNotesCard';
import ActivityTimeline from './components/lead-details/ActivityTimeline';
import CustomFieldsCard, { CustomField } from './components/lead-details/CustomFieldsCard';

// Import new integration components
import DocumentSharingPanel from '@/components/integration/DocumentSharingPanel';

// Import integration hooks
import { useCalendarIntegration } from '@/hooks/use-calendar-integration';
import { useEmailIntegration } from '@/hooks/use-email-integration';

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
  const [lead, setLead] = useState<Lead | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activityText, setActivityText] = useState('');
  const [customFields, setCustomFields] = useState<CustomField[]>([
    { id: 'field1', name: 'Decision Maker', type: 'text', value: 'Sarah Johnson' },
    { id: 'field2', name: 'Budget Confirmed', type: 'checkbox', value: true },
    { id: 'field3', name: 'Next Meeting', type: 'date', value: '2025-04-15' }
  ]);
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  
  // Initialize integration hooks
  const calendarIntegration = useCalendarIntegration();
  const emailIntegration = useEmailIntegration();
  
  const form = useForm<Lead>({
    defaultValues: lead || undefined
  });

  useEffect(() => {
    const foundLead = initialLeadsData.find(lead => lead.id === id);
    if (foundLead) {
      setLead(foundLead);
      form.reset(foundLead);
    }
    
    setActivities(mockActivities.filter(activity => activity.leadId === id));
  }, [id, form]);
  
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
    return (
      <MainLayout title="Lead Not Found">
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-2xl font-bold mb-4">Lead Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The lead you're looking for doesn't exist or has been deleted.
          </p>
        </div>
      </MainLayout>
    );
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
          <div className="grid md:grid-cols-2 gap-6">
            <LeadContactInfo form={form} onSave={handleSave} />
            <LeadDealInfo lead={lead} />
            <LeadNotesCard 
              form={form} 
              tags={lead.tags} 
              onSave={() => form.handleSubmit(handleSave)()} 
            />
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-4">
          <ActivityTimeline 
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
          <div className="grid md:grid-cols-2 gap-6">
            <DocumentSharingPanel 
              documentId={`lead-doc-${lead.id}`}
              documentName={`${lead.company} - Lead Information`}
              documentType="lead_profile"
            />
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span>Calendar Integration</span>
                  </CardTitle>
                  <CardDescription>Schedule meetings and events</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!calendarIntegration.isConnected ? (
                    <div className="flex flex-col items-center py-6">
                      <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Connect Calendar</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                        Connect your calendar to schedule meetings with this lead
                      </p>
                      <div className="flex gap-3">
                        <Button 
                          variant="outline"
                          onClick={() => calendarIntegration.connectCalendar('google')}
                          disabled={calendarIntegration.isPending}
                        >
                          Google Calendar
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => calendarIntegration.connectCalendar('outlook')}
                          disabled={calendarIntegration.isPending}
                        >
                          Outlook
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Calendar Connected</p>
                          <p className="text-sm text-muted-foreground">
                            Your calendar is ready to use
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => calendarIntegration.disconnectCalendar()}
                        >
                          Disconnect
                        </Button>
                      </div>
                      
                      <div>
                        <Button onClick={() => calendarIntegration.getUpcomingEvents()}>
                          <CalendarDays className="h-4 w-4 mr-2" />
                          View Upcoming Events
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    <span>Email Integration</span>
                  </CardTitle>
                  <CardDescription>Send emails and use templates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {!emailIntegration.isConfigured ? (
                    <div className="flex flex-col items-center py-6">
                      <Mail className="h-12 w-12 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">Setup Email Provider</h3>
                      <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                        Configure your email provider to send emails
                      </p>
                      <Button 
                        onClick={() => emailIntegration.configureEmailProvider('smtp', {
                          host: 'smtp.example.com',
                          port: '587',
                          username: 'demo@example.com'
                        })}
                        disabled={emailIntegration.isConnecting}
                      >
                        Configure SMTP
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Provider Configured</p>
                          <p className="text-sm text-muted-foreground">
                            Your email provider is ready to use
                          </p>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => emailIntegration.disconnectEmailProvider()}
                        >
                          Disconnect
                        </Button>
                      </div>
                      
                      <div>
                        <Button onClick={() => {
                          emailIntegration.sendEmail({
                            subject: `Follow-up with ${lead.company}`,
                            body: `Dear ${lead.contact},\n\nThank you for your interest in our services.\n\nBest regards,\nSales Team`,
                            to: [{ email: lead.email || 'contact@example.com', name: lead.contact }]
                          });
                        }}>
                          <Send className="h-4 w-4 mr-2" />
                          Send Follow-up Email
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="custom" className="space-y-4">
          <CustomFieldsCard 
            customFields={customFields}
            onChange={setCustomFields}
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
