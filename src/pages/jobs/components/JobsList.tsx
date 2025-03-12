
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search, Clock } from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { FilterButtons } from "./jobs-list/FilterButtons";
import { JobCard } from "./jobs-list/JobCard";
import { mockJobs } from "./jobs-list/mockJobData";
import type { Job } from "./jobs-list/mockJobData";

interface JobsListProps {
  openJobCreation: () => void;
}

export default function JobsList({ openJobCreation }: JobsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "scheduled" | "in-progress" | "pending">("all");
  
  const filteredJobs = mockJobs.filter(job => 
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter === "all" || job.status === filter)
  );
  
  const EmptyState = () => (
    <div className="text-center py-12 text-muted-foreground bg-muted/20 rounded-lg">
      <Search className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
      <p className="font-medium">No jobs found</p>
      <p className="text-sm mt-1">Try adjusting your search or filters</p>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={openJobCreation} 
        className="mt-4"
      >
        <Plus className="h-4 w-4 mr-1" />
        Create New Job
      </Button>
    </div>
  );

  return (
    <Card className="p-6 bg-white shadow-md border-0 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Clock className="h-5 w-5 text-tms-blue" />
          Jobs
        </h3>
        <Button size="sm" onClick={openJobCreation} className="gap-1">
          <Plus className="h-4 w-4" />
          New Job
        </Button>
      </div>
      
      <div className="space-y-4">
        <InputWithIcon
          icon={Search}
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        
        <FilterButtons filter={filter} setFilter={setFilter} />
        
        <Separator />
      </div>

      <div className="space-y-3 mt-4 max-h-[calc(100vh-380px)] overflow-y-auto pr-2">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </Card>
  );
}
