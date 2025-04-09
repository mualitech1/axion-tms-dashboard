
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';
import { Lead } from '../data/pipelineTypes';

export interface OnboardingStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  estimatedTimeMinutes: number;
  assignedTo?: string;
}

export interface OnboardingProcess {
  id: string;
  leadId: string;
  companyName: string;
  startedAt: string;
  completedAt?: string;
  status: 'pending' | 'in_progress' | 'completed';
  steps: OnboardingStep[];
  currentStepIndex: number;
}

export type TMSIntegrationStatus = 'disconnected' | 'connected' | 'error';

export function useTMSIntegration() {
  const [status, setStatus] = useState<TMSIntegrationStatus>('disconnected');
  const [onboardingProcesses, setOnboardingProcesses] = useState<OnboardingProcess[]>([]);
  const [isPending, setIsPending] = useState(false);
  
  // Connect to the TMS system
  const connectToTMS = async (): Promise<boolean> => {
    setIsPending(true);
    
    // Simulate connection to TMS
    return new Promise(resolve => {
      setTimeout(() => {
        setStatus('connected');
        setIsPending(false);
        toast({
          title: "TMS connected",
          description: "Successfully connected to the TMS system"
        });
        resolve(true);
      }, 2000);
    });
  };
  
  // Disconnect from the TMS system
  const disconnectFromTMS = () => {
    setStatus('disconnected');
    toast({
      title: "TMS disconnected",
      description: "Connection to TMS system has been removed"
    });
  };
  
  // Create default onboarding steps
  const createDefaultSteps = (): OnboardingStep[] => {
    return [
      {
        id: `step-${Date.now()}-1`,
        name: 'Profile Creation',
        description: 'Create customer profile in TMS',
        status: 'pending',
        estimatedTimeMinutes: 15
      },
      {
        id: `step-${Date.now()}-2`,
        name: 'Service Configuration',
        description: 'Configure services based on contract',
        status: 'pending',
        estimatedTimeMinutes: 30
      },
      {
        id: `step-${Date.now()}-3`,
        name: 'Billing Setup',
        description: 'Set up billing and payment details',
        status: 'pending',
        estimatedTimeMinutes: 20
      },
      {
        id: `step-${Date.now()}-4`,
        name: 'User Account Creation',
        description: 'Create user accounts for customer team',
        status: 'pending',
        estimatedTimeMinutes: 15
      },
      {
        id: `step-${Date.now()}-5`,
        name: 'Training Session',
        description: 'Schedule and conduct training session',
        status: 'pending',
        estimatedTimeMinutes: 60
      }
    ];
  };
  
  // Start the onboarding process for a won deal
  const startOnboardingProcess = async (lead: Lead): Promise<OnboardingProcess | null> => {
    if (status !== 'connected') {
      toast({
        title: "TMS not connected",
        description: "Please connect to the TMS system first",
        variant: "destructive"
      });
      return null;
    }
    
    setIsPending(true);
    
    // In a real app, this would make an API call to the TMS system
    console.log('Starting onboarding process for lead:', lead);
    
    // Simulate API call
    return new Promise(resolve => {
      setTimeout(() => {
        const newProcess: OnboardingProcess = {
          id: `onboarding-${Date.now()}`,
          leadId: lead.id,
          companyName: lead.company,
          startedAt: new Date().toISOString(),
          status: 'in_progress',
          steps: createDefaultSteps(),
          currentStepIndex: 0
        };
        
        setOnboardingProcesses(prev => [...prev, newProcess]);
        setIsPending(false);
        
        toast({
          title: "Onboarding started",
          description: `Onboarding process for ${lead.company} has been initiated`
        });
        
        resolve(newProcess);
      }, 1500);
    });
  };
  
  // Update the status of an onboarding step
  const updateStepStatus = async (
    processId: string,
    stepId: string,
    status: OnboardingStep['status']
  ): Promise<boolean> => {
    if (status !== 'connected') {
      return false;
    }
    
    setOnboardingProcesses(prev => {
      const updatedProcesses = prev.map(process => {
        if (process.id === processId) {
          const updatedSteps = process.steps.map(step => 
            step.id === stepId ? { ...step, status } : step
          );
          
          // Calculate the new current step index
          const completedStepsCount = updatedSteps.filter(
            step => step.status === 'completed'
          ).length;
          
          // If all steps are completed, mark the process as completed
          const newStatus = completedStepsCount === updatedSteps.length 
            ? 'completed' 
            : process.status;
            
          const completedAt = newStatus === 'completed' 
            ? new Date().toISOString() 
            : process.completedAt;
          
          return {
            ...process,
            steps: updatedSteps,
            currentStepIndex: completedStepsCount,
            status: newStatus,
            completedAt
          };
        }
        return process;
      });
      
      return updatedProcesses;
    });
    
    return true;
  };
  
  // Get the onboarding process for a specific lead
  const getOnboardingForLead = (leadId: string): OnboardingProcess | null => {
    return onboardingProcesses.find(process => process.leadId === leadId) || null;
  };
  
  return {
    status,
    isPending,
    onboardingProcesses,
    connectToTMS,
    disconnectFromTMS,
    startOnboardingProcess,
    updateStepStatus,
    getOnboardingForLead
  };
}
