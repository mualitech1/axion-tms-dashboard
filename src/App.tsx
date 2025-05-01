
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from '@/hooks/use-auth';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/config/query-client';
import Index from '@/pages/Index';
import AuthPage from '@/pages/auth/AuthPage';
import Drivers from '@/pages/Drivers';
import Invoices from '@/pages/Invoices';
import InvoiceDetails from '@/pages/invoices/InvoiceDetails';
import Jobs from '@/pages/Jobs';
import Carriers from '@/pages/Carriers';
import CustomerPortal from '@/pages/CustomerPortal';
import Customers from '@/pages/Customers';
import Fleet from '@/pages/Fleet';
import Finance from '@/pages/Finance';
import CarrierSelfInvoices from '@/pages/finance/CarrierSelfInvoices';
import Users from '@/pages/Users';
import SettingsPage from '@/pages/settings/SettingsPage';
import Pipeline from '@/pages/Pipeline';
import PipelineReports from '@/pages/pipeline/PipelineReports';
import Analytics from '@/pages/Analytics';
import NotFound from '@/pages/NotFound';
import CarrierReports from '@/pages/carriers/CarrierReports';
import CarrierMessaging from '@/pages/carriers/CarrierMessaging';
import BroadcastMessaging from '@/pages/carriers/BroadcastMessaging';
import CarrierRegistration from '@/pages/carriers/CarrierRegistration';
import CarrierDetails from '@/pages/carriers/CarrierDetails';
import CarrierCompliance from '@/pages/carriers/CarrierCompliance';
import CarrierMatching from '@/pages/carriers/CarrierMatching';
import CarrierPortal from '@/pages/carriers/CarrierPortal';
import CarrierPayments from '@/pages/carriers/CarrierPayments';
import AnalyticsAdvanced from '@/pages/analytics/AnalyticsAdvanced';
import CustomersList from '@/pages/customers/CustomersList';
import CustomerDetails from '@/pages/customers/CustomerDetails';
import CustomerDocumentsPage from '@/pages/customers/CustomerDocumentsPage';
import CustomerPortalAccess from '@/pages/customers/CustomerPortalAccess';

// Define all routes at the top level
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
    path: "/drivers/*",  // Use wildcard to allow for nested routes
    element: <Drivers />,
  },
  {
    path: "/invoices",
    element: <Invoices />,
  },
  {
    path: "/invoices/:id",
    element: <InvoiceDetails />,
  },
  {
    path: "/jobs/*",  // Use wildcard to allow for nested routes
    element: <Jobs />,
  },
  {
    path: "/carriers/*",  // Use wildcard to allow for nested routes
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
    path: "/carriers/messaging",
    element: <CarrierMessaging />,
  },
  {
    path: "/carriers/register",
    element: <CarrierRegistration />,
  },
  {
    path: "/carriers/details/:id",
    element: <CarrierDetails />,
  },
  {
    path: "/carriers/compliance",
    element: <CarrierCompliance />,
  },
  {
    path: "/carriers/matching",
    element: <CarrierMatching />,
  },
  {
    path: "/carriers/broadcast",
    element: <BroadcastMessaging />,
  },
  {
    path: "/carriers/portal",
    element: <CarrierPortal />,
  },
  {
    path: "/carriers/payments",
    element: <CarrierPayments />,
  },
  {
    path: "/customers",
    element: <Customers />,
    children: [
      {
        path: "", // Root path for customers
        element: <CustomersList />
      },
      {
        path: ":id", // Customer details page
        element: <CustomerDetails />
      },
      {
        path: ":id/documents", // Customer documents page
        element: <CustomerDocumentsPage />
      },
      {
        path: ":id/portal", // Customer portal access page
        element: <CustomerPortalAccess />
      }
    ]
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
    path: "/finance/carrier-self-invoices",
    element: <CarrierSelfInvoices />,
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
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
