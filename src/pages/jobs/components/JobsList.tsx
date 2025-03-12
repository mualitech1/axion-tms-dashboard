
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Search, Clock, ArrowUpRight } from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

interface JobsListProps {
  openJobCreation: () => void;
}

const mockJobs = [
  { id: 1, title: "Delivery to Downtown Storage", client: "Storage Co.", status: "scheduled", time: "09:00 AM", priority: "medium" },
  { id: 2, title: "Warehouse Pickup", client: "Tech Industries", status: "in-progress", time: "10:30 AM", priority: "high" },
  { id: 3, title: "Cross-city Transport", client: "Logistics Ltd", status: "pending", time: "02:00 PM", priority: "low" },
  { id: 4, title: "Equipment Delivery", client: "Construction Inc", status: "scheduled", time: "11:15 AM", priority: "medium" },
  { id: 5, title: "Office Supplies Delivery", client: "Corporate Services", status: "scheduled", time: "03:30 PM", priority: "medium" },
];

export default function JobsList({ openJobCreation }: JobsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "scheduled" | "in-progress" | "pending">("all");
  
  const filteredJobs = mockJobs.filter(job => 
    (job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.client.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filter === "all" || job.status === filter)
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
        
        <div className="flex space-x-2 pb-1 overflow-x-auto scrollbar-none">
          <Button 
            variant={filter === "all" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setFilter("all")}
            className="rounded-full"
          >
            All
          </Button>
          <Button 
            variant={filter === "scheduled" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setFilter("scheduled")}
            className="rounded-full"
          >
            Scheduled
          </Button>
          <Button 
            variant={filter === "in-progress" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setFilter("in-progress")}
            className="rounded-full"
          >
            In Progress
          </Button>
          <Button 
            variant={filter === "pending" ? "default" : "ghost"} 
            size="sm" 
            onClick={() => setFilter("pending")}
            className="rounded-full"
          >
            Pending
          </Button>
        </div>
        
        <Separator />
      </div>

      <div className="space-y-3 mt-4 max-h-[calc(100vh-380px)] overflow-y-auto pr-2">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="p-4 hover:bg-accent/50 cursor-pointer transition-colors border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{job.title}</h4>
                    <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">{job.client}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge 
                      variant={
                        job.status === "in-progress" ? "default" :
                        job.status === "scheduled" ? "secondary" : "outline"
                      }
                      className="capitalize"
                    >
                      {job.status}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={`
                        ${job.priority === "high" ? "bg-red-50 text-red-700 border-red-200" : 
                          job.priority === "medium" ? "bg-orange-50 text-orange-700 border-orange-200" : 
                          "bg-blue-50 text-blue-700 border-blue-200"}
                      `}
                    >
                      {job.priority} priority
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium bg-muted/30 px-2 py-1 rounded">{job.time}</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
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
        )}
      </div>
    </Card>
  );
}
