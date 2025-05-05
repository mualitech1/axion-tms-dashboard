import { Home, Truck, Users, Forklift, Bus, User, Receipt, Wallet, BarChart3, Settings, List, Plus, Calendar, Box } from "lucide-react";
import { PipelineIcon } from "@/components/icons/pipeline-icon";

export type NavigationItem = {
  title: string;
  icon: React.ReactNode;
  href: string;
  disabled?: boolean;
  external?: boolean;
  description?: string;
  badge?: {
    content: string;
    variant: "default" | "destructive";
  };
  children?: NavigationItem[];
};

export const navigationConfig: NavigationItem[] = [
  {
    title: "Dashboard",
    icon: <Home />,
    href: "/",
  },
  {
    title: "Jobs",
    icon: <Truck />,
    href: "/jobs",
    children: [
      {
        title: "All Jobs",
        href: "/jobs",
        icon: <List />
      },
      {
        title: "Create Job",
        href: "/jobs/create",
        icon: <Plus />
      },
      {
        title: "Planning Calendar",
        href: "/jobs?view=calendar",
        icon: <Calendar />
      },
    ],
  },
  {
    title: "Customers",
    icon: <Users />,
    href: "/customers",
  },
  {
    title: "Carriers",
    icon: <Forklift />,
    href: "/carriers",
  },
  {
    title: "Fleet",
    icon: <Bus />,
    href: "/fleet",
  },
  {
    title: "Drivers",
    icon: <User />,
    href: "/drivers",
  },
  {
    title: "Invoices",
    icon: <Receipt />,
    href: "/invoices",
  },
  {
    title: "Finance",
    icon: <Wallet />,
    href: "/finance",
  },
  {
    title: "Supply Chain",
    icon: <Box />,
    href: "/supply-chain",
  },
  {
    title: "Pipeline",
    icon: <PipelineIcon />,
    href: "/pipeline/dashboard",
    badge: {
      content: "New",
      variant: "default",
    },
  },
  {
    title: "Analytics",
    icon: <BarChart3 />,
    href: "/analytics",
  },
  {
    title: "Settings",
    icon: <Settings />,
    href: "/settings",
  },
];

export const getSectionTitle = (pathName: string): string => {
  const route = navigationConfig.find((item) => item.href === pathName);
  return route?.title || "Dashboard";
};
