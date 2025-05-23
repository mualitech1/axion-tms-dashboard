import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Map } from "lucide-react";
import { Carrier } from "../../data/types/carrierTypes";

interface RegionalCoverageCardProps {
  carriers: Carrier[];
}

export default function RegionalCoverageCard({ carriers }: RegionalCoverageCardProps) {
  // Calculate region distribution
  const regionCounts: { [key: string]: number } = {};
  carriers.forEach(carrier => {
    if (regionCounts[carrier.region]) {
      regionCounts[carrier.region]++;
    } else {
      regionCounts[carrier.region] = 1;
    }
  });

  // Convert to array for easier rendering and sort by count (highest first)
  const regions = Object.keys(regionCounts)
    .map(region => ({
      name: region,
      count: regionCounts[region],
      percentage: Math.round((regionCounts[region] / carriers.length) * 100) || 0
    }))
    .sort((a, b) => b.count - a.count);

  // Get total number of regions
  const totalRegions = regions.length;

  return (
    <Card className="border-aximo-border bg-aximo-card shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <Map className="h-5 w-5 mr-2 text-aximo-primary" />
          Regional Coverage
        </CardTitle>
      </CardHeader>
      <CardContent>
        {carriers.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Globe className="h-12 w-12 text-aximo-text-secondary opacity-40 mb-2" />
            <p className="text-center text-aximo-text-secondary">No carrier data available</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-aximo-text-secondary">Total Regions</p>
                <p className="text-2xl font-semibold text-aximo-text">{totalRegions}</p>
              </div>
              <div>
                <p className="text-sm text-aximo-text-secondary">Quantum Sectors</p>
                <p className="text-2xl font-semibold text-aximo-text">{totalRegions}</p>
              </div>
            </div>
            
            <div className="space-y-3 mt-4">
              {regions.slice(0, 5).map((region, index) => (
                <div key={region.name} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-aximo-text">{region.name}</span>
                    <span className="text-sm font-medium text-aximo-primary">{region.count} carrier{region.count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-aximo-primary to-aximo-light" 
                      style={{ width: `${region.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
              
              {regions.length > 5 && (
                <p className="text-xs text-aximo-text-secondary text-center pt-1">
                  +{regions.length - 5} more regions
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
