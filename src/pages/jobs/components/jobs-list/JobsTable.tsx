
import { useState } from "react";
import { SortAsc, SortDesc } from "lucide-react";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import { Job, JobStatus } from "../../types/jobTypes";

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
              <TableCell>{job.hauler?.name || "Unassigned"}</TableCell>
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
function getStatusBadge(status: JobStatus) {
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
