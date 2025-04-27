
import { Badge } from "@/components/ui/badge";

interface JobPriorityBadgeProps {
  priority: "low" | "medium" | "high";
}

export function JobPriorityBadge({ priority }: JobPriorityBadgeProps) {
  const getPriorityColor = () => {
    switch (priority) {
      case "high":
        return "bg-red-500/15 text-red-500 border-red-500/20";
      case "medium":
        return "bg-amber-500/15 text-amber-500 border-amber-500/20";
      case "low":
        return "bg-blue-500/15 text-blue-500 border-blue-500/20";
      default:
        return "bg-gray-500/15 text-gray-500 border-gray-500/20";
    }
  };

  const getPriorityIcon = () => {
    switch (priority) {
      case "high":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        );
      case "medium":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 9a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path fillRule="evenodd" d="M4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 1h6v8H7V6z" clipRule="evenodd" />
          </svg>
        );
      case "low":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <Badge
      variant="outline"
      className={`inline-flex items-center ${getPriorityColor()} shadow-sm`}
    >
      {getPriorityIcon()}
      <span className="capitalize">{priority}</span>
    </Badge>
  );
}
