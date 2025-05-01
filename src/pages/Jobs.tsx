
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import JobsPage from './jobs/JobsPage';
import JobDetailPage from './jobs/JobDetailPage';
import CreateJobPage from './jobs/CreateJobPage';

export default function Jobs() {
  console.log("Jobs component rendered");
  
  // Log to verify routes are registered
  console.log("Jobs routes registered: / (JobsPage), /:id (JobDetailPage), and /create (CreateJobPage)");
  
  return (
    <Routes>
      <Route index element={<JobsPage />} />
      <Route path="create" element={<CreateJobPage />} />
      <Route path=":id" element={<JobDetailPage />} />
      <Route path="*" element={<Navigate to="/jobs" replace />} />
    </Routes>
  );
}
