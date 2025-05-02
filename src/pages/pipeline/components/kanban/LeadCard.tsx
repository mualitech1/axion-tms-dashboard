
import { CalendarCheck, DollarSign, Building, Phone, Mail, ArrowRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Lead } from '../../data/pipelineTypes';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
      className="group"
    >
      <motion.div 
        className="rounded-md border border-aximo-border bg-gradient-to-br from-aximo-card to-aximo-darker text-aximo-text shadow-sm hover:shadow-aximo hover:border-aximo-primary/30 transition-all cursor-grab active:cursor-grabbing"
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.2 } 
        }}
      >
        <div className="p-3 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-base leading-none text-aximo-text group-hover:text-aximo-primary transition-colors">
              {lead.company}
            </h3>
            <Badge variant={getValueBadgeVariant(lead.value)} className="shadow-glow">
              {formattedValue}
            </Badge>
          </div>
          
          <div className="flex items-center text-sm text-aximo-text-secondary">
            <Building className="h-3.5 w-3.5 mr-1 opacity-70" />
            <span className="truncate">{lead.contact}, {lead.title}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="flex items-center text-aximo-text-secondary">
              <Phone className="h-3 w-3 mr-1 opacity-70" />
              <span className="truncate">{lead.phone}</span>
            </div>
            <div className="flex items-center text-aximo-text-secondary">
              <Mail className="h-3 w-3 mr-1 opacity-70" />
              <span className="truncate">{lead.email}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center text-xs text-aximo-text-secondary">
              <CalendarCheck className="h-3 w-3 mr-1 opacity-70" />
              <span>{lastActivityText}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Link 
                to={`/pipeline/lead/${lead.id}`} 
                className="opacity-0 group-hover:opacity-100 transition-opacity text-aximo-primary/80 hover:text-aximo-primary"
              >
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Avatar className="h-6 w-6 border border-aximo-primary/20">
                <AvatarFallback className="text-xs bg-aximo-primary/10 text-aximo-primary">
                  {getInitials(lead.assignedTo)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </motion.div>
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
