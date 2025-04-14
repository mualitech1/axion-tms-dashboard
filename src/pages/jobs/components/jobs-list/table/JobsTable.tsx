
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow } from "@/components/ui/table";
import { SortableTableHead } from "./SortableTableHead";
import { JobTableRow } from "./JobTableRow";
import { Job } from "../../../types/jobTypes";

interface JobsTableProps {
  jobs: Job[];
}

export function JobsTable({ jobs }: JobsTableProps) {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  const sortedJobs = [...jobs].sort((a, b) => {
    let comparison = 0;
    
    switch (sortColumn) {
      case "id":
        comparison = a.id - b.id;
        break;
      case "client":
        comparison = a.client.localeCompare(b.client);
        break;
      case "origin":
        comparison = a.origin.localeCompare(b.origin);
        break;
      case "destination":
        comparison = a.destination.localeCompare(b.destination);
        break;
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case "priority":
        const priorityValues = { high: 3, medium: 2, low: 1 };
        comparison = (priorityValues[a.priority.toLowerCase() as keyof typeof priorityValues] || 0) - 
                    (priorityValues[b.priority.toLowerCase() as keyof typeof priorityValues] || 0);
        break;
      case "status":
        comparison = a.status.localeCompare(b.status);
        break;
      default:
        comparison = 0;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  
  const handleViewJob = (jobId: number) => {
    navigate(`/jobs/${jobId}`);
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableTableHead 
              column="id"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            >
              Job ID
            </SortableTableHead>
            <SortableTableHead 
              column="status"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            >
              Status
            </SortableTableHead>
            <SortableTableHead 
              column="priority"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            >
              Priority
            </SortableTableHead>
            <SortableTableHead 
              column="client"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            >
              Customer
            </SortableTableHead>
            <SortableTableHead 
              column="origin"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            >
              Origin
            </SortableTableHead>
            <SortableTableHead 
              column="destination"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            >
              Destination
            </SortableTableHead>
            <SortableTableHead 
              column="date"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            >
              Pickup Time
            </SortableTableHead>
            <SortableTableHead 
              column="hauler"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
            >
              Assigned To
            </SortableTableHead>
            <SortableTableHead 
              column="actions"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={() => {}}
            >
              Actions
            </SortableTableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.map((job) => (
            <JobTableRow 
              key={job.id} 
              job={job} 
              onRowClick={handleViewJob} 
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
