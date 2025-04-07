
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getRequiredDocumentTypes } from '@/utils/documents/documentVerification';

interface DocumentTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  uploadedDocumentTypes: string[];
}

export function DocumentTypeSelect({ value, onChange, uploadedDocumentTypes }: DocumentTypeSelectProps) {
  const requiredDocuments = getRequiredDocumentTypes();
  const missingDocumentTypes = requiredDocuments.filter(
    required => !uploadedDocumentTypes.includes(required.type)
  );

  return (
    <div className="space-y-2">
      <Label htmlFor="document-type">Document Type <span className="text-red-500">*</span></Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select document type" />
        </SelectTrigger>
        <SelectContent>
          {missingDocumentTypes.length > 0 ? (
            <>
              {missingDocumentTypes.map(doc => (
                <SelectItem key={doc.type} value={doc.type}>{doc.label}</SelectItem>
              ))}
              {requiredDocuments
                .filter(doc => !missingDocumentTypes.some(missing => missing.type === doc.type))
                .map(doc => (
                  <SelectItem key={doc.type} value={doc.type}>{doc.label} (Already Uploaded)</SelectItem>
                ))
              }
            </>
          ) : (
            requiredDocuments.map(doc => (
              <SelectItem key={doc.type} value={doc.type}>{doc.label}</SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  );
}
