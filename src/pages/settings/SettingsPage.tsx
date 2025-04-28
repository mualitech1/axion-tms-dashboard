
import MainLayout from '@/components/layout/MainLayout';
import SettingsHeader from '@/pages/settings/components/SettingsHeader';
import ProfileSettings from '@/pages/settings/components/GeneralSettings';
import NotificationsSettings from '@/pages/settings/components/NotificationSettings';
import SecuritySettings from '@/pages/settings/components/SecuritySettings';
import SecurityLogs from '@/pages/settings/components/SecurityLogs';
import { SubscriptionSettings } from "@/components/settings/SubscriptionSettings";
import { useAuth } from '@/hooks/use-auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SettingsPage() {
  const { user, loading, checkSession } = useAuth();
  const navigate = useNavigate();
  
  // Session protection - redirect to login if not authenticated
  useEffect(() => {
    async function verifyAuth() {
      if (!loading) {
        const isSessionValid = await checkSession();
        if (!isSessionValid) {
          navigate('/auth');
        }
      }
    }
    
    verifyAuth();
  }, [loading, navigate, checkSession]);
  
  if (loading) {
    return (
      <MainLayout title="Settings">
        <div className="container mx-auto py-6 flex justify-center items-center h-[60vh]">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Settings">
      <div className="container mx-auto py-6 space-y-8">
        <SettingsHeader />
        <div className="grid gap-6">
          <SubscriptionSettings />
          <ProfileSettings />
          <SecuritySettings />
          <SecurityLogs />
          <NotificationsSettings />
        </div>
      </div>
    </MainLayout>
  );
}
