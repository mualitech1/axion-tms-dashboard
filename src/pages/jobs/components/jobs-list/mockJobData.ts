// Mock data for the Jobs List
export interface Job {
  id: number;
  title: string;
  client: string;
  status: string;
  priority: string;
  date: string;
  origin: string;
  destination: string;
  assignedTo: string;
  notes: string;
  contact: string;
  contactPhone: string;
  time?: string; // Optional property that can be derived from date
}

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

export const mockJobs: Job[] = [
  // Today's jobs - these will always show on the current date
  {
    id: 2001,
    title: "Today's Urgent Delivery",
    client: "Global Logistics",
    status: "Scheduled",
    priority: "High",
    date: getTimeToday(10), // 10:00 AM today
    origin: "London, UK",
    destination: "Manchester, UK",
    assignedTo: "Truck #201 / Emma W.",
    notes: "Time-sensitive documents",
    contact: "Robert Smith",
    contactPhone: "020-555-1234"
  },
  {
    id: 2002,
    title: "Office Equipment Transfer",
    client: "TechStart Co",
    status: "In Transit",
    priority: "Medium",
    date: getTimeToday(13), // 1:00 PM today
    origin: "Bristol, UK",
    destination: "Bath, UK",
    assignedTo: "Truck #205 / Jack T.",
    notes: "Fragile electronics, handle with care",
    contact: "Lisa Jones",
    contactPhone: "0117-555-6789"
  },
  {
    id: 2003,
    title: "Retail Store Delivery",
    client: "Fashion Express",
    status: "Scheduled",
    priority: "Low",
    date: getTimeToday(15), // 3:00 PM today
    origin: "Birmingham, UK",
    destination: "Liverpool, UK",
    assignedTo: "Truck #210 / Sarah M.",
    notes: "Seasonal inventory update",
    contact: "Daniel White",
    contactPhone: "0121-555-3344"
  },
  // Original mock data
  {
    id: 1001,
    title: "Warehouse Delivery",
    client: "Acme Corp",
    status: "Scheduled",
    priority: "High",
    date: "2025-04-10T10:00:00",
    origin: "Austin, TX",
    destination: "Dallas, TX",
    assignedTo: "Truck #105 / John D.",
    notes: "Temperature-controlled delivery",
    contact: "Jane Smith",
    contactPhone: "512-555-1234"
  },
  {
    id: 1002,
    title: "Retail Store Delivery",
    client: "RetailMax",
    status: "In Transit",
    priority: "Medium",
    date: "2025-04-09T14:30:00",
    origin: "Houston, TX",
    destination: "San Antonio, TX",
    assignedTo: "Truck #108 / Alice M.",
    notes: "Time-sensitive delivery",
    contact: "Bob Johnson",
    contactPhone: "713-555-6789"
  },
  {
    id: 1003,
    title: "Factory Equipment Pickup",
    client: "Industrial Machines Inc",
    status: "Completed",
    priority: "Low",
    date: "2025-04-09T09:00:00",
    origin: "Dallas, TX",
    destination: "Fort Worth, TX",
    assignedTo: "Truck #102 / Michael B.",
    notes: "Heavy equipment, special handling required",
    contact: "Sarah Williams",
    contactPhone: "214-555-4321"
  },
  {
    id: 1004,
    title: "Medical Supplies",
    client: "MediHealth Inc",
    status: "Delayed",
    priority: "High",
    date: "2025-04-09T08:15:00",
    origin: "Austin, TX",
    destination: "Houston, TX",
    assignedTo: "Truck #110 / David L.",
    notes: "Critical medical supplies, handle with care",
    contact: "Emma Davis",
    contactPhone: "512-555-9876"
  },
  {
    id: 1005,
    title: "Food Distribution",
    client: "Fresh Foods Co",
    status: "Scheduled",
    priority: "Medium",
    date: "2025-04-10T07:00:00",
    origin: "San Antonio, TX",
    destination: "Austin, TX",
    assignedTo: "Truck #107 / Sophia R.",
    notes: "Refrigerated truck required",
    contact: "Mark Brown",
    contactPhone: "210-555-3456"
  },
  {
    id: 1006,
    title: "Office Furniture Delivery",
    client: "Modern Office Inc",
    status: "Scheduled",
    priority: "Low",
    date: "2025-04-11T11:00:00",
    origin: "Fort Worth, TX",
    destination: "Dallas, TX",
    assignedTo: "Truck #103 / Robert J.",
    notes: "Fragile furniture, careful handling required",
    contact: "Linda Wilson",
    contactPhone: "817-555-7890"
  },
  {
    id: 1007,
    title: "Electronics Shipment",
    client: "TechWorld",
    status: "In Transit",
    priority: "High",
    date: "2025-04-09T13:45:00",
    origin: "Dallas, TX",
    destination: "Houston, TX",
    assignedTo: "Truck #112 / James H.",
    notes: "High-value electronics, secured transport",
    contact: "Thomas Miller",
    contactPhone: "214-555-2468"
  },
  {
    id: 1008,
    title: "Construction Materials",
    client: "BuildRight Construction",
    status: "Scheduled",
    priority: "Medium",
    date: "2025-04-11T09:30:00",
    origin: "Houston, TX",
    destination: "Austin, TX",
    assignedTo: "Truck #114 / William T.",
    notes: "Heavy load, oversize transport permit obtained",
    contact: "Amanda Garcia",
    contactPhone: "713-555-1357"
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
