import React from 'react';
import { Navigate, useLocation, Routes, Route, Outlet } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import MainLayout from '@/components/layout/MainLayout';

// Lazy load pipeline components
const PipelineDashboard = lazy(() => import('./pipeline/PipelineDashboard'));
const PipelineBoard = lazy(() => import('./pipeline/PipelineBoard'));
const PipelineTasks = lazy(() => import('./pipeline/PipelineTasks'));
const PipelineReports = lazy(() => import('./pipeline/PipelineReports'));
const PipelineSettings = lazy(() => import('./pipeline/PipelineSettings'));
const PipelineReminders = lazy(() => import('./pipeline/PipelineReminders'));

/**
 * Pipeline main component with nested routes
 */
export default function Pipeline() {
  const location = useLocation();
  
  // If at the root pipeline path, redirect to dashboard
  if (location.pathname === '/pipeline') {
    return <Navigate to="/pipeline/dashboard" replace />;
  }
  
  // Otherwise, render the appropriate nested route
  return (
    <Routes>
      <Route path="dashboard" element={
        <Suspense fallback={<div className="p-6 text-center">Loading Quantum Pipeline Dashboard...</div>}>
          <PipelineDashboard />
        </Suspense>
      } />
      
      <Route path="board" element={
        <Suspense fallback={<div className="p-6 text-center">Loading Pipeline Board...</div>}>
          <PipelineBoard />
        </Suspense>
      } />
      
      <Route path="tasks" element={
        <Suspense fallback={<div className="p-6 text-center">Loading Pipeline Tasks...</div>}>
          <PipelineTasks />
        </Suspense>
      } />
      
      <Route path="reports" element={
        <Suspense fallback={<div className="p-6 text-center">Loading Pipeline Reports...</div>}>
          <PipelineReports />
        </Suspense>
      } />
      
      <Route path="settings" element={
        <Suspense fallback={<div className="p-6 text-center">Loading Pipeline Settings...</div>}>
          <PipelineSettings />
        </Suspense>
      } />
      
      <Route path="reminders" element={
        <Suspense fallback={<div className="p-6 text-center">Loading Pipeline Reminders...</div>}>
          <PipelineReminders />
        </Suspense>
      } />
      
      {/* Fallback for any other pipeline routes */}
      <Route path="*" element={<Navigate to="/pipeline/dashboard" replace />} />
    </Routes>
  );
}
