
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { useState } from "react";
import { JobCard } from "./jobs-list/JobCard";
import { mockJobs } from "./jobs-list/mockJobData";

interface JobsListProps {
  openJobCreation: () => void;
}

export default function JobsList({ openJobCreation }: JobsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.client.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const EmptyState = () => (
    <div className="text-center py-12 text-muted-foreground bg-gray-50 rounded-lg">
      <Search className="h-10 w-10 text-muted-foreground/50 mx-auto mb-2" />
      <p className="font-medium">No jobs found</p>
      <p className="text-sm mt-1">Try adjusting your search</p>
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
    <Card className="p-6 bg-white shadow-sm border h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Jobs</h3>
        <Button size="sm" onClick={openJobCreation} className="gap-1">
          <Plus className="h-4 w-4" />
          New Job
        </Button>
      </div>
      
      <div className="mb-4">
        <InputWithIcon
          icon={Search}
          placeholder="Search jobs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-400px)] pr-1">
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
