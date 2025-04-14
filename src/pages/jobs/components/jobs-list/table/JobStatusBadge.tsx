
import { Badge } from "@/components/ui/badge";
import { JobStatus } from "../../../types/jobTypes";

interface JobStatusBadgeProps {
  status: JobStatus;
}

export function JobStatusBadge({ status }: JobStatusBadgeProps) {
  switch (status) {
    case "booked":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Booked</Badge>;
    case "allocated":
      return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">Allocated</Badge>;
    case "in-progress":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">In Progress</Badge>;
    case "finished":
      return <Badge variant="outline" className="bg-emerald-50 text-emerald-800 border-emerald-200">Finished</Badge>;
    case "invoiced":
      return <Badge variant="outline" className="bg-indigo-50 text-indigo-800 border-indigo-200">Invoiced</Badge>;
    case "cleared":
      return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-200">Cleared</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-teal-50 text-teal-800 border-teal-200">Completed</Badge>;
    case "archived":
      return <Badge variant="outline" className="bg-gray-50 text-gray-800 border-gray-200">Archived</Badge>;
    case "issues":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Issues</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
