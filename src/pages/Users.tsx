import { Routes, Route, Navigate } from 'react-router-dom';
import UsersPage from './users/UsersPage';
import UserDetailsPage from './users/UserDetailsPage';
import UserLogsPage from './users/UserLogsPage';

export default function UsersRoutes() {
  return (
    <Routes>
      <Route index element={<UsersPage />} />
      <Route path="details/:id" element={<UserDetailsPage />} />
      <Route path="logs/:id" element={<UserLogsPage />} />
      <Route path="*" element={<Navigate to="/users" replace />} />
    </Routes>
  );
}
