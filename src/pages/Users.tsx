
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './users/UserPage';
import UserDetailsPage from './users/UserDetailsPage';
import UserLogsPage from './users/UserLogsPage';

export default function Users() {
  return (
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/details/:id" element={<UserDetailsPage />} />
      <Route path="/logs/:id" element={<UserLogsPage />} />
      <Route path="*" element={<Navigate to="/users" replace />} />
    </Routes>
  );
}
