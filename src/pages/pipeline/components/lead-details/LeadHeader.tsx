
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  Clock, 
  BellPlus, 
  Calendar, 
  Mail, 
  MoreHorizontal,
  Briefcase
} from 'lucide-react';
import { format } from 'date-fns';
import { Lead } from '../../data/pipelineTypes';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface LeadHeaderProps {
  lead: Lead;
  onSetReminder: () => void;
  onStartOnboarding?: () => void;
}

export default function LeadHeader({ lead, onSetReminder, onStartOnboarding }: LeadHeaderProps) {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy');
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'archived':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="pb-6 space-y-6">
      <div className="flex justify-between items-center">
        <Link to="/sales-pipeline/board">
          <Button variant="ghost" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Pipeline
          </Button>
        </Link>
        
        <div className="flex gap-2">
          {onStartOnboarding && (
            <Button onClick={onStartOnboarding} size="sm">
              <Briefcase className="h-4 w-4 mr-2" />
              Start Onboarding
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={onSetReminder}>
            <BellPlus className="h-4 w-4 mr-2" />
            Set Reminder
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </DropdownMenuItem>
              <Separator className="my-1" />
              <DropdownMenuItem className="text-red-600">
                Delete Lead
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{lead.company}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getStatusColor(lead.status)}>
                {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
              </Badge>
              
              <div className="text-sm text-muted-foreground flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Created {formatDate(lead.created)}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center gap-2">
              <div className="text-sm">Estimated value</div>
              <div className="font-bold text-lg">
                ${lead.value.toLocaleString()}
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              {lead.probability}% probability • ${(lead.value * lead.probability / 100).toLocaleString()} weighted
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between bg-muted p-4 rounded-lg">
        <div>
          <div className="text-sm text-muted-foreground">Contact</div>
          <div>{lead.contact}</div>
          <div className="text-sm">{lead.title}</div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground">Phone</div>
          <div>{lead.phone}</div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground">Email</div>
          <div>{lead.email}</div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground">Stage</div>
          <div className="font-medium">
            {lead.stage.split('-').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ')}
          </div>
        </div>
        
        <div>
          <div className="text-sm text-muted-foreground">Last Activity</div>
          <div>{formatDate(lead.lastActivity)}</div>
        </div>
      </div>
    </div>
  );
}
