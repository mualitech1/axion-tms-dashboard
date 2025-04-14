
import { Job, JobStatus } from "../types/jobTypes";

// Jobs that are currently in progress
export const inProgressJobs: Job[] = [
  {
    id: 1002,
    title: "Retail Store Delivery",
    client: "RetailMax",
    status: "in-progress" as JobStatus,
    priority: "medium",
    date: "2025-04-09T14:30:00",
    time: "2:30 PM",
    origin: "Houston, TX",
    destination: "San Antonio, TX",
    vehicle: "Truck #108",
    notes: "Time-sensitive delivery",
    createdAt: "2025-04-09T07:30:00",
    hauler: {
      id: 5,
      name: "Alice M.",
      contactPhone: "713-555-6789"
    },
    reference: "RM-1002",
    value: 750,
    estimatedDuration: 4
  },
  {
    id: 1007,
    title: "Electronics Shipment",
    client: "TechWorld",
    status: "in-progress" as JobStatus,
    priority: "high",
    date: "2025-04-09T13:45:00",
    time: "1:45 PM",
    origin: "Dallas, TX",
    destination: "Houston, TX",
    vehicle: "Truck #112",
    notes: "High-value electronics, secured transport",
    createdAt: "2025-04-09T06:30:00",
    hauler: {
      id: 10,
      name: "James H.",
      contactPhone: "214-555-2468"
    },
    reference: "TW-1007",
    value: 1800,
    estimatedDuration: 5
  }
];
