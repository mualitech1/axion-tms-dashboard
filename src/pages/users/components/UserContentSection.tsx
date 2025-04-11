
import { useState } from 'react';
import UserTable from './UserTable';
import UserOverview from './UserOverview';
import RolePermissionsTable from './RolePermissionsTable';
import CreateUserDialog from './CreateUserDialog';
import { User } from '../types';
import { Button } from '@/components/ui/button';
import { UserPlus, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserContentSectionProps {
  userData: User[];
  onManage2FA?: (userId: string) => void;
}

export default function UserContentSection({ userData: initialUserData, onManage2FA }: UserContentSectionProps) {
  const [userData, setUserData] = useState<User[]>(initialUserData);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  
  const { toast } = useToast();
  
  const handleUserCreated = (newUser: User) => {
    if (editingUser) {
      // Update existing user
      setUserData(prevUsers => 
        prevUsers.map(user => user.id === newUser.id ? newUser : user)
      );
      
      toast({
        title: "User Updated",
        description: `${newUser.name}'s details have been updated successfully.`,
      });
      
      setEditingUser(null);
    } else {
      // Add new user
      setUserData(prevUsers => [...prevUsers, newUser]);
      
      toast({
        title: "User Created",
        description: `${newUser.name} has been added to the system.`,
      });
    }
  };
  
  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setCreateDialogOpen(true);
  };
  
  const handleToggleUserStatus = (user: User) => {
    const newStatus = user.status === 'Active' ? 'Inactive' : 'Active';
    
    setUserData(prevUsers => 
      prevUsers.map(u => 
        u.id === user.id ? { ...u, status: newStatus } : u
      )
    );
  };
  
  const handleDialogOpenChange = (open: boolean) => {
    setCreateDialogOpen(open);
    if (!open) {
      setEditingUser(null);
    }
  };
  
  // Calculate stats for the overview cards
  const activeUsers = userData.filter(user => user.status === 'Active').length;
  const inactiveUsers = userData.length - activeUsers;
  const adminUsers = userData.filter(user => 
    user.role.toLowerCase().includes('admin') || 
    user.role.toLowerCase().includes('manager')
  ).length;
  
  return (
    <>
      <div className="flex flex-col space-y-6">
        <div>
          <h2 className="text-xl font-medium">Users</h2>
        </div>
        
        <UserTable 
          users={userData} 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
          onEditUser={handleEditUser}
          onToggleUserStatus={handleToggleUserStatus}
          onManage2FA={onManage2FA}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-medium">User Overview</h2>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="grid grid-cols-4 gap-8">
              <div className="flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-semibold">{userData.length}</p>
                  <p className="text-gray-500 text-sm">Total Users</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-semibold">{activeUsers}</p>
                  <p className="text-gray-500 text-sm">Active Users</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-red-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-semibold">{inactiveUsers}</p>
                  <p className="text-gray-500 text-sm">Inactive Users</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-3xl font-semibold">{adminUsers}</p>
                  <p className="text-gray-500 text-sm">Admin Users</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-medium">Role Permissions</h2>
          </div>
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <RolePermissionsTable />
          </div>
        </div>
      </div>
      
      <CreateUserDialog 
        open={createDialogOpen}
        onOpenChange={handleDialogOpenChange}
        onUserCreated={handleUserCreated}
        editUser={editingUser}
      />
    </>
  );
}
