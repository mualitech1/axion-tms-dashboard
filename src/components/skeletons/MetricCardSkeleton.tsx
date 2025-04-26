
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-4 w-[120px]" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-[140px] mb-2" />
        <Skeleton className="h-4 w-[100px]" />
      </CardContent>
    </Card>
  );
}
