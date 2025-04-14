
import { Badge } from "@/components/ui/badge";

interface JobPriorityBadgeProps {
  priority: string;
}

export function JobPriorityBadge({ priority }: JobPriorityBadgeProps) {
  switch (priority.toLowerCase()) {
    case "high":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">High</Badge>;
    case "medium":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Medium</Badge>;
    case "low":
      return <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-200">Low</Badge>;
    default:
      return <Badge variant="outline">{priority}</Badge>;
  }
}
