
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-tms-gray-800">Users</h2>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => {
            toast({
              title: "Security Audit",
              description: "Security audit has been initiated. Results will be available soon.",
            });
          }}>
            <Shield className="mr-2 h-4 w-4" />
            Security Audit
          </Button>
          <Button onClick={() => setCreateDialogOpen(true)}>
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
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
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserOverview 
          totalUsers={userData.length}
          activeUsers={activeUsers}
          adminUsers={adminUsers}
          inactiveUsers={inactiveUsers}
        />
        <RolePermissionsTable />
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
