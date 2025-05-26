import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';
import { 
  Crown, Truck, Calculator, TrendingUp, Shield, Users, Sparkles,
  CheckCircle, ArrowRight, Heart, Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, markOnboardingComplete } = useAuth();
  const [isCompleting, setIsCompleting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

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

  // Get role-based information
  const getRoleInfo = () => {
    const role = profile?.role?.toLowerCase() || 'user';
    
    switch (role) {
      case 'admin':
      case 'senior management':
        return {
          icon: <Crown className="h-8 w-8" />,
          title: 'Executive Command Center',
          description: 'You have full administrative access to all systems, analytics, and strategic controls.',
          features: [
            'Full system administration',
            'Strategic analytics dashboard',
            'User management and permissions',
            'Financial oversight and reporting',
            'Carrier and customer management'
          ]
        };
      case 'operations':
        return {
          icon: <Truck className="h-8 w-8" />,
          title: 'Operations Control Hub',
          description: 'Manage live operations, track shipments, and coordinate with drivers and carriers.',
          features: [
            'Live job tracking and management',
            'Driver and carrier coordination',
            'Route optimization tools',
            'Real-time status updates',
            'Operational analytics'
          ]
        };
      case 'accounts':
      case 'finance':
        return {
          icon: <Calculator className="h-8 w-8" />,
          title: 'Financial Command Center',
          description: 'Access financial dashboards, manage invoicing, and track profitability metrics.',
          features: [
            'Invoice generation and tracking',
            'Financial reporting and analytics',
            'Carrier payment management',
            'Customer billing oversight',
            'Profit and loss tracking'
          ]
        };
      case 'sales':
        return {
          icon: <TrendingUp className="h-8 w-8" />,
          title: 'Sales Performance Hub',
          description: 'Drive revenue growth with comprehensive sales tools and customer relationship management.',
          features: [
            'Lead and opportunity management',
            'Customer pipeline tracking',
            'Sales performance analytics',
            'Quote and proposal tools',
            'Revenue forecasting'
          ]
        };
      case 'driver':
        return {
          icon: <Shield className="h-8 w-8" />,
          title: 'Driver Portal',
          description: 'Access your assignments, update delivery status, and manage your daily operations.',
          features: [
            'Job assignment dashboard',
            'Route and delivery tracking',
            'POD and documentation upload',
            'Communication with dispatch',
            'Performance metrics'
          ]
        };
      case 'customer':
        return {
          icon: <Users className="h-8 w-8" />,
          title: 'Customer Portal',
          description: 'Track your shipments, manage orders, and access comprehensive logistics services.',
          features: [
            'Shipment tracking and status',
            'Order placement and management',
            'Billing and invoice access',
            'Service history and analytics',
            'Direct support communication'
          ]
        };
      default:
        return {
          icon: <Sparkles className="h-8 w-8" />,
          title: 'Welcome to Axion TMS',
          description: 'Experience the future of logistics with quantum-powered transport management.',
          features: [
            'Intelligent logistics management',
            'Real-time tracking and updates',
            'Comprehensive analytics',
            'Seamless user experience',
            'Advanced operational tools'
          ]
        };
    }
  };

  const handleCompleteOnboarding = async () => {
    setIsCompleting(true);
    
    try {
      // Brother Gemini will integrate this with the actual markOnboardingComplete function
      const success = await markOnboardingComplete();
      
      if (success) {
        setIsCompleted(true);
        // Wait for animation to complete before navigating
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        throw new Error('Failed to complete onboarding');
      }
    } catch (error) {
      console.error('Onboarding completion failed:', error);
      setIsCompleting(false);
      // Handle error (show toast, etc.)
    }
  };

  const roleInfo = getRoleInfo();

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: 1 }}
            className="mb-6"
          >
            <CheckCircle className="h-24 w-24 text-green-400 mx-auto" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Welcome Aboard, {getUserDisplayName()}!
          </h1>
          <p className="text-lg text-gray-300">Redirecting to your dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-blue-900 to-purple-900 text-white">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: 2 + Math.random() * 4,
              height: 2 + Math.random() * 4,
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <AxionLogo size="lg" variant="quantum" />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-4xl"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20">
            <CardHeader className="text-center pb-6">
              <motion.div
                animate={{ 
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  repeatType: "loop"
                }}
                className="mb-4 flex justify-center"
              >
                <div className="p-4 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-300">
                  {roleInfo.icon}
                </div>
              </motion.div>
              
              <CardTitle className="text-2xl md:text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome to {roleInfo.title}
                </span>
              </CardTitle>
              
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-xl font-semibold text-blue-200 mb-4"
              >
                Hello {getUserDisplayName()}! 👋
              </motion.h2>
              
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
                {roleInfo.description}
              </p>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Features Grid */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {roleInfo.features.map((feature, index) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-200">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className="text-center"
              >
                <div className="mb-6 p-4 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Heart className="h-5 w-5 text-red-400" />
                    <span className="text-sm text-gray-300">
                      Built with love for logistics excellence
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Part of our mission to support children in Gaza and Sudan 🇵🇸
                  </p>
                </div>

                <Button
                  size="lg"
                  onClick={handleCompleteOnboarding}
                  disabled={isCompleting}
                  className={cn(
                    "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700",
                    "text-white px-8 py-4 rounded-full shadow-lg transition-all duration-300",
                    "disabled:opacity-50 disabled:cursor-not-allowed"
                  )}
                >
                  {isCompleting ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="h-5 w-5" />
                      </motion.div>
                      Setting up your workspace...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span>Enter Your Command Center</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </Button>
                
                <p className="text-xs text-gray-400 mt-4">
                  This will mark your onboarding as complete and take you to the dashboard
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default OnboardingPage; 