
import { Job, JobStatus } from "../types/jobTypes";

// Jobs with issues
export const issueJobs: Job[] = [
  {
    id: 1004,
    title: "Medical Supplies",
    client: "MediHealth Inc",
    status: "issues" as JobStatus,
    priority: "high",
    date: "2025-04-09T08:15:00",
    time: "8:15 AM",
    origin: "Austin, TX",
    destination: "Houston, TX",
    vehicle: "Truck #110",
    notes: "Critical medical supplies, handle with care",
    createdAt: "2025-04-08T14:30:00",
    hauler: {
      id: 7,
      name: "David L.",
      contactPhone: "512-555-9876"
    },
    issueDetails: "Delay due to road closure",
    reference: "MH-1004",
    value: 1050,
    estimatedDuration: 6
  }
];
