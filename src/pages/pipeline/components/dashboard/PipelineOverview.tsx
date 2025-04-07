
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PipelineOverview() {
  const stages = [
    { name: 'Lead Identified', count: 12, width: '80%' },
    { name: 'Initial Contact', count: 10, width: '70%' },
    { name: 'Discovery', count: 8, width: '60%' },
    { name: 'Proposal Sent', count: 6, width: '50%' },
    { name: 'Negotiation', count: 4, width: '40%' },
    { name: 'Pending Agreement', count: 3, width: '30%' },
    { name: 'Won', count: 2, width: '20%' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pipeline Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stages.map((stage, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="w-1/4 text-sm">{stage.name}</div>
              <div className="w-3/4 flex items-center gap-2">
                <div className="flex-1 h-6 bg-gray-100 rounded-sm overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-sm" 
                    style={{ width: stage.width }}
                  />
                </div>
                <div className="w-6 text-right text-xs">{stage.count}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
