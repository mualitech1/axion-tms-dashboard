
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  lastLogin?: string;
  lastActive?: string;
  avatar?: string;
  created?: string;
  twoFactorEnabled?: boolean;
  mobileLastCheckIn?: string;
  mobileLastCheckOut?: string;
  mobileAppVersion?: string;
  deviceId?: string;
}

export interface UserLog {
  id: string;
  timestamp: string;
  action: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}

// Adding RolePermissions interface
export interface Permission {
  [key: string]: boolean;
}

export interface RolePermissions {
  [role: string]: Permission;
}

// GPS Tracking data
export interface GpsLocation {
  latitude: number;
  longitude: number;
  timestamp: string;
  accuracy?: number;
  speed?: number;
  altitude?: number;
  heading?: number;
  deviceId?: string;
  userId: number;
}

// Mobile Check-in/out record
export interface MobileCheckRecord {
  id: string;
  userId: number;
  type: 'check-in' | 'check-out';
  timestamp: string;
  location?: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  deviceInfo?: {
    deviceId: string;
    model: string;
    platform: string;
    osVersion: string;
    appVersion: string;
  };
  notes?: string;
}

// Driver app interaction
export interface AppInteraction {
  id: string;
  userId: number;
  timestamp: string;
  eventType: string;
  screenName: string;
  actionTaken: string;
  duration?: number;
  result?: string;
  deviceInfo?: {
    deviceId: string;
    networkType?: string;
    batteryLevel?: number;
  };
}
