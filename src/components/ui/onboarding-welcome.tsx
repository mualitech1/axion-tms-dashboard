import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ArrowRight, Sparkles, Lightbulb, 
  Settings, Compass, Gauge, MessagesSquare 
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useOnboarding } from '@/hooks/use-onboarding';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { useTheme } from './theme-provider';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from './dialog';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({ icon, title, description, delay }: FeatureCardProps) {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        "p-4 rounded-lg",
        "border border-aximo-border",
        theme === 'dark' 
          ? "bg-aximo-card-dark"
          : "bg-white"
      )}
    >
      <div className="mb-3 text-aximo-primary">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2 text-aximo-text-primary">
        {title}
      </h3>
      <p className="text-sm text-aximo-text-secondary">
        {description}
      </p>
    </motion.div>
  );
}

export function OnboardingWelcome() {
  const { activeRole, user } = useAuthStore();
  const { isFirstVisit, isOnboardingEnabled, setOnboardingEnabled, startTour } = useOnboarding();
  const [open, setOpen] = useState(false);
  const [isStartingTour, setIsStartingTour] = useState(false);
  const { theme } = useTheme();
  
  useEffect(() => {
    // Only show welcome modal on first visit and when onboarding is enabled
    if (isFirstVisit && isOnboardingEnabled && user && activeRole) {
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000); // Show after 1 second
      
      return () => clearTimeout(timer);
    }
  }, [isFirstVisit, isOnboardingEnabled, user, activeRole]);
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleDisableOnboarding = () => {
    setOnboardingEnabled(false);
    setOpen(false);
  };

  const handleStartTour = () => {
    setIsStartingTour(true);
    setOpen(false);
    // Start the tour after a brief delay to allow dialog to close
    setTimeout(() => {
      console.log('🚀 Starting onboarding tour for role:', activeRole);
      startTour();
      setIsStartingTour(false);
    }, 300);
  };
  
  const roleName = activeRole 
    ? activeRole.charAt(0).toUpperCase() + activeRole.slice(1) 
    : 'User';
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-center text-xl sm:text-2xl">
            <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
              Welcome to Axion TMS
            </span>
          </DialogTitle>
          <DialogDescription className="text-center mt-2">
            Your quantum transport management experience begins here
          </DialogDescription>
        </DialogHeader>
        
        <div className="relative">
          {/* Quantum particle effects */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${theme === "dark" ? "bg-indigo-400/30" : "bg-blue-400/20"}`}
                style={{
                  width: 2 + Math.random() * 4,
                  height: 2 + Math.random() * 4,
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
                  opacity: [0, 0.6, 0],
                  scale: [0, 1, 0],
                }}
                transition={{
                  duration: 6 + Math.random() * 4,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: Math.random() * 2
                }}
              />
            ))}
          </div>
          
          {/* Content */}
          <div className="p-6 pt-2 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-5"
            >
              <p className="text-center text-aximo-text-secondary text-sm sm:text-base">
                We've designed an intelligent onboarding system specifically for your <span className="font-medium text-aximo-primary">{roleName}</span> role. 
                Key features will be highlighted as you navigate through the system.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <FeatureCard
                icon={<Lightbulb className="h-6 w-6" />}
                title="Contextual Guidance"
                description="Tooltips appear when you visit new sections, showing you relevant features."
                delay={0.3}
              />
              <FeatureCard
                icon={<Compass className="h-6 w-6" />}
                title="Role-Based Tour"
                description="Features are tailored to your specific role and responsibilities."
                delay={0.5}
              />
              <FeatureCard
                icon={<Gauge className="h-6 w-6" />}
                title="Performance Tips"
                description="Learn efficiency shortcuts and best practices for your daily tasks."
                delay={0.7}
              />
              <FeatureCard
                icon={<MessagesSquare className="h-6 w-6" />}
                title="Interactive Help"
                description="Access the onboarding guide anytime through the help menu."
                delay={0.9}
              />
            </div>
          </div>
        </div>
        
        <DialogFooter className="px-6 pb-6">
          <Button
            variant="outline"
            onClick={handleDisableOnboarding}
            className="mr-2"
          >
            Skip Onboarding
          </Button>
          <Button 
            onClick={handleStartTour}
            disabled={isStartingTour}
            className="bg-aximo-primary hover:bg-aximo-primary-hover text-white disabled:opacity-50"
          >
            {isStartingTour ? (
              <>
                <span>Starting Tour...</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="ml-2"
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.div>
              </>
            ) : (
              <>
                <span>Start Tour</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </DialogFooter>
        
        {/* Decorative elements */}
        <motion.div 
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl" 
        />
        <motion.div 
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
          className="absolute -top-12 -left-12 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl" 
        />
      </DialogContent>
    </Dialog>
  );
} 