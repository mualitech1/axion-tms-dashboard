
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import IntegrationSettings from './IntegrationSettings';
import IntegrationManagement from './IntegrationManagement';
import IntegrationAnalytics from './IntegrationAnalytics';
import AISettings from './AISettings';
import SecurityAuditLogs from './SecurityAuditLogs';
import ComplianceDocuments from './ComplianceDocuments';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Settings2, 
  Shield, 
  Bell, 
  Link, 
  Brain,
  BarChart,
  FileText,
  ListChecks,
  Lock
} from 'lucide-react';

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState('general');
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const tabs = [
    { id: 'general', label: 'General', icon: Settings2, description: 'Basic configuration settings' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Privacy and security controls' },
    { id: 'audit-logs', label: 'Audit Logs', icon: Lock, description: 'Security audit trail' },
    { id: 'compliance', label: 'Compliance', icon: FileText, description: 'Regulatory documents' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Configure alert preferences' },
    { id: 'integrations', label: 'Integrations', icon: Link, description: 'Connect with external services' },
    { id: 'integration-management', label: 'Integration Management', icon: Link, description: 'Manage API integrations' },
    { id: 'integration-analytics', label: 'API Analytics', icon: BarChart, description: 'Monitor API usage and performance' },
    { id: 'ai', label: 'AI Settings', icon: Brain, description: 'Configure Aximo AI behavior' },
    { id: 'permissions', label: 'Permissions', icon: ListChecks, description: 'Advanced permission management' }
  ];

  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({ 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      } 
    })
  };
  
  return (
    <div className={`px-4 md:px-8 pb-8 ${isMobile ? 'pt-4' : ''}`}>
      <Tabs defaultValue="general" onValueChange={setActiveTab} className="w-full">
        <div className="mb-6 md:mb-8 border-b border-[#1EAEDB]/20">
          <TabsList className={`h-auto p-0 bg-transparent w-full ${isMobile ? 'grid grid-cols-2 gap-2' : 'justify-start'} overflow-x-auto scrollbar-none`}>
            {tabs.map((tab, index) => (
              <motion.div 
                key={tab.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={tabVariants}
                className={isMobile ? 'mb-2' : ''}
              >
                <TabsTrigger
                  value={tab.id}
                  className={`
                    flex items-center gap-2 ${isMobile ? 'justify-center py-3 px-2 w-full' : 'px-5 py-4 rounded-none'} 
                    transition-all duration-300 bg-transparent text-gray-400
                    data-[state=active]:text-[#1EAEDB] ${!isMobile ? 'data-[state=active]:border-b-2 data-[state=active]:border-[#1EAEDB]' : 'data-[state=active]:bg-[#1EAEDB]/10'}
                    data-[state=inactive]:border-transparent hover:text-gray-200
                  `}
                >
                  <tab.icon className="h-4 w-4" />
                  <span className={isMobile ? 'text-sm' : ''}>{tab.label}</span>
                </TabsTrigger>
              </motion.div>
            ))}
          </TabsList>
        </div>
        
        <div className="relative">
          <TabsContent value="general" className="mt-0">
            <GeneralSettings />
          </TabsContent>
          
          <TabsContent value="security" className="mt-0">
            <SecuritySettings />
          </TabsContent>
          
          <TabsContent value="audit-logs" className="mt-0">
            <SecurityAuditLogs />
          </TabsContent>
          
          <TabsContent value="compliance" className="mt-0">
            <ComplianceDocuments />
          </TabsContent>
          
          <TabsContent value="notifications" className="mt-0">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-0">
            <IntegrationSettings />
          </TabsContent>

          <TabsContent value="integration-management" className="mt-0">
            <IntegrationManagement />
          </TabsContent>
          
          <TabsContent value="integration-analytics" className="mt-0">
            <IntegrationAnalytics />
          </TabsContent>
          
          <TabsContent value="ai" className="mt-0">
            <AISettings />
          </TabsContent>
          
          <TabsContent value="permissions" className="mt-0">
            <div className="border border-gray-200 rounded-lg p-6 shadow-sm bg-white">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <ListChecks className="h-5 w-5" /> Advanced Permissions Management
              </h2>
              <p className="text-gray-600 mb-6">
                Configure fine-grained permissions across your organization. Permissions 
                can be assigned directly to users or through roles.
              </p>
              
              <div className="text-center py-10">
                <p className="text-gray-500">Permission management UI coming soon</p>
                <p className="text-gray-400 text-sm mt-2">
                  The backend infrastructure for advanced permissions is ready.
                  UI components for management are under development.
                </p>
              </div>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
