
import { Button } from "@/components/ui/button";
import { FileText, Upload } from "lucide-react";

interface EmptyDocumentStateProps {
  onUploadClick: () => void;
}

export function EmptyDocumentState({ onUploadClick }: EmptyDocumentStateProps) {
  return (
    <div className="border rounded-md p-8 text-center bg-muted/20">
      <FileText className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
      <h3 className="text-lg font-medium mb-1">No documents uploaded yet</h3>
      <p className="text-muted-foreground mb-4">Upload your compliance documents to continue with registration.</p>
      <Button onClick={onUploadClick}>
        <Upload className="h-4 w-4 mr-1" /> Upload Document
      </Button>
    </div>
  );
}
