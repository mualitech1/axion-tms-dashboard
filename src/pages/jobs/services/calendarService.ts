import { differenceInDays, addDays, addMonths, startOfMonth, endOfMonth, 
  startOfWeek, endOfWeek, isSameDay, isSameMonth, isWeekend } from 'date-fns';
import { JobEvent, CalendarOperationResult, CalendarDateInfo } from '../types/calendarTypes';
import { nanoid } from 'nanoid';

// Sample color palette for different jobs/clients
const EVENT_COLORS = [
  '#2563eb', // Blue
  '#9333ea', // Purple
  '#16a34a', // Green
  '#ea580c', // Orange
  '#0891b2', // Cyan
  '#db2777', // Pink
  '#84cc16', // Lime
  '#9c4221', // Brown
  '#6366f1', // Indigo
  '#0284c7', // Sky
];

// Mock data to simulate backend API
let mockEvents: JobEvent[] = [
  // Add current month events
  ...generateEventsForMonth(new Date()),
  // Add next month events
  ...generateEventsForMonth(addMonths(new Date(), 1), 10),
];

/**
 * Retrieves calendar events for a given date range
 */
export async function getCalendarEvents(
  start: Date,
  end: Date,
  filters?: { clientIds?: string[], vehicleIds?: string[], driverIds?: string[], status?: string[] }
): Promise<JobEvent[]> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // Filter events in the selected range
  const filteredEvents = mockEvents.filter(event => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    
    // Check if event falls within the requested date range
    const isInRange = (
      (eventStart >= start && eventStart <= end) ||
      (eventEnd >= start && eventEnd <= end) ||
      (eventStart <= start && eventEnd >= end)
    );
    
    if (!isInRange) return false;
    
    // Apply additional filters if provided
    if (filters) {
      if (filters.clientIds?.length && !filters.clientIds.includes(event.clientId)) return false;
      if (filters.vehicleIds?.length && event.vehicleId && !filters.vehicleIds.includes(event.vehicleId)) return false;
      if (filters.driverIds?.length && event.driverId && !filters.driverIds.includes(event.driverId)) return false;
      if (filters.status?.length && !filters.status.includes(event.status)) return false;
    }
    
    return true;
  });
  
  return filteredEvents;
}

/**
 * Get detailed info for a specific date, including events for that day
 */
export async function getDateInfo(date: Date): Promise<CalendarDateInfo> {
  const events = await getCalendarEvents(
    new Date(date.setHours(0, 0, 0, 0)),
    new Date(date.setHours(23, 59, 59, 999))
  );
  
  return {
    date,
    events,
    isToday: isSameDay(date, new Date()),
    isWeekend: isWeekend(date),
    isOutsideMonth: !isSameMonth(date, new Date()),
  };
}

/**
 * Creates a new calendar event/job
 */
export async function createCalendarEvent(eventData: Omit<JobEvent, 'id'>): Promise<CalendarOperationResult> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newEvent: JobEvent = {
      ...eventData,
      id: nanoid(),
    };
    
    mockEvents.push(newEvent);
    
    return {
      success: true,
      message: 'Event created successfully',
      jobEvent: newEvent,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create event',
      error: error instanceof Error ? error : new Error('Unknown error occurred'),
    };
  }
}

/**
 * Updates an existing calendar event
 */
export async function updateCalendarEvent(eventId: string, eventData: Partial<JobEvent>): Promise<CalendarOperationResult> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const eventIndex = mockEvents.findIndex(event => event.id === eventId);
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }
    
    const updatedEvent = {
      ...mockEvents[eventIndex],
      ...eventData,
    };
    
    mockEvents[eventIndex] = updatedEvent;
    
    return {
      success: true,
      message: 'Event updated successfully',
      jobEvent: updatedEvent,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to update event',
      error: error instanceof Error ? error : new Error('Unknown error occurred'),
    };
  }
}

/**
 * Deletes a calendar event
 */
export async function deleteCalendarEvent(eventId: string): Promise<CalendarOperationResult> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const initialLength = mockEvents.length;
    mockEvents = mockEvents.filter(event => event.id !== eventId);
    
    if (mockEvents.length === initialLength) {
      throw new Error('Event not found');
    }
    
    return {
      success: true,
      message: 'Event deleted successfully',
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to delete event',
      error: error instanceof Error ? error : new Error('Unknown error occurred'),
    };
  }
}

/**
 * Moves an event to a new date/time (drag and drop operation)
 */
export async function moveCalendarEvent(
  eventId: string, 
  newStart: Date, 
  newEnd: Date
): Promise<CalendarOperationResult> {
  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const eventIndex = mockEvents.findIndex(event => event.id === eventId);
    if (eventIndex === -1) {
      throw new Error('Event not found');
    }
    
    const updatedEvent = {
      ...mockEvents[eventIndex],
      start: newStart,
      end: newEnd,
    };
    
    mockEvents[eventIndex] = updatedEvent;
    
    return {
      success: true,
      message: 'Event moved successfully',
      jobEvent: updatedEvent,
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to move event',
      error: error instanceof Error ? error : new Error('Unknown error occurred'),
    };
  }
}

// Helper functions to generate mock data
function generateEventsForMonth(monthDate: Date, count = 30): JobEvent[] {
  const result: JobEvent[] = [];
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const daysInMonth = differenceInDays(monthEnd, monthStart) + 1;
  
  // Generate random events for the month
  for (let i = 0; i < count; i++) {
    const randomDayOffset = Math.floor(Math.random() * daysInMonth);
    const eventDate = addDays(monthStart, randomDayOffset);
    
    // Don't add too many weekend events
    if (isWeekend(eventDate) && Math.random() > 0.3) continue;
    
    const clientId = String(Math.floor(Math.random() * 10) + 1);
    const startHour = 8 + Math.floor(Math.random() * 10); // Between 8am and 6pm
    
    const jobTypes = ["Delivery", "Pickup", "Transport", "Installation", "Maintenance"];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    
    const clients = ["Acme Corp", "Globex", "Stark Industries", "Umbrella Corp", "Waystar Royco", 
      "Soylent Corp", "Massive Dynamic", "Cyberdyne Systems", "Hooli", "Dunder Mifflin"];
    const client = clients[parseInt(clientId) - 1];
    
    const statuses = ["booked", "allocated", "in-progress", "issues"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    const priorities = ["low", "medium", "high"] as const;
    const priority = priorities[Math.floor(Math.random() * priorities.length)];
    
    const eventDurationHours = 1 + Math.floor(Math.random() * 4); // 1-4 hour long events
    
    const id = nanoid();
    const event: JobEvent = {
      id,
      jobId: `JOB-${1000 + i}`,
      title: `${jobType} for ${client}`,
      start: new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        startHour,
        0,
        0
      ),
      end: new Date(
        eventDate.getFullYear(),
        eventDate.getMonth(),
        eventDate.getDate(),
        startHour + eventDurationHours,
        0,
        0
      ),
      allDay: false,
      status,
      priority,
      client,
      clientId,
      color: EVENT_COLORS[parseInt(clientId) % EVENT_COLORS.length],
      location: {
        pickup: generateRandomAddress(),
        delivery: generateRandomAddress(),
      }
    };
    
    // Add vehicle and driver info to some events
    if (Math.random() > 0.3) {
      const vehicleId = String(Math.floor(Math.random() * 10) + 1);
      const driverId = String(Math.floor(Math.random() * 8) + 1);
      
      event.vehicleId = vehicleId;
      event.vehicleName = `Truck ${100 + parseInt(vehicleId)}`;
      
      event.driverId = driverId;
      const drivers = ["John Smith", "Jane Doe", "David Johnson", "Sarah Williams", 
        "Michael Brown", "Emma Davis", "James Wilson", "Olivia Taylor"];
      event.driverName = drivers[parseInt(driverId) - 1];
    }
    
    result.push(event);
  }
  
  return result;
}

function generateRandomAddress(): string {
  const streets = ["Main St", "Park Ave", "Broadway", "1st Ave", "Washington St", "Oak Rd", "Elm St", "Pine Rd"];
  const cities = ["New York", "London", "Berlin", "Paris", "Tokyo", "Sydney", "Toronto", "Moscow"];
  
  const streetNum = Math.floor(Math.random() * 1000) + 1;
  const street = streets[Math.floor(Math.random() * streets.length)];
  const city = cities[Math.floor(Math.random() * cities.length)];
  
  return `${streetNum} ${street}, ${city}`;
} 