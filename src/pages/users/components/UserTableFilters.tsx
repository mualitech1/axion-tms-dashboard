
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Search } from 'lucide-react';
import { InputWithIcon } from '@/components/ui/input-with-icon';

interface UserTableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  roleFilter: string[];
  onRoleFilterChange: (roles: string[]) => void;
  statusFilter: string[];
  onStatusFilterChange: (statuses: string[]) => void;
  availableRoles: string[];
}

export default function UserTableFilters({ 
  searchTerm, 
  onSearchChange,
  showFilters,
  setShowFilters,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange,
  availableRoles
}: UserTableFiltersProps) {
  
  const handleRoleFilterChange = (role: string) => {
    if (roleFilter.includes(role)) {
      onRoleFilterChange(roleFilter.filter(r => r !== role));
    } else {
      onRoleFilterChange([...roleFilter, role]);
    }
  };
  
  const handleStatusFilterChange = (status: string) => {
    if (statusFilter.includes(status)) {
      onStatusFilterChange(statusFilter.filter(s => s !== status));
    } else {
      onStatusFilterChange([...statusFilter, status]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div className="w-full md:w-1/3">
          <InputWithIcon
            icon={Search}
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex justify-between items-center space-x-2">
          <Button 
            variant="outline" 
            onClick={() => setShowFilters(!showFilters)}
            className={showFilters ? "bg-tms-gray-100" : ""}
          >
            <Filter className="mr-2 h-4 w-4" /> 
            Filters
            {(roleFilter.length > 0 || statusFilter.length > 0) && (
              <Badge variant="secondary" className="ml-2">
                {roleFilter.length + statusFilter.length}
              </Badge>
            )}
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="p-4 bg-white rounded-lg border border-tms-gray-200 space-y-4">
          <h4 className="font-medium text-sm">Filter Users</h4>
          
          <div>
            <h5 className="text-xs uppercase text-tms-gray-500 mb-2">Roles</h5>
            <div className="flex flex-wrap gap-2">
              {availableRoles.map((role) => (
                <Badge
                  key={role}
                  variant={roleFilter.includes(role) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleRoleFilterChange(role)}
                >
                  {role}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <h5 className="text-xs uppercase text-tms-gray-500 mb-2">Status</h5>
            <div className="flex gap-2">
              <Badge
                variant={statusFilter.includes('Active') ? "default" : "outline"}
                className="cursor-pointer bg-tms-green/90"
                onClick={() => handleStatusFilterChange('Active')}
              >
                Active
              </Badge>
              <Badge
                variant={statusFilter.includes('Inactive') ? "default" : "outline"}
                className="cursor-pointer bg-tms-red/90"
                onClick={() => handleStatusFilterChange('Inactive')}
              >
                Inactive
              </Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
