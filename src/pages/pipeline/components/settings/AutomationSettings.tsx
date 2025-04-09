
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';
import { toast } from '@/hooks/use-toast';

export default function AutomationSettings() {
  const [emailRemindersEnabled, setEmailRemindersEnabled] = useState(true);
  const [taskRemindersEnabled, setTaskRemindersEnabled] = useState(true);
  const [inactivityAlerts, setInactivityAlerts] = useState(true);
  const [inactivityDays, setInactivityDays] = useState(7);
  
  const [followupEnabled, setFollowupEnabled] = useState(true);
  const [followupDays, setFollowupDays] = useState(3);
  const [onboardingEnabled, setOnboardingEnabled] = useState(true);
  
  const handleSave = () => {
    toast({
      title: 'Automation settings saved',
      description: 'Your automation preferences have been updated.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Automation Settings</CardTitle>
        <CardDescription>
          Configure how automations behave in your sales pipeline
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Reminders & Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="email-reminders" className="font-medium">
                  Email Reminders
                </label>
                <p className="text-sm text-muted-foreground">
                  Send automatic email reminders for follow-ups
                </p>
              </div>
              <Switch
                id="email-reminders"
                checked={emailRemindersEnabled}
                onCheckedChange={setEmailRemindersEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="task-reminders" className="font-medium">
                  Task Reminders
                </label>
                <p className="text-sm text-muted-foreground">
                  Show notifications for upcoming and overdue tasks
                </p>
              </div>
              <Switch
                id="task-reminders"
                checked={taskRemindersEnabled}
                onCheckedChange={setTaskRemindersEnabled}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="inactivity-alerts" className="font-medium">
                  Lead Inactivity Alerts
                </label>
                <p className="text-sm text-muted-foreground">
                  Alert when a lead has no activity for a period of time
                </p>
              </div>
              <Switch
                id="inactivity-alerts"
                checked={inactivityAlerts}
                onCheckedChange={setInactivityAlerts}
              />
            </div>
            
            {inactivityAlerts && (
              <div className="flex items-center gap-2 pl-6 pt-2">
                <label htmlFor="inactivity-days" className="text-sm">
                  Days of inactivity before alert:
                </label>
                <Select
                  value={inactivityDays.toString()}
                  onValueChange={(val) => setInactivityDays(parseInt(val))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="14">14</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-lg font-medium mb-4">Pipeline Stage Automations</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="followup-automation" className="font-medium">
                  Proposal Follow-up
                </label>
                <p className="text-sm text-muted-foreground">
                  Automatically create follow-up tasks when a proposal is sent
                </p>
              </div>
              <Switch
                id="followup-automation"
                checked={followupEnabled}
                onCheckedChange={setFollowupEnabled}
              />
            </div>
            
            {followupEnabled && (
              <div className="flex items-center gap-2 pl-6 pt-2">
                <label htmlFor="followup-days" className="text-sm">
                  Days before follow-up:
                </label>
                <Select
                  value={followupDays.toString()}
                  onValueChange={(val) => setFollowupDays(parseInt(val))}
                >
                  <SelectTrigger className="w-20">
                    <SelectValue placeholder="Days" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="7">7</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="onboarding-automation" className="font-medium">
                  TMS Onboarding
                </label>
                <p className="text-sm text-muted-foreground">
                  Automatically start onboarding process when deal is won
                </p>
              </div>
              <Switch
                id="onboarding-automation"
                checked={onboardingEnabled}
                onCheckedChange={setOnboardingEnabled}
              />
            </div>
          </div>
        </div>
        
        <div className="pt-4">
          <Button onClick={handleSave}>Save Automation Settings</Button>
        </div>
      </CardContent>
    </Card>
  );
}
