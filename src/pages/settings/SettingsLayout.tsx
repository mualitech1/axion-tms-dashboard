import { ReactNode } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Home, Settings, ChevronRight, User, Bell, Shield, Monitor, Smartphone, FileText, Cable, Clock, RotateCcw, CreditCard, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpaceSettingsBackground from '@/components/settings/SpaceSettingsBackground';
import IslamicBlessingSettings from '@/components/settings/IslamicBlessingSettings';

const SettingsLayout = () => {
  const location = useLocation();
  
  // Define the settings nav items
  const settingsNavItems = [
    { path: "/settings", label: "Overview", icon: <Sparkles className="h-4 w-4 mr-2" /> },
    { path: "/settings/profile", label: "Profile", icon: <User className="h-4 w-4 mr-2" /> },
    { path: "/settings/notifications", label: "Notifications", icon: <Bell className="h-4 w-4 mr-2" /> },
    { path: "/settings/security", label: "Security", icon: <Shield className="h-4 w-4 mr-2" /> },
    { path: "/settings/security-logs", label: "Security Logs", icon: <Clock className="h-4 w-4 mr-2" /> },
    { path: "/settings/devices", label: "Devices", icon: <Monitor className="h-4 w-4 mr-2" /> },
    { path: "/settings/mobile", label: "Mobile", icon: <Smartphone className="h-4 w-4 mr-2" /> },
    { path: "/settings/compliance", label: "Compliance", icon: <FileText className="h-4 w-4 mr-2" /> },
    { path: "/settings/integrations", label: "Integrations", icon: <Cable className="h-4 w-4 mr-2" /> },
    { path: "/settings/subscription", label: "Subscription", icon: <CreditCard className="h-4 w-4 mr-2" /> },
  ];
  
  // Check if a nav item is active
  const isActive = (path: string) => {
    if (path === "/settings" && location.pathname === "/settings") {
      return true;
    }
    if (path !== "/settings" && location.pathname.startsWith(path)) {
      return true;
    }
    return false;
  };
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Space Background */}
      <SpaceSettingsBackground />
      
      {/* Content Layer */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto py-6 px-4 space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center text-sm text-purple-300 mb-2">
            <Link to="/" className="hover:underline flex items-center text-purple-300 hover:text-purple-200 transition-colors">
              <Home className="h-3.5 w-3.5 mr-1" />
              <span>Quantum Home</span>
            </Link>
            <ChevronRight className="h-3 w-3 mx-1 text-purple-400" />
            <span className="font-medium text-purple-200">System Calibration</span>
          </div>
          
          {/* Islamic Blessing Banner */}
          <IslamicBlessingSettings />
          
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-purple-300 to-indigo-300 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(168,85,247,0.5)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Settings className="inline h-7 w-7 mr-2 text-purple-400" />
            Quantum Settings Calibration
          </motion.h1>
          
          {/* Settings Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-purple-500/20 scrollbar-track-transparent"
          >
            {settingsNavItems.map((item) => (
              <Link to={item.path} key={item.path}>
                <Button 
                  variant={isActive(item.path) ? "default" : "outline"}
                  size="sm"
                  className={isActive(item.path) 
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-none shadow-[0_0_10px_rgba(168,85,247,0.3)]" 
                    : "border-purple-500/30 text-purple-300 hover:bg-purple-950/30 hover:text-purple-200 hover:border-purple-400/50"}
                >
                  {item.icon}
                  {item.label}
                </Button>
              </Link>
            ))}
          </motion.div>
          
          {/* Main Content Card */}
          <Card className="relative p-6 shadow-[0_0_15px_rgba(168,85,247,0.3)] bg-black/40 backdrop-blur-md border border-purple-500/20 overflow-hidden rounded-lg">
            {/* Neon glow effect - purple for settings */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-purple-500 to-indigo-500"></div>
              <div className="absolute -inset-0.5 opacity-20 rounded-lg blur-md bg-gradient-to-br from-purple-400 via-indigo-400 to-purple-400 animate-pulse"></div>
            </div>
            
            {/* Digital circuit pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
              <svg width="100%" height="100%" className="absolute inset-0">
                <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                  <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(168, 85, 247, 0.8)" strokeWidth="0.5"/>
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />
                <circle cx="20%" cy="30%" r="2" fill="rgba(168, 85, 247, 0.8)" />
                <circle cx="40%" cy="70%" r="2" fill="rgba(168, 85, 247, 0.8)" />
                <circle cx="60%" cy="20%" r="2" fill="rgba(168, 85, 247, 0.8)" />
                <circle cx="80%" cy="60%" r="2" fill="rgba(168, 85, 247, 0.8)" />
                <line x1="20%" y1="30%" x2="40%" y2="70%" stroke="rgba(168, 85, 247, 0.8)" strokeWidth="0.5" />
                <line x1="40%" y1="70%" x2="60%" y2="20%" stroke="rgba(168, 85, 247, 0.8)" strokeWidth="0.5" />
                <line x1="60%" y1="20%" x2="80%" y2="60%" stroke="rgba(168, 85, 247, 0.8)" strokeWidth="0.5" />
              </svg>
            </div>
            
            {/* Content */}
            <div className="relative z-10">
              <Outlet />
            </div>
          </Card>
          
          {/* Back to main application button */}
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-300 hover:bg-purple-950/30 hover:text-purple-200 hover:border-purple-400/50 transition-all shadow-[0_0_10px_rgba(168,85,247,0.2)]"
              asChild
            >
              <Link to="/">
                <Home className="h-3.5 w-3.5 mr-1" />
                Return to Quantum Hub
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsLayout; 