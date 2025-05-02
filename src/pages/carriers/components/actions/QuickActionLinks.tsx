
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Scale, LineChart, MessageSquare } from 'lucide-react';

export default function QuickActionLinks() {
  return (
    <div className="flex flex-wrap gap-2 justify-center mt-6">
      <Link to="/carriers/compliance">
        <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-aximo-dark to-indigo-950/30 border-aximo-border text-aximo-text-secondary hover:text-white hover:bg-indigo-600/20 transition-all duration-300">
          <Scale className="h-4 w-4" />
          <span>Compliance Dashboard</span>
        </Button>
      </Link>
      <Link to="/carriers/reports">
        <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-aximo-dark to-indigo-950/30 border-aximo-border text-aximo-text-secondary hover:text-white hover:bg-indigo-600/20 transition-all duration-300">
          <LineChart className="h-4 w-4" />
          <span>Performance Reports</span>
        </Button>
      </Link>
      <Link to="/carriers/messaging">
        <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-aximo-dark to-indigo-950/30 border-aximo-border text-aximo-text-secondary hover:text-white hover:bg-indigo-600/20 transition-all duration-300">
          <MessageSquare className="h-4 w-4" />
          <span>Message Carriers</span>
        </Button>
      </Link>
    </div>
  );
}
