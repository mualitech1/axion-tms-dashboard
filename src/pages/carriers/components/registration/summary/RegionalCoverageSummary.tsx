
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapIcon } from "lucide-react";

interface RegionalCoverageSummaryProps {
  formData: {
    regionalCoverage?: string[];
  };
}

export function RegionalCoverageSummary({ formData }: RegionalCoverageSummaryProps) {
  return (
    <Card className="p-4">
      <h3 className="font-medium text-lg mb-3 flex items-center">
        <MapIcon className="mr-2 h-5 w-5" /> Regional Coverage
      </h3>
      
      {formData.regionalCoverage && formData.regionalCoverage.length > 0 ? (
        <div>
          <div className="flex flex-wrap gap-2">
            {formData.regionalCoverage.map((region: string) => (
              <Badge key={region} variant="outline" className="bg-muted/50">
                {region.replace(/-/g, ' ')}
              </Badge>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">No regional coverage specified</p>
      )}
    </Card>
  );
}
