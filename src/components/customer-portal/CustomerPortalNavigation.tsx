
import { Link, useLocation } from 'react-router-dom';
import { BadgeDollarSign, FileText, LayoutDashboard, Mail, User, Bell } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CustomerPortalNavigationProps {
  hasExpiringDocuments: boolean;
}

export default function CustomerPortalNavigation({ hasExpiringDocuments }: CustomerPortalNavigationProps) {
  const location = useLocation();
  
  // Added hasUpdates property to indicate if there are auto-updates
  const navItems = [
    { 
      name: 'Dashboard', 
      href: '/customer-portal/dashboard', 
      icon: LayoutDashboard,
      notification: false,
      hasUpdates: false
    },
    { 
      name: 'Profile', 
      href: '/customer-portal/profile', 
      icon: User,
      notification: false,
      hasUpdates: false
    },
    { 
      name: 'Documents', 
      href: '/customer-portal/documents', 
      icon: FileText,
      notification: hasExpiringDocuments,
      hasUpdates: hasExpiringDocuments
    },
    { 
      name: 'Communications', 
      href: '/customer-portal/communications', 
      icon: Mail,
      notification: false,
      // Showing that there are auto-updates available
      hasUpdates: true
    },
    { 
      name: 'Rate Cards', 
      href: '/customer-portal/rates', 
      icon: BadgeDollarSign,
      notification: false,
      hasUpdates: false
    }
  ];
  
  return (
    <motion.nav 
      className="bg-white dark:bg-indigo-950/20 rounded-lg shadow-md border border-indigo-100/70 dark:border-indigo-800/30 p-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ul className="space-y-1">
        {navItems.map((item, index) => (
          <motion.li 
            key={item.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Link
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                location.pathname === item.href
                  ? "bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-800 dark:from-indigo-900/50 dark:to-indigo-800/30 dark:text-indigo-300"
                  : "text-gray-600 hover:bg-gray-50 dark:text-indigo-300 dark:hover:bg-indigo-900/30 hover:text-gray-900 dark:hover:text-indigo-200"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                location.pathname === item.href
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-500 dark:text-indigo-400/70"
              )} />
              <span>{item.name}</span>
              {item.notification && (
                <Badge variant="destructive" className="ml-auto h-5 min-w-5 px-1 animate-pulse">
                  !
                </Badge>
              )}
              {item.hasUpdates && !item.notification && (
                <Badge variant="outline" className="ml-auto h-5 bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800/50">
                  <Bell className="h-3 w-3" />
                </Badge>
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
    </motion.nav>
  );
}
