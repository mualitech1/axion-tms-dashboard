import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  FileText, 
  Package, 
  CircleDollarSign,
  Gauge, 
  Building2, 
  ShieldCheck,
  BarChart3,
  UserCog,
  Boxes,
  Scan,
  MessageSquare,
  ClipboardList
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { AppRole } from '@/types/permissions';
import { ResourceActions } from '@/types/permissions';

export interface NavigationItem {
  title: string;
  href: string;
  icon: LucideIcon;
  shortcut?: string;
  children?: NavigationItem[];
  requiredPermission?: {
    resource: string;
    action: string;
  };
  requiredRoles?: AppRole[];
}

export const navigationConfig: NavigationItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    shortcut: 'Alt+1'
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    shortcut: 'Alt+2'
  },
  {
    title: 'Customers',
    href: '/customers',
    icon: Users,
    shortcut: 'Alt+3'
  },
  {
    title: 'Jobs',
    href: '/jobs',
    icon: Package,
    shortcut: 'Alt+4'
  },
  {
    title: 'Finance',
    href: '/finance',
    icon: CircleDollarSign,
    shortcut: 'Alt+5'
  },
  {
    title: 'Users',
    href: '/users',
    icon: UserCog,
    shortcut: 'Alt+6',
    requiredRoles: [AppRole.Admin]
  },
  {
    title: 'Carriers',
    href: '/carriers',
    icon: Truck,
    shortcut: 'Alt+7'
  },
  {
    title: 'Fleet',
    href: '/fleet',
    icon: Truck,
    shortcut: 'Alt+8'
  },
  {
    title: 'Drivers',
    href: '/drivers',
    icon: Gauge,
    shortcut: 'Alt+9'
  },
  {
    title: 'Invoices',
    href: '/invoices',
    icon: FileText,
    shortcut: 'Alt+0'
  },
  {
    title: 'Supply Chain',
    href: '/supply-chain',
    icon: Boxes
  },
  {
    title: 'Compliance',
    href: '/compliance',
    icon: ShieldCheck
  },
  {
    title: 'Companies',
    href: '/companies',
    icon: Building2
  },
  {
    title: 'Document Scanning',
    href: '/document-scanning',
    icon: Scan
  },
  // Driver-specific routes
  {
    title: 'My Assignments',
    href: '/driver/assignments',
    icon: Truck,
    requiredRoles: [AppRole.Driver]
  },
  {
    title: 'Driver Dashboard',
    href: '/driver/dashboard',
    icon: Gauge,
    requiredRoles: [AppRole.Driver]
  },
  {
    title: 'Delivery Status',
    href: '/driver/status',
    icon: ClipboardList,
    requiredRoles: [AppRole.Driver]
  },
  // Customer-specific routes
  {
    title: 'My Shipments',
    href: '/customer/shipments',
    icon: Package,
    requiredRoles: [AppRole.Customer]
  },
  {
    title: 'Order History',
    href: '/customer/orders',
    icon: FileText,
    requiredRoles: [AppRole.Customer]
  },
  {
    title: 'Support',
    href: '/customer/support',
    icon: MessageSquare,
    requiredRoles: [AppRole.Customer]
  }
];

/**
 * Get section title from path
 * @param path The current path
 * @returns The title for the current section
 */
export function getSectionTitle(path: string): string {
  // Extract first segment (remove trailing slash if present)
  const normalizedPath = path.endsWith('/') ? path.slice(0, -1) : path;
  const segment = normalizedPath.split('/')[1] || '';
  
  // Handle special cases
  if (segment === '') return 'Dashboard';
  if (segment === 'role-select') return 'Select Role';
  
  // Check if there's a direct match in the navigation config
  const matchingItem = navigationConfig.find(item => {
    const itemPath = item.href.endsWith('/') ? item.href.slice(0, -1) : item.href;
    const itemSegment = itemPath.split('/')[1] || '';
    return itemSegment === segment;
  });
  
  if (matchingItem) {
    return matchingItem.title;
  }
  
  // Fallback: capitalize the segment
  return segment.charAt(0).toUpperCase() + segment.slice(1);
} 