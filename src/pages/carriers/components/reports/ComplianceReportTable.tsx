
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ComplianceReportItem } from "../../data/types/performanceTypes";
import { FileAlert } from "lucide-react";

interface ComplianceReportTableProps {
  data: ComplianceReportItem[];
}

export default function ComplianceReportTable({ data }: ComplianceReportTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Compliant":
        return <Badge className="bg-tms-green">Compliant</Badge>;
      case "Non-Compliant":
        return <Badge className="bg-tms-red">Non-Compliant</Badge>;
      case "Action Required":
        return <Badge className="bg-tms-yellow">Action Required</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case "Valid":
        return <span className="text-tms-green">✓</span>;
      case "Expired":
        return <span className="text-tms-yellow">!</span>;
      case "Missing":
        return <span className="text-tms-red">✕</span>;
      default:
        return <span>-</span>;
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Carrier</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Insurance</TableHead>
            <TableHead className="text-center">License</TableHead>
            <TableHead className="text-center">Certification</TableHead>
            <TableHead>Last Audit</TableHead>
            <TableHead>Next Audit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                <div className="flex flex-col items-center justify-center text-muted-foreground">
                  <FileAlert className="h-12 w-12 mb-2" />
                  <p>No compliance data available</p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.carrierName}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
                <TableCell className="text-center font-bold">
                  {getDocumentStatusIcon(item.documentStatus.insurance)}
                </TableCell>
                <TableCell className="text-center font-bold">
                  {getDocumentStatusIcon(item.documentStatus.license)}
                </TableCell>
                <TableCell className="text-center font-bold">
                  {getDocumentStatusIcon(item.documentStatus.certification)}
                </TableCell>
                <TableCell>{item.lastAuditDate}</TableCell>
                <TableCell>{item.nextAuditDate}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
