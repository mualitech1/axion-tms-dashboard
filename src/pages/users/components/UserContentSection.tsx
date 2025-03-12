
import { useState } from 'react';
import UserTable from './UserTable';
import UserOverview from './UserOverview';
import RolePermissionsTable from './RolePermissionsTable';
import { User } from '../types';

interface UserContentSectionProps {
  userData: User[];
}

export default function UserContentSection({ userData }: UserContentSectionProps) {
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
    <>
      <UserTable 
        users={filteredUsers} 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UserOverview />
        <RolePermissionsTable />
      </div>
    </>
  );
}
