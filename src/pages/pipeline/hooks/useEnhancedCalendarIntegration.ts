
import { useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';
import { useCalendarIntegration } from '@/hooks/use-calendar-integration';
import { Lead } from '../data/pipelineTypes';

interface CalendarProvider {
  name: string;
  type: 'google' | 'outlook' | 'ical';
  icon: string;
}

const providers: CalendarProvider[] = [
  {
    name: 'Google Calendar',
    type: 'google',
    icon: 'google'
  },
  {
    name: 'Outlook Calendar',
    type: 'outlook',
    icon: 'microsoft'
  },
  {
    name: 'iCalendar',
    type: 'ical',
    icon: 'calendar'
  }
];

interface UseEnhancedCalendarIntegrationProps {
  onEventCreated?: (eventData: any) => void;
}

export const useEnhancedCalendarIntegration = (props?: UseEnhancedCalendarIntegrationProps) => {
  const baseCalendarIntegration = useCalendarIntegration();
  const [activeProvider, setActiveProvider] = useState<CalendarProvider | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'failed'>('idle');
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  
  // Connect to a calendar provider with enhanced functionality
  const connectEnhancedProvider = async (providerType: 'google' | 'outlook' | 'ical'): Promise<boolean> => {
    try {
      toast({
        title: "Connecting to calendar",
        description: `Establishing connection to ${providerType} calendar...`,
      });
      
      const success = await baseCalendarIntegration.connectCalendar(providerType);
      
      if (success) {
        const provider = providers.find(p => p.type === providerType) || providers[0];
        setActiveProvider(provider);
        
        // Simulate initial sync
        setSyncStatus('syncing');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const now = new Date().toISOString();
        setLastSynced(now);
        setSyncStatus('synced');
        
        await baseCalendarIntegration.getUpcomingEvents();
        
        toast({
          title: "Calendar connected and synced",
          description: `Successfully connected to ${provider.name}`,
        });
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Error connecting to calendar provider:', error);
      setSyncStatus('failed');
      
      toast({
        title: "Connection failed",
        description: `Failed to connect to ${providerType} calendar`,
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  // Schedule a meeting with a lead
  const scheduleMeeting = async (
    lead: Lead,
    meetingDetails: {
      title: string;
      startTime: string;
      endTime: string;
      description?: string;
    }
  ) => {
    if (!baseCalendarIntegration.isConnected) {
      toast({
        title: "Calendar not connected",
        description: "Please connect a calendar first",
        variant: "destructive"
      });
      return null;
    }
    
    const event = {
      title: meetingDetails.title,
      startTime: meetingDetails.startTime,
      endTime: meetingDetails.endTime,
      description: meetingDetails.description || `Meeting with ${lead.company}`,
      location: 'Virtual Meeting',
      attendees: [
        {
          email: lead.email,
          name: lead.contact
        }
      ]
    };
    
    try {
      const result = await baseCalendarIntegration.createEvent(event);
      
      if (result) {
        toast({
          title: "Meeting scheduled",
          description: `Meeting with ${lead.company} has been scheduled`,
        });
        
        if (props?.onEventCreated) {
          props.onEventCreated({
            ...event,
            lead
          });
        }
      }
      
      return result;
    } catch (error) {
      console.error('Error scheduling meeting:', error);
      toast({
        title: "Failed to schedule meeting",
        description: "An error occurred while scheduling the meeting",
        variant: "destructive"
      });
      return null;
    }
  };
  
  // Sync calendar events (would normally pull from API)
  const syncCalendar = async () => {
    if (!baseCalendarIntegration.isConnected) {
      return false;
    }
    
    setSyncStatus('syncing');
    
    try {
      // Simulate API call to sync calendar
      await new Promise(resolve => setTimeout(resolve, 2000));
      await baseCalendarIntegration.getUpcomingEvents();
      
      const now = new Date().toISOString();
      setLastSynced(now);
      setSyncStatus('synced');
      
      toast({
        title: "Calendar synced",
        description: "Your calendar has been synced successfully",
      });
      
      return true;
    } catch (error) {
      console.error('Error syncing calendar:', error);
      setSyncStatus('failed');
      
      toast({
        title: "Sync failed",
        description: "Failed to sync your calendar",
        variant: "destructive"
      });
      
      return false;
    }
  };
  
  // Get meetings for a specific lead
  const getLeadMeetings = async (leadId: string) => {
    if (!baseCalendarIntegration.isConnected) {
      return [];
    }
    
    // In a real app, this would filter events by the lead's email
    console.log(`Loading meetings for lead ${leadId}`);
    
    await baseCalendarIntegration.getUpcomingEvents();
    
    // Filter events that might be related to this lead (demo purposes)
    const leadMeetings = baseCalendarIntegration.events.filter(event => 
      event.title.toLowerCase().includes('client') ||
      event.attendees?.some(attendee => attendee.includes('@'))
    );
    
    return leadMeetings;
  };
  
  return {
    ...baseCalendarIntegration,
    providers,
    activeProvider,
    syncStatus,
    lastSynced,
    connectProvider: connectEnhancedProvider,
    scheduleMeeting,
    syncCalendar,
    getLeadMeetings
  };
};
