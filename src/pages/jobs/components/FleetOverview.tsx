
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Truck, Clock, AlertCircle, CheckCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function FleetOverview() {
  return (
    <Card className="p-6 bg-white shadow-md border-0">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Truck className="h-5 w-5 text-tms-blue" />
        Fleet Overview
      </h3>
      <div className="grid gap-6 md:grid-cols-4">
        <div className="space-y-2 bg-muted/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-tms-green" />
              <span className="text-sm font-medium">Available Fleet</span>
            </div>
            <span className="text-sm font-bold bg-tms-green-light px-2 py-1 rounded text-tms-green">18/25</span>
          </div>
          <Progress value={72} className="h-2 bg-muted" />
          <p className="text-xs text-muted-foreground pt-1">72% of fleet available for assignments</p>
        </div>

        <div className="space-y-2 bg-muted/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-tms-yellow" />
              <span className="text-sm font-medium">In Transit</span>
            </div>
            <span className="text-sm font-bold bg-tms-yellow-light px-2 py-1 rounded text-tms-yellow">5/25</span>
          </div>
          <Progress value={20} className="h-2 bg-muted" />
          <p className="text-xs text-muted-foreground pt-1">20% of fleet currently on the road</p>
        </div>

        <div className="space-y-2 bg-muted/20 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-tms-red" />
              <span className="text-sm font-medium">Maintenance</span>
            </div>
            <span className="text-sm font-bold bg-tms-red-light px-2 py-1 rounded text-tms-red">2/25</span>
          </div>
          <Progress value={8} className="h-2 bg-muted" />
          <p className="text-xs text-muted-foreground pt-1">8% of fleet under maintenance</p>
        </div>

        <div className="space-y-2 bg-accent/25 p-4 rounded-lg border-l-4 border-tms-blue">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Vehicle Utilization</span>
            <span className="text-sm font-bold">28%</span>
          </div>
          <Separator className="my-2" />
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
