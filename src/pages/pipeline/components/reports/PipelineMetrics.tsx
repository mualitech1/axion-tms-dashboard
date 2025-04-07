
import React from 'react';
import { Lead } from '../../data/pipelineTypes';
import { formatCurrency } from '@/lib/utils';
import { MetricsCard } from '@/components/ui/metrics-card';
import { DollarSign, AreaChart, Briefcase, TrendingUp } from 'lucide-react';

interface PipelineMetricsProps {
  data: Lead[];
}

export default function PipelineMetrics({ data }: PipelineMetricsProps) {
  // Calculate key metrics
  const totalLeads = data.length;
  const activeLeads = data.filter(lead => lead.stage !== 'lost' && lead.stage !== 'won').length;
  const wonLeads = data.filter(lead => lead.stage === 'won').length;
  const lostLeads = data.filter(lead => lead.stage === 'lost').length;
  
  // Calculate values
  const totalPipelineValue = data
    .filter(lead => lead.stage !== 'lost')
    .reduce((sum, lead) => sum + lead.value, 0);
    
  const weightedPipelineValue = data
    .filter(lead => lead.stage !== 'lost' && lead.stage !== 'won')
    .reduce((sum, lead) => sum + (lead.value * lead.probability / 100), 0);
  
  const wonValue = data
    .filter(lead => lead.stage === 'won')
    .reduce((sum, lead) => sum + lead.value, 0);
  
  const avgDealSize = totalPipelineValue / (totalLeads - lostLeads) || 0;
  
  const winRate = (wonLeads / (wonLeads + lostLeads) * 100) || 0;
  
  return (
    <>
      <MetricsCard
        title="Total Pipeline Value"
        value={formatCurrency(totalPipelineValue)}
        description={`Across ${totalLeads} total opportunities`}
        icon={<DollarSign className="h-4 w-4" />}
        variant="primary"
      />
      
      <MetricsCard
        title="Weighted Pipeline Value"
        value={formatCurrency(weightedPipelineValue)}
        description={`Based on probability of ${activeLeads} active leads`}
        icon={<AreaChart className="h-4 w-4" />}
        variant="success"
      />
      
      <MetricsCard
        title="Average Deal Size"
        value={formatCurrency(avgDealSize)}
        description={`${winRate.toFixed(1)}% win rate`}
        icon={<Briefcase className="h-4 w-4" />}
        variant="warning"
      />
      
      <MetricsCard
        title="Closed Won Value"
        value={formatCurrency(wonValue)}
        description={`From ${wonLeads} won opportunities`}
        icon={<TrendingUp className="h-4 w-4" />}
        variant="default"
      />
    </>
  );
}
