
import { Job, JobStatus } from "../types/jobTypes";
import { getTimeToday } from "../utils/dateUtils";

// Today's jobs - these will always show on the current date
export const todayJobs: Job[] = [
  {
    id: 2001,
    title: "Today's Urgent Delivery",
    client: "Global Logistics",
    status: "booked" as JobStatus,
    priority: "high",
    date: getTimeToday(10), // 10:00 AM today
    time: "10:00 AM",
    origin: "London, UK",
    destination: "Manchester, UK",
    vehicle: "Truck #201",
    notes: "Time-sensitive documents",
    createdAt: getTimeToday(8),
    hauler: {
      id: 1,
      name: "Emma W.",
    },
    reference: "GL-2001",
    value: 850,
    estimatedDuration: 4
  },
  {
    id: 2002,
    title: "Office Equipment Transfer",
    client: "TechStart Co",
    status: "in-progress" as JobStatus,
    priority: "medium",
    date: getTimeToday(13), // 1:00 PM today
    time: "1:00 PM",
    origin: "Bristol, UK",
    destination: "Bath, UK",
    vehicle: "Truck #205",
    notes: "Fragile electronics, handle with care",
    createdAt: getTimeToday(9),
    hauler: {
      id: 2,
      name: "Jack T.",
      contactPhone: "0117-555-6789"
    },
    reference: "TS-2002",
    value: 450,
    estimatedDuration: 2
  },
  {
    id: 2003,
    title: "Retail Store Delivery",
    client: "Fashion Express",
    status: "booked" as JobStatus,
    priority: "low",
    date: getTimeToday(15), // 3:00 PM today
    time: "3:00 PM",
    origin: "Birmingham, UK",
    destination: "Liverpool, UK",
    vehicle: "Truck #210",
    notes: "Seasonal inventory update",
    createdAt: getTimeToday(10),
    hauler: {
      id: 3,
      name: "Sarah M.",
      contactPhone: "0121-555-3344"
    },
    reference: "FE-2003",
    value: 650,
    estimatedDuration: 3
  }
];
