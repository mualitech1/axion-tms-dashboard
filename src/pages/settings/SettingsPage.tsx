
import MainLayout from '@/components/layout/MainLayout';
import SettingsHeader from './components/SettingsHeader';
import SettingsContent from './components/SettingsContent';

export default function SettingsPage() {
  return (
    <MainLayout title="Settings">
      <div className="animate-fade-in max-w-6xl mx-auto px-4">
        <SettingsHeader />
        <SettingsContent />
      </div>
    </MainLayout>
  );
}
