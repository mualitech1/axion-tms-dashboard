
// Import the Job type from jobTypes.ts
import { Job, JobStatus } from "../../types/jobTypes";

// Helper function to get today's date in ISO format for demo jobs
const getTodayISOString = () => {
  const today = new Date();
  today.setHours(9, 0, 0, 0); // Set to 9:00 AM
  return today.toISOString();
};

// Helper function to get today's date plus X hours in ISO format
const getTimeToday = (hours: number) => {
  const today = new Date();
  today.setHours(hours, 0, 0, 0);
  return today.toISOString();
};

// Convert the original mockJobs to match the JobStatus type from jobTypes.ts
export const mockJobs: Job[] = [
  // Today's jobs - these will always show on the current date
  {
    id: 2001,
    title: "Today's Urgent Delivery",
    client: "Global Logistics",
    status: "booked" as JobStatus,
    priority: "high",
    date: getTimeToday(10), // 10:00 AM today
    time: "10:00 AM", // Added time property
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
    time: "1:00 PM", // Added time property
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
    time: "3:00 PM", // Added time property
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
  },
  // Original mock data
  {
    id: 1001,
    title: "Warehouse Delivery",
    client: "Acme Corp",
    status: "booked" as JobStatus,
    priority: "high",
    date: "2025-04-10T10:00:00",
    time: "10:00 AM", // Added time property
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
    id: 1002,
    title: "Retail Store Delivery",
    client: "RetailMax",
    status: "in-progress" as JobStatus,
    priority: "medium",
    date: "2025-04-09T14:30:00",
    time: "2:30 PM", // Added time property
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
    id: 1003,
    title: "Factory Equipment Pickup",
    client: "Industrial Machines Inc",
    status: "completed" as JobStatus,
    priority: "low",
    date: "2025-04-09T09:00:00",
    time: "9:00 AM", // Added time property
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
  },
  {
    id: 1004,
    title: "Medical Supplies",
    client: "MediHealth Inc",
    status: "issues" as JobStatus,
    priority: "high",
    date: "2025-04-09T08:15:00",
    time: "8:15 AM", // Added time property
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
  },
  {
    id: 1005,
    title: "Food Distribution",
    client: "Fresh Foods Co",
    status: "booked" as JobStatus,
    priority: "medium",
    date: "2025-04-10T07:00:00",
    time: "7:00 AM", // Added time property
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
    time: "11:00 AM", // Added time property
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
    id: 1007,
    title: "Electronics Shipment",
    client: "TechWorld",
    status: "in-progress" as JobStatus,
    priority: "high",
    date: "2025-04-09T13:45:00",
    time: "1:45 PM", // Added time property
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
  },
  {
    id: 1008,
    title: "Construction Materials",
    client: "BuildRight Construction",
    status: "booked" as JobStatus,
    priority: "medium",
    date: "2025-04-11T09:30:00",
    time: "9:30 AM", // Added time property
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

// Helper function to format the time from the date property
export function getTimeFromDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
}
