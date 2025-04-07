
import { Lead } from '../../../data/pipelineTypes';

// Generate forecast data based on current pipeline
export const generateForecastData = (leads: Lead[], periods = 6) => {
  // Current month's total
  const baseRevenue = leads
    .filter(lead => lead.stage === 'won')
    .reduce((sum, lead) => sum + lead.value, 0);
  
  // Potential revenue (weighted by probability)
  const potentialRevenue = leads
    .filter(lead => lead.stage !== 'won' && lead.stage !== 'lost')
    .reduce((sum, lead) => sum + (lead.value * lead.probability / 100), 0);
  
  // Distribution over the next periods
  const monthlyDistribution = [0.4, 0.3, 0.15, 0.08, 0.05, 0.02]; // How the potential revenue distributes over time
  
  // Generate forecast data
  const forecastData = [];
  const currentDate = new Date();
  let cumulativeRevenue = baseRevenue;
  
  for (let i = 0; i < periods; i++) {
    const monthDate = new Date(currentDate);
    monthDate.setMonth(currentDate.getMonth() + i);
    const monthName = monthDate.toLocaleString('default', { month: 'short' });
    const year = monthDate.getFullYear();
    const formattedMonth = `${monthName} ${year}`;
    
    // Calculate predicted revenue for this month
    const additionalRevenue = i < monthlyDistribution.length 
      ? potentialRevenue * monthlyDistribution[i] 
      : 0;
    
    cumulativeRevenue += additionalRevenue;
    
    forecastData.push({
      month: formattedMonth,
      revenue: Math.round(cumulativeRevenue),
      projected: i > 0 ? Math.round(cumulativeRevenue) : null, // Only show projections for future months
      additional: Math.round(additionalRevenue)
    });
  }
  
  return forecastData;
};

// Calculate confidence bands (simplified model)
export const calculateConfidenceBands = (forecastData: any[]) => {
  return forecastData.map(item => {
    const upper = item.revenue * 1.15; // 15% higher than expected
    const lower = item.revenue * 0.85; // 15% lower than expected
    return {
      ...item,
      upper,
      lower
    };
  });
};

export type ForecastDataItem = {
  month: string;
  revenue: number;
  projected: number | null;
  additional: number;
  upper?: number;
  lower?: number;
};
