import MainLayout from '@/components/layout/MainLayout';
import SettingsHeader from '@/components/settings/SettingsHeader';
import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationsSettings from '@/components/settings/NotificationsSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
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
