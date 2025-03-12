
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const mockJobs = [
  { id: 1, title: "Delivery to Downtown Storage", client: "Storage Co.", status: "scheduled", time: "09:00 AM" },
  { id: 2, title: "Warehouse Pickup", client: "Tech Industries", status: "in-progress", time: "10:30 AM" },
  { id: 3, title: "Cross-city Transport", client: "Logistics Ltd", status: "pending", time: "02:00 PM" },
];

export default function JobsList() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Jobs</h3>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          New Job
        </Button>
      </div>

      <div className="space-y-4">
        {mockJobs.map((job) => (
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
        ))}
      </div>
    </Card>
  );
}
