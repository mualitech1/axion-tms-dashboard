import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { 
  Crown, Truck, Calculator, TrendingUp, Shield, Users, Sparkles,
  Clock, Activity, Zap, Heart
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface DynamicWelcomeProps {
  className?: string;
}

export const DynamicWelcome: React.FC<DynamicWelcomeProps> = ({ className }) => {
  const { user, profile } = useAuth();

  // Get user display name with intelligent fallback
  const getUserDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.split('.').map(part => 
        part.charAt(0).toUpperCase() + part.slice(1)
      ).join(' ');
    }
    return 'Champion';
  };

  // Get first name for casual greeting
  const getFirstName = () => {
    if (profile?.first_name) {
      return profile.first_name;
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.split('.')[0].charAt(0).toUpperCase() + emailName.split('.')[0].slice(1);
    }
    return 'Champion';
  };

  // Get role-based welcome information
  const getRoleWelcome = () => {
    const role = profile?.role?.toLowerCase() || 'user';
    
    switch (role) {
      case 'admin':
      case 'senior management':
        return {
          icon: <Crown className="h-6 w-6" />,
          title: 'Executive Command Center',
          greeting: `Welcome back, ${getFirstName()}`,
          subtitle: 'Your strategic overview awaits',
          description: 'Monitor operations, analyze performance, and drive strategic decisions across all logistics operations.',
          color: 'from-amber-500 to-orange-500',
          bgColor: 'from-amber-500/10 to-orange-500/10',
          borderColor: 'border-amber-500/20'
        };
      case 'operations':
        return {
          icon: <Truck className="h-6 w-6" />,
          title: 'Operations Control Hub',
          greeting: `Ready for action, ${getFirstName()}`,
          subtitle: 'Live operations at your fingertips',
          description: 'Coordinate shipments, manage drivers, and ensure seamless logistics operations in real-time.',
          color: 'from-blue-500 to-cyan-500',
          bgColor: 'from-blue-500/10 to-cyan-500/10',
          borderColor: 'border-blue-500/20'
        };
      case 'accounts':
      case 'finance':
        return {
          icon: <Calculator className="h-6 w-6" />,
          title: 'Financial Command Center',
          greeting: `Numbers look good, ${getFirstName()}`,
          subtitle: 'Financial insights and control',
          description: 'Track revenue, manage invoicing, and analyze financial performance across all operations.',
          color: 'from-green-500 to-emerald-500',
          bgColor: 'from-green-500/10 to-emerald-500/10',
          borderColor: 'border-green-500/20'
        };
      case 'sales':
        return {
          icon: <TrendingUp className="h-6 w-6" />,
          title: 'Sales Performance Hub',
          greeting: `Let's close deals, ${getFirstName()}`,
          subtitle: 'Drive revenue and growth',
          description: 'Manage leads, track opportunities, and accelerate your sales pipeline to new heights.',
          color: 'from-purple-500 to-pink-500',
          bgColor: 'from-purple-500/10 to-pink-500/10',
          borderColor: 'border-purple-500/20'
        };
      case 'driver':
        return {
          icon: <Shield className="h-6 w-6" />,
          title: 'Driver Portal',
          greeting: `Safe travels, ${getFirstName()}`,
          subtitle: 'Your route, your mission',
          description: 'Access assignments, update delivery status, and stay connected with dispatch.',
          color: 'from-indigo-500 to-blue-500',
          bgColor: 'from-indigo-500/10 to-blue-500/10',
          borderColor: 'border-indigo-500/20'
        };
      case 'customer':
        return {
          icon: <Users className="h-6 w-6" />,
          title: 'Customer Portal',
          greeting: `Welcome back, ${getFirstName()}`,
          subtitle: 'Your logistics, simplified',
          description: 'Track shipments, manage orders, and access comprehensive logistics services.',
          color: 'from-teal-500 to-cyan-500',
          bgColor: 'from-teal-500/10 to-cyan-500/10',
          borderColor: 'border-teal-500/20'
        };
      default:
        return {
          icon: <Sparkles className="h-6 w-6" />,
          title: 'Axion TMS',
          greeting: `Welcome, ${getFirstName()}`,
          subtitle: 'Quantum-powered logistics',
          description: 'Experience the future of transport management with intelligent automation and real-time insights.',
          color: 'from-violet-500 to-purple-500',
          bgColor: 'from-violet-500/10 to-purple-500/10',
          borderColor: 'border-violet-500/20'
        };
    }
  };

  // Get current time-based greeting
  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const roleInfo = getRoleWelcome();
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  return (
    <Card className={cn("relative overflow-hidden", className)}>
      {/* Background gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-50",
        roleInfo.bgColor
      )} />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/5"
            style={{
              width: 20 + Math.random() * 40,
              height: 20 + Math.random() * 40,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              x: [0, Math.random() * 50 - 25],
              y: [0, Math.random() * 50 - 25],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <CardContent className="relative z-10 p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            {/* Icon and Title */}
            <div className="flex items-center gap-3 mb-3">
              <motion.div
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className={cn(
                  "p-2 rounded-lg bg-gradient-to-r text-white",
                  roleInfo.color
                )}
              >
                {roleInfo.icon}
              </motion.div>
              
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {roleInfo.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getTimeGreeting()}, {getUserDisplayName()}
                </p>
              </div>
            </div>

            {/* Main greeting */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4"
            >
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {roleInfo.greeting} 👋
              </h1>
              <p className={cn(
                "text-lg font-medium bg-gradient-to-r bg-clip-text text-transparent",
                roleInfo.color
              )}>
                {roleInfo.subtitle}
              </p>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"
            >
              {roleInfo.description}
            </motion.p>

            {/* Status indicators */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4 text-sm"
            >
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                <Activity className="h-4 w-4" />
                <span>All systems operational</span>
              </div>
              
              <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4" />
                <span>{currentTime}</span>
              </div>
            </motion.div>
          </div>

          {/* Side decoration */}
          <motion.div
            animate={{ 
              rotate: [0, 360],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "linear"
            }}
            className="hidden md:block"
          >
            <div className={cn(
              "w-16 h-16 rounded-full bg-gradient-to-r opacity-20",
              roleInfo.color
            )} />
          </motion.div>
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className={cn(
            "absolute bottom-0 left-0 h-1 bg-gradient-to-r",
            roleInfo.color
          )}
          style={{ width: '100%' }}
        />

        {/* Mission reminder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-2 right-4 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400"
        >
          <Heart className="h-3 w-3 text-red-400" />
          <span>Supporting children in Gaza & Sudan</span>
        </motion.div>
      </CardContent>
    </Card>
  );
}; 