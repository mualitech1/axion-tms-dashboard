
import { cn } from '@/lib/utils';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building, User, FileText, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface TabsNavigationProps {
  activeTab: string;
  form: any; // Using any here as we only need form.formState.errors
  primaryContact: any | null;
}

export const TabsNavigation = ({ activeTab, form, primaryContact }: TabsNavigationProps) => {
  const getTabIndicatorClass = (tabName: string) => {
    // Return appropriate indicator based on tab validation status
    if (tabName === 'general') {
      return form.formState.errors.name || 
            form.formState.errors.address?.street ||
            form.formState.errors.address?.city ||
            form.formState.errors.address?.postcode ||
            form.formState.errors.address?.country ? 
              <AlertCircle className="ml-2 h-4 w-4 text-destructive animate-pulse" /> : null;
    }
    if (tabName === 'contacts') {
      return !primaryContact ? <AlertCircle className="ml-2 h-4 w-4 text-destructive animate-pulse" /> : null;
    }
    return null;
  };

  return (
    <TabsList className="grid grid-cols-3 mb-8 p-1 bg-muted/50 dark:bg-indigo-900/20 rounded-xl">
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <TabsTrigger 
          value="general" 
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-indigo-800/50 rounded-lg py-3 transition-all duration-300",
            "flex items-center gap-2",
            activeTab === "general" ? "text-indigo-800 dark:text-indigo-200" : "dark:text-indigo-300"
          )}
        >
          <Building className="h-4 w-4" />
          <span>Company Information</span>
          {getTabIndicatorClass('general')}
        </TabsTrigger>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <TabsTrigger 
          value="contacts"
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-indigo-800/50 rounded-lg py-3 transition-all duration-300",
            "flex items-center gap-2",
            activeTab === "contacts" ? "text-indigo-800 dark:text-indigo-200" : "dark:text-indigo-300"
          )}
        >
          <User className="h-4 w-4" />
          <span>Contact Details</span>
          {getTabIndicatorClass('contacts')}
        </TabsTrigger>
      </motion.div>
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <TabsTrigger 
          value="terms"
          className={cn(
            "data-[state=active]:bg-white data-[state=active]:shadow-lg dark:data-[state=active]:bg-indigo-800/50 rounded-lg py-3 transition-all duration-300",
            "flex items-center gap-2",
            activeTab === "terms" ? "text-indigo-800 dark:text-indigo-200" : "dark:text-indigo-300"
          )}
        >
          <FileText className="h-4 w-4" />
          <span>Terms & Credit</span>
        </TabsTrigger>
      </motion.div>
    </TabsList>
  );
};
