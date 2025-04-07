
import React from 'react';
import { DollarSign, BarChart3, Calendar, Clock, Badge as BadgeIcon } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Lead } from '../../data/pipelineTypes';
import { formatCurrency } from '@/lib/utils';

interface LeadDealInfoProps {
  lead: Lead;
}

export default function LeadDealInfo({ lead }: LeadDealInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Deal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">Deal Value</p>
            <div className="flex items-center">
              <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
              <p className="text-2xl font-bold">{formatCurrency(lead.value)}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium">Probability</p>
            <div className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-1 text-muted-foreground" />
              <p className="text-2xl font-bold">{lead.probability}%</p>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm font-medium">Current Stage</p>
            <Badge variant="outline" className="mt-1">{lead.stage}</Badge>
          </div>
          
          <div>
            <p className="text-sm font-medium">Lead Source</p>
            <Badge variant="outline" className="mt-1">{lead.source}</Badge>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm font-medium">Created Date</p>
            <div className="flex items-center mt-1">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{new Date(lead.created).toLocaleDateString()}</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium">Last Activity</p>
            <div className="flex items-center mt-1">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{new Date(lead.lastActivity).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
