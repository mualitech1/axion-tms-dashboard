
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import UserPageHeader from './components/UserPageHeader';
import UserContentSection from './components/UserContentSection';
import { userData } from './data/userData';

export default function UserPage() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  const handleCreateUserClick = () => {
    setCreateDialogOpen(true);
  };
  
  return (
    <MainLayout title="User Management">
      <div className="animate-fade-in">
        <UserPageHeader onCreateUserClick={handleCreateUserClick} />
        <UserContentSection userData={userData} />
      </div>
    </MainLayout>
  );
}
