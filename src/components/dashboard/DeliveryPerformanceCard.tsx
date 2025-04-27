
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function DeliveryPerformanceCard() {
  return (
    <Card className="bg-aximo-card/50 backdrop-blur-sm border-aximo-border transition-all duration-300 hover:shadow-aximo h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
          Delivery Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-aximo-text">On-Time Delivery</span>
            <span className="text-sm font-medium text-tms-green">92%</span>
          </div>
          <Progress 
            value={92} 
            className="h-2 bg-aximo-border" 
            indicatorClassName="bg-gradient-to-r from-tms-green to-tms-green/80" 
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-aximo-text">POD Compliance</span>
            <span className="text-sm font-medium text-aximo-primary">87%</span>
          </div>
          <Progress 
            value={87} 
            className="h-2 bg-aximo-border" 
            indicatorClassName="bg-gradient-to-r from-aximo-primary to-aximo-light" 
          />
        </div>
        
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-aximo-text">Customer Satisfaction</span>
            <span className="text-sm font-medium text-aximo-primary">94%</span>
          </div>
          <Progress 
            value={94} 
            className="h-2 bg-aximo-border" 
            indicatorClassName="bg-gradient-to-r from-aximo-primary to-aximo-light" 
          />
        </div>
      </CardContent>
    </Card>
  );
}
