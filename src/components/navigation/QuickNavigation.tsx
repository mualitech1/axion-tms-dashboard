
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function QuickNavigation() {
  return (
    <div className="p-2 bg-blue-50 border border-blue-200 rounded-md mb-4">
      <h3 className="font-medium text-sm mb-2">Quick Navigation (Testing)</h3>
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to="/jobs">Jobs Dashboard</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/jobs/1">Sample Job Detail</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/customer-portal/dashboard">Customer Dashboard</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to="/customer-portal/profile">Customer Profile</Link>
        </Button>
      </div>
    </div>
  );
}
