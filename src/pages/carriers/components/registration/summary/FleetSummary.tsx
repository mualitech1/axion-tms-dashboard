
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Truck } from "lucide-react";

interface FleetSummaryProps {
  formData: {
    fleetSize?: string;
    fleetType?: string;
    capabilities?: string[];
  };
}

export function FleetSummary({ formData }: FleetSummaryProps) {
  return (
    <Card className="p-4">
      <h3 className="font-medium text-lg mb-3 flex items-center">
        <Truck className="mr-2 h-5 w-5" /> Fleet Information
      </h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Fleet Size</TableCell>
            <TableCell>{formData.fleetSize || '—'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Fleet Type</TableCell>
            <TableCell>{formData.fleetType || '—'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      
      {formData.capabilities && formData.capabilities.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Selected Capabilities:</h4>
          <div className="flex flex-wrap gap-2">
            {formData.capabilities.map((capability: string) => (
              <Badge key={capability} variant="outline" className="bg-muted/50">
                {capability.replace(/-/g, ' ')}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
}
