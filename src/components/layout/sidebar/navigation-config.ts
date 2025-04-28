
import { Icons } from "@/components/ui/icons"

export type SidebarNavItem = {
  title: string
  disabled?: boolean
  external?: boolean
  icon?: keyof typeof Icons
} & (
  | {
      href: string
      items?: never
    }
  | {
      href?: string
      items: SidebarNavItem[]
    }
)

export const sidebarItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: "home",
  },
  {
    title: "Jobs",
    href: "/jobs",
    icon: "package",
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: "file-text",
  },
  {
    title: "Drivers",
    href: "/drivers",
    icon: "truck",
  },
  {
    title: "Carriers",
    href: "/carriers",
    icon: "shipping",
  },
  {
    title: "Customers",
    href: "/customers",
    icon: "users",
  },
  {
    title: "Fleet",
    href: "/fleet",
    icon: "car",
  },
  {
    title: "Finance",
    href: "/finance",
    icon: "credit-card",
  },
  {
    title: "Users",
    href: "/users",
    icon: "user",
  },
  {
    title: "Analytics",
    icon: "bar-chart-2",
    items: [
      {
        title: "Overview",
        href: "/analytics",
      },
      {
        title: "Advanced Analytics",
        href: "/analytics/advanced",
      },
      {
        title: "Pipeline Reports",
        href: "/pipeline/reports",
      },
      {
        title: "Carrier Reports",
        href: "/carriers/reports",
      },
    ],
  },
  {
    title: "Pipeline",
    href: "/pipeline",
    icon: "trending-up",
  },
  {
    title: "Settings",
    href: "/settings",
    icon: "settings",
  },
] as const;

// Export navigationItems alias for backward compatibility
export const navigationItems = sidebarItems;
