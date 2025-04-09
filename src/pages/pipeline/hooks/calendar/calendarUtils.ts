
import { toast } from '@/hooks/use-toast';
import { Lead } from '../../data/pipelineTypes';
import { MeetingDetails } from './calendarTypes';

export const createMeetingEvent = (lead: Lead, meetingDetails: MeetingDetails) => {
  return {
    title: meetingDetails.title,
    startTime: meetingDetails.startTime,
    endTime: meetingDetails.endTime,
    description: meetingDetails.description || `Meeting with ${lead.company}`,
    location: 'Virtual Meeting',
    attendees: [
      `${lead.contact} <${lead.email}>`
    ]
  };
};

export const handleCalendarError = (error: any, message: string) => {
  console.error(message, error);
  toast({
    title: "Calendar operation failed",
    description: message,
    variant: "destructive"
  });
  return false;
};
