
import { SortAsc, SortDesc } from "lucide-react";
import { TableHead } from "@/components/ui/table";

interface SortableTableHeadProps {
  column: string;
  currentSortColumn: string;
  sortDirection: "asc" | "desc";
  onSort: (column: string) => void;
  children: React.ReactNode;
}

export function SortableTableHead({
  column,
  currentSortColumn,
  sortDirection,
  onSort,
  children
}: SortableTableHeadProps) {
  const renderSortIcon = () => {
    if (currentSortColumn !== column) return null;
    return sortDirection === "asc" ? 
      <SortAsc className="h-3 w-3 ml-1" /> : 
      <SortDesc className="h-3 w-3 ml-1" />;
  };

  return (
    <TableHead 
      className="cursor-pointer hover:bg-muted/30 transition-colors"
      onClick={() => onSort(column)}
    >
      <div className="flex items-center">
        {children} {renderSortIcon()}
      </div>
    </TableHead>
  );
}
