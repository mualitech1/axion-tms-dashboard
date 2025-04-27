
import { EnhancedChart } from './EnhancedChart';

interface ChartData {
  name: string;
  value: number;
}

interface ChartsSectionProps {
  revenueData: ChartData[];
  consignmentsData: ChartData[];
}

export default function ChartsSection({ revenueData, consignmentsData }: ChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <EnhancedChart 
        title="Revenue Trend" 
        data={revenueData} 
        type="line"
        colors={{
          primary: '#0090FF',
          grid: 'rgba(255, 255, 255, 0.1)'
        }}
      />
      
      <EnhancedChart 
        title="Delivery Performance" 
        data={consignmentsData}
        type="bar"
        colors={{
          primary: '#33C3F0',
          secondary: '#FF4842',
          grid: 'rgba(255, 255, 255, 0.1)'
        }}
        showLegend={true}
        dataKeys={['onTime', 'delayed']}
        dataLabels={['On-Time', 'Delayed']}
      />
    </div>
  );
}
