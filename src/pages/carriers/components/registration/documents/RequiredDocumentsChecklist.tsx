
import { Card } from "@/components/ui/card";
import { CheckCircle, AlertCircle } from "lucide-react";
import { getRequiredDocumentTypes } from '@/utils/documents/documentVerification';

interface RequiredDocumentsChecklistProps {
  uploadedDocumentTypes: string[];
}

export function RequiredDocumentsChecklist({ uploadedDocumentTypes }: RequiredDocumentsChecklistProps) {
  const requiredDocuments = getRequiredDocumentTypes();
  
  return (
    <Card className="p-4 mb-6">
      <h3 className="font-medium mb-3">Required Documents Checklist:</h3>
      <ul className="space-y-2">
        {requiredDocuments.map(doc => {
          const isUploaded = uploadedDocumentTypes.includes(doc.type);
          return (
            <li key={doc.type} className="flex items-center gap-2">
              {isUploaded ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-500" />
              )}
              <span className={isUploaded ? "line-through text-muted-foreground" : ""}>
                {doc.label}
              </span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
