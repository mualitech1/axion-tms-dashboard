
import { 
  Home, Users, Truck, UserCircle, Settings, 
  BarChart2, CreditCard, FileText,
  Kanban, LayoutDashboard, ListTodo,
  DollarSign, User, Car
} from 'lucide-react';

export const navigationItems = [
  {
    section: "Dashboard",
    items: [
      { title: "Overview", icon: Home, to: "/" },
      { title: "Analytics", icon: BarChart2, to: "/analytics" }
    ]
  },
  {
    section: "Management",
    items: [
      { title: "Jobs", icon: Truck, to: "/jobs" },
      { title: "Customers", icon: Users, to: "/customers" },
      { title: "Carriers", icon: Truck, to: "/carriers" },
      { title: "Drivers", icon: User, to: "/drivers" },
      { title: "Fleet", icon: Car, to: "/fleet" },
      { 
        title: "Sales Pipeline", 
        icon: Kanban, 
        to: "/pipeline/dashboard",
        subItems: [
          { title: "Dashboard", icon: LayoutDashboard, to: "/pipeline/dashboard" },
          { title: "Pipeline Board", icon: Kanban, to: "/pipeline/board" },
          { title: "Task Management", icon: ListTodo, to: "/pipeline/tasks" }
        ]
      },
      { title: "Invoices", icon: FileText, to: "/invoices" },
      { title: "Finance", icon: CreditCard, to: "/finance" }
    ]
  },
  {
    section: "System",
    items: [
      { title: "Users", icon: UserCircle, to: "/users" },
      { title: "Settings", icon: Settings, to: "/settings" }
    ]
  }
];
