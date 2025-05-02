
import { ReactNode } from 'react';
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';

interface CustomerPortalLayoutProps {
  children: ReactNode;
}

const CustomerPortalLayout = ({ children }: CustomerPortalLayoutProps) => {
  return (
    <motion.div 
      className="container mx-auto py-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold bg-gradient-to-r from-indigo-800 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-indigo-200"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        Customer Portal
      </motion.h1>
      <Card className="p-6 shadow-md border-indigo-100 dark:border-indigo-800/30 dark:bg-indigo-950/20 overflow-hidden">
        {children}
      </Card>
    </motion.div>
  );
};

export default CustomerPortalLayout;
