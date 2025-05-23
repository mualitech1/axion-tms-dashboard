export interface JobEvent {
  id: string;
  jobId: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  status: string;
  priority: 'low' | 'medium' | 'high';
  client: string;
  clientId: string;
  vehicleId?: string;
  vehicleName?: string;
  driverId?: string;
  driverName?: string;
  color?: string;
  location?: {
    pickup: string;
    delivery: string;
    pickupCoordinates?: [number, number]; // [longitude, latitude]
    deliveryCoordinates?: [number, number]; // [longitude, latitude]
  };
}

export interface CalendarViewState {
  date: Date;
  view: 'day' | 'week' | 'month' | 'timeline';
  filter?: {
    clients?: string[];
    drivers?: string[];
    vehicles?: string[];
    status?: string[];
  };
}

export interface CalendarDateInfo {
  date: Date;
  events: JobEvent[];
  isToday: boolean;
  isWeekend: boolean;
  isOutsideMonth: boolean;
}

export interface DraggedEventData {
  jobEvent: JobEvent;
  originalStart: Date;
  originalEnd: Date;
}

export type CalendarOperationResult = {
  success: boolean;
  message?: string;
  jobEvent?: JobEvent;
  error?: Error | null;
}; 