
import { supabase } from '@/integrations/supabase/client';
import { logSecurityEvent, SecurityEventType } from './security-audit';

export interface DeviceInfo {
  id: string;
  name: string;
  browser: string;
  os: string;
  ip_address: string;
  last_active: string;
  is_current: boolean;
}

// Get browser and OS information
export function getBrowserInfo(): { browser: string; os: string } {
  const userAgent = navigator.userAgent;
  let browser = 'Unknown';
  let os = 'Unknown';

  // Detect browser
  if (userAgent.indexOf('Firefox') > -1) {
    browser = 'Firefox';
  } else if (userAgent.indexOf('SamsungBrowser') > -1) {
    browser = 'Samsung Browser';
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    browser = 'Opera';
  } else if (userAgent.indexOf('Trident') > -1) {
    browser = 'Internet Explorer';
  } else if (userAgent.indexOf('Edge') > -1) {
    browser = 'Edge';
  } else if (userAgent.indexOf('Chrome') > -1) {
    browser = 'Chrome';
  } else if (userAgent.indexOf('Safari') > -1) {
    browser = 'Safari';
  }

  // Detect OS
  if (userAgent.indexOf('Android') > -1) {
    os = 'Android';
  } else if (userAgent.indexOf('iOS') > -1 || /iPhone|iPad|iPod/.test(userAgent)) {
    os = 'iOS';
  } else if (userAgent.indexOf('Win') > -1) {
    os = 'Windows';
  } else if (userAgent.indexOf('Mac') > -1) {
    os = 'MacOS';
  } else if (userAgent.indexOf('Linux') > -1) {
    os = 'Linux';
  }

  return { browser, os };
}

// Generate a unique device ID
function generateDeviceId(): string {
  // Use a combination of browser info, screen resolution, and timezone
  const { browser, os } = getBrowserInfo();
  const screenInfo = `${window.screen.width}x${window.screen.height}`;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  // Create a hash from the combined string
  const deviceString = `${browser}-${os}-${screenInfo}-${timeZone}`;
  
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < deviceString.length; i++) {
    const char = deviceString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to hex string and ensure it's positive
  return Math.abs(hash).toString(16);
}

// Get current device identifier or create one if it doesn't exist
export function getCurrentDeviceId(): string {
  let deviceId = localStorage.getItem('device_id');
  
  if (!deviceId) {
    deviceId = generateDeviceId();
    localStorage.setItem('device_id', deviceId);
  }
  
  return deviceId;
}

// Register a new device for the current user
export async function registerDevice(userId: string): Promise<void> {
  try {
    const deviceId = getCurrentDeviceId();
    const { browser, os } = getBrowserInfo();
    const ipAddress = sessionStorage.getItem('client_ip') || 'unknown';
    
    // Get current user metadata to update devices list
    const { data } = await supabase.auth.getUser();
    if (!data.user) return;
    
    const currentDevices = data.user.user_metadata?.devices || [];
    
    // Check if device is already registered
    const existingDeviceIndex = currentDevices.findIndex((d: any) => d.id === deviceId);
    
    const deviceName = `${os} - ${browser}`;
    const now = new Date().toISOString();
    
    if (existingDeviceIndex >= 0) {
      // Update existing device
      currentDevices[existingDeviceIndex] = {
        ...currentDevices[existingDeviceIndex],
        last_active: now,
        ip_address: ipAddress
      };
    } else {
      // Add new device
      currentDevices.push({
        id: deviceId,
        name: deviceName,
        browser,
        os,
        ip_address: ipAddress,
        first_seen: now,
        last_active: now
      });
      
      // Log new device registration
      await logSecurityEvent(
        SecurityEventType.LOGIN_SUCCESS,
        userId,
        { 
          details: 'New device login',
          device_id: deviceId,
          device_name: deviceName
        }
      );
    }
    
    // Update user metadata
    await supabase.auth.updateUser({
      data: {
        devices: currentDevices
      }
    });
  } catch (error) {
    console.error('Failed to register device:', error);
  }
}

// Get all devices for the current user
export async function getDevices(): Promise<DeviceInfo[]> {
  try {
    const { data } = await supabase.auth.getUser();
    if (!data.user) return [];
    
    const currentDeviceId = getCurrentDeviceId();
    const devices = data.user.user_metadata?.devices || [];
    
    return devices.map((device: any) => ({
      ...device,
      is_current: device.id === currentDeviceId
    }));
  } catch (error) {
    console.error('Failed to get devices:', error);
    return [];
  }
}

// Remove a device from the current user's devices
export async function removeDevice(deviceId: string, userId: string): Promise<boolean> {
  try {
    const currentDeviceId = getCurrentDeviceId();
    
    // Prevent removing the current device
    if (deviceId === currentDeviceId) {
      throw new Error("Cannot remove the current device");
    }
    
    const { data } = await supabase.auth.getUser();
    if (!data.user) return false;
    
    const currentDevices = data.user.user_metadata?.devices || [];
    const updatedDevices = currentDevices.filter((d: any) => d.id !== deviceId);
    
    // Update user metadata
    await supabase.auth.updateUser({
      data: {
        devices: updatedDevices
      }
    });
    
    // Log device removal
    await logSecurityEvent(
      SecurityEventType.UNUSUAL_ACTIVITY,
      userId,
      { 
        details: 'Device removed',
        device_id: deviceId
      }
    );
    
    return true;
  } catch (error) {
    console.error('Failed to remove device:', error);
    return false;
  }
}
