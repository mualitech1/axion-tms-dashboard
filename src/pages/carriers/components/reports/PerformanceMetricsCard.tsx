
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { LineChart, Clock, FileCheck, AlertTriangle, Star } from "lucide-react";
import { CarrierPerformanceMetrics } from "../../data/types/performanceTypes";

interface PerformanceMetricsCardProps {
  metrics: CarrierPerformanceMetrics;
}

export default function PerformanceMetricsCard({ metrics }: PerformanceMetricsCardProps) {
  return (
    <Card className="border-aximo-border bg-indigo-500/5 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <LineChart className="h-5 w-5 mr-2 text-indigo-400" />
          {metrics.carrierName}
          <span className="text-sm font-normal text-muted-foreground ml-2">
            ({metrics.period})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-indigo-400" />
              <span className="font-medium">On-Time Delivery</span>
            </div>
            <span className="font-semibold">{metrics.onTimeDeliveryRate}%</span>
          </div>
          <Progress value={metrics.onTimeDeliveryRate} className="h-2" indicatorClassName="bg-indigo-500" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <FileCheck className="h-4 w-4 mr-2 text-green-500" />
              <span className="font-medium">Compliance Score</span>
            </div>
            <span className="font-semibold">{metrics.complianceScore}%</span>
          </div>
          <Progress value={metrics.complianceScore} className="h-2" indicatorClassName="bg-green-500" />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-amber-500" />
              <span className="font-medium">Incident Rate</span>
            </div>
            <span className="font-semibold">{metrics.incidentRate} per 100</span>
          </div>
          <Progress 
            value={100 - (metrics.incidentRate * 10)} 
            className="h-2" 
            indicatorClassName="bg-amber-500" 
          />
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-2 text-blue-400" />
              <span className="font-medium">Customer Satisfaction</span>
            </div>
            <span className="font-semibold">{metrics.customerSatisfactionScore} / 5</span>
          </div>
          <Progress 
            value={(metrics.customerSatisfactionScore / 5) * 100} 
            className="h-2" 
            indicatorClassName="bg-blue-400"
          />
        </div>
      </CardContent>
    </Card>
  );
}
