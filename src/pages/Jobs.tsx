
import { Routes, Route, Navigate } from 'react-router-dom';
import JobsPage from './jobs/JobsPage';
import JobDetailPage from './jobs/JobDetailPage';

export default function Jobs() {
  return (
    <Routes>
      <Route index element={<JobsPage />} />
      <Route path="detail/:id" element={<JobDetailPage />} />
      <Route path="*" element={<Navigate to="/jobs" replace />} />
    </Routes>
  );
}
