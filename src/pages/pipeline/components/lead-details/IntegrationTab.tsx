
import React, { useState } from 'react';
import { Calendar, CalendarDays, Mail, Send, ArrowRight, Briefcase, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from "@/components/ui/progress";
import DocumentSharingPanel from '@/components/integration/DocumentSharingPanel';
import { Lead } from '../../data/pipelineTypes';
import { useEnhancedEmailIntegration } from '../../hooks/useEnhancedEmailIntegration';
import { useEnhancedCalendarIntegration } from '../../hooks/useEnhancedCalendarIntegration';
import { useTMSIntegration } from '../../hooks/useTMSIntegration';
import { format } from 'date-fns';

interface IntegrationTabProps {
  lead: Lead;
  enhancedEmail?: ReturnType<typeof useEnhancedEmailIntegration>;
  enhancedCalendar?: ReturnType<typeof useEnhancedCalendarIntegration>;
  tmsIntegration?: ReturnType<typeof useTMSIntegration>;
}

export default function IntegrationTab({ 
  lead, 
  enhancedEmail, 
  enhancedCalendar,
  tmsIntegration
}: IntegrationTabProps) {
  const email = enhancedEmail || useEnhancedEmailIntegration();
  const calendar = enhancedCalendar || useEnhancedCalendarIntegration();
  const tms = tmsIntegration || useTMSIntegration();
  
  const [meetingDate, setMeetingDate] = useState<Date>(new Date());
  const onboardingProcess = tms.getOnboardingForLead(lead.id);
  
  const handleScheduleMeeting = () => {
    if (!calendar.isConnected) {
      calendar.connectProvider('google');
      return;
    }
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    const endTime = new Date(tomorrow);
    endTime.setHours(11, 0, 0, 0);
    
    calendar.scheduleMeeting(lead, {
      title: `Meeting with ${lead.company}`,
      startTime: tomorrow.toISOString(),
      endTime: endTime.toISOString(),
      description: `Discussion about next steps with ${lead.contact} from ${lead.company}`
    });
  };
  
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <DocumentSharingPanel 
          documentId={`lead-doc-${lead.id}`}
          documentName={`${lead.company} - Lead Information`}
          documentType="lead_profile"
        />
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <span>TMS Integration</span>
            </CardTitle>
            <CardDescription>Customer onboarding workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tms.status !== 'connected' ? (
              <div className="flex flex-col items-center py-6">
                <Briefcase className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Connect TMS System</h3>
                <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                  Connect to the TMS system to start customer onboarding
                </p>
                <Button 
                  onClick={() => tms.connectToTMS()}
                  disabled={tms.isPending}
                >
                  Connect TMS
                </Button>
              </div>
            ) : onboardingProcess ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Onboarding in Progress</p>
                    <p className="text-sm text-muted-foreground">
                      Started {format(new Date(onboardingProcess.startedAt), 'MMM d, yyyy')}
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                  >
                    View Details
                  </Button>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span>
                      {onboardingProcess.currentStepIndex} of {onboardingProcess.steps.length} steps
                    </span>
                  </div>
                  <Progress 
                    value={(onboardingProcess.currentStepIndex / onboardingProcess.steps.length) * 100} 
                  />
                </div>
                
                <div className="space-y-3 pt-2">
                  {onboardingProcess.steps.slice(0, 3).map((step, index) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step.status === 'completed' 
                          ? 'bg-green-100 text-green-600' 
                          : step.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-500'
                      }`}>
                        {step.status === 'completed' ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <span className="text-xs">{index + 1}</span>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{step.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {step.status === 'completed' 
                            ? 'Completed' 
                            : step.status === 'in_progress'
                              ? 'In progress'
                              : `Est. ${step.estimatedTimeMinutes} min`}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {onboardingProcess.steps.length > 3 && (
                    <Button variant="link" size="sm" className="ml-9 mt-1 h-auto p-0">
                      Show all steps ({onboardingProcess.steps.length})
                    </Button>
                  )}
                </div>
              </div>
            ) : lead.stage === 'closed-won' ? (
              <div className="flex flex-col items-center py-6">
                <Briefcase className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Start Onboarding</h3>
                <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                  This deal is marked as won. Start the customer onboarding process.
                </p>
                <Button 
                  onClick={() => tms.startOnboardingProcess(lead)}
                  disabled={tms.isPending}
                >
                  Start Onboarding Process
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-6">
                <Briefcase className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">TMS Ready</h3>
                <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                  TMS integration is connected and ready. Onboarding will be available when this deal is won.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
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
            {!calendar.isConnected ? (
              <div className="flex flex-col items-center py-6">
                <Calendar className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Connect Calendar</h3>
                <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                  Connect your calendar to schedule meetings with this lead
                </p>
                <div className="flex gap-3">
                  <Button 
                    onClick={() => calendar.connectProvider('google')}
                    disabled={calendar.syncStatus === 'syncing'}
                  >
                    Google Calendar
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => calendar.connectProvider('outlook')}
                    disabled={calendar.syncStatus === 'syncing'}
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
                      {calendar.activeProvider?.name} • {calendar.lastSynced && 
                        `Last synced ${format(new Date(calendar.lastSynced), 'MMM d, h:mm a')}`}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => calendar.disconnectCalendar()}
                  >
                    Disconnect
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button onClick={handleScheduleMeeting}>
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" onClick={() => calendar.syncCalendar()}>
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Sync Calendar
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
            {!email.isConfigured ? (
              <div className="flex flex-col items-center py-6">
                <Mail className="h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="text-lg font-medium">Setup Email Provider</h3>
                <p className="text-sm text-muted-foreground text-center mt-1 mb-4">
                  Configure your email provider to send emails
                </p>
                <div className="flex gap-2">
                  <Button 
                    onClick={() => email.connectProvider('gmail')}
                    disabled={email.isConnecting}
                  >
                    Gmail
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => email.connectProvider('outlook')}
                    disabled={email.isConnecting}
                  >
                    Outlook
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Provider Configured</p>
                    <p className="text-sm text-muted-foreground">
                      {email.activeProvider?.name || 'Email provider'} is ready to use
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => email.disconnectEmailProvider()}
                  >
                    Disconnect
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {email.templates.slice(0, 3).map(template => (
                    <Button
                      key={template.id}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => {
                        email.sendTemplatedEmail(template.id, lead);
                      }}
                    >
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {template.subject}
                        </p>
                      </div>
                      <ArrowRight className="h-4 w-4 ml-auto" />
                    </Button>
                  ))}
                  
                  <Button onClick={() => {
                    email.sendEmail({
                      subject: `Following up on our discussion - ${lead.company}`,
                      body: `Dear ${lead.contact},\n\nThank you for your time discussing your requirements. I'm following up as promised.\n\nBest regards,\nSales Team`,
                      to: [{ email: lead.email || 'contact@example.com', name: lead.contact }]
                    });
                  }} className="w-full mt-2">
                    <Send className="h-4 w-4 mr-2" />
                    Send Custom Email
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
