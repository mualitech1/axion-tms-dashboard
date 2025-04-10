
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
            <div className="border-t border-gray-200 mt-2 pt-2">
              <p className="text-sm">
                <span className="font-medium">Collection Ref:</span> ABC-9876-COL
              </p>
            </div>
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
            <div className="border-t border-gray-200 mt-2 pt-2">
              <p className="text-sm">
                <span className="font-medium">Delivery Ref:</span> XYZ-1234-DEL
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Clock className="h-3.5 w-3.5" />
            <span>Delivery time: 14:00 - 16:00</span>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <h3 className="text-sm font-medium mb-2">Cargo Details</h3>
          <div className="bg-muted/30 p-3 rounded-md space-y-2">
            <div>
              <span className="text-sm font-medium">Product Type:</span>
              <span className="text-sm ml-2">Electronic Equipment</span>
            </div>
            <div>
              <span className="text-sm font-medium">Total Weight:</span>
              <span className="text-sm ml-2">2,400 KG</span>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Job Notes</h3>
        <p className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-md">
          2 pallets of electronic equipment. Requires tail lift for delivery.
          Customer requested notification 1 hour before arrival.
        </p>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Additional Information</h3>
        <div className="bg-muted/30 p-3 rounded-md">
          <p className="text-sm text-muted-foreground">
            Driver must have appropriate PPE. Site has special requirements for COVID protocols.
            Loading bay #3 reserved for this collection. Fork-lift operator will be available on site.
          </p>
        </div>
      </div>
    </div>
  );
}
