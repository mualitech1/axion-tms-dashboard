
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-tms-gray-100 p-6">
      <div className="text-center max-w-md">
        <h1 className="text-8xl font-bold text-tms-blue mb-4">404</h1>
        <p className="text-2xl font-semibold text-tms-gray-800 mb-6">Page Not Found</p>
        <p className="text-tms-gray-600 mb-8">
          We can't seem to find the page you're looking for. Please check the URL or navigate back to the dashboard.
        </p>
        <Button className="bg-tms-blue hover:bg-tms-blue/90" asChild>
          <a href="/">
            <Home className="mr-2 h-4 w-4" />
            Return to Dashboard
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
