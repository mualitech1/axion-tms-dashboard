
import { RolePermissions } from '../types';

// Role permissions
export const rolePermissions: RolePermissions = {
  'Senior Management': {
    dashboard: true,
    customers: true,
    carriers: true,
    finance: true,
    reports: true,
    users: true,
    settings: true,
  },
  'Operations': {
    dashboard: true,
    customers: true,
    carriers: true,
    finance: false,
    reports: true,
    users: false,
    settings: false,
  },
  'Accounts': {
    dashboard: true,
    customers: true,
    carriers: false,
    finance: true,
    reports: true,
    users: false,
    settings: false,
  },
  'Sales': {
    dashboard: true,
    customers: true,
    carriers: false,
    finance: false,
    reports: true,
    users: false,
    settings: false,
  },
};
