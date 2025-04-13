
import { formatCurrency } from "@/lib/utils";

interface TotalSummaryProps {
  total: number;
}

export function TotalSummary({ total }: TotalSummaryProps) {
  return (
    <div className="flex justify-between p-3 md:p-4 bg-gray-50 rounded-md mt-3 md:mt-4">
      <span className="font-medium text-sm md:text-base">Total Amount:</span>
      <span className="text-base md:text-lg font-bold">{formatCurrency(total)}</span>
    </div>
  );
}
