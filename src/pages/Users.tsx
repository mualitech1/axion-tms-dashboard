import { useState } from 'react';
import { 
  Users as UsersIcon, Shield, UserPlus, Search, 
  Filter, MoreHorizontal, LockIcon, UserCog
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
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
import DashboardCard from '@/components/dashboard/DashboardCard';

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

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredUsers = userData.filter(
    user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <MainLayout title="User Management">
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
                  <TableHead className="w-[250px]">User</TableHead>
                  <TableHead>Role & Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="w-[70px]"></TableHead>
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
                              {user.name.split(' ').map(n => n[0]).join('')}
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
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit User</DropdownMenuItem>
                            <DropdownMenuItem>View Activity Log</DropdownMenuItem>
                            <DropdownMenuItem>Reset Password</DropdownMenuItem>
                            {user.status === 'Active' ? (
                              <DropdownMenuItem className="text-tms-red">Deactivate User</DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem className="text-tms-green">Activate User</DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard title="User Overview">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-tms-blue-light p-2 rounded-full mr-3">
                    <UsersIcon className="h-4 w-4 text-tms-blue" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-tms-gray-800">42</div>
                    <div className="text-sm text-tms-gray-500">Total Users</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-tms-green-light p-2 rounded-full mr-3">
                    <UserCog className="h-4 w-4 text-tms-green" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-tms-gray-800">38</div>
                    <div className="text-sm text-tms-gray-500">Active Users</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-tms-blue-light p-2 rounded-full mr-3">
                    <Shield className="h-4 w-4 text-tms-blue" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-tms-gray-800">5</div>
                    <div className="text-sm text-tms-gray-500">Admin Users</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-tms-yellow-light p-2 rounded-full mr-3">
                    <LockIcon className="h-4 w-4 text-tms-yellow" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-tms-gray-800">8</div>
                    <div className="text-sm text-tms-gray-500">Password Resets (30 days)</div>
                  </div>
                </div>
              </div>
            </div>
          </DashboardCard>
          
          <DashboardCard title="Role Permissions">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-tms-gray-200">
                <thead>
                  <tr>
                    <th className="px-2 py-2 text-left text-xs font-medium text-tms-gray-500 uppercase tracking-wider">Module</th>
                    {Object.keys(rolePermissions).map(role => (
                      <th key={role} className="px-2 py-2 text-center text-xs font-medium text-tms-gray-500 uppercase tracking-wider">
                        {role}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-tms-gray-200">
                  {Object.keys(rolePermissions.Operations).map(permission => (
                    <tr key={permission}>
                      <td className="px-2 py-2 text-sm text-tms-gray-800 capitalize">{permission}</td>
                      {Object.keys(rolePermissions).map(role => (
                        <td key={`${role}-${permission}`} className="px-2 py-2 text-center">
                          {rolePermissions[role][permission] ? (
                            <div className="flex justify-center">
                              <div className="h-5 w-5 rounded-full bg-tms-green-light flex items-center justify-center">
                                <svg className="h-3 w-3 text-tms-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-center">
                              <div className="h-5 w-5 rounded-full bg-tms-red-light flex items-center justify-center">
                                <svg className="h-3 w-3 text-tms-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </div>
                            </div>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </DashboardCard>
        </div>
      </div>
    </MainLayout>
  );
}
