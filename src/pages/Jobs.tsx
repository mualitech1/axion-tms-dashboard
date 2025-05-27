import { Routes, Route, Navigate } from 'react-router-dom';
import JobsPage from './jobs/JobsPage';
import CreateJobPage from './jobs/CreateJobPage';
import JobDetailsPage from './jobs/JobDetailsPage';
import JobAssignmentPage from './jobs/JobAssignmentPage';
import JobTrackingPage from './jobs/JobTrackingPage';
import JobReportsPage from './jobs/JobReportsPage';
import JobSchedulePage from './jobs/JobSchedulePage';

export default function Jobs() {
  return (
    <Routes>
      <Route index element={<JobsPage />} />
      <Route path="create" element={<CreateJobPage />} />
      <Route path="details/:id" element={<JobDetailsPage />} />
      <Route path="assign/:id" element={<JobAssignmentPage />} />
      <Route path="edit/:id" element={<CreateJobPage />} />
      <Route path="tracking/:id" element={<JobTrackingPage />} />
      <Route path="reports" element={<JobReportsPage />} />
      <Route path="schedule" element={<JobSchedulePage />} />
      <Route path="*" element={<Navigate to="/jobs" replace />} />
    </Routes>
  );
}
