import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  PackageOpen,
  Users,
  TruckIcon,
  BarChart3,
  FileText,
  Settings,
  Database,
  DollarSign,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ title, href, icon }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`flex items-center gap-3 rounded-md p-2 text-sm font-medium hover:bg-tms-blue-light transition-colors ${
          isActive ? "bg-tms-blue-light text-tms-blue" : "text-tms-gray-700"
        }`}
      >
        {icon}
        {title}
      </Link>
    </li>
  );
};

const mainNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "Customers",
    href: "/customers",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Shipments",
    href: "/shipments",
    icon: <TruckIcon className="h-5 w-5" />,
  },
  {
    title: "Products",
    href: "/products",
    icon: <PackageOpen className="h-5 w-5" />,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: <BarChart3 className="h-5 w-5" />,
  },
  {
    title: "Finance",
    href: "/finance",
    icon: <DollarSign className="h-5 w-5" />,
  },
  {
    title: "Invoices",
    href: "/invoices",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Integrations",
    href: "/integrations",
    icon: <Database className="h-5 w-5" />,
  },
];

export default function Sidebar() {
  return (
    <div className="hidden border-r bg-gray-50/50 h-screen w-60 flex-col py-3 md:flex">
      <Link href="/" className="px-4">
        <div className="flex items-center gap-2 px-2 py-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/images/tms-logo.png" alt="TMS Logo" />
            <AvatarFallback>TM</AvatarFallback>
          </Avatar>
          <span className="font-bold text-lg">TMS</span>
        </div>
      </Link>
      <Separator />
      <nav className="flex flex-1 flex-col justify-between space-y-1 px-2 py-3">
        <div>
          <ul className="space-y-1">
            {mainNavItems.map((item) => (
              <NavItem key={item.href} title={item.title} href={item.href} icon={item.icon} />
            ))}
          </ul>
        </div>
        <div>
          <Separator />
          <ul className="space-y-1">
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-3 rounded-md p-2 text-sm font-medium text-tms-gray-700 hover:bg-tms-blue-light transition-colors"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
