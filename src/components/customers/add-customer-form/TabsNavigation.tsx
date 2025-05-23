import { cn } from '@/lib/utils';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, User, FileText, AlertCircle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabsNavigationProps {
  activeTab: string;
  form: any; // Using any here as we only need form.formState.errors
  primaryContact: any | null;
}

export const TabsNavigation = ({ activeTab, form, primaryContact }: TabsNavigationProps) => {
  // Neural connection line animation variants
  const lineVariants = {
    inactive: { 
      pathLength: 0.2, 
      opacity: 0.3,
      stroke: "#4f46e5" 
    },
    active: { 
      pathLength: 1, 
      opacity: 0.6,
      stroke: "#818cf8",
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  const getTabIndicatorClass = (tabName: string) => {
    // Return appropriate indicator based on tab validation status
    if (tabName === 'general') {
      return form.formState.errors.name || 
            form.formState.errors.address?.street ||
            form.formState.errors.address?.city ||
            form.formState.errors.address?.postcode ||
            form.formState.errors.address?.country ? 
              <AlertCircle className="ml-2 h-4 w-4 text-red-400 animate-pulse" /> : 
              <Zap className="ml-2 h-4 w-4 text-green-400" />;
    }
    if (tabName === 'contacts') {
      return !primaryContact ? 
        <AlertCircle className="ml-2 h-4 w-4 text-red-400 animate-pulse" /> : 
        <Zap className="ml-2 h-4 w-4 text-green-400" />;
    }
    return null;
  };

  return (
    <div className="relative mb-10">
      {/* Neural connection lines */}
      <div className="absolute top-1/2 left-0 w-full -z-10 -translate-y-1/2">
        <svg width="100%" height="4" className="absolute top-1/2 left-0 -translate-y-1/2">
          <motion.path
            d="M 0,2 L 100,2"
            fill="transparent"
            strokeWidth="1"
            strokeDasharray="4 4"
            variants={lineVariants}
            initial="inactive"
            animate="active"
            className="opacity-30"
          />
        </svg>
      </div>

      <TabsList className="grid grid-cols-3 p-2 bg-slate-950/40 backdrop-blur-md border border-indigo-500/20 rounded-xl relative overflow-hidden shadow-[0_0_25px_-5px] shadow-indigo-500/20">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 via-blue-900/5 to-violet-900/10 opacity-30"></div>
        
        {/* Entity node indicator - shows which tab is active */}
        <motion.div 
          className="absolute h-full top-0 bottom-0 rounded-lg bg-indigo-600/10 border border-indigo-500/20 shadow-lg backdrop-blur-md"
          initial={false}
          animate={{ 
            left: activeTab === "general" ? "0%" : activeTab === "contacts" ? "33.333%" : "66.666%",
            width: "33.333%"
          }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-blue-600/10 to-indigo-600/5 opacity-50"></div>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          className="relative z-10"
        >
          <TabsTrigger 
            value="general" 
            className={cn(
              "data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 transition-all duration-300",
              "flex items-center gap-2 justify-center backdrop-blur-sm font-medium",
              activeTab === "general" ? "text-blue-200" : "text-indigo-300"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-md transition-colors",
              activeTab === "general" ? "bg-blue-600/20" : "bg-slate-800/30" 
            )}>
              <Building className="h-4 w-4" />
            </div>
            <span>Entity Data</span>
            {getTabIndicatorClass('general')}
          </TabsTrigger>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          className="relative z-10 mx-3"
        >
          <TabsTrigger 
            value="contacts"
            className={cn(
              "data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 transition-all duration-300",
              "flex items-center gap-2 justify-center backdrop-blur-sm font-medium",
              activeTab === "contacts" ? "text-blue-200" : "text-indigo-300"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-md transition-colors",
              activeTab === "contacts" ? "bg-blue-600/20" : "bg-slate-800/30" 
            )}>
              <User className="h-4 w-4" />
            </div>
            <span>Neural Links</span>
            {getTabIndicatorClass('contacts')}
          </TabsTrigger>
        </motion.div>

        <motion.div 
          whileHover={{ scale: 1.02 }} 
          whileTap={{ scale: 0.98 }}
          className="relative z-10"
        >
          <TabsTrigger 
            value="terms"
            className={cn(
              "data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-3 px-4 transition-all duration-300",
              "flex items-center gap-2 justify-center backdrop-blur-sm font-medium",
              activeTab === "terms" ? "text-blue-200" : "text-indigo-300"
            )}
          >
            <div className={cn(
              "p-1.5 rounded-md transition-colors",
              activeTab === "terms" ? "bg-blue-600/20" : "bg-slate-800/30" 
            )}>
              <FileText className="h-4 w-4" />
            </div>
            <span>Quantum Terms</span>
          </TabsTrigger>
        </motion.div>
      </TabsList>
    </div>
  );
};
