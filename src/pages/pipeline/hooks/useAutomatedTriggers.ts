
import { useState, useEffect } from 'react';
import { Lead, LeadStatus, ActivityType, Activity } from '../data/pipelineTypes';
import { toast } from '@/hooks/use-toast';

interface TriggerCondition {
  type: 'stage_change' | 'status_change' | 'inactivity' | 'value_change';
  from?: string;
  to?: string;
  days?: number;
}

export interface AutomatedTrigger {
  id: string;
  name: string;
  description: string;
  condition: TriggerCondition;
  actions: {
    type: 'create_task' | 'create_reminder' | 'send_email' | 'notification';
    data: Record<string, any>;
  }[];
  isActive: boolean;
}

// Sample predefined triggers
const defaultTriggers: AutomatedTrigger[] = [
  {
    id: 'trigger-1',
    name: 'Proposal Follow-up',
    description: 'Create follow-up task 3 days after proposal stage',
    condition: {
      type: 'stage_change',
      to: 'proposal'
    },
    actions: [
      {
        type: 'create_task',
        data: {
          title: 'Follow up on proposal',
          dueInDays: 3,
          priority: 'high'
        }
      },
      {
        type: 'create_reminder',
        data: {
          title: 'Proposal follow-up reminder',
          daysAfter: 3
        }
      }
    ],
    isActive: true
  },
  {
    id: 'trigger-2',
    name: 'Deal Won - TMS Onboarding',
    description: 'Start TMS onboarding process when deal is won',
    condition: {
      type: 'stage_change',
      to: 'closed-won'
    },
    actions: [
      {
        type: 'create_task',
        data: {
          title: 'Start TMS onboarding',
          dueInDays: 1,
          priority: 'urgent'
        }
      },
      {
        type: 'notification',
        data: {
          title: 'Deal Won! Start onboarding',
          message: 'New customer ready for TMS onboarding'
        }
      }
    ],
    isActive: true
  },
  {
    id: 'trigger-3',
    name: 'Inactivity Alert',
    description: 'Alert for leads with no activity for 7 days',
    condition: {
      type: 'inactivity',
      days: 7
    },
    actions: [
      {
        type: 'create_task',
        data: {
          title: 'Check in with inactive lead',
          dueInDays: 1,
          priority: 'medium'
        }
      }
    ],
    isActive: true
  }
];

interface UseAutomatedTriggersProps {
  onCreateTask?: (taskData: any) => void;
  onCreateReminder?: (reminderData: any) => void;
  onSendEmail?: (emailData: any) => void;
}

export const useAutomatedTriggers = (props?: UseAutomatedTriggersProps) => {
  const [triggers, setTriggers] = useState<AutomatedTrigger[]>(defaultTriggers);
  
  // Process triggers when a lead changes
  const processLeadChange = (
    prevLead: Lead | null, 
    newLead: Lead,
    activities: Activity[]
  ) => {
    const activeTriggers = triggers.filter(trigger => trigger.isActive);
    
    for (const trigger of activeTriggers) {
      // Check for stage change triggers
      if (
        trigger.condition.type === 'stage_change' && 
        prevLead && 
        prevLead.stage !== newLead.stage &&
        newLead.stage === trigger.condition.to
      ) {
        executeTriggerActions(trigger, newLead);
        
        toast({
          title: "Automation triggered",
          description: `"${trigger.name}" automation has been triggered`,
        });
      }
      
      // Check for status change triggers
      if (
        trigger.condition.type === 'status_change' && 
        prevLead && 
        prevLead.status !== newLead.status &&
        newLead.status === trigger.condition.to
      ) {
        executeTriggerActions(trigger, newLead);
      }
      
      // Check for inactivity triggers
      if (trigger.condition.type === 'inactivity' && activities.length > 0) {
        const latestActivity = activities[0];
        const daysSinceActivity = Math.floor(
          (Date.now() - new Date(latestActivity.timestamp).getTime()) / 
          (1000 * 60 * 60 * 24)
        );
        
        if (daysSinceActivity >= (trigger.condition.days || 7)) {
          executeTriggerActions(trigger, newLead);
        }
      }
      
      // Check for value change triggers
      if (
        trigger.condition.type === 'value_change' && 
        prevLead && 
        prevLead.value !== newLead.value
      ) {
        executeTriggerActions(trigger, newLead);
      }
    }
  };
  
  // Execute the actions defined in a trigger
  const executeTriggerActions = (trigger: AutomatedTrigger, lead: Lead) => {
    for (const action of trigger.actions) {
      switch (action.type) {
        case 'create_task': {
          const taskData = {
            ...action.data,
            leadId: lead.id,
            company: lead.company
          };
          
          if (props?.onCreateTask) {
            props.onCreateTask(taskData);
          }
          
          console.log('Automated task created:', taskData);
          break;
        }
        case 'create_reminder': {
          const reminderData = {
            ...action.data,
            leadId: lead.id,
            company: lead.company
          };
          
          if (props?.onCreateReminder) {
            props.onCreateReminder(reminderData);
          }
          
          console.log('Automated reminder created:', reminderData);
          break;
        }
        case 'send_email': {
          const emailData = {
            ...action.data,
            to: [{ email: lead.email, name: lead.contact }]
          };
          
          if (props?.onSendEmail) {
            props.onSendEmail(emailData);
          }
          
          console.log('Automated email scheduled:', emailData);
          break;
        }
        case 'notification': {
          toast({
            title: action.data.title || 'Automation Notification',
            description: action.data.message || `Triggered for ${lead.company}`
          });
          break;
        }
      }
    }
  };
  
  // Create a new trigger
  const createTrigger = (newTrigger: Omit<AutomatedTrigger, 'id'>) => {
    const trigger: AutomatedTrigger = {
      ...newTrigger,
      id: `trigger-${Date.now()}`
    };
    
    setTriggers(prev => [trigger, ...prev]);
    return trigger;
  };
  
  // Update a trigger
  const updateTrigger = (id: string, updates: Partial<AutomatedTrigger>) => {
    setTriggers(prev => 
      prev.map(trigger => 
        trigger.id === id ? { ...trigger, ...updates } : trigger
      )
    );
  };
  
  // Delete a trigger
  const deleteTrigger = (id: string) => {
    setTriggers(prev => prev.filter(trigger => trigger.id !== id));
  };
  
  // Toggle trigger active status
  const toggleTriggerActive = (id: string) => {
    setTriggers(prev => 
      prev.map(trigger => 
        trigger.id === id ? { ...trigger, isActive: !trigger.isActive } : trigger
      )
    );
  };
  
  return {
    triggers,
    processLeadChange,
    createTrigger,
    updateTrigger,
    deleteTrigger,
    toggleTriggerActive
  };
};
