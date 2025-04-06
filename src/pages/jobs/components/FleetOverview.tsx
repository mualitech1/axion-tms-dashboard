
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, AlertCircle } from "lucide-react";

export default function FleetOverview() {
  return (
    <Card className="p-6 bg-white shadow-sm border">
      <h3 className="text-lg font-semibold mb-4">Fleet Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Available Fleet</span>
            </div>
            <span className="text-sm font-bold bg-green-50 px-2 py-1 rounded text-green-700">18/25</span>
          </div>
          <Progress value={72} className="h-2" />
          <p className="text-xs text-muted-foreground">72% of fleet available for assignments</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium">In Transit</span>
            </div>
            <span className="text-sm font-bold bg-amber-50 px-2 py-1 rounded text-amber-700">5/25</span>
          </div>
          <Progress value={20} className="h-2" />
          <p className="text-xs text-muted-foreground">20% of fleet currently on the road</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span className="text-sm font-medium">Maintenance</span>
            </div>
            <span className="text-sm font-bold bg-red-50 px-2 py-1 rounded text-red-700">2/25</span>
          </div>
          <Progress value={8} className="h-2" />
          <p className="text-xs text-muted-foreground">8% of fleet under maintenance</p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Vehicle Utilization</span>
            <span className="text-sm font-bold">28%</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Today's Jobs</p>
              <p className="font-medium">12</p>
            </div>
            <div>
              <p className="text-muted-foreground">Completed</p>
              <p className="font-medium">3</p>
            </div>
            <div>
              <p className="text-muted-foreground">Delayed</p>
              <p className="font-medium">1</p>
            </div>
            <div>
              <p className="text-muted-foreground">Pending</p>
              <p className="font-medium">8</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
