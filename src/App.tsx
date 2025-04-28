import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from '@/pages/Index';
import AuthPage from '@/pages/AuthPage';
import Drivers from '@/pages/Drivers';
import Invoices from '@/pages/Invoices';
import Jobs from '@/pages/Jobs';
import Carriers from '@/pages/Carriers';
import CustomerPortal from '@/pages/CustomerPortal';
import Customers from '@/pages/Customers';
import Fleet from '@/pages/Fleet';
import Finance from '@/pages/Finance';
import Users from '@/pages/Users';
import SettingsPage from '@/pages/settings/SettingsPage';
import Pipeline from '@/pages/Pipeline';
import PipelineReports from '@/pages/pipeline/PipelineReports';
import Analytics from '@/pages/Analytics';
import NotFound from '@/pages/NotFound';
import CarrierReports from '@/pages/carriers/CarrierReports';
import AnalyticsAdvanced from '@/pages/analytics/AnalyticsAdvanced';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/drivers",
    element: <Drivers />,
  },
  {
    path: "/invoices",
    element: <Invoices />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/carriers",
    element: <Carriers />,
  },
  {
    path: "/customer-portal",
    element: <CustomerPortal />,
  },
  {
    path: "/carriers/reports",
    element: <CarrierReports />,
  },
  {
    path: "/customers",
    element: <Customers />,
  },
  {
    path: "/fleet",
    element: <Fleet />,
  },
  {
    path: "/finance",
    element: <Finance />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "/pipeline",
    element: <Pipeline />,
  },
  {
    path: "/pipeline/reports",
    element: <PipelineReports />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/analytics/advanced",
    element: <AnalyticsAdvanced />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
