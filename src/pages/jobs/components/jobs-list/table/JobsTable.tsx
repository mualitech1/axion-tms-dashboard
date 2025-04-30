
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow } from "@/components/ui/table";
import { SortableTableHead } from "./SortableTableHead";
import { JobTableRow } from "./JobTableRow";
import { Job, JobStatus } from "../../../types/jobTypes";
import { FilterDropdown } from "./FilterDropdown";
import { JobPriorityBadge } from "./JobPriorityBadge";
import { JobStatusBadge } from "./JobStatusBadge";

interface JobsTableProps {
  jobs: Job[];
}

export function JobsTable({ jobs }: JobsTableProps) {
  const navigate = useNavigate();
  const [sortColumn, setSortColumn] = useState<string>("id");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  
  // Filter states
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [priorityFilters, setPriorityFilters] = useState<string[]>([]);
  const [clientFilters, setClientFilters] = useState<string[]>([]);
  
  // Generate filter options from data
  const statusOptions = useMemo(() => {
    const statuses = Array.from(new Set(jobs.map(job => job.status)));
    return statuses.map(status => ({
      value: status,
      label: status.charAt(0).toUpperCase() + status.slice(1).replace(/-/g, ' '),
      count: jobs.filter(job => job.status === status).length
    }));
  }, [jobs]);
  
  const priorityOptions = useMemo(() => {
    const priorities = Array.from(new Set(jobs.map(job => job.priority)));
    return priorities.map(priority => ({
      value: priority,
      label: priority.charAt(0).toUpperCase() + priority.slice(1),
      count: jobs.filter(job => job.priority === priority).length
    }));
  }, [jobs]);
  
  const clientOptions = useMemo(() => {
    const clients = Array.from(new Set(jobs.map(job => job.client)));
    return clients.map(client => ({
      value: client,
      label: client,
      count: jobs.filter(job => job.client === client).length
    }));
  }, [jobs]);
  
  // Apply filters and sorting
  const filteredAndSortedJobs = useMemo(() => {
    // Apply filters
    let filtered = jobs;
    
    if (statusFilters.length > 0) {
      filtered = filtered.filter(job => statusFilters.includes(job.status));
    }
    
    if (priorityFilters.length > 0) {
      filtered = filtered.filter(job => priorityFilters.includes(job.priority));
    }
    
    if (clientFilters.length > 0) {
      filtered = filtered.filter(job => clientFilters.includes(job.client));
    }
    
    // Apply sorting
    return [...filtered].sort((a, b) => {
      let comparison = 0;
      
      switch (sortColumn) {
        case "id":
          // Convert IDs to strings for comparison
          const idA = a.id.toString();
          const idB = b.id.toString();
          comparison = idA.localeCompare(idB);
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
  }, [jobs, sortColumn, sortDirection, statusFilters, priorityFilters, clientFilters]);
  
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };
  
  const handleViewJob = (jobId: string | number) => {
    navigate(`/jobs/${jobId}`);
  };

  // Filter dropdown components
  const statusFilter = (
    <FilterDropdown
      options={statusOptions}
      selectedValues={statusFilters}
      onFilterChange={setStatusFilters}
      label="Filter by Status"
    />
  );

  const priorityFilter = (
    <FilterDropdown
      options={priorityOptions}
      selectedValues={priorityFilters}
      onFilterChange={setPriorityFilters}
      label="Filter by Priority"
    />
  );

  const clientFilter = (
    <FilterDropdown
      options={clientOptions}
      selectedValues={clientFilters}
      onFilterChange={setClientFilters}
      label="Filter by Customer"
    />
  );
  
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
              filter={statusFilter}
            >
              Status
            </SortableTableHead>
            <SortableTableHead 
              column="priority"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              filter={priorityFilter}
            >
              Priority
            </SortableTableHead>
            <SortableTableHead 
              column="client"
              currentSortColumn={sortColumn}
              sortDirection={sortDirection}
              onSort={handleSort}
              filter={clientFilter}
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
          {filteredAndSortedJobs.map((job) => (
            <JobTableRow 
              key={job.id} 
              job={job} 
              onRowClick={handleViewJob} 
            />
          ))}
          {filteredAndSortedJobs.length === 0 && (
            <TableRow>
              <td colSpan={9} className="text-center py-8 text-muted-foreground">
                No jobs match the selected filters
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
