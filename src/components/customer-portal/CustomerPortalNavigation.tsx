
import { Link, useLocation } from 'react-router-dom';
import { BadgeDollarSign, FileText, LayoutDashboard, Mail, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CustomerPortalNavigationProps {
  hasExpiringDocuments: boolean;
}

export default function CustomerPortalNavigation({ hasExpiringDocuments }: CustomerPortalNavigationProps) {
  const location = useLocation();
  
  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/customer-portal/dashboard', 
      icon: LayoutDashboard,
      notification: false
    },
    { 
      name: 'Profile', 
      href: '/customer-portal/profile', 
      icon: User,
      notification: false
    },
    { 
      name: 'Documents', 
      href: '/customer-portal/documents', 
      icon: FileText,
      notification: hasExpiringDocuments
    },
    { 
      name: 'Communications', 
      href: '/customer-portal/communications', 
      icon: Mail,
      notification: false
    },
    { 
      name: 'Rate Cards', 
      href: '/customer-portal/rates', 
      icon: BadgeDollarSign,
      notification: false
    }
  ];
  
  return (
    <nav className="bg-white rounded-lg shadow-sm p-2">
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.name}</span>
              {item.notification && (
                <Badge variant="destructive" className="ml-auto h-5 min-w-5 px-1">
                  !
                </Badge>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
