
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, AlertCircle } from "lucide-react";
import { formatDocumentDate, formatFileSize } from '@/utils/documents/documentFormat';
import { getRequiredDocumentTypes } from '@/utils/documents/documentVerification';

interface DocumentsSummaryProps {
  documents: any[];
  hasAllRequiredDocs: boolean;
}

export function DocumentsSummary({ documents, hasAllRequiredDocs }: DocumentsSummaryProps) {
  return (
    <Card className="p-4 mb-6">
      <h3 className="font-medium text-lg mb-3 flex items-center">
        <FileText className="mr-2 h-5 w-5" /> Documents
      </h3>
      
      {documents.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Document</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell className="font-medium">{doc.name}</TableCell>
                <TableCell>
                  {getRequiredDocumentTypes().find(t => t.type === doc.type)?.label || doc.type}
                </TableCell>
                <TableCell>{formatDocumentDate(doc.dateUploaded)}</TableCell>
                <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700">
                    Pending Verification
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-4">
          <p className="text-muted-foreground">No documents uploaded</p>
        </div>
      )}
      
      {!hasAllRequiredDocs && (
        <div className="mt-4 text-sm text-amber-600">
          <span className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-1" /> 
            Missing required documents. Please upload all required documents before submitting.
          </span>
        </div>
      )}
    </Card>
  );
}
