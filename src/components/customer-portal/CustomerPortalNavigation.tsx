
import { useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  UserCircle, 
  FileText, 
  Receipt,
  TruckIcon,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface CustomerPortalNavigationProps {
  hasExpiringDocuments?: boolean;
}

const CustomerPortalNavigation = ({ hasExpiringDocuments = false }: CustomerPortalNavigationProps) => {
  const location = useLocation();
  
  const navItems = [
    { 
      path: "/customer-portal/dashboard", 
      label: "Dashboard", 
      icon: LayoutDashboard 
    },
    { 
      path: "/customer-portal/profile", 
      label: "My Profile", 
      icon: UserCircle 
    },
    { 
      path: "/customer-portal/documents", 
      label: "Documents", 
      icon: FileText,
      badge: hasExpiringDocuments ? { text: "Expiring", variant: "warning" } : undefined
    },
    { 
      path: "/customer-portal/rates", 
      label: "Rate Cards", 
      icon: Receipt
    }
  ];

  return (
    <nav className="bg-white rounded-lg shadow-sm p-4 sticky top-6">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group",
              "hover:bg-blue-50",
              location.pathname === item.path 
                ? "bg-blue-50 text-blue-700 font-medium" 
                : "text-gray-700"
            )}
          >
            <item.icon className={cn(
              "h-5 w-5 flex-shrink-0",
              location.pathname === item.path 
                ? "text-blue-700" 
                : "text-gray-500"
            )} />
            <span>{item.label}</span>
            
            {item.badge && (
              <Badge 
                variant={item.badge.variant} 
                className="ml-auto"
              >
                {item.badge.text}
              </Badge>
            )}
          </Link>
        ))}
      </div>

      <div className="border-t mt-4 pt-4">
        <Link
          to="#"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 transition-all duration-200"
        >
          <TruckIcon className="h-5 w-5 text-gray-500" />
          <span>Book Delivery</span>
        </Link>
        
        <Link
          to="#"
          className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-700 hover:bg-blue-50 transition-all duration-200"
        >
          <HelpCircle className="h-5 w-5 text-gray-500" />
          <span>Help & Support</span>
        </Link>
      </div>
    </nav>
  );
};

export default CustomerPortalNavigation;
