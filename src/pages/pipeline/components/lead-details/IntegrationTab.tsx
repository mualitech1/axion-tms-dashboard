
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Calendar, Mail, Truck, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Lead } from '../../data/pipelineTypes';
import { EnhancedCalendarIntegrationReturn } from '../../hooks/calendar/calendarTypes';
import { toast } from '@/hooks/use-toast';

interface IntegrationItemProps {
  label: string;
  description: string;
  connected: boolean;
  icon: React.ElementType;
  onConnect?: () => void;
  providerName?: string;
}

const IntegrationItem: React.FC<IntegrationItemProps> = ({ 
  label, 
  description, 
  connected, 
  icon: Icon,
  onConnect,
  providerName
}) => {
  return (
    <div className="flex items-center justify-between py-2 border-b last:border-0">
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-gray-100 p-2">
          <Icon className="h-5 w-5 text-gray-600" />
        </div>
        <div>
          <p className="font-medium">{label}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          {connected && providerName && (
            <p className="text-xs text-green-600 mt-1">Connected to {providerName}</p>
          )}
        </div>
      </div>
      {connected ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : onConnect ? (
        <Button 
          variant="outline" 
          size="sm"
          onClick={onConnect}
        >
          Connect
        </Button>
      ) : (
        <span className="text-gray-500">Not Connected</span>
      )}
    </div>
  );
};

interface IntegrationTabProps {
  leadId?: string;
  lead?: Lead;
  enhancedEmail?: any;
  enhancedCalendar?: EnhancedCalendarIntegrationReturn;
  tmsIntegration?: any;
}

export default function IntegrationTab({ 
  leadId, 
  lead,
  enhancedEmail,
  enhancedCalendar,
  tmsIntegration
}: IntegrationTabProps) {
  // Use leadId from prop or from lead object if available
  const currentLeadId = leadId || (lead && lead.id);
  
  // Determine connection status for each integration
  const calendarConnected = enhancedCalendar ? enhancedCalendar.isConnected : false;
  const calendarProvider = enhancedCalendar?.activeProvider?.name || null;
  const emailConnected = enhancedEmail ? enhancedEmail.activeProvider !== null : false;
  const tmsConnected = tmsIntegration ? tmsIntegration.status === 'connected' : false;
  
  // Handlers for connecting integrations
  const handleConnectCalendar = async () => {
    if (enhancedCalendar) {
      try {
        // Connect specifically to Google Calendar
        const success = await enhancedCalendar.connectProvider('google');
        if (success) {
          toast({
            title: "Google Calendar connected",
            description: "Successfully connected to Google Calendar"
          });
          
          // If we have a lead, schedule a demo meeting
          if (lead) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(10, 0, 0, 0);
            
            const endTime = new Date(tomorrow);
            endTime.setHours(11, 0, 0, 0);
            
            enhancedCalendar.scheduleMeeting(lead, {
              title: `Follow-up with ${lead.company}`,
              startTime: tomorrow.toISOString(),
              endTime: endTime.toISOString(),
              description: `Meeting with ${lead.contact} to discuss next steps.`
            });
          }
        }
      } catch (error) {
        console.error("Failed to connect to calendar:", error);
      }
    }
  };
  
  const handleConnectEmail = () => {
    if (enhancedEmail) {
      enhancedEmail.connectProvider('gmail');
    }
  };
  
  const handleConnectTMS = () => {
    if (tmsIntegration) {
      tmsIntegration.connectToTMS();
      
      // If lead is available and we're connected, start onboarding
      if (lead && tmsIntegration.status === 'connected') {
        tmsIntegration.startOnboardingProcess(lead);
      }
    }
  };
  
  // Schedule a meeting if we have a lead and calendar
  const handleScheduleMeeting = () => {
    if (!enhancedCalendar || !lead || !enhancedCalendar.isConnected) {
      toast({
        title: "Calendar not connected",
        description: "Please connect a calendar first",
        variant: "destructive"
      });
      return;
    }
    
    // Schedule for tomorrow at 10 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(10, 0, 0, 0);
    
    const endTime = new Date(tomorrow);
    endTime.setHours(11, 0, 0, 0);
    
    enhancedCalendar.scheduleMeeting(lead, {
      title: `Follow-up with ${lead.company}`,
      startTime: tomorrow.toISOString(),
      endTime: endTime.toISOString(),
      description: `Meeting with ${lead.contact} to discuss next steps.`
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Integrations</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-4">
          <IntegrationItem
            label="Calendar Integration"
            description="Sync your calendar to schedule meetings and track events."
            connected={calendarConnected}
            icon={Calendar}
            onConnect={handleConnectCalendar}
            providerName={calendarProvider}
          />
          <IntegrationItem
            label="Email Integration"
            description="Connect your email to send and receive messages directly."
            connected={emailConnected}
            icon={Mail}
            onConnect={handleConnectEmail}
          />
          <IntegrationItem
            label="TMS Integration"
            description="Integrate with your Transportation Management System for logistics."
            connected={tmsConnected}
            icon={Truck}
            onConnect={handleConnectTMS}
          />
          
          {calendarConnected && lead && (
            <Button 
              className="w-full mt-4"
              onClick={handleScheduleMeeting}
            >
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Follow-up Meeting
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
