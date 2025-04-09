
export interface CalendarProvider {
  name: string;
  type: 'google' | 'outlook' | 'ical';
  icon: string;
}

export const providers: CalendarProvider[] = [
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
