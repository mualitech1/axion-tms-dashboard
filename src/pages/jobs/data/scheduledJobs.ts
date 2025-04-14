
import { Job, JobStatus } from "../types/jobTypes";

// Scheduled jobs for specific dates
export const scheduledJobs: Job[] = [
  {
    id: 1001,
    title: "Warehouse Delivery",
    client: "Acme Corp",
    status: "booked" as JobStatus,
    priority: "high",
    date: "2025-04-10T10:00:00",
    time: "10:00 AM",
    origin: "Austin, TX",
    destination: "Dallas, TX",
    vehicle: "Truck #105",
    notes: "Temperature-controlled delivery",
    createdAt: "2025-04-09T08:00:00",
    hauler: {
      id: 4,
      name: "John D.",
      contactPhone: "512-555-1234"
    },
    reference: "AC-1001",
    value: 950,
    estimatedDuration: 5
  },
  {
    id: 1005,
    title: "Food Distribution",
    client: "Fresh Foods Co",
    status: "booked" as JobStatus,
    priority: "medium",
    date: "2025-04-10T07:00:00",
    time: "7:00 AM",
    origin: "San Antonio, TX",
    destination: "Austin, TX",
    vehicle: "Truck #107",
    notes: "Refrigerated truck required",
    createdAt: "2025-04-09T09:45:00",
    hauler: {
      id: 8,
      name: "Sophia R.",
      contactPhone: "210-555-3456"
    },
    reference: "FF-1005",
    value: 650,
    estimatedDuration: 3
  },
  {
    id: 1006,
    title: "Office Furniture Delivery",
    client: "Modern Office Inc",
    status: "booked" as JobStatus,
    priority: "low",
    date: "2025-04-11T11:00:00",
    time: "11:00 AM",
    origin: "Fort Worth, TX",
    destination: "Dallas, TX",
    vehicle: "Truck #103",
    notes: "Fragile furniture, careful handling required",
    createdAt: "2025-04-09T10:15:00",
    hauler: {
      id: 9,
      name: "Robert J.",
      contactPhone: "817-555-7890"
    },
    reference: "MO-1006",
    value: 850,
    estimatedDuration: 2
  },
  {
    id: 1008,
    title: "Construction Materials",
    client: "BuildRight Construction",
    status: "booked" as JobStatus,
    priority: "medium",
    date: "2025-04-11T09:30:00",
    time: "9:30 AM",
    origin: "Houston, TX",
    destination: "Austin, TX",
    vehicle: "Truck #114",
    notes: "Heavy load, oversize transport permit obtained",
    createdAt: "2025-04-09T13:00:00",
    hauler: {
      id: 11,
      name: "William T.",
      contactPhone: "713-555-1357"
    },
    reference: "BRC-1008",
    value: 1350,
    estimatedDuration: 4
  }
];
