
import { ArrowLeft, Mail, X, SendHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

interface JobDetailHeaderProps {
  jobId: number;
  title: string;
  client: string;
}

export function JobDetailHeader({ jobId, title, client }: JobDetailHeaderProps) {
  const isMobile = useIsMobile();
  
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
      
      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-tms-gray-800">{title}</h1>
          <p className="text-sm md:text-base text-tms-gray-600">Job #{jobId} • {client}</p>
        </div>
        
        <div className={`flex ${isMobile ? 'flex-col w-full' : 'flex-wrap'} gap-2`}>
          <Button 
            variant="outline" 
            size={isMobile ? "default" : "sm"} 
            className={`text-blue-600 border-blue-200 hover:bg-blue-50 ${isMobile ? 'justify-center w-full' : ''}`}
          >
            <SendHorizontal className="mr-2 h-4 w-4" />
            Send Order Confirmation
          </Button>
          
          <Button 
            variant="outline" 
            size={isMobile ? "default" : "sm"} 
            className={isMobile ? 'justify-center w-full' : ''}
          >
            <Mail className="mr-2 h-4 w-4" />
            Email Job
          </Button>
          
          <Button 
            variant="outline" 
            size={isMobile ? "default" : "sm"} 
            className={`text-red-600 border-red-200 hover:bg-red-50 ${isMobile ? 'justify-center w-full' : ''}`}
          >
            <X className="mr-2 h-4 w-4" />
            Cancel Job
          </Button>
        </div>
      </div>
    </div>
  );
}
