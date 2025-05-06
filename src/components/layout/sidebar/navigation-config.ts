
import React from 'react';
import { Home, Truck, Users, Forklift, Bus, User, Receipt, Wallet, BarChart3, Settings, List, Plus, Calendar, Box, ShieldCheck, FileCheck } from "lucide-react";
import { PipelineIcon } from "@/components/icons/pipeline-icon";

export type NavigationItem = {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
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
    icon: Home,
    href: "/",
  },
  {
    title: "Jobs",
    icon: Truck,
    href: "/jobs",
    children: [
      {
        title: "All Jobs",
        href: "/jobs",
        icon: List
      },
      {
        title: "Create Job",
        href: "/jobs/create",
        icon: Plus
      },
      {
        title: "Planning Calendar",
        href: "/jobs?view=calendar",
        icon: Calendar
      },
    ],
  },
  {
    title: "Customers",
    icon: Users,
    href: "/customers",
  },
  {
    title: "Carriers",
    icon: Forklift,
    href: "/carriers",
    children: [
      {
        title: "All Carriers",
        href: "/carriers",
        icon: List
      },
      {
        title: "Compliance",
        href: "/carriers/compliance",
        icon: ShieldCheck
      },
      {
        title: "Registration",
        href: "/carriers/registration",
        icon: FileCheck
      },
      {
        title: "Messaging",
        href: "/carriers/messaging",
        icon: Receipt
      }
    ],
  },
  {
    title: "Fleet",
    icon: Bus,
    href: "/fleet",
  },
  {
    title: "Drivers",
    icon: User,
    href: "/drivers",
  },
  {
    title: "Invoices",
    icon: Receipt,
    href: "/invoices",
  },
  {
    title: "Finance",
    icon: Wallet,
    href: "/finance",
  },
  {
    title: "Supply Chain",
    icon: Box,
    href: "/supply-chain",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    href: "/analytics",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/settings",
  },
];

export const getSectionTitle = (pathName: string): string => {
  // First check for exact match
  const exactRoute = navigationConfig.find((item) => item.href === pathName);
  if (exactRoute) return exactRoute.title;
  
  // Check for parent routes
  for (const item of navigationConfig) {
    if (pathName.startsWith(item.href + '/') && item.href !== '/') {
      return item.title;
    }
    
    // Check children if available
    if (item.children) {
      const childRoute = item.children.find(child => 
        child.href === pathName || pathName.startsWith(child.href + '/')
      );
      if (childRoute) return `${item.title} - ${childRoute.title}`;
    }
  }
  
  return "Dashboard";
};
