
import { AlertTriangle } from "lucide-react";

export function IssuesAlert() {
  return (
    <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <p className="text-sm font-medium text-red-800">
          This job has issues that need attention
        </p>
      </div>
      <p className="mt-1 text-xs text-red-700">
        Please review and resolve the issues to continue with the job.
      </p>
    </div>
  );
}
