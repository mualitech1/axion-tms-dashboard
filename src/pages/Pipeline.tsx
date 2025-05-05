
import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Pipeline page that redirects to the pipeline dashboard
 */
export default function Pipeline() {
  return <Navigate to="/pipeline/dashboard" replace />;
}
