
import React from 'react';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { Lead } from '../../data/pipelineTypes';
import { formatCurrency } from '@/lib/utils';

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
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Pipeline Value</p>
              <p className="text-2xl font-bold">{formatCurrency(totalPipelineValue)}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-blue-600">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Across {totalLeads} total opportunities
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Weighted Pipeline Value</p>
              <p className="text-2xl font-bold">{formatCurrency(weightedPipelineValue)}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-green-600">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Based on probability of {activeLeads} active leads
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Average Deal Size</p>
              <p className="text-2xl font-bold">{formatCurrency(avgDealSize)}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-purple-600">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6" y2="6" />
                <line x1="6" y1="18" x2="6" y2="18" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            {winRate.toFixed(1)}% win rate
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Closed Won Value</p>
              <p className="text-2xl font-bold">{formatCurrency(wonValue)}</p>
            </div>
            <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-yellow-600">
                <path d="M20.2 7.8l-7.7 7.7-4-4-5.7 5.7" />
                <path d="M15 7h6v6" />
              </svg>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            From {wonLeads} won opportunities
          </div>
        </CardContent>
      </Card>
    </>
  );
}
