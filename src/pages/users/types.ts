
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string; // Added department property
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

// Adding RolePermissions interface
export interface Permission {
  [key: string]: boolean;
}

export interface RolePermissions {
  [role: string]: Permission;
}
