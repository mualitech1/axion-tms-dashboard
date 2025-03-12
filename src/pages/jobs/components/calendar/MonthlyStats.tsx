
import { CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function MonthlyStats() {
  return (
    <div className="mt-4 p-4 bg-accent/10 rounded-lg">
      <div className="flex items-center gap-2">
        <CalendarIcon className="h-4 w-4 text-tms-blue" />
        <span className="font-medium">Month at a Glance</span>
      </div>
      <Separator className="my-2" />
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex flex-col">
          <span className="text-muted-foreground">Total Jobs</span>
          <span className="font-bold text-lg">42</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Scheduled</span>
          <span className="font-bold text-lg">36</span>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Unscheduled</span>
          <span className="font-bold text-lg">6</span>
        </div>
      </div>
    </div>
  );
}
