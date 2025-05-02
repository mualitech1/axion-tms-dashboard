
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CustomerPortalLayoutProps {
  children: ReactNode;
}

const CustomerPortalLayout = ({ children }: CustomerPortalLayoutProps) => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-indigo-50/50 to-white dark:from-indigo-950 dark:to-indigo-900/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto py-6 px-4 space-y-6">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 mb-2">
          <Link to="/" className="hover:underline flex items-center">
            <Home className="h-3.5 w-3.5 mr-1" />
            <span>Home</span>
          </Link>
          <ChevronRight className="h-3 w-3 mx-1 text-indigo-400 dark:text-indigo-600" />
          <span className="font-medium">Customer Portal</span>
        </div>
        
        <motion.h1 
          className="text-3xl font-bold bg-gradient-to-r from-indigo-800 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-indigo-200"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Customer Portal
        </motion.h1>
        
        <Card className="p-6 shadow-lg border-indigo-100 dark:border-indigo-800/30 dark:bg-indigo-950/20 overflow-hidden">
          {children}
        </Card>
        
        {/* Back to main application button */}
        <div className="flex justify-center mt-6">
          <Button
            variant="outline"
            size="sm"
            className="border-indigo-200 text-indigo-700 hover:bg-indigo-50 dark:border-indigo-800 dark:text-indigo-400 dark:hover:bg-indigo-900/40"
            asChild
          >
            <Link to="/">Return to Main Application</Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerPortalLayout;
