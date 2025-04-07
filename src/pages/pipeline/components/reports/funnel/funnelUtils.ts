
import { Lead, PipelineStage } from '../../../data/pipelineTypes';

// Prepare funnel chart data from leads and stages
export const prepareFunnelChartData = (data: Lead[], stages: PipelineStage[]) => {
  // Filter out "Lost" stage for the funnel visualization
  const activeStages = stages.filter(stage => stage.name !== "Lost");
  
  // Prepare data for funnel chart
  const chartData = activeStages.map(stage => {
    const stageLeads = data.filter(lead => lead.stage === stage.id);
    return {
      name: stage.name,
      count: stageLeads.length,
      value: stageLeads.reduce((sum, lead) => sum + lead.value, 0)
    };
  });
  
  return chartData;
};

// Calculate conversion rates between stages
export const calculateConversionRates = (chartData: { name: string, count: number, value: number }[]) => {
  return chartData.map((item, index, array) => {
    if (index === 0) return { ...item, conversionRate: 100 };
    
    const prevCount = array[index - 1].count;
    const conversionRate = prevCount === 0 ? 0 : (item.count / prevCount) * 100;
    return { ...item, conversionRate };
  });
};

// Calculate the average conversion rate across all stages
export const calculateAverageConversionRate = (conversionRates: { conversionRate: number }[]) => {
  if (conversionRates.length <= 1) return 0;
  
  return (
    conversionRates
      .filter((_, i) => i > 0) // Skip first item as it has 100% conversion rate
      .reduce((sum, item) => sum + item.conversionRate, 0) / 
    (conversionRates.length - 1)
  );
};

// Calculate lead to win percentage
export const calculateLeadToWinRate = (conversionRates: { count: number }[]) => {
  if (!conversionRates.length) return 0;
  
  const lastStageCount = conversionRates[conversionRates.length - 1].count;
  const firstStageCount = conversionRates[0].count;
  
  return firstStageCount ? Math.round((lastStageCount / firstStageCount) * 100) : 0;
};

// Calculate total pipeline value
export const calculateTotalValue = (data: Lead[]) => {
  return data.reduce((sum, lead) => sum + lead.value, 0);
};
