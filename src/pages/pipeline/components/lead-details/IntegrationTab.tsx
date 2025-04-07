
import React from 'react';
import { Calendar, CalendarDays, Mail, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentSharingPanel from '@/components/integration/DocumentSharingPanel';
import { useCalendarIntegration } from '@/hooks/use-calendar-integration';
import { useEmailIntegration } from '@/hooks/use-email-integration';
import { Lead } from '../../data/pipelineTypes';

interface IntegrationTabProps {
  lead: Lead;
}

export default function IntegrationTab({ lead }: IntegrationTabProps) {
  // Initialize integration hooks
  const calendarIntegration = useCalendarIntegration();
  const emailIntegration = useEmailIntegration();
  
  return (
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
  );
}
