
import React from 'react';
import { Lead, PipelineStage } from '../../data/pipelineTypes';
import SimpleFunnelChart from './funnel/SimpleFunnelChart';
import DetailedFunnelChart from './funnel/DetailedFunnelChart';

interface SalesFunnelChartProps {
  data: Lead[];
  stages: PipelineStage[];
  simplified?: boolean;
}

export default function SalesFunnelChart({ data, stages, simplified = false }: SalesFunnelChartProps) {
  return (
    <div className={simplified ? 'h-72' : 'h-full'}>
      {simplified ? (
        <SimpleFunnelChart data={data} stages={stages} />
      ) : (
        <DetailedFunnelChart data={data} stages={stages} />
      )}
    </div>
  );
}
