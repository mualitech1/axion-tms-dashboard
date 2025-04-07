
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ComplianceStatusFilterProps {
  selectedStatus: string | null;
  onChange: (status: string | null) => void;
}

const complianceOptions = ["Compliant", "Non-Compliant", "Action Required"];

export function ComplianceStatusFilter({ selectedStatus, onChange }: ComplianceStatusFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Compliance Status</Label>
      <Select
        value={selectedStatus || "any-status"}
        onValueChange={(value) => onChange(value === "any-status" ? null : value)}
      >
        <SelectTrigger>
          <SelectValue placeholder="Any compliance status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="any-status">Any status</SelectItem>
          {complianceOptions.map((status) => (
            <SelectItem key={status} value={status}>{status}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
