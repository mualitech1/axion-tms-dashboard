
import { Button } from '@/components/ui/button';
import { ArrowDownAZ, ArrowUpAZ } from 'lucide-react';

interface UserTableSortingProps {
  sortField: string;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (direction: 'asc' | 'desc') => void;
  handleSort: (field: string) => void;
}

export default function UserTableSorting({
  sortField,
  sortDirection,
  setSortDirection,
  handleSort
}: UserTableSortingProps) {
  const toggleSortDirection = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    handleSort(sortField);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleSortDirection}
      className="bg-white border-gray-300 text-gray-700"
    >
      {sortDirection === 'asc' ? (
        <ArrowDownAZ className="h-4 w-4" />
      ) : (
        <ArrowUpAZ className="h-4 w-4" />
      )}
      <span className="ml-2">Sort</span>
    </Button>
  );
}
