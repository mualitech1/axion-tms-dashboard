
import { Routes, Route, Navigate } from 'react-router-dom';
import JobsPage from './jobs/JobsPage';
import JobDetailPage from './jobs/JobDetailPage';

export default function Jobs() {
  console.log("Jobs component rendered");
  
  // Log to verify routes are registered
  console.log("Jobs routes registered: / (JobsPage) and /:id (JobDetailPage)");
  
  return (
    <Routes>
      <Route index element={<JobsPage />} />
      <Route path=":id" element={<JobDetailPage />} />
      <Route path="*" element={<Navigate to="/jobs" replace />} />
    </Routes>
  );
}
