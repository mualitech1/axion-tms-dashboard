
import { Card } from "@/components/ui/card";

export function JobAssignmentInfo() {
  return (
    <Card className="p-5 bg-white h-full">
      <h3 className="text-sm font-medium mb-3">Assignment Information</h3>
      <div className="space-y-3">
        <div className="bg-muted/30 p-3 rounded-md">
          <p className="text-xs text-muted-foreground">Assigned Carrier</p>
          <p className="font-medium">FastTrucks Ltd</p>
        </div>
        
        <div className="bg-muted/30 p-3 rounded-md">
          <p className="text-xs text-muted-foreground">Driver</p>
          <p className="font-medium">Mike Johnson</p>
          <p className="text-sm text-muted-foreground">+44 7700 900123</p>
        </div>
        
        <div className="bg-muted/30 p-3 rounded-md">
          <p className="text-xs text-muted-foreground">Vehicle</p>
          <p className="font-medium">18t Box Truck</p>
          <p className="text-sm text-muted-foreground">Reg: AB12 CDE</p>
        </div>
      </div>
    </Card>
  );
}
