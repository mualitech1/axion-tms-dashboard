
import { useState } from "react";
import { FileText, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PodUploadDialog } from "../PodUploadDialog";

interface PodStatusProps {
  jobId: number;
  podUploaded: boolean;
  onPodUploaded: () => void;
}

export function PodStatus({ jobId, podUploaded, onPodUploaded }: PodStatusProps) {
  const [showPodUpload, setShowPodUpload] = useState(false);

  return (
    <div className="mt-4 pt-3 border-t">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-amber-500" />
          <div>
            <p className="text-sm font-medium">Proof of Delivery</p>
            <p className="text-xs text-muted-foreground">Upload POD to proceed with invoicing</p>
          </div>
        </div>
        
        <div>
          {podUploaded ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              <span>POD Uploaded</span>
            </Badge>
          ) : (
            <Button 
              size="sm"
              variant="outline" 
              className="flex items-center gap-1"
              onClick={() => setShowPodUpload(true)}
            >
              Upload POD
            </Button>
          )}
        </div>
      </div>

      {/* POD Upload Dialog */}
      {showPodUpload && (
        <PodUploadDialog 
          jobId={jobId}
          open={showPodUpload}
          onClose={() => setShowPodUpload(false)}
          onUploadComplete={onPodUploaded}
        />
      )}
    </div>
  );
}
