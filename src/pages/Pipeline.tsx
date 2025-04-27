
import { Routes, Route, Navigate } from 'react-router-dom';
import PipelineDashboard from './pipeline/PipelineDashboard';
import PipelineBoard from './pipeline/PipelineBoard';
import LeadDetails from './pipeline/LeadDetails';
import PipelineReports from './pipeline/PipelineReports';
import PipelineSettings from './pipeline/PipelineSettings';
import PipelineReminders from './pipeline/PipelineReminders';
import PipelineTasks from './pipeline/PipelineTasks';
import { ReminderProvider } from './pipeline/context/ReminderContext';
import AutoReminder from './pipeline/components/reminders/AutoReminder';
import CreateLeadPage from './pipeline/components/leads/CreateLeadPage';

export default function Pipeline() {
  return (
    <ReminderProvider>
      <AutoReminder />
      <Routes>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PipelineDashboard />} />
        <Route path="board" element={<PipelineBoard />} />
        <Route path="lead/new" element={<CreateLeadPage />} />
        <Route path="lead/:id" element={<LeadDetails />} />
        <Route path="reports" element={<PipelineReports />} />
        <Route path="settings" element={<PipelineSettings />} />
        <Route path="reminders" element={<PipelineReminders />} />
        <Route path="tasks" element={<PipelineTasks />} />
        <Route path="tasks/calendar" element={<PipelineTasks defaultTab="calendar" />} />
        <Route path="tasks/tags" element={<PipelineTasks defaultTab="tags" />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </ReminderProvider>
  );
}
