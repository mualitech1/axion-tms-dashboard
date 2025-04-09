
import { Card } from "@/components/ui/card";
import { CheckCircle2, Clock, AlertTriangle, Activity } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function FleetOverview() {
  // Mock data
  const fleetStats = {
    available: { count: 18, total: 25, percentage: 72 },
    inTransit: { count: 5, total: 25, percentage: 20 },
    maintenance: { count: 2, total: 25, percentage: 8 },
    utilization: 28,
    today: { total: 12, completed: 3, pending: 8, delayed: 1 }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card className="bg-white p-4 sm:p-5 border border-border/40 shadow-sm">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-green-50">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <h3 className="font-medium text-sm">Available Fleet</h3>
          </div>
          <span className="text-lg font-semibold text-green-600">
            {fleetStats.available.count}/{fleetStats.available.total}
          </span>
        </div>
        <Progress value={fleetStats.available.percentage} className="h-2 my-2" />
        <p className="text-xs text-muted-foreground">{fleetStats.available.percentage}% of fleet available for assignments</p>
      </Card>
      
      <Card className="bg-white p-4 sm:p-5 border border-border/40 shadow-sm">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-amber-50">
              <Clock className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="font-medium text-sm">In Transit</h3>
          </div>
          <span className="text-lg font-semibold text-amber-600">
            {fleetStats.inTransit.count}/{fleetStats.inTransit.total}
          </span>
        </div>
        <Progress value={fleetStats.inTransit.percentage} className="h-2 my-2 bg-muted/30" />
        <p className="text-xs text-muted-foreground">{fleetStats.inTransit.percentage}% of fleet currently on the road</p>
      </Card>
      
      <Card className="bg-white p-4 sm:p-5 border border-border/40 shadow-sm">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full bg-red-50">
              <AlertTriangle className="h-5 w-5 text-red-500" />
            </div>
            <h3 className="font-medium text-sm">Maintenance</h3>
          </div>
          <span className="text-lg font-semibold text-red-600">
            {fleetStats.maintenance.count}/{fleetStats.maintenance.total}
          </span>
        </div>
        <Progress value={fleetStats.maintenance.percentage} className="h-2 my-2 bg-muted/30" />
        <p className="text-xs text-muted-foreground">{fleetStats.maintenance.percentage}% of fleet under maintenance</p>
      </Card>
      
      <Card className="bg-white p-4 sm:p-5 border border-border/40 shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 rounded-full bg-blue-50">
              <Activity className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="font-medium text-sm">Vehicle Utilization</h3>
          </div>
          
          <div className="flex items-center gap-2 mb-1">
            <Progress value={fleetStats.utilization} className="h-2 flex-grow bg-muted/30" />
            <span className="text-lg font-semibold">{fleetStats.utilization}%</span>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Today's Jobs</span>
            <span className="text-sm font-medium">{fleetStats.today.total}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Completed</span>
            <span className="text-sm font-medium text-green-600">{fleetStats.today.completed}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Delayed</span>
            <span className="text-sm font-medium text-red-600">{fleetStats.today.delayed}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-muted-foreground">Pending</span>
            <span className="text-sm font-medium text-amber-600">{fleetStats.today.pending}</span>
          </div>
        </div>
      </Card>
    </div>
  );
}
