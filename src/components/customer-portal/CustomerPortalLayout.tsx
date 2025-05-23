import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { Home, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SpaceBackground from './SpaceBackground';

interface CustomerPortalLayoutProps {
  children: ReactNode;
}

const CustomerPortalLayout = ({ children }: CustomerPortalLayoutProps) => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Space Background */}
      <SpaceBackground />
      
      {/* Content Layer */}
      <motion.div 
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto py-6 px-4 space-y-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center text-sm text-indigo-300 mb-2">
            <Link to="/" className="hover:underline flex items-center text-indigo-300 hover:text-indigo-200 transition-colors">
              <Home className="h-3.5 w-3.5 mr-1" />
              <span>Home</span>
            </Link>
            <ChevronRight className="h-3 w-3 mx-1 text-indigo-400" />
            <span className="font-medium text-indigo-200">Customer Portal</span>
          </div>
          
          <motion.h1 
            className="text-3xl font-bold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent drop-shadow-[0_0_5px_rgba(129,140,248,0.5)]"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Customer Portal
          </motion.h1>
          
          <Card className="relative p-6 shadow-[0_0_15px_rgba(129,140,248,0.3)] bg-black/40 backdrop-blur-md border border-indigo-500/20 overflow-hidden rounded-lg">
            {/* Neon glow effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-indigo-500 to-purple-500"></div>
              <div className="absolute -inset-0.5 opacity-20 rounded-lg blur-md bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-400 animate-pulse"></div>
            </div>
            
            <div className="relative z-10">
              {children}
            </div>
          </Card>
          
          {/* Back to main application button */}
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              size="sm"
              className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-950/30 hover:text-indigo-200 hover:border-indigo-400/50 transition-all shadow-[0_0_10px_rgba(129,140,248,0.2)]"
              asChild
            >
              <Link to="/">Return to Main Application</Link>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CustomerPortalLayout;
