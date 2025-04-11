
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

interface UserTableSortingProps {
  sortField: string;
  handleSort: (field: string) => void;
  sortDirection: 'asc' | 'desc';
  setSortDirection: (direction: 'asc' | 'desc') => void;
}

export default function UserTableSorting({
  sortField,
  handleSort,
  sortDirection,
  setSortDirection
}: UserTableSortingProps) {
  return (
    <div className="flex items-center space-x-2">
      <Select 
        value={sortField} 
        onValueChange={(value) => handleSort(value)}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="role">Role</SelectItem>
          <SelectItem value="lastLogin">Last Login</SelectItem>
          <SelectItem value="status">Status</SelectItem>
        </SelectContent>
      </Select>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
      >
        {sortDirection === 'asc' ? '↑' : '↓'}
      </Button>
    </div>
  );
}
