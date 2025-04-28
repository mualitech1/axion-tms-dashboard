
import MainLayout from '@/components/layout/MainLayout';
import SettingsHeader from '@/pages/settings/components/SettingsHeader';
import ProfileSettings from '@/pages/settings/components/GeneralSettings';
import NotificationsSettings from '@/pages/settings/components/NotificationSettings';
import SecuritySettings from '@/pages/settings/components/SecuritySettings';
import { SubscriptionSettings } from "@/components/settings/SubscriptionSettings";

export default function SettingsPage() {
  return (
    <MainLayout title="Settings">
      <div className="container mx-auto py-6 space-y-8">
        <SettingsHeader />
        <div className="grid gap-6">
          <SubscriptionSettings />
          <ProfileSettings />
          <NotificationsSettings />
          <SecuritySettings />
        </div>
      </div>
    </MainLayout>
  );
}
