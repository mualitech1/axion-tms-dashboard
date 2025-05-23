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
      className="relative bg-black/40 backdrop-blur-md rounded-lg shadow-[0_0_10px_rgba(129,140,248,0.25)] border border-indigo-500/20 p-2 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Neon glow effect */}
      <div className="absolute -inset-0.5 opacity-20 rounded-lg blur-sm bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-400"></div>
      
      <ul className="relative z-10 space-y-1">
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
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all",
                location.pathname === item.href
                  ? "bg-indigo-900/50 text-indigo-200 shadow-[0_0_8px_rgba(129,140,248,0.3)] border border-indigo-500/30"
                  : "text-indigo-300 hover:bg-indigo-900/30 hover:text-indigo-100 hover:shadow-[0_0_5px_rgba(129,140,248,0.2)] border border-transparent"
              )}
            >
              <item.icon className={cn(
                "h-5 w-5",
                location.pathname === item.href
                  ? "text-indigo-200 filter drop-shadow-[0_0_3px_rgba(129,140,248,0.5)]"
                  : "text-indigo-400/70"
              )} />
              <span>{item.name}</span>
              {item.notification && (
                <Badge variant="destructive" className="ml-auto h-5 min-w-5 px-1 animate-pulse shadow-[0_0_5px_rgba(244,63,94,0.5)]">
                  !
                </Badge>
              )}
              {item.hasUpdates && !item.notification && (
                <Badge variant="outline" className="ml-auto h-5 bg-blue-900/30 text-blue-300 border-blue-500/30 shadow-[0_0_5px_rgba(59,130,246,0.3)]">
                  <Bell className="h-3 w-3" />
                </Badge>
              )}
            </Link>
          </motion.li>
        ))}
      </ul>
      
      {/* Subtle particle effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute h-1 w-1 rounded-full bg-indigo-300/30"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: '0 0 4px rgba(129,140,248,0.5)',
              animation: `pulse 3s infinite ${Math.random() * 3}s`
            }}
          />
        ))}
      </div>
    </motion.nav>
  );
}
