
export interface Job {
  id: number;
  title: string;
  client: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  priority: "low" | "medium" | "high";
  time?: string;
  date: string;  // ISO date string format
  assignedTo?: string;
  location?: string;
}

export const mockJobs: Job[] = [
  {
    id: 1,
    title: "Container Delivery to Port",
    client: "Global Logistics Inc.",
    status: "scheduled",
    priority: "high",
    time: "09:00 AM",
    date: "2025-04-08T09:00:00",
    assignedTo: "John Smith",
    location: "Port of Seattle"
  },
  {
    id: 2,
    title: "Warehouse Pickup",
    client: "Amazon Distribution",
    status: "in-progress",
    priority: "medium",
    time: "02:30 PM",
    date: "2025-04-06T14:30:00",
    assignedTo: "Maria Rodriguez",
    location: "South Distribution Center"
  },
  {
    id: 3,
    title: "Cross-dock Operation",
    client: "Swift Transfer LLC",
    status: "completed",
    priority: "medium",
    time: "11:00 AM",
    date: "2025-04-05T11:00:00",
    assignedTo: "David Chen",
    location: "Central Facility"
  },
  {
    id: 4,
    title: "Refrigerated Goods Transport",
    client: "Fresh Foods Co.",
    status: "scheduled",
    priority: "high",
    time: "06:00 AM",
    date: "2025-04-09T06:00:00",
    assignedTo: "Alex Johnson",
    location: "Cold Storage Facility"
  },
  {
    id: 5,
    title: "Return Empty Containers",
    client: "Oceanic Shipping",
    status: "cancelled",
    priority: "low",
    time: "03:00 PM",
    date: "2025-04-05T15:00:00",
    assignedTo: "Sam Wilson",
    location: "Container Yard"
  },
  {
    id: 6,
    title: "Hazardous Materials Transport",
    client: "ChemCorp Industries",
    status: "scheduled",
    priority: "high",
    time: "10:30 AM",
    date: "2025-04-10T10:30:00",
    assignedTo: "Jessica Lee",
    location: "Chemical Processing Plant"
  },
  {
    id: 7,
    title: "Equipment Relocation",
    client: "Construction Partners",
    status: "in-progress",
    priority: "medium",
    time: "08:00 AM",
    date: "2025-04-07T08:00:00",
    assignedTo: "Michael Brown",
    location: "Downtown Construction Site"
  },
  {
    id: 8,
    title: "Long-haul Freight Delivery",
    client: "National Distributors",
    status: "scheduled",
    priority: "medium",
    time: "05:00 AM",
    date: "2025-04-11T05:00:00",
    assignedTo: "Robert Taylor",
    location: "Interstate 5"
  }
];
