
import { MapPin, Clock } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function JobDetailsTab() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-tms-blue" /> 
            Collection Details
          </h3>
          <div className="bg-muted/30 p-3 rounded-md space-y-1">
            <p className="font-medium">ABC Warehousing Ltd</p>
            <p className="text-sm text-muted-foreground">John Smith</p>
            <p className="text-sm">123 Industrial Estate</p>
            <p className="text-sm">Manchester</p>
            <p className="text-sm">M12 4WD</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>Collection time: 09:00 - 11:00</span>
          </div>
        </div>
        
        <div className="space-y-3">
          <h3 className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-tms-blue" /> 
            Delivery Details
          </h3>
          <div className="bg-muted/30 p-3 rounded-md space-y-1">
            <p className="font-medium">XYZ Distribution Center</p>
            <p className="text-sm text-muted-foreground">Sarah Johnson</p>
            <p className="text-sm">456 Logistics Park</p>
            <p className="text-sm">Birmingham</p>
            <p className="text-sm">B2 5TY</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>Delivery time: 14:00 - 16:00</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-sm font-medium mb-2">Job Notes</h3>
        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
          2 pallets of electronic equipment. Requires tail lift for delivery.
          Customer requested notification 1 hour before arrival.
        </p>
      </div>
    </div>
  );
}
