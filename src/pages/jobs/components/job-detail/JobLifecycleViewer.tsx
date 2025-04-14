
import { useState } from "react";
import { JobStatus } from "../../types/jobTypes";
import { getStatusLabel, getStatusColor } from "../../utils/jobStatusUtils";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clipboard,
  Clock,
  FileCheck,
  FileText,
  Truck,
  UserCheck,
  XCircle
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface JobLifecycleViewerProps {
  jobId: number;
  currentStatus: JobStatus;
  statusHistory?: {
    status: JobStatus;
    timestamp: string;
    user?: string;
    notes?: string;
  }[];
}

export function JobLifecycleViewer({ 
  jobId, 
  currentStatus, 
  statusHistory 
}: JobLifecycleViewerProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fallback status history if none provided
  const defaultStatusHistory = [
    { status: "booked", timestamp: "2025-03-15 09:00", user: "System" },
    { status: "allocated", timestamp: "2025-03-15 10:30", user: "John Smith" },
    { status: "in-progress", timestamp: "2025-03-16 08:15", user: "System" }
  ];

  const history = statusHistory || defaultStatusHistory;

  // Add current status if not in history
  if (!history.find(item => item.status === currentStatus)) {
    history.push({
      status: currentStatus,
      timestamp: new Date().toISOString(),
      user: "System"
    });
  }

  const getStatusIcon = (status: JobStatus) => {
    switch(status) {
      case "booked": return <Clipboard className="h-4 w-4" />;
      case "allocated": return <UserCheck className="h-4 w-4" />;
      case "in-progress": return <Truck className="h-4 w-4" />;
      case "finished": return <FileCheck className="h-4 w-4" />;
      case "invoiced": return <FileText className="h-4 w-4" />;
      case "cleared": return <CheckCircle className="h-4 w-4" />;
      case "completed": return <CheckCircle className="h-4 w-4" />;
      case "archived": return <Clock className="h-4 w-4" />;
      case "issues": return <AlertTriangle className="h-4 w-4" />;
      default: return <XCircle className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            View Job Lifecycle
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Job #{jobId} Lifecycle History</DialogTitle>
          </DialogHeader>
          
          <div className="mt-4 space-y-4">
            {/* Compact Status Timeline */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-4">
              <Badge className={currentStatus === "booked" ? 
                "bg-blue-100 text-blue-800 border-blue-200" : 
                "bg-gray-100 text-gray-800"}>Booked</Badge>
              <ArrowRight className="h-3 w-3" />
              
              <Badge className={currentStatus === "allocated" ? 
                "bg-purple-100 text-purple-800 border-purple-200" : 
                "bg-gray-100 text-gray-800"}>Allocated</Badge>
              <ArrowRight className="h-3 w-3" />
              
              <Badge className={currentStatus === "in-progress" ? 
                "bg-amber-100 text-amber-800 border-amber-200" : 
                "bg-gray-100 text-gray-800"}>In Progress</Badge>
              <ArrowRight className="h-3 w-3" />
              
              <Badge className={currentStatus === "finished" ? 
                "bg-emerald-100 text-emerald-800 border-emerald-200" : 
                "bg-gray-100 text-gray-800"}>Finished</Badge>
              <ArrowRight className="h-3 w-3" />
              
              <Badge className={currentStatus === "invoiced" ? 
                "bg-indigo-100 text-indigo-800 border-indigo-200" : 
                "bg-gray-100 text-gray-800"}>Invoiced</Badge>
              <ArrowRight className="h-3 w-3" />
              
              <Badge className={currentStatus === "cleared" ? 
                "bg-green-100 text-green-800 border-green-200" : 
                "bg-gray-100 text-gray-800"}>Cleared</Badge>
              <ArrowRight className="h-3 w-3" />
              
              <Badge className={currentStatus === "completed" ? 
                "bg-teal-100 text-teal-800 border-teal-200" : 
                "bg-gray-100 text-gray-800"}>Completed</Badge>
              <ArrowRight className="h-3 w-3" />
              
              <Badge className={currentStatus === "archived" ? 
                "bg-gray-100 text-gray-800 border-gray-200" : 
                "bg-gray-100 text-gray-800"}>Archived</Badge>
            </div>

            <Separator />
            
            {/* Detailed Status History */}
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {history.map((item, index) => (
                <div key={index} className="flex items-start gap-3 pb-3">
                  <div className={`p-2 rounded-full mt-1 ${getStatusColor(item.status)}`}>
                    {getStatusIcon(item.status)}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                      <h4 className="text-sm font-medium">
                        {getStatusLabel(item.status)}
                      </h4>
                      <span className="text-xs text-gray-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>
                    
                    {item.user && (
                      <p className="text-xs text-gray-600">
                        Updated by: {item.user}
                      </p>
                    )}
                    
                    {item.notes && (
                      <p className="text-xs text-gray-600 mt-1 bg-gray-50 p-2 rounded">
                        {item.notes}
                      </p>
                    )}
                    
                    {item.status === "issues" && (
                      <div className="mt-1 p-2 bg-red-50 rounded border border-red-100 text-xs text-red-800">
                        Issue reported: Requires attention
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
