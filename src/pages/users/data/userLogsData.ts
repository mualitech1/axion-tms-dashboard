
import { UserLog } from '../types';

export const generateUserLogs = (userId: number): UserLog[] => {
  const actions = [
    'Login',
    'Logout', 
    'Password Change', 
    'Profile Update',
    'Permission Change',
    'Failed Login Attempt',
    'Export Data',
    'Created Job',
    'Updated Carrier',
    'Viewed Customer Details',
    'Generated Report',
    'Modified Settings'
  ];
  
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
  const devices = ['Windows', 'MacOS', 'iOS', 'Android'];
  
  // Generate logs for the past 30 days
  const logs: UserLog[] = [];
  const now = new Date();
  
  // Create between 20-50 logs for the user
  const logCount = Math.floor(Math.random() * 30) + 20;
  
  for (let i = 0; i < logCount; i++) {
    const daysAgo = Math.floor(Math.random() * 30);
    const hoursAgo = Math.floor(Math.random() * 24);
    const minutesAgo = Math.floor(Math.random() * 60);
    
    const logDate = new Date(now);
    logDate.setDate(logDate.getDate() - daysAgo);
    logDate.setHours(logDate.getHours() - hoursAgo);
    logDate.setMinutes(logDate.getMinutes() - minutesAgo);
    
    const action = actions[Math.floor(Math.random() * actions.length)];
    const browser = browsers[Math.floor(Math.random() * browsers.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    const ipOctets = Array.from({ length: 4 }, () => Math.floor(Math.random() * 255));
    
    logs.push({
      id: i + 1,
      userId,
      action,
      details: `${action} action performed`,
      ipAddress: ipOctets.join('.'),
      userAgent: `${browser} on ${device}`,
      timestamp: logDate.toISOString()
    });
  }
  
  // Sort logs by timestamp (newest first)
  return logs.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};

// Pre-generate logs for all users
export const userLogsData: Record<number, UserLog[]> = {};

// This will populate logs for users 1-15 when imported
for (let i = 1; i <= 15; i++) {
  userLogsData[i] = generateUserLogs(i);
}
