
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow 
} from "@/components/ui/table";
import { User, Mail, Phone } from "lucide-react";

interface CompanyInfoSummaryProps {
  formData: {
    companyName?: string;
    contactName?: string;
    email?: string;
    phone?: string;
  };
}

export function CompanyInfoSummary({ formData }: CompanyInfoSummaryProps) {
  return (
    <Card className="p-4">
      <h3 className="font-medium text-lg mb-3 flex items-center">
        <User className="mr-2 h-5 w-5" /> Company Information
      </h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Company Name</TableCell>
            <TableCell>{formData.companyName || '—'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Contact Person</TableCell>
            <TableCell>{formData.contactName || '—'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <span className="flex items-center">
                <Mail className="h-4 w-4 mr-1" /> Email
              </span>
            </TableCell>
            <TableCell>{formData.email || '—'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">
              <span className="flex items-center">
                <Phone className="h-4 w-4 mr-1" /> Phone
              </span>
            </TableCell>
            <TableCell>{formData.phone || '—'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
