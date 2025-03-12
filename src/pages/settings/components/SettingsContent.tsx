
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import NotificationSettings from './NotificationSettings';
import IntegrationSettings from './IntegrationSettings';

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState('general');
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-tms-gray-200">
      <Tabs defaultValue="general" onValueChange={setActiveTab} className="w-full">
        <div className="border-b border-tms-gray-200">
          <TabsList className="h-auto p-0 bg-transparent">
            {[
              { id: 'general', label: 'General' },
              { id: 'security', label: 'Security & Privacy' },
              { id: 'notifications', label: 'Notifications' },
              { id: 'integrations', label: 'Integrations' }
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className={`px-4 py-3 rounded-none border-b-2 data-[state=active]:border-tms-blue data-[state=active]:text-tms-blue border-transparent text-tms-gray-600 font-medium`}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        <div className="p-6">
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
