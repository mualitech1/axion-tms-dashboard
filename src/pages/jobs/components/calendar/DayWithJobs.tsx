
import { Badge } from "@/components/ui/badge";

interface DayWithJobsProps {
  date: Date;
  jobCount: number;
}

export function DayWithJobs({ date, jobCount }: DayWithJobsProps) {
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div>{date.getDate()}</div>
      {jobCount > 0 && (
        <div className="absolute -top-1 -right-1">
          <Badge variant="default" className="h-4 min-w-4 text-[10px] flex items-center justify-center">
            {jobCount}
          </Badge>
        </div>
      )}
    </div>
  );
}
