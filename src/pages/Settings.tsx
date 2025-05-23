import { Routes, Route, Navigate } from 'react-router-dom';
import SettingsPage from './settings/SettingsPage';
import ProfileSettings from './settings/components/GeneralSettings';
import NotificationsSettings from './settings/components/NotificationSettings';
import SecuritySettings from './settings/components/SecuritySettings';
import SecurityLogs from './settings/components/SecurityLogs';
import DeviceManagement from './settings/components/DeviceManagement';
import MobileOperations from './settings/components/MobileOperations';
import ComplianceDocuments from './settings/components/ComplianceDocuments';
import IntegrationSettings from './settings/components/IntegrationSettings';
import { SubscriptionSettings } from "@/components/settings/SubscriptionSettings";
import SettingsLayout from './settings/SettingsLayout';

export default function Settings() {
  return (
    <Routes>
      <Route element={<SettingsLayout />}>
        <Route index element={<SettingsPage />} />
        <Route path="profile" element={<ProfileSettings />} />
        <Route path="notifications" element={<NotificationsSettings />} />
        <Route path="security" element={<SecuritySettings />} />
        <Route path="security-logs" element={<SecurityLogs />} />
        <Route path="devices" element={<DeviceManagement />} />
        <Route path="mobile" element={<MobileOperations />} />
        <Route path="compliance" element={<ComplianceDocuments />} />
        <Route path="integrations" element={<IntegrationSettings />} />
        <Route path="subscription" element={<SubscriptionSettings />} />
        <Route path="*" element={<Navigate to="/settings" replace />} />
      </Route>
    </Routes>
  );
}
