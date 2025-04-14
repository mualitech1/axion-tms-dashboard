
import { Job } from "../types/jobTypes";
import { todayJobs } from "./todayJobs";
import { scheduledJobs } from "./scheduledJobs";
import { inProgressJobs } from "./inProgressJobs";
import { completedJobs } from "./completedJobs";
import { issueJobs } from "./issueJobs";
import { getTimeFromDate } from "../utils/dateUtils";

// Export all mock jobs combined
export const mockJobs: Job[] = [
  ...todayJobs,
  ...scheduledJobs,
  ...inProgressJobs,
  ...completedJobs,
  ...issueJobs
];

// Re-export time formatting function for backward compatibility
export { getTimeFromDate } from "../utils/dateUtils";
