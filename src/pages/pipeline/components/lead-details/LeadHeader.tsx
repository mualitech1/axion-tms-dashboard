
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell, UserPlus, FileCheck, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';
import { Lead, LeadStatus } from '../../data/pipelineTypes';
import NotificationsPanel from '../collaboration/NotificationsPanel';

interface LeadHeaderProps {
  lead: Lead;
  onSetReminder: () => void;
}

export default function LeadHeader({ lead, onSetReminder }: LeadHeaderProps) {
  const [isOnboarding, setIsOnboarding] = useState(false);

  const initiateOnboarding = () => {
    setIsOnboarding(true);
    toast({
      title: "Onboarding initiated",
      description: `Customer onboarding process started for ${lead.company}`,
    });
    
    // In a real application, this would connect to your TMS onboarding system
    setTimeout(() => {
      setIsOnboarding(false);
      toast({
        title: "Onboarding ready",
        description: "Customer has been added to the onboarding queue",
      });
    }, 2000);
  };

  const sendWelcomeEmail = () => {
    toast({
      title: "Welcome email triggered",
      description: "Welcome email has been queued for sending",
    });
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <Link to="/pipeline/board">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Pipeline
          </Button>
        </Link>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={onSetReminder}>
            <Bell className="h-4 w-4 mr-2" />
            Set Reminder
          </Button>
          <NotificationsPanel />
        </div>
      </div>
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{lead.company}</h1>
          <div className="flex items-center text-muted-foreground">
            <span className="mr-2">{lead.contact}, {lead.title}</span>
            <Badge variant={lead.status === LeadStatus.ACTIVE ? "default" : "destructive"}>
              {lead.status}
            </Badge>
          </div>
        </div>
        <div className="space-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Integration Actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={initiateOnboarding}>
                <UserPlus className="mr-2 h-4 w-4" />
                <span>Start Onboarding</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={sendWelcomeEmail}>
                <Mail className="mr-2 h-4 w-4" />
                <span>Send Welcome Email</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open('/customers', '_blank')}>
                <FileCheck className="mr-2 h-4 w-4" />
                <span>View in Customer Portal</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button>Schedule Meeting</Button>
        </div>
      </div>
      
      {isOnboarding && (
        <div className="mt-4 p-2 bg-blue-50 border border-blue-200 rounded flex items-center justify-between">
          <div className="flex items-center">
            <UserPlus className="h-4 w-4 mr-2 text-blue-500" />
            <span className="text-sm">Onboarding in progress...</span>
          </div>
        </div>
      )}
    </div>
  );
}
