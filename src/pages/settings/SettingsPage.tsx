import ProfileSettings from '@/pages/settings/components/GeneralSettings';
import NotificationsSettings from '@/pages/settings/components/NotificationSettings';
import SecuritySettings from '@/pages/settings/components/SecuritySettings';
import SecurityLogs from '@/pages/settings/components/SecurityLogs';
import DeviceManagement from '@/pages/settings/components/DeviceManagement';
import MobileOperations from '@/pages/settings/components/MobileOperations';
import ComplianceDocuments from '@/pages/settings/components/ComplianceDocuments';
import IntegrationSettings from '@/pages/settings/components/IntegrationSettings';
import { SubscriptionSettings } from "@/components/settings/SubscriptionSettings";
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function SettingsPage() {
  const { user, loading, checkSession } = useAuth();
  const navigate = useNavigate();
  
  // Session protection - redirect to login if not authenticated
  useEffect(() => {
    async function verifyAuth() {
      if (!loading) {
        const isSessionValid = await checkSession();
        if (!isSessionValid) {
          navigate('/auth');
        }
      }
    }
    
    verifyAuth();
  }, [loading, navigate, checkSession]);

  if (loading) {
    return (
      <div className="container mx-auto py-6 flex justify-center items-center h-[60vh]">
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-75 animate-pulse"></div>
          <div className="relative bg-black/60 rounded-full p-4">
            <Sparkles className="h-8 w-8 text-purple-400 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="grid gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <SubscriptionSettings />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <ProfileSettings />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <SecuritySettings />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <DeviceManagement />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <MobileOperations />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <ComplianceDocuments />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.7 }}
        >
          <IntegrationSettings />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
        >
          <SecurityLogs />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.9 }}
        >
          <NotificationsSettings />
        </motion.div>
      </div>
    </motion.div>
  );
}
