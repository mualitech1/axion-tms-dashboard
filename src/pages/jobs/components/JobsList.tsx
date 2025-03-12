
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { useState } from "react";

interface JobsListProps {
  openJobCreation: () => void;
}

const mockJobs = [
  { id: 1, title: "Delivery to Downtown Storage", client: "Storage Co.", status: "scheduled", time: "09:00 AM" },
  { id: 2, title: "Warehouse Pickup", client: "Tech Industries", status: "in-progress", time: "10:30 AM" },
  { id: 3, title: "Cross-city Transport", client: "Logistics Ltd", status: "pending", time: "02:00 PM" },
  { id: 4, title: "Equipment Delivery", client: "Construction Inc", status: "scheduled", time: "11:15 AM" },
  { id: 5, title: "Office Supplies Delivery", client: "Corporate Services", status: "scheduled", time: "03:30 PM" },
];

export default function JobsList({ openJobCreation }: JobsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredJobs = mockJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    job.client.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Jobs</h3>
        <Button size="sm" onClick={openJobCreation}>
          <Plus className="h-4 w-4 mr-1" />
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

      <div className="space-y-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <Card key={job.id} className="p-4 hover:bg-accent/50 cursor-pointer transition-colors">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium">{job.title}</h4>
                  <p className="text-sm text-muted-foreground">{job.client}</p>
                  <p className="text-sm text-muted-foreground mt-1">{job.time}</p>
                </div>
                <Badge 
                  variant={
                    job.status === "in-progress" ? "default" :
                    job.status === "scheduled" ? "secondary" : "outline"
                  }
                >
                  {job.status}
                </Badge>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-6 text-muted-foreground">
            No jobs found matching your search.
          </div>
        )}
      </div>
    </Card>
  );
}
