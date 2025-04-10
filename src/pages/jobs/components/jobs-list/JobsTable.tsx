
import { useState } from "react";
import { SortAsc, SortDesc } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Job } from "./mockJobData";

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
  
  const renderSortIcon = (column: string) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? <SortAsc className="h-3 w-3 ml-1" /> : <SortDesc className="h-3 w-3 ml-1" />;
  };

  const handleViewJob = (jobId: number) => {
    navigate(`/jobs/${jobId}`);
  };
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead 
              className="cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleSort("id")}
            >
              <div className="flex items-center">
                Job ID {renderSortIcon("id")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleSort("status")}
            >
              <div className="flex items-center">
                Status {renderSortIcon("status")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleSort("priority")}
            >
              <div className="flex items-center">
                Priority {renderSortIcon("priority")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleSort("client")}
            >
              <div className="flex items-center">
                Customer {renderSortIcon("client")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleSort("origin")}
            >
              <div className="flex items-center">
                Origin {renderSortIcon("origin")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleSort("destination")}
            >
              <div className="flex items-center">
                Destination {renderSortIcon("destination")}
              </div>
            </TableHead>
            <TableHead 
              className="cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => handleSort("date")}
            >
              <div className="flex items-center">
                Pickup Time {renderSortIcon("date")}
              </div>
            </TableHead>
            <TableHead>Assigned To</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedJobs.map((job) => (
            <TableRow 
              key={job.id}
              className="hover:bg-muted/20 cursor-pointer"
              onClick={() => handleViewJob(job.id)}
            >
              <TableCell className="font-medium">#{job.id}</TableCell>
              <TableCell>{getStatusBadge(job.status)}</TableCell>
              <TableCell>{getPriorityBadge(job.priority)}</TableCell>
              <TableCell>{job.client}</TableCell>
              <TableCell>{job.origin}</TableCell>
              <TableCell>{job.destination}</TableCell>
              <TableCell>{format(new Date(job.date), "MMM d, HH:mm")}</TableCell>
              <TableCell>{job.assignedTo || "Unassigned"}</TableCell>
              <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewJob(job.id);
                    }}
                  >
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Edit
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

// Helper functions for badges
function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "scheduled":
      return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
    case "in transit":
      return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">In Transit</Badge>;
    case "completed":
      return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completed</Badge>;
    case "delayed":
      return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Delayed</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

function getPriorityBadge(priority: string) {
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
