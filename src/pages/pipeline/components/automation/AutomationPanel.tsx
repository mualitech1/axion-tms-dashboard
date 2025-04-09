
import React, { useState, useEffect } from 'react';
import { 
  Bell, CalendarDays, CheckSquare2, Mail, ArrowRight, 
  Check, AlertCircle, Play, Pause, Settings
} from 'lucide-react';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { AutomatedTrigger, useAutomatedTriggers } from '../../hooks/useAutomatedTriggers';
import { toast } from '@/hooks/use-toast';

interface AutomationPanelProps {
  onCreateTask?: (taskData: any) => void;
  onCreateReminder?: (reminderData: any) => void;
  onSendEmail?: (emailData: any) => void;
}

export default function AutomationPanel({
  onCreateTask,
  onCreateReminder,
  onSendEmail
}: AutomationPanelProps) {
  const { triggers, toggleTriggerActive } = useAutomatedTriggers({
    onCreateTask,
    onCreateReminder,
    onSendEmail
  });
  
  const [activeTab, setActiveTab] = useState<'active' | 'all'>('active');
  const [expandedTriggers, setExpandedTriggers] = useState<Record<string, boolean>>({});
  
  const toggleExpand = (triggerId: string) => {
    setExpandedTriggers(prev => ({
      ...prev,
      [triggerId]: !prev[triggerId]
    }));
  };
  
  const getIcon = (type: string) => {
    switch (type) {
      case 'create_task':
        return <CheckSquare2 className="h-4 w-4" />;
      case 'create_reminder':
        return <Bell className="h-4 w-4" />;
      case 'send_email':
        return <Mail className="h-4 w-4" />;
      case 'notification':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const filteredTriggers = activeTab === 'active'
    ? triggers.filter(t => t.isActive)
    : triggers;
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Automated Workflows</h3>
          <p className="text-sm text-muted-foreground">
            Configure automation rules for your sales pipeline
          </p>
        </div>
        
        <div className="flex gap-2">
          <div className="flex rounded-md overflow-hidden border">
            <Button 
              variant={activeTab === 'active' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none"
              onClick={() => setActiveTab('active')}
            >
              Active
            </Button>
            <Button 
              variant={activeTab === 'all' ? 'default' : 'ghost'}
              size="sm"
              className="rounded-none"
              onClick={() => setActiveTab('all')}
            >
              All
            </Button>
          </div>
          
          <Button size="sm" variant="outline">
            <Settings className="h-4 w-4 mr-1" />
            Configure
          </Button>
        </div>
      </div>
      
      {filteredTriggers.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="bg-muted rounded-full p-3 mb-3">
            <Play className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-medium">No active automations</h3>
          <p className="text-sm text-muted-foreground mt-1 mb-4 max-w-md">
            {activeTab === 'active' 
              ? "You don't have any active automation workflows. Switch to 'All' tab to enable some." 
              : "You haven't created any automation workflows yet."}
          </p>
          <Button>Create Workflow</Button>
        </div>
      ) : (
        <div className="grid gap-3">
          {filteredTriggers.map(trigger => (
            <Card key={trigger.id}>
              <CardHeader className="py-3 px-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base">
                      {trigger.name}
                    </CardTitle>
                    <CardDescription>
                      {trigger.description}
                    </CardDescription>
                  </div>
                  <Switch
                    checked={trigger.isActive}
                    onCheckedChange={() => toggleTriggerActive(trigger.id)}
                  />
                </div>
              </CardHeader>
              
              {expandedTriggers[trigger.id] && (
                <CardContent className="px-4 pt-0 pb-3">
                  <div className="text-xs text-muted-foreground mb-2">
                    Trigger condition:
                  </div>
                  <div className="bg-muted py-1 px-2 rounded text-sm mb-3">
                    {trigger.condition.type === 'stage_change' && (
                      <span>
                        When lead stage changes {trigger.condition.from && `from ${trigger.condition.from}`} 
                        {trigger.condition.to && ` to ${trigger.condition.to}`}
                      </span>
                    )}
                    {trigger.condition.type === 'inactivity' && (
                      <span>
                        When lead has no activity for {trigger.condition.days} days
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xs text-muted-foreground mb-2">
                    Actions:
                  </div>
                  <div className="space-y-2">
                    {trigger.actions.map((action, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        {getIcon(action.type)}
                        <span className="ml-2">{getActionDescription(action)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              )}
              
              <div 
                className="text-xs text-center py-1 border-t cursor-pointer hover:bg-muted transition-colors"
                onClick={() => toggleExpand(trigger.id)}
              >
                {expandedTriggers[trigger.id] ? 'Show less' : 'Show details'}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

function getActionDescription(action: any): string {
  switch (action.type) {
    case 'create_task':
      return `Create "${action.data.title}" task ${action.data.dueInDays ? `due in ${action.data.dueInDays} days` : ''}`;
    case 'create_reminder':
      return `Set "${action.data.title}" reminder ${action.data.daysAfter ? `for ${action.data.daysAfter} days later` : ''}`;
    case 'send_email':
      return `Send email ${action.data.template ? `using "${action.data.template}" template` : ''}`;
    case 'notification':
      return `Show "${action.data.title}" notification`;
    default:
      return 'Perform action';
  }
}
