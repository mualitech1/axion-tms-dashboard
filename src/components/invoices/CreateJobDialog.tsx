
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface CreateJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateJobDialog({ open, onOpenChange }: CreateJobDialogProps) {
  const [jobTitle, setJobTitle] = useState("");
  const [jobClient, setJobClient] = useState("");
  const { toast } = useToast();
  
  const handleCreateJob = () => {
    // Simple validation
    if (!jobTitle.trim() || !jobClient.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here we would typically send the data to an API
    toast({
      title: "Job created",
      description: `Job '${jobTitle}' for ${jobClient} has been created successfully.`,
      variant: "default"
    });

    // Reset form and close dialog
    setJobTitle("");
    setJobClient("");
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="job-title" className="text-right">
              Job Title
            </Label>
            <Input
              id="job-title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              className="col-span-3"
              placeholder="Enter job title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="client" className="text-right">
              Client
            </Label>
            <Input
              id="client"
              value={jobClient}
              onChange={(e) => setJobClient(e.target.value)}
              className="col-span-3"
              placeholder="Enter client name"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateJob}>
            Create Job
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
