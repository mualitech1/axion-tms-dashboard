
import { MobileCheckRecord, GpsLocation, AppInteraction } from "@/pages/users/types";

// Mock data for demonstration purposes
export const mockCheckRecords: MobileCheckRecord[] = [
  {
    id: "1",
    userId: 1,
    type: 'check-in',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    location: {
      latitude: 51.5074,
      longitude: -0.1278,
      address: "123 Fleet St, London"
    },
    deviceInfo: {
      deviceId: "device-001",
      model: "iPhone 13",
      platform: "iOS",
      osVersion: "16.5",
      appVersion: "1.2.3"
    }
  },
  {
    id: "2",
    userId: 1,
    type: 'check-out',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    location: {
      latitude: 51.5173,
      longitude: -0.1223,
      address: "456 Oxford St, London"
    },
    deviceInfo: {
      deviceId: "device-001",
      model: "iPhone 13",
      platform: "iOS",
      osVersion: "16.5",
      appVersion: "1.2.3"
    }
  }
];

export const mockGpsHistory: GpsLocation[] = [
  {
    latitude: 51.5074,
    longitude: -0.1278,
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    accuracy: 5,
    speed: 0,
    altitude: 35,
    heading: 0,
    deviceId: "device-001",
    userId: 1
  },
  {
    latitude: 51.5077,
    longitude: -0.1268,
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    accuracy: 8,
    speed: 15,
    altitude: 36,
    heading: 45,
    deviceId: "device-001",
    userId: 1
  },
  {
    latitude: 51.5173,
    longitude: -0.1223,
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    accuracy: 4,
    speed: 0,
    altitude: 40,
    heading: 0,
    deviceId: "device-001",
    userId: 1
  }
];

export const mockAppInteractions: AppInteraction[] = [
  {
    id: "1",
    userId: 1,
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    eventType: "screenView",
    screenName: "JobDetails",
    actionTaken: "view",
    duration: 120,
    result: "success",
    deviceInfo: {
      deviceId: "device-001",
      networkType: "4G",
      batteryLevel: 85
    }
  },
  {
    id: "2",
    userId: 1,
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    eventType: "action",
    screenName: "JobDetails",
    actionTaken: "markAsCompleted",
    duration: 3,
    result: "success",
    deviceInfo: {
      deviceId: "device-001",
      networkType: "4G",
      batteryLevel: 80
    }
  },
  {
    id: "3",
    userId: 1,
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    eventType: "screenView",
    screenName: "Dashboard",
    actionTaken: "view",
    duration: 45,
    result: "success",
    deviceInfo: {
      deviceId: "device-001",
      networkType: "WiFi",
      batteryLevel: 75
    }
  }
];
