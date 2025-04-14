
import { Routes, Route, Navigate } from 'react-router-dom';
import DriversPage from './drivers/DriversPage';

export default function Drivers() {
  return (
    <Routes>
      <Route index element={<DriversPage />} />
      <Route path="*" element={<Navigate to="/drivers" replace />} />
    </Routes>
  );
}
