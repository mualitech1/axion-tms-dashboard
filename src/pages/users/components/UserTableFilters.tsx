
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Filter, Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface UserTableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  roleFilter: string[];
  onRoleFilterChange: (roles: string[]) => void;
  statusFilter: string[];
  onStatusFilterChange: (statuses: string[]) => void;
}

export default function UserTableFilters({
  searchTerm,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange
}: UserTableFiltersProps) {
  const roles = ["Administrator", "Operations Manager", "Operations Staff", "Finance Manager", "Finance Staff", "Sales Representative"];
  const statuses = ["Active", "Inactive"];
  
  const handleRoleToggle = (role: string) => {
    if (roleFilter.includes(role)) {
      onRoleFilterChange(roleFilter.filter(r => r !== role));
    } else {
      onRoleFilterChange([...roleFilter, role]);
    }
  };
  
  const handleStatusToggle = (status: string) => {
    if (statusFilter.includes(status)) {
      onStatusFilterChange(statusFilter.filter(s => s !== status));
    } else {
      onStatusFilterChange([...statusFilter, status]);
    }
  };
  
  const clearFilters = () => {
    onSearchChange('');
    onRoleFilterChange([]);
    onStatusFilterChange([]);
  };
  
  const hasFilters = searchTerm || roleFilter.length > 0 || statusFilter.length > 0;
  
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-tms-gray-200">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tms-gray-500" />
        <Input
          placeholder="Search users by name, email..."
          className="pl-10 w-full"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
      
      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9">
              <Filter className="h-4 w-4 mr-2" />
              Filter
              {hasFilters && (
                <Badge variant="secondary" className="ml-1 bg-tms-blue-light text-tms-blue">
                  {roleFilter.length + statusFilter.length + (searchTerm ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>Filter by Role</DropdownMenuLabel>
            {roles.map((role) => (
              <DropdownMenuCheckboxItem
                key={role}
                checked={roleFilter.includes(role)}
                onCheckedChange={() => handleRoleToggle(role)}
              >
                {role}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            {statuses.map((status) => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={statusFilter.includes(status)}
                onCheckedChange={() => handleStatusToggle(status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
            
            <DropdownMenuSeparator />
            
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start font-normal text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={clearFilters}
              >
                Clear all filters
              </Button>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
