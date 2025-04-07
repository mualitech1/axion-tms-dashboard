
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lead, LeadStatus } from '../../data/pipelineTypes';
import NotificationsPanel from '../collaboration/NotificationsPanel';

interface LeadHeaderProps {
  lead: Lead;
  onSetReminder: () => void;
}

export default function LeadHeader({ lead, onSetReminder }: LeadHeaderProps) {
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
          <Button variant="outline">Edit Lead</Button>
          <Button>Schedule Meeting</Button>
        </div>
      </div>
    </div>
  );
}
