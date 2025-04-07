
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, XCircle } from "lucide-react";
import { getRequiredDocumentTypes, getDocumentVerificationLabel } from '@/utils/documents/documentVerification';
import { formatDocumentDate, formatFileSize } from '@/utils/documents/documentFormat';

interface DocumentsListProps {
  documents: any[];
  onRemove: (docId: string) => void;
}

export function DocumentsList({ documents, onRemove }: DocumentsListProps) {
  if (documents.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date Uploaded</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => {
            const status = getDocumentVerificationLabel(doc.verificationStatus);
            return (
              <TableRow key={doc.id}>
                <TableCell>
                  <div className="flex items-center">
                    <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                    <span className="font-medium">{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell>{getRequiredDocumentTypes().find(t => t.type === doc.type)?.label || doc.type}</TableCell>
                <TableCell>{formatDocumentDate(doc.dateUploaded)}</TableCell>
                <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                <TableCell>
                  <Badge variant={status.variant}>{status.label}</Badge>
                </TableCell>
                <TableCell>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => onRemove(doc.id)}
                    className="h-8 w-8 p-0"
                  >
                    <XCircle className="h-4 w-4 text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
