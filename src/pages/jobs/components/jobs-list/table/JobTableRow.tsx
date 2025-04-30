
import { format } from "date-fns";
import { TableRow, TableCell } from "@/components/ui/table";
import { JobStatusBadge } from "./JobStatusBadge";
import { JobPriorityBadge } from "./JobPriorityBadge";
import { JobsTableActions } from "./JobsTableActions";
import { Job } from "@/types/job";

interface JobTableRowProps {
  job: Job;
  onRowClick: (id: string | number) => void;
}

export function JobTableRow({ job, onRowClick }: JobTableRowProps) {
  const handleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRowClick(job.id);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Edit functionality could be implemented here
    console.log("Edit job:", job.id);
  };

  return (
    <TableRow 
      className="hover:bg-muted/20 cursor-pointer"
      onClick={() => onRowClick(job.id)}
    >
      <TableCell className="font-medium">#{job.id.toString()}</TableCell>
      <TableCell><JobStatusBadge status={job.status} /></TableCell>
      <TableCell><JobPriorityBadge priority={job.priority} /></TableCell>
      <TableCell>{job.client}</TableCell>
      <TableCell>{job.origin}</TableCell>
      <TableCell>{job.destination}</TableCell>
      <TableCell>{format(new Date(job.date), "MMM d, HH:mm")}</TableCell>
      <TableCell>{job.hauler?.name || "Unassigned"}</TableCell>
      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
        <JobsTableActions onView={handleView} onEdit={handleEdit} />
      </TableCell>
    </TableRow>
  );
}
