
import { Routes, Route, Navigate } from 'react-router-dom';
import PipelineDashboard from './pipeline/PipelineDashboard';
import PipelineBoard from './pipeline/PipelineBoard';
import LeadDetails from './pipeline/LeadDetails';
import PipelineReports from './pipeline/PipelineReports';
import PipelineSettings from './pipeline/PipelineSettings';

export default function Pipeline() {
  return (
    <Routes>
      <Route path="/" element={<PipelineDashboard />} />
      <Route path="/board" element={<PipelineBoard />} />
      <Route path="/lead/:id" element={<LeadDetails />} />
      <Route path="/reports" element={<PipelineReports />} />
      <Route path="/settings" element={<PipelineSettings />} />
      <Route path="*" element={<Navigate to="/pipeline" replace />} />
    </Routes>
  );
}
