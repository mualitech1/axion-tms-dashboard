
import { CalendarCheck, DollarSign, Building, Phone, Mail } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Lead } from '../../data/pipelineTypes';

interface LeadCardProps {
  lead: Lead;
  provided: any;
}

export default function LeadCard({ lead, provided }: LeadCardProps) {
  const formattedValue = new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(lead.value);
  
  const lastActivityDate = new Date(lead.lastActivity);
  const lastActivityText = formatDistanceToNow(lastActivityDate, { addSuffix: true });

  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="rounded-md border bg-card text-card-foreground shadow-sm hover:shadow-md transition-all"
    >
      <div className="p-3 space-y-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium text-base leading-none">{lead.company}</h3>
          <Badge variant={getValueBadgeVariant(lead.value)}>
            {formattedValue}
          </Badge>
        </div>
        
        <div className="flex items-center text-sm text-muted-foreground">
          <Building className="h-3.5 w-3.5 mr-1" />
          <span className="truncate">{lead.contact}, {lead.title}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-1 text-xs">
          <div className="flex items-center text-muted-foreground">
            <Phone className="h-3 w-3 mr-1" />
            <span className="truncate">{lead.phone}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Mail className="h-3 w-3 mr-1" />
            <span className="truncate">{lead.email}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarCheck className="h-3 w-3 mr-1" />
            <span>{lastActivityText}</span>
          </div>
          
          <Avatar className="h-6 w-6">
            <AvatarFallback className="text-xs">
              {getInitials(lead.assignedTo)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
}

function getValueBadgeVariant(value: number): "default" | "secondary" | "outline" {
  if (value >= 70000) return "default";
  if (value >= 30000) return "secondary";
  return "outline";
}

function getInitials(userId: string): string {
  // In a real app, you would fetch the user's name from a users store
  const userMap: Record<string, string> = {
    'user-1': 'JD',
    'user-2': 'SW',
    'user-3': 'AT'
  };
  
  return userMap[userId] || 'U';
}
