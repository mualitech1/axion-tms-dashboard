import { useState } from "react";
import { Search, Filter, SortAsc, SortDesc } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { format } from "date-fns";
import { AdvancedFilters } from "./jobs-list/AdvancedFilters";
import { mockJobs } from "./jobs-list/mockJobData";
import { FilterOptions } from "./jobs-list/filters/types";
import { Link, useNavigate } from "react-router-dom";

interface JobsListProps {
  selectedDate: Date;
  openJobCreation: () => void;
}

const filterJobsByDate = (jobs: any[], selectedDate: Date) => {
  return jobs.filter(job => {
    const jobDate = new Date(job.date);
    return (
      jobDate.getDate() === selectedDate.getDate() &&
      jobDate.getMonth() === selectedDate.getMonth() &&
      jobDate.getFullYear() === selectedDate.getFullYear()
    );
  });
};

export default function JobsList({ selectedDate, openJobCreation }: JobsListProps) {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    status: null,
    priority: null,
    startDate: null,
    endDate: null,
    sortBy: "date",
    sortDirection: "desc",
  });
  const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  const filteredJobs = mockJobs
    .filter(job => {
      const jobDate = new Date(job.date);
      const sameDate = 
        jobDate.getDate() === selectedDate.getDate() &&
        jobDate.getMonth() === selectedDate.getMonth() &&
        jobDate.getFullYear() === selectedDate.getFullYear();
        
      const matchesSearch = 
        searchTerm === "" ||
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.destination.toLowerCase().includes(searchTerm) ||
        job.id.toString().includes(searchTerm);
        
      return sameDate && matchesSearch;
    });
  
  const sortedJobs = [...filteredJobs].sort((a, b) => {
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
        comparison = (priorityValues[a.priority as keyof typeof priorityValues] || 0) - 
                    (priorityValues[b.priority as keyof typeof priorityValues] || 0);
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
  
  const getStatusBadge = (status: string) => {
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
  };
  
  const getPriorityBadge = (priority: string) => {
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
  };
  
  const handleViewJob = (jobId: number) => {
    navigate(`/jobs/${jobId}`);
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-3">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="font-medium text-lg mb-1">No jobs found</h3>
      <p className="text-muted-foreground mb-4">
        No jobs scheduled for {format(selectedDate, "MMMM d, yyyy")}
      </p>
      <Button onClick={openJobCreation}>
        Create New Job
      </Button>
    </div>
  );

  return (
    <Card className="shadow-sm border-border/40">
      <CardHeader className="pb-3 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <CardTitle>Jobs List</CardTitle>
          <div className="flex gap-2 w-full sm:w-auto">
            <InputWithIcon
              icon={Search}
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[250px]"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {sortedJobs.length > 0 ? (
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
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
}
