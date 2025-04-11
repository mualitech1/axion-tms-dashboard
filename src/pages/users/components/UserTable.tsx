
import { useState } from 'react';
import { Search, Filter, MoreHorizontal, FileText, Activity, UserCog, UserMinus, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { User } from '../types';
import UserTableFilters from './UserTableFilters';
import { useToast } from '@/components/ui/use-toast';

interface UserTableProps {
  users: User[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onEditUser: (user: User) => void;
  onToggleUserStatus: (user: User) => void;
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
  roleFilter,
  onRoleFilterChange,
  statusFilter,
  onStatusFilterChange
}: UserTableProps) {
  const { toast } = useToast();

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  };
  
  const handleToggleStatus = (user: User) => {
    onToggleUserStatus(user);
    
    toast({
      title: `User ${user.status === 'Active' ? 'Deactivated' : 'Activated'}`,
      description: `${user.name} has been ${user.status === 'Active' ? 'deactivated' : 'activated'}.`,
      variant: user.status === 'Active' ? 'destructive' : 'default',
    });
  };

  // Filter users based on search term and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.role);
    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(user.status);
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  return (
    <div className="bg-white rounded-lg shadow-card mb-6">
      <UserTableFilters
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        roleFilter={roleFilter}
        onRoleFilterChange={onRoleFilterChange}
        statusFilter={statusFilter}
        onStatusFilterChange={onStatusFilterChange}
      />
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">User</TableHead>
              <TableHead>Role & Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Active</TableHead>
              <TableHead className="w-[120px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-tms-gray-100">
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-9 w-9 mr-3">
                        <AvatarImage src={`https://avatars.dicebear.com/api/initials/${user.name.replace(/\s+/g, '-')}.svg`} alt={user.name} />
                        <AvatarFallback className="bg-tms-blue-light text-tms-blue">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-tms-gray-800">{user.name}</div>
                        <div className="text-sm text-tms-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-tms-gray-800">{user.role}</div>
                      <div className="text-sm text-tms-gray-500">{user.department}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={`${
                        user.status === 'Active' ? 'bg-tms-green-light text-tms-green' : 
                        'bg-tms-gray-200 text-tms-gray-600'
                      }`}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.lastActive).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end space-x-2">
                      <Button asChild variant="outline" size="icon" className="h-8 w-8">
                        <Link to={`/users/details/${user.id}`}>
                          <UserCog className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline" size="icon" className="h-8 w-8">
                        <Link to={`/users/logs/${user.id}`}>
                          <Activity className="h-4 w-4" />
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEditUser(user)}>
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/users/logs/${user.id}`}>View Activity Log</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Reset Password</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleToggleStatus(user)}
                            className={user.status === 'Active' ? 'text-red-600 hover:text-red-700' : 'text-green-600 hover:text-green-700'}
                          >
                            {user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-tms-gray-500">
                  No users found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
