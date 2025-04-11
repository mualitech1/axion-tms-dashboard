
import Chart from '@/components/dashboard/Chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ChartData {
  name: string;
  value: number;
}

interface DeliveryPerformanceData {
  name: string;
  onTime: number;
  delayed: number;
}

interface EnhancedChartsSectionProps {
  revenueData: ChartData[];
  deliveryPerformance: DeliveryPerformanceData[];
}

export default function EnhancedChartsSection({ revenueData, deliveryPerformance }: EnhancedChartsSectionProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Chart 
        title="Revenue Trend" 
        data={revenueData} 
        type="line" 
      />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Delivery Performance</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="h-[300px] w-full">
            <Chart
              title=""
              data={deliveryPerformance}
              type="bar"
              dataKeys={['onTime', 'delayed']}
              colors={['#10B981', '#F43F5E']}
              height={280}
              className="mt-0 pt-0"
            />
          </div>
          <div className="flex justify-center mt-2 text-xs text-muted-foreground space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-[#10B981] mr-1"></div>
              <span>On-Time</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-[#F43F5E] mr-1"></div>
              <span>Delayed</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
