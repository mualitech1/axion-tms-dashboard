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
      className="group hover:bg-aximo-darker/60 cursor-pointer group-hover:ring-1 group-hover:ring-aximo-primary/70 group-hover:shadow-[0_0_12px_rgba(var(--color-aximo-primary-rgb),0.4)] transition-all duration-300 border-b border-aximo-border"
      onClick={() => onRowClick(job.id)}
    >
      <TableCell className="font-medium text-aximo-text">#{String(job.id)}</TableCell>
      <TableCell className="text-aximo-text"><JobStatusBadge status={job.status} /></TableCell>
      <TableCell className="text-aximo-text"><JobPriorityBadge priority={job.priority} /></TableCell>
      <TableCell className="text-aximo-text">{job.client}</TableCell>
      <TableCell className="text-aximo-text">{job.origin}</TableCell>
      <TableCell className="text-aximo-text">{job.destination}</TableCell>
      <TableCell className="text-aximo-text">{format(new Date(job.date), "MMM d, HH:mm")}</TableCell>
      <TableCell className="text-aximo-text">{job.hauler?.name || "Unassigned"}</TableCell>
      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
        <JobsTableActions onView={handleView} onEdit={handleEdit} />
      </TableCell>
    </TableRow>
  );
}
