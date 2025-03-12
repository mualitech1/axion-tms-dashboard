
export interface Job {
  id: number;
  title: string;
  client: string;
  status: "scheduled" | "in-progress" | "pending";
  time: string;
  priority: "high" | "medium" | "low";
}

export const mockJobs: Job[] = [
  { id: 1, title: "Delivery to Downtown Storage", client: "Storage Co.", status: "scheduled", time: "09:00 AM", priority: "medium" },
  { id: 2, title: "Warehouse Pickup", client: "Tech Industries", status: "in-progress", time: "10:30 AM", priority: "high" },
  { id: 3, title: "Cross-city Transport", client: "Logistics Ltd", status: "pending", time: "02:00 PM", priority: "low" },
  { id: 4, title: "Equipment Delivery", client: "Construction Inc", status: "scheduled", time: "11:15 AM", priority: "medium" },
  { id: 5, title: "Office Supplies Delivery", client: "Corporate Services", status: "scheduled", time: "03:30 PM", priority: "medium" },
];
