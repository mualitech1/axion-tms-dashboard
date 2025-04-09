
import { Lead } from '../../data/pipelineTypes';
import { CalendarProvider } from './calendarProviders';

export interface MeetingDetails {
  title: string;
  startTime: string;
  endTime: string;
  description?: string;
}

export interface UseEnhancedCalendarIntegrationProps {
  onEventCreated?: (eventData: any) => void;
}

export interface EnhancedCalendarIntegrationReturn {
  isConnected: boolean;
  isPending: boolean;
  events: any[];
  providers: CalendarProvider[];
  activeProvider: CalendarProvider | null;
  syncStatus: 'idle' | 'syncing' | 'synced' | 'failed';
  lastSynced: string | null;
  connectCalendar: (provider: 'google' | 'outlook' | 'ical') => Promise<boolean>;
  disconnectCalendar: () => void;
  createEvent: (event: any) => Promise<any | null>;
  getUpcomingEvents: () => Promise<any[]>;
  connectProvider: (providerType: 'google' | 'outlook' | 'ical') => Promise<boolean>;
  scheduleMeeting: (lead: Lead, meetingDetails: MeetingDetails) => Promise<any | null>;
  syncCalendar: () => Promise<boolean>;
  getLeadMeetings: (leadId: string) => Promise<any[]>;
}
