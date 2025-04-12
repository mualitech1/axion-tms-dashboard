
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import IntegrationSettings from './IntegrationSettings';
import AISettings from './AISettings';
import { 
  Settings2, 
  Shield, 
  Bell, 
  Link, 
  Brain
} from 'lucide-react';

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState('general');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const tabs = [
    { id: 'general', label: 'General', icon: Settings2, description: 'Basic configuration settings' },
    { id: 'security', label: 'Security', icon: Shield, description: 'Privacy and security controls' },
    { id: 'notifications', label: 'Notifications', icon: Bell, description: 'Configure alert preferences' },
    { id: 'integrations', label: 'Integrations', icon: Link, description: 'Connect with external services' },
    { id: 'ai', label: 'AI Settings', icon: Brain, description: 'Configure Aximo AI behavior' }
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
    <div className="px-8 pb-8">
      <Tabs defaultValue="general" onValueChange={setActiveTab} className="w-full">
        <div className="mb-8 border-b border-[#1EAEDB]/20">
          <TabsList className="h-auto p-0 bg-transparent w-full justify-start overflow-x-auto scrollbar-none">
            {tabs.map((tab, index) => (
              <motion.div 
                key={tab.id}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={tabVariants}
              >
                <TabsTrigger
                  value={tab.id}
                  className={`
                    flex items-center gap-2 px-5 py-4 rounded-none border-b-2 
                    transition-all duration-300 bg-transparent text-gray-400
                    data-[state=active]:text-[#1EAEDB] data-[state=active]:border-[#1EAEDB]
                    data-[state=inactive]:border-transparent hover:text-gray-200
                  `}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
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
          
          <TabsContent value="notifications" className="mt-0">
            <NotificationSettings />
          </TabsContent>
          
          <TabsContent value="integrations" className="mt-0">
            <IntegrationSettings />
          </TabsContent>
          
          <TabsContent value="ai" className="mt-0">
            <AISettings />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
