
import { ArrowLeft, Mail, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface JobDetailHeaderProps {
  jobId: number;
  title: string;
  client: string;
}

export function JobDetailHeader({ jobId, title, client }: JobDetailHeaderProps) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/jobs" className="flex items-center gap-1 text-muted-foreground">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-tms-gray-800">{title}</h1>
          <p className="text-tms-gray-600">Job #{jobId} • {client}</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Email Job
          </Button>
          <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
            <X className="mr-2 h-4 w-4" />
            Cancel Job
          </Button>
        </div>
      </div>
    </div>
  );
}
