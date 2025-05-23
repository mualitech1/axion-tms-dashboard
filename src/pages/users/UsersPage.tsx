import { useState } from 'react';
import { 
  User, Shield, UserPlus, Search, 
  Filter, MoreHorizontal, LockIcon, UserCog
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Mock data for users
const userData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@ikbtransport.com',
    role: 'Senior Management',
    department: 'Executive',
    status: 'Active',
    lastActive: '2023-06-15T10:30:45',
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@ikbtransport.com',
    role: 'Operations',
    department: 'Live Ops',
    status: 'Active',
    lastActive: '2023-06-15T09:15:22',
  },
  {
    id: 3,
    name: 'Michael Brown',
    email: 'michael.brown@ikbtransport.com',
    role: 'Accounts',
    department: 'Finance',
    status: 'Active',
    lastActive: '2023-06-14T16:45:10',
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    email: 'sarah.wilson@ikbtransport.com',
    role: 'Sales',
    department: 'Business Development',
    status: 'Active',
    lastActive: '2023-06-15T08:30:15',
  },
  {
    id: 5,
    name: 'Robert Taylor',
    email: 'robert.taylor@ikbtransport.com',
    role: 'Operations',
    department: 'Live Ops',
    status: 'Inactive',
    lastActive: '2023-05-28T14:20:30',
  },
];

// Role permissions
const rolePermissions = {
  'Senior Management': {
    dashboard: true,
    customers: true,
    carriers: true,
    finance: true,
    reports: true,
    users: true,
    settings: true,
  },
  'Operations': {
    dashboard: true,
    customers: true,
    carriers: true,
    finance: false,
    reports: true,
    users: false,
    settings: false,
  },
  'Accounts': {
    dashboard: true,
    customers: true,
    carriers: false,
    finance: true,
    reports: true,
    users: false,
    settings: false,
  },
  'Sales': {
    dashboard: true,
    customers: true,
    carriers: false,
    finance: false,
    reports: true,
    users: false,
    settings: false,
  },
};

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter users based on search term
  const filteredUsers = userData.filter(
    user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-tms-gray-800">User Management</h1>
          <p className="text-tms-gray-600">Manage system users and permissions</p>
        </div>
        
        <Button className="bg-tms-blue hover:bg-tms-blue/90">
          <UserPlus className="h-4 w-4 mr-2" />
          Add User
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-card mb-6">
        <div className="p-4 border-b border-tms-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tms-gray-500" />
              <Input
                placeholder="Search users..."
                className="pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-9">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={`https://avatar.vercel.sh/${user.email}?size=32`} alt={user.name} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-tms-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={user.status === 'Active' ? 'default' : 'secondary'}
                      className={user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(user.lastActive).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <UserCog className="mr-2 h-4 w-4" />
                          <span>Edit User</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Permissions</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <LockIcon className="mr-2 h-4 w-4" />
                          <span>Reset Password</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
} 