
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Globe } from "lucide-react";

interface RegionalCoverageSummaryProps {
  formData: {
    regionalCoverage?: string[];
  };
}

export function RegionalCoverageSummary({ formData }: RegionalCoverageSummaryProps) {
  const regionDisplayNames: Record<string, string> = {
    north: "North",
    south: "South",
    east: "East",
    west: "West",
    midlands: "Midlands",
    wales: "Wales",
    scotland: "Scotland",
    ireland: "Northern Ireland",
  };

  // Get the coverage percentage
  const totalRegions = 8; // Total number of defined regions
  const coverageCount = formData.regionalCoverage?.length || 0;
  const coveragePercentage = Math.round((coverageCount / totalRegions) * 100);
  
  const getCoverageColorClass = (percentage: number) => {
    if (percentage === 0) return "bg-gray-100 text-gray-500";
    if (percentage < 30) return "bg-amber-100 text-amber-800";
    if (percentage < 70) return "bg-blue-100 text-blue-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <Card className="p-4">
      <h3 className="font-medium text-lg mb-3 flex items-center">
        <Globe className="mr-2 h-5 w-5" /> Regional Coverage
      </h3>
      
      {formData.regionalCoverage && formData.regionalCoverage.length > 0 ? (
        <div className="space-y-3">
          <Badge 
            className={`${getCoverageColorClass(coveragePercentage)} mr-2`}
          >
            {coveragePercentage}% Coverage
          </Badge>
          
          <div className="flex flex-wrap gap-2">
            {formData.regionalCoverage.map((region: string) => (
              <Badge 
                key={region} 
                variant="outline" 
                className="bg-muted/50 flex items-center"
              >
                <MapPin className="h-3 w-3 mr-1" />
                {regionDisplayNames[region] || region.replace(/-/g, ' ')}
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
