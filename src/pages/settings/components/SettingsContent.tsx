
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import IntegrationSettings from './IntegrationSettings';
import { Globe, Shield, Bell, Link } from 'lucide-react';

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState('general');
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  const tabs = [
    { id: 'general', label: 'General', icon: Globe },
    { id: 'security', label: 'Security & Privacy', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Link }
  ];
  
  return (
    <div className="bg-gradient-to-br from-white to-tms-gray-100 rounded-xl shadow-sm border border-tms-gray-200 overflow-hidden">
      <Tabs defaultValue="general" onValueChange={setActiveTab} className="w-full">
        <div className="bg-white border-b border-tms-gray-200">
          <TabsList className="h-auto p-1 bg-transparent w-full justify-start overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`flex items-center gap-2 px-6 py-3.5 rounded-t-lg relative transition-all duration-300
                  data-[state=active]:text-tms-blue data-[state=active]:font-medium
                  data-[state=active]:before:absolute data-[state=active]:before:bottom-0 
                  data-[state=active]:before:left-0 data-[state=active]:before:w-full 
                  data-[state=active]:before:h-0.5 data-[state=active]:before:bg-tms-blue`}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {tab.id === activeTab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute inset-0 bg-tms-blue/5 rounded-t-lg border-b-2 border-tms-blue"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <div className="p-6 md:p-8">
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
        </div>
      </Tabs>
    </div>
  );
}
