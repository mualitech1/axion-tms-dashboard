
import { Job, JobStatus } from "../types/jobTypes";

// Jobs that are completed or have issues
export const completedJobs: Job[] = [
  {
    id: 1003,
    title: "Factory Equipment Pickup",
    client: "Industrial Machines Inc",
    status: "completed" as JobStatus,
    priority: "low",
    date: "2025-04-09T09:00:00",
    time: "9:00 AM",
    origin: "Dallas, TX",
    destination: "Fort Worth, TX",
    vehicle: "Truck #102",
    notes: "Heavy equipment, special handling required",
    createdAt: "2025-04-08T16:00:00",
    hauler: {
      id: 6,
      name: "Michael B.",
      contactPhone: "214-555-4321"
    },
    reference: "IMI-1003",
    value: 1200,
    estimatedDuration: 3,
    podUploaded: true
  }
];
