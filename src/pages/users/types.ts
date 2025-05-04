
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin?: string;
  lastActive?: string;
  avatar?: string;
  created?: string;
  twoFactorEnabled?: boolean;
}

export interface UserLog {
  id: string;
  timestamp: string;
  action: string;
  details?: string;
  ipAddress?: string;
  userAgent?: string;
}
