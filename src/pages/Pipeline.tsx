
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

export default function Pipeline() {
  return (
    <ReminderProvider>
      <AutoReminder />
      <Routes>
        <Route path="/" element={<PipelineDashboard />} />
        <Route path="/board" element={<PipelineBoard />} />
        <Route path="/lead/:id" element={<LeadDetails />} />
        <Route path="/reports" element={<PipelineReports />} />
        <Route path="/settings" element={<PipelineSettings />} />
        <Route path="/reminders" element={<PipelineReminders />} />
        <Route path="/tasks" element={<PipelineTasks />} />
        <Route path="*" element={<Navigate to="/pipeline" replace />} />
      </Routes>
    </ReminderProvider>
  );
}
