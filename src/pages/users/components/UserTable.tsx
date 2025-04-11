
import { useState, useMemo } from 'react';
import { User } from '../types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch'; 
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Edit2, 
  MoreVertical, 
  UserX, 
  Shield, 
  Key, 
  UserCog, 
  Search, 
  Filter 
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { InputWithIcon } from '@/components/ui/input-with-icon';

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
  const [sortField, setSortField] = useState<string>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  
  const availableRoles = useMemo(() => {
    return Array.from(new Set(users.map(user => user.role)));
  }, [users]);
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesRole = roleFilter.length === 0 || roleFilter.includes(user.role);
        
        const matchesStatus = statusFilter.length === 0 || statusFilter.includes(user.status);
        
        return matchesSearch && matchesRole && matchesStatus;
      })
      .sort((a, b) => {
        let comparison = 0;
        
        if (sortField === 'name') {
          comparison = a.name.localeCompare(b.name);
        } else if (sortField === 'email') {
          comparison = a.email.localeCompare(b.email);
        } else if (sortField === 'role') {
          comparison = a.role.localeCompare(b.role);
        } else if (sortField === 'lastLogin') {
          const dateA = a.lastLogin ? new Date(a.lastLogin).getTime() : 0;
          const dateB = b.lastLogin ? new Date(b.lastLogin).getTime() : 0;
          comparison = dateA - dateB;
        } else if (sortField === 'status') {
          comparison = a.status.localeCompare(b.status);
        }
        
        return sortDirection === 'asc' ? comparison : -comparison;
      });
  }, [users, searchTerm, sortField, sortDirection, roleFilter, statusFilter]);
  
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
                    <Badge variant="outline" className={
                      user.role.toLowerCase().includes('admin') 
                        ? 'border-tms-blue text-tms-blue' 
                        : ''
                    }>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Switch 
                        checked={user.status === 'Active'} 
                        onCheckedChange={() => {
                          if (onToggleUserStatus) onToggleUserStatus(user);
                        }}
                        className="scale-75 origin-left"
                      />
                      <span className={`ml-2 text-xs ${
                        user.status === 'Active' 
                          ? 'text-tms-green' 
                          : 'text-tms-red'
                      }`}>
                        {user.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => {
                          if (onEditUser) onEditUser(user);
                        }}>
                          <Edit2 className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          if (onManage2FA) onManage2FA(user.id);
                        }}>
                          <Shield className="mr-2 h-4 w-4" /> Manage 2FA
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Key className="mr-2 h-4 w-4" /> Reset Password
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          if (onToggleUserStatus) onToggleUserStatus(user);
                        }}>
                          <UserX className="mr-2 h-4 w-4" />
                          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <UserCog className="mr-2 h-4 w-4" /> Permissions
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
