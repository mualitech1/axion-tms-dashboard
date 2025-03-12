
export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  lastActive: string;
}

export interface Permission {
  [key: string]: boolean;
}

export interface RolePermissions {
  [role: string]: Permission;
}
