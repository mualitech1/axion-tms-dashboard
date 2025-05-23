import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';

interface MobileMenuProps {
  isMobileOpen: boolean;
  toggleSidebar: () => void;
}

export const MobileMenu = ({ isMobileOpen, toggleSidebar }: MobileMenuProps) => {
  return (
    <>
      <AnimatePresence>
        {!isMobileOpen && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={toggleSidebar}
            className="fixed top-4 left-4 z-50 md:hidden bg-aximo-dark/90 p-2 rounded-full shadow-aximo border border-aximo-border text-aximo-text hover:text-aximo-primary hover:border-aximo-primary hover:shadow-aximo-strong transition-all duration-200"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-aximo-dark/75 backdrop-blur-md z-40"
            onClick={toggleSidebar}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: -20 }}
              transition={{ delay: 0.05, type: "spring", stiffness: 350, damping: 25 }}
              className={cn(
                "absolute top-4 right-4 flex items-center gap-2"
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 bg-aximo-darker px-3 py-1.5 rounded-full border border-aximo-border shadow-aximo">
                <AxionLogo size="sm" variant="quantum" animated={false} />
                <span className="text-sm font-medium text-aximo-text-primary">Axion TMS</span>
              </div>
               
              <button
                onClick={toggleSidebar}
                className="p-2 rounded-full bg-aximo-darker border border-aximo-border shadow-aximo text-aximo-text-secondary hover:text-aximo-primary hover:border-aximo-primary hover:shadow-aximo-strong transition-all duration-200"
                aria-label="Close Navigation Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
