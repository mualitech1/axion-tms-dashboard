
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import Customers from "./pages/Customers";
import CustomerPortal from "./pages/CustomerPortal";
import Carriers from "./pages/Carriers";
import Pipeline from "./pages/Pipeline";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Analytics from "./pages/Analytics";
import Finance from "./pages/Finance";
import Invoices from "./pages/Invoices";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  console.log("App component rendered");
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/jobs/*" element={<Jobs />} />
            <Route path="/customers/*" element={<Customers />} />
            <Route path="/customer-portal/*" element={<CustomerPortal />} />
            <Route path="/carriers/*" element={<Carriers />} />
            <Route path="/pipeline/*" element={<Pipeline />} />
            <Route path="/users/*" element={<Users />} />
            <Route path="/analytics/*" element={<Analytics />} />
            <Route path="/finance/*" element={<Finance />} />
            <Route path="/invoices/*" element={<Invoices />} />
            <Route path="/settings/*" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
