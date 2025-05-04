
import { UserLog } from '../types';

export const userLogsData: UserLog[] = [
  {
    id: "1",
    timestamp: new Date().toISOString(),
    action: "login_success",
    details: "User logged in successfully",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/96.0.4664.110"
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    action: "profile_update",
    details: "Updated profile information",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/96.0.4664.110"
  },
  {
    id: "3", 
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    action: "permission_change",
    details: "Changed user permissions",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/96.0.4664.110"
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    action: "password_reset",
    details: "Requested password reset",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/96.0.4664.110"
  },
  {
    id: "5", // Changed from number to string
    timestamp: new Date(Date.now() - 172800000).toISOString(),
    action: "account_created",
    details: "Account created",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/96.0.4664.110"
  }
];
