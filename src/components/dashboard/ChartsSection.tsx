
import Chart from '@/components/dashboard/Chart';

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
      <Chart 
        title="Revenue Trend" 
        data={revenueData} 
        type="line" 
      />
      
      <Chart 
        title="Weekly Consignments" 
        data={consignmentsData} 
        type="bar" 
      />
    </div>
  );
}
