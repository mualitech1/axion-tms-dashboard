
import { Card } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableRow 
} from "@/components/ui/table";
import { MapPin } from "lucide-react";

interface AddressSummaryProps {
  formData: {
    address?: string;
    city?: string;
    region?: string;
    postcode?: string;
  };
}

export function AddressSummary({ formData }: AddressSummaryProps) {
  return (
    <Card className="p-4">
      <h3 className="font-medium text-lg mb-3 flex items-center">
        <MapPin className="mr-2 h-5 w-5" /> Location & Address
      </h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Address</TableCell>
            <TableCell>{formData.address || '—'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">City</TableCell>
            <TableCell>{formData.city || '—'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Region</TableCell>
            <TableCell>{formData.region || '—'}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Postcode</TableCell>
            <TableCell>{formData.postcode || '—'}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Card>
  );
}
