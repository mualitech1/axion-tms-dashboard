import { supabase } from '@/integrations/supabase/client';

export enum SecurityEventType {
  LOGIN_SUCCESS = 'login_success',
  LOGIN_FAILED = 'login_failed',
  PASSWORD_CHANGED = 'password_changed',
  PASSWORD_RESET = 'password_reset',
  TOTP_ENABLED = 'totp_enabled',
  TOTP_DISABLED = 'totp_disabled',
  ACCOUNT_LOCKED = 'account_locked',
  UNUSUAL_ACTIVITY = 'unusual_activity',
  DEVICE_ADDED = 'device_added',
  DEVICE_REMOVED = 'device_removed',
  SUSPICIOUS_LOCATION = 'suspicious_location',
  CSRF_VIOLATION = 'csrf_violation'
}

interface SecurityEvent {
  event_type: SecurityEventType;
  user_id: string;
  details?: Record<string, any>;
  ip_address?: string;
  device_info?: string;
}

// Get IP address from session storage or set default
function getClientIP(): string {
  return sessionStorage.getItem('client_ip') || 'unknown';
}

// Get device info from browser
function getDeviceInfo(): string {
  return navigator.userAgent;
}

// Log security events to user metadata and potentially to a security_logs table
export async function logSecurityEvent(
  eventType: SecurityEventType, 
  userId: string, 
  details?: Record<string, any>
): Promise<void> {
  try {
    // Prepare event data
    const event: SecurityEvent = {
      event_type: eventType,
      user_id: userId,
      details: details || {},
      ip_address: getClientIP(),
      device_info: getDeviceInfo()
    };
    
    // Add timestamp
    const timestamp = new Date().toISOString();
    
    // Update user metadata to include this security event in history
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (!userError && userData?.user) {
      const currentUser = userData.user;
      
      // Get existing security log or initialize empty array
      const securityLog = currentUser.user_metadata?.security_log || [];
      
      // Add new event to the log (limit to last 50 events)
      const updatedLog = [
        { timestamp, ...event },
        ...securityLog
      ].slice(0, 50);
      
      // Update user metadata
      await supabase.auth.updateUser({
        data: { 
          security_log: updatedLog
        }
      });
      
      // In a production environment, you might also want to:
      // 1. Store logs in a dedicated security_logs table
      // 2. Send high-risk security events to an admin notification system
      // 3. Trigger additional security measures for suspicious activity
    }
    
    console.log(`Security event logged: ${eventType} for user ${userId}`);
  } catch (error) {
    console.error('Failed to log security event:', error);
  }
}

// Get security logs for a user
export async function getSecurityLogs(): Promise<any[]> {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error || !data.user) {
      throw new Error('Failed to get user data');
    }
    
    return data.user.user_metadata?.security_log || [];
  } catch (error) {
    console.error('Failed to get security logs:', error);
    return [];
  }
}

// Check for suspicious activity based on login patterns
export async function checkSuspiciousActivity(userId: string): Promise<boolean> {
  try {
    const logs = await getSecurityLogs();
    
    // Example: Check for multiple failed login attempts
    const recentFailedLogins = logs
      .filter(log => 
        log.event_type === SecurityEventType.LOGIN_FAILED && 
        new Date(log.timestamp) > new Date(Date.now() - 30 * 60 * 1000) // Last 30 minutes
      );
    
    if (recentFailedLogins.length >= 5) {
      // Log this suspicious activity
      await logSecurityEvent(
        SecurityEventType.UNUSUAL_ACTIVITY, 
        userId, 
        { reason: 'multiple_failed_logins', count: recentFailedLogins.length }
      );
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Failed to check for suspicious activity:', error);
    return false;
  }
}
