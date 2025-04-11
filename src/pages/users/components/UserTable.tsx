
import { useState, useMemo } from 'react';
import { User } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import UserTableFilters from './UserTableFilters';
import UserTableSorting from './UserTableSorting';
import UserTableActions from './UserTableActions';
import UserStatusDisplay from './UserStatusDisplay';
import UserRoleBadge from './UserRoleBadge';
import UserTableExport from './UserTableExport';
import { useUserFiltering } from '../hooks/useUserFiltering';
import { Checkbox } from '@/components/ui/checkbox';
import UserBulkActions from './UserBulkActions';
import { ArrowUpDown } from 'lucide-react';

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
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  
  const availableRoles = useMemo(() => {
    return Array.from(new Set(users.map(user => user.role)));
  }, [users]);
  
  const { filteredUsers, sortField, handleSort } = useUserFiltering({
    users,
    searchTerm,
    roleFilter,
    statusFilter
  });

  // Handle user selection
  const handleSelectUser = (user: User, checked: boolean) => {
    if (checked) {
      setSelectedUsers(prev => [...prev, user]);
    } else {
      setSelectedUsers(prev => prev.filter(u => u.id !== user.id));
    }
  };

  // Handle select all users
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers);
    } else {
      setSelectedUsers([]);
    }
  };

  // Check if a user is selected
  const isUserSelected = (userId: number) => {
    return selectedUsers.some(user => user.id === userId);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex-1">
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
        </div>
        
        <div className="flex items-center gap-3">
          {selectedUsers.length > 0 && (
            <UserBulkActions 
              selectedUsers={selectedUsers} 
              onClearSelection={() => setSelectedUsers([])}
              availableRoles={availableRoles}
            />
          )}
          <UserTableExport users={filteredUsers} />
          <UserTableSorting 
            sortField={sortField}
            handleSort={handleSort}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
          />
        </div>
      </div>
      
      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[40px] py-3">
                <Checkbox 
                  checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                  onCheckedChange={handleSelectAll}
                  aria-label="Select all users" 
                />
              </TableHead>
              <TableHead className="font-medium text-sm text-gray-600" onClick={() => handleSort('name')}>
                <div className="flex items-center gap-1 cursor-pointer">
                  Name
                  <ArrowUpDown size={14} className="text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="font-medium text-sm text-gray-600" onClick={() => handleSort('email')}>
                <div className="flex items-center gap-1 cursor-pointer">
                  Email
                  <ArrowUpDown size={14} className="text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="font-medium text-sm text-gray-600" onClick={() => handleSort('role')}>
                <div className="flex items-center gap-1 cursor-pointer">
                  Role
                  <ArrowUpDown size={14} className="text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="font-medium text-sm text-gray-600" onClick={() => handleSort('lastLogin')}>
                <div className="flex items-center gap-1 cursor-pointer">
                  Last Login
                  <ArrowUpDown size={14} className="text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="font-medium text-sm text-gray-600" onClick={() => handleSort('status')}>
                <div className="flex items-center gap-1 cursor-pointer">
                  Status
                  <ArrowUpDown size={14} className="text-gray-400" />
                </div>
              </TableHead>
              <TableHead className="text-right font-medium text-sm text-gray-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-gray-50">
                  <TableCell>
                    <Checkbox 
                      checked={isUserSelected(user.id)}
                      onCheckedChange={(checked) => handleSelectUser(user, !!checked)}
                      aria-label={`Select user ${user.name}`}
                    />
                  </TableCell>
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
