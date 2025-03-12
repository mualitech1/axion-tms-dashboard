
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Truck, Clock, AlertCircle } from "lucide-react";

export default function FleetOverview() {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Fleet Overview</h3>
      <div className="grid gap-6 md:grid-cols-3">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="h-4 w-4 text-tms-blue" />
              <span className="text-sm font-medium">Available Fleet</span>
            </div>
            <span className="text-sm font-semibold">18/25</span>
          </div>
          <Progress value={72} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">In Transit</span>
            </div>
            <span className="text-sm font-semibold">5/25</span>
          </div>
          <Progress value={20} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span className="text-sm font-medium">Maintenance</span>
            </div>
            <span className="text-sm font-semibold">2/25</span>
          </div>
          <Progress value={8} className="h-2" />
        </div>
      </div>
    </Card>
  );
}
