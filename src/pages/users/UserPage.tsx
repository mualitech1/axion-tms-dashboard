
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserTable from './components/UserTable';
import UserOverview from './components/UserOverview';
import RolePermissionsTable from './components/RolePermissionsTable';
import { userData } from './data/userData';
import { UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UserPage() {
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
        
        <UserTable 
          users={filteredUsers} 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <UserOverview />
          <RolePermissionsTable />
        </div>
      </div>
    </MainLayout>
  );
}
