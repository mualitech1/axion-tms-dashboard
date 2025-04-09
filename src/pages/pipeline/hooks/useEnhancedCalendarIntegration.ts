
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { useCalendarIntegration } from '@/hooks/use-calendar-integration';
import { Lead } from '../data/pipelineTypes';
import { providers, CalendarProvider } from './calendar/calendarProviders';
import { UseEnhancedCalendarIntegrationProps, EnhancedCalendarIntegrationReturn, MeetingDetails } from './calendar/calendarTypes';
import { createMeetingEvent, handleCalendarError } from './calendar/calendarUtils';

export const useEnhancedCalendarIntegration = (props?: UseEnhancedCalendarIntegrationProps): EnhancedCalendarIntegrationReturn => {
  const baseCalendarIntegration = useCalendarIntegration();
  const [activeProvider, setActiveProvider] = useState<CalendarProvider | null>(null);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'synced' | 'failed'>('idle');
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  
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
      return handleCalendarError(error, `Failed to connect to ${providerType} calendar`);
    }
  };
  
  const scheduleMeeting = async (lead: Lead, meetingDetails: MeetingDetails) => {
    if (!baseCalendarIntegration.isConnected) {
      toast({
        title: "Calendar not connected",
        description: "Please connect a calendar first",
        variant: "destructive"
      });
      return null;
    }
    
    const event = createMeetingEvent(lead, meetingDetails);
    
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
  
  const syncCalendar = async () => {
    if (!baseCalendarIntegration.isConnected) {
      return false;
    }
    
    setSyncStatus('syncing');
    
    try {
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
      return handleCalendarError(error, "Failed to sync your calendar");
    }
  };
  
  const getLeadMeetings = async (leadId: string) => {
    if (!baseCalendarIntegration.isConnected) {
      return [];
    }
    
    console.log(`Loading meetings for lead ${leadId}`);
    
    await baseCalendarIntegration.getUpcomingEvents();
    
    const leadMeetings = baseCalendarIntegration.events.filter(event => 
      event.title.toLowerCase().includes('client') ||
      event.attendees?.some((attendee: string) => attendee.includes('@'))
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
