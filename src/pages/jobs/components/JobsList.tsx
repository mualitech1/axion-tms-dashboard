import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { useState, useMemo } from "react";
import { JobCard } from "./jobs-list/JobCard";
import { mockJobs } from "./jobs-list/mockJobData";
import { AdvancedFilters } from "./jobs-list/AdvancedFilters";
import { FilterOptions } from "./jobs-list/filters/types";

interface JobsListProps {
  openJobCreation: () => void;
}

export default function JobsList({ openJobCreation }: JobsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    status: null,
    priority: null,
    startDate: null,
    endDate: null,
    sortBy: "date",
    sortDirection: "desc",
  });
  
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.status) count++;
    if (filters.priority) count++;
    if (filters.startDate) count++;
    if (filters.endDate) count++;
    if (filters.sortBy !== "date" || filters.sortDirection !== "desc") count++;
    return count;
  }, [filters]);
  
  const filteredJobs = useMemo(() => {
    // First apply text search filter
    let result = mockJobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.client.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Apply status filter
    if (filters.status && filters.status !== "all") {
      result = result.filter(job => job.status === filters.status);
    }
    
    // Apply priority filter
    if (filters.priority && filters.priority !== "all") {
      result = result.filter(job => job.priority === filters.priority);
    }
    
    // Apply date range filters
    if (filters.startDate || filters.endDate) {
      result = result.filter(job => {
        // Convert job.date string to Date object
        const jobDate = new Date(job.date);
        
        if (filters.startDate && filters.endDate) {
          return jobDate >= filters.startDate && jobDate <= filters.endDate;
        } else if (filters.startDate) {
          return jobDate >= filters.startDate;
        } else if (filters.endDate) {
          return jobDate <= filters.endDate;
        }
        return true;
      });
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      if (filters.sortBy === "date") {
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
      } else if (filters.sortBy === "priority") {
        const priorityValues = { high: 3, medium: 2, low: 1 };
        comparison = (priorityValues[a.priority as keyof typeof priorityValues] || 0) - 
                    (priorityValues[b.priority as keyof typeof priorityValues] || 0);
      } else if (filters.sortBy === "client") {
        comparison = a.client.localeCompare(b.client);
      }
      
      return filters.sortDirection === "asc" ? comparison : -comparison;
    });
    
    return result;
  }, [searchTerm, filters]);
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  const EmptyState = () => (
    <div className="text-center py-8 sm:py-12 text-muted-foreground bg-gray-50/70 rounded-lg">
      <Search className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground/50 mx-auto mb-3" />
      <p className="font-medium">No jobs found</p>
      <p className="text-sm mt-1 mb-4">Try adjusting your search or filters</p>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={openJobCreation} 
        className="gap-1"
      >
        <Plus className="h-4 w-4" />
        Create New Job
      </Button>
    </div>
  );

  return (
    <Card className="bg-white border border-border/40 shadow-sm h-full">
      <div className="p-3 sm:p-5 border-b border-border/40">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <h3 className="text-lg font-semibold">Jobs</h3>
          <Button onClick={openJobCreation} size="sm" className="gap-1 w-full sm:w-auto">
            <Plus className="h-4 w-4" />
            New Job
          </Button>
        </div>
        
        <div className="flex flex-col gap-3">
          <div className="flex flex-col sm:flex-row gap-2">
            <InputWithIcon
              icon={Search}
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-9"
            />
            <AdvancedFilters 
              onFilterChange={handleFilterChange}
              activeFiltersCount={activeFiltersCount}
              className="w-full sm:w-auto"
            />
          </div>
          
          {activeFiltersCount > 0 && (
            <div className="text-xs text-muted-foreground px-2 -mt-1">
              {activeFiltersCount} {activeFiltersCount === 1 ? 'filter' : 'filters'} applied
            </div>
          )}
        </div>
      </div>

      <div className="p-2 sm:p-4">
        <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-400px)] pr-1">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <EmptyState />
          )}
        </div>
      </div>
    </Card>
  );
}
