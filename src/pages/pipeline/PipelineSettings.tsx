
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AutomationSettings from './components/settings/AutomationSettings';
import { useIsMobile } from '@/hooks/use-mobile';

export default function PipelineSettings() {
  const isMobile = useIsMobile();
  
  return (
    <MainLayout title="Pipeline Settings">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Configure your sales pipeline preferences
        </p>
      </div>
      
      <Tabs defaultValue="automations" className="space-y-4">
        <div className="overflow-x-auto scrollbar-none">
          <TabsList className={`${isMobile ? 'w-max min-w-full' : ''}`}>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="automations">Automations</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="templates">Email Templates</TabsTrigger>
            <TabsTrigger value="fields">Custom Fields</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="general" className="space-y-4">
          <div className="text-center py-8 text-muted">
            General pipeline settings will appear here
          </div>
        </TabsContent>
        
        <TabsContent value="automations" className="space-y-4">
          <AutomationSettings />
        </TabsContent>
        
        <TabsContent value="integrations" className="space-y-4">
          <div className="text-center py-8 text-muted">
            Integration settings will appear here
          </div>
        </TabsContent>
        
        <TabsContent value="templates" className="space-y-4">
          <div className="text-center py-8 text-muted">
            Email template settings will appear here
          </div>
        </TabsContent>
        
        <TabsContent value="fields" className="space-y-4">
          <div className="text-center py-8 text-muted">
            Custom field configuration will appear here
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
}
