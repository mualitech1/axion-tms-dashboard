
import { useState, useMemo } from 'react';
import { User } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserTableFilters from './UserTableFilters';
import UserTableSorting from './UserTableSorting';
import UserTableActions from './UserTableActions';
import UserStatusDisplay from './UserStatusDisplay';
import UserRoleBadge from './UserRoleBadge';
import { useUserFiltering } from '../hooks/useUserFiltering';

interface UserTableProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEditUser?: (user: User) => void;
  onToggleUserStatus?: (user: User) => void;
  onManage2FA?: (userId: string) => void;
  roleFilter: string[];
  onRoleFilterChange: (roles: string[]) => void;
  statusFilter: string[];
  onStatusFilterChange: (statuses: string[]) => void;
}

export default function UserTable({ 
  users, 
  searchTerm, 
  onSearchChange, 
  onEditUser, 
  onToggleUserStatus,
  onManage2FA,
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange
}: UserTableProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const availableRoles = useMemo(() => {
    return Array.from(new Set(users.map(user => user.role)));
  }, [users]);
  
  const { filteredUsers, sortField, handleSort } = useUserFiltering({
    users,
    searchTerm,
    roleFilter,
    statusFilter
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <UserTableFilters
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          roleFilter={roleFilter}
          onRoleFilterChange={onRoleFilterChange}
          statusFilter={statusFilter}
          onStatusFilterChange={onStatusFilterChange}
          availableRoles={availableRoles}
        />
        
        <UserTableSorting 
          sortField={sortField}
          handleSort={handleSort}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[250px]">Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <UserRoleBadge role={user.role} />
                  </TableCell>
                  <TableCell>{user.lastLogin || user.lastActive}</TableCell>
                  <TableCell>
                    <UserStatusDisplay user={user} onToggleUserStatus={onToggleUserStatus} />
                  </TableCell>
                  <TableCell className="text-right">
                    <UserTableActions 
                      user={user} 
                      onEditUser={onEditUser}
                      onToggleUserStatus={onToggleUserStatus}
                      onManage2FA={onManage2FA}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
