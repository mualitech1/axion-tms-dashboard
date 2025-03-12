
import MainLayout from '@/components/layout/MainLayout';
import UserPageHeader from './components/UserPageHeader';
import UserContentSection from './components/UserContentSection';
import { userData } from './data/userData';

export default function UserPage() {
  return (
    <MainLayout title="User Management">
      <div className="animate-fade-in">
        <UserPageHeader />
        <UserContentSection userData={userData} />
      </div>
    </MainLayout>
  );
}
