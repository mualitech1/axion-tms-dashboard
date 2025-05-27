import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles } from 'lucide-react';
import { OnboardingHint, useOnboarding } from '@/hooks/use-onboarding';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { useTheme } from './theme-provider';

interface OnboardingTooltipProps {
  hint: OnboardingHint;
  onClose: () => void;
  onComplete: () => void;
}

export function OnboardingTooltip({ 
  hint,
  onClose,
  onComplete
}: OnboardingTooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const { theme } = useTheme();
  const { markHintAsSeen } = useOnboarding();
  
  // Calculate position based on the target element
  useEffect(() => {
    const positionTooltip = () => {
      const targetElement = document.querySelector(hint.targetSelector);
      
      if (!targetElement || !tooltipRef.current) return;
      
      const targetRect = targetElement.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      let top = 0;
      let left = 0;
      
      // Position based on placement
      switch(hint.placement) {
        case 'top':
          top = targetRect.top - tooltipRect.height - 12;
          left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'bottom':
          top = targetRect.bottom + 12;
          left = targetRect.left + (targetRect.width / 2) - (tooltipRect.width / 2);
          break;
        case 'left':
          top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
          left = targetRect.left - tooltipRect.width - 12;
          break;
        case 'right':
        default:
          top = targetRect.top + (targetRect.height / 2) - (tooltipRect.height / 2);
          left = targetRect.right + 12;
          break;
      }
      
      // Ensure tooltip stays within viewport
      if (left < 20) left = 20;
      if (left + tooltipRect.width > window.innerWidth - 20) {
        left = window.innerWidth - tooltipRect.width - 20;
      }
      
      if (top < 20) top = 20;
      if (top + tooltipRect.height > window.innerHeight - 20) {
        top = window.innerHeight - tooltipRect.height - 20;
      }
      
      setPosition({ top, left });
    };
    
    // Position immediately and on resize
    positionTooltip();
    window.addEventListener('resize', positionTooltip);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', positionTooltip);
    };
  }, [hint]);
  
  const handleComplete = () => {
    markHintAsSeen(hint.id);
    onComplete();
  };
  
  return (
    <AnimatePresence>
      <motion.div
        ref={tooltipRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        style={{
          top: position.top,
          left: position.left,
          zIndex: 1000,
        }}
        className={cn(
          "fixed w-64 sm:w-72 p-4 rounded-lg shadow-lg",
          "border border-aximo-border",
          theme === 'dark' 
            ? "bg-gradient-to-br from-aximo-darker to-aximo-darker/90"
            : "bg-gradient-to-br from-white to-blue-50"
        )}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 text-aximo-text-secondary hover:text-aximo-text-primary transition-colors"
          aria-label="Close tooltip"
        >
          <X className="h-4 w-4" />
        </button>
        
        {/* Sparkles effect */}
        <motion.div
          animate={{ 
            rotate: [0, 5, 0, -5, 0],
            scale: [1, 1.1, 1, 1.1, 1]
          }}
          transition={{ 
            duration: 5, 
            repeat: Infinity,
            repeatType: "loop"
          }}
          className="absolute -top-1 -left-1 text-aximo-primary opacity-60"
        >
          <Sparkles className="h-5 w-5" />
        </motion.div>
        
        {/* Content */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2 text-aximo-text-primary">
            {hint.title}
          </h3>
          <p className="text-sm text-aximo-text-secondary">
            {hint.description}
          </p>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end">
          <Button
            size="sm"
            variant="default"
            onClick={handleComplete}
            className="bg-aximo-primary hover:bg-aximo-primary-hover text-white"
          >
            <span>Got it</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        {/* Decorative elements */}
        <motion.div 
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-gradient-to-r from-indigo-500/30 to-purple-500/30 blur-xl" 
        />
      </motion.div>
    </AnimatePresence>
  );
}

interface OnboardingTooltipControllerProps {
  children: React.ReactNode;
}

export function OnboardingTooltipController({ children }: OnboardingTooltipControllerProps) {
  const { activeRole, user } = useAuthStore();
  const { 
    isFirstVisit, 
    hasSeenHint, 
    activeHint, 
    setActiveHint,
    isOnboardingEnabled
  } = useOnboarding();
  const [currentHints, setCurrentHints] = useState<OnboardingHint[]>([]);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  
  // Get hints for the current role from the onboardingHints object
  useEffect(() => {
    if (!activeRole || !user || !isOnboardingEnabled) return;
    
    import('@/hooks/use-onboarding').then(({ onboardingHints }) => {
      const roleHints = onboardingHints[activeRole] || [];
      setCurrentHints(roleHints); // Use ALL hints, not just unseen ones
    });
  }, [activeRole, user, isOnboardingEnabled]);
  
  // Update current hint index when activeHint changes (for manual tour starts)
  useEffect(() => {
    if (activeHint && currentHints.length > 0) {
      const hintIndex = currentHints.findIndex(hint => hint.id === activeHint.id);
      if (hintIndex !== -1) {
        setCurrentHintIndex(hintIndex);
      }
    }
  }, [activeHint, currentHints]);
  
  // Show the first unseen hint when the component mounts (for first visit only)
  useEffect(() => {
    if (currentHints.length > 0 && isFirstVisit && isOnboardingEnabled && !activeHint) {
      const unseenHints = currentHints.filter(hint => !hasSeenHint(hint.id));
      if (unseenHints.length > 0) {
        setActiveHint(unseenHints[0]);
      }
    }
  }, [currentHints, isFirstVisit, setActiveHint, isOnboardingEnabled, activeHint, hasSeenHint]);
  
  const handleClose = () => {
    setActiveHint(null);
  };
  
  const handleComplete = () => {
    if (currentHintIndex < currentHints.length - 1) {
      // Show next hint
      setCurrentHintIndex(currentHintIndex + 1);
      setActiveHint(currentHints[currentHintIndex + 1]);
    } else {
      // All hints shown
      setActiveHint(null);
    }
  };
  
  return (
    <>
      {children}
      
      {activeHint && (
        <OnboardingTooltip
          hint={activeHint}
          onClose={handleClose}
          onComplete={handleComplete}
        />
      )}
    </>
  );
} 