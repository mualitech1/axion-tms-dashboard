import * as React from "react"
import { 
  Home, Package, FileText, Truck, Users as UsersIcon, Car, CreditCard, 
  User, BarChart2, TrendingUp, Settings, Info, Bell, HelpCircle, Loader2, Scale
} from "lucide-react"

export type IconProps = React.HTMLAttributes<SVGElement> & {
  size?: number
  strokeWidth?: number
}

export const Icons = {
  // Navigation icons
  home: Home,
  package: Package,
  "file-text": FileText,
  truck: Truck,
  users: UsersIcon,
  car: Car,
  "credit-card": CreditCard,
  user: User,
  "bar-chart-2": BarChart2,
  "trending-up": TrendingUp,
  settings: Settings,
  shipping: Truck, // Using Truck as a substitute for Shipping since it's not exported from lucide-react
  scale: Scale, // Added Scale icon
  
  // Utility icons
  info: Info,
  bell: Bell,
  help: HelpCircle,
  spinner: Loader2,
}
