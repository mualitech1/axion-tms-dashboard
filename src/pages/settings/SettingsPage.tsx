
import MainLayout from '@/components/layout/MainLayout';
import SettingsHeader from './components/SettingsHeader';
import SettingsContent from './components/SettingsContent';

export default function SettingsPage() {
  return (
    <MainLayout title="Settings">
      <div className="animate-fade-in">
        <SettingsHeader />
        <SettingsContent />
      </div>
    </MainLayout>
  );
}
