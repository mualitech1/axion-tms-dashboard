
import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogOut, BellIcon, ClockIcon, Search, User as UserIcon, Settings, ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications] = useState(3); // Sample notification count
  
  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user?.email) return 'A';
    const parts = user.email.split('@')[0].split('.');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return user.email.charAt(0).toUpperCase();
  };

  return (
    <div className="flex h-16 items-center justify-between border-b border-aximo-border bg-aximo-darker px-4 md:px-6 sticky top-0 z-20 backdrop-blur-sm bg-opacity-90">
      {title && <h1 className="text-xl font-semibold text-aximo-text">{title}</h1>}
      <div className="flex-1 mx-8">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-aximo-card border border-aximo-border text-aximo-text rounded-full px-4 py-1.5 pl-10 focus:outline-none focus:ring-1 focus:ring-aximo-primary"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-aximo-text-secondary h-4 w-4" />
        </div>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              size="icon"
              className="text-aximo-text-secondary hover:bg-aximo-card hover:text-aximo-primary relative"
            >
              <BellIcon className="h-5 w-5" />
              {notifications > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                >
                  {notifications}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-auto">
              <div className="p-3 text-sm border-b border-aximo-border hover:bg-aximo-card/60 cursor-pointer">
                <div className="font-medium">New carrier registration</div>
                <div className="text-aximo-text-secondary text-xs mt-1">FastFreight Inc. submitted registration documents</div>
                <div className="text-aximo-text-secondary text-xs mt-1">2 hours ago</div>
              </div>
              <div className="p-3 text-sm border-b border-aximo-border hover:bg-aximo-card/60 cursor-pointer">
                <div className="font-medium">Compliance alert</div>
                <div className="text-aximo-text-secondary text-xs mt-1">3 carriers have insurance expiring in the next 7 days</div>
                <div className="text-aximo-text-secondary text-xs mt-1">Yesterday</div>
              </div>
              <div className="p-3 text-sm hover:bg-aximo-card/60 cursor-pointer">
                <div className="font-medium">System update</div>
                <div className="text-aximo-text-secondary text-xs mt-1">New carrier matching algorithm deployed</div>
                <div className="text-aximo-text-secondary text-xs mt-1">2 days ago</div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer justify-center text-center text-aximo-primary">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button 
          variant="ghost" 
          size="icon"
          className="text-aximo-text-secondary hover:bg-aximo-card hover:text-aximo-primary"
        >
          <ClockIcon className="h-5 w-5" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="flex items-center gap-2 hover:bg-aximo-card hover:text-aximo-text px-2"
            >
              <Avatar className="h-8 w-8 border border-aximo-border">
                <AvatarFallback className="bg-aximo-primary/20 text-aximo-primary">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start text-left hidden md:block">
                <span className="text-sm font-medium text-aximo-text">{user?.email?.split('@')[0] || 'Admin'}</span>
                <span className="text-xs text-aximo-text-secondary truncate max-w-[120px]">{user?.email || 'admin@aximo.ai'}</span>
              </div>
              <ChevronDown className="h-4 w-4 text-aximo-text-secondary" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings/profile')} className="cursor-pointer">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="cursor-pointer text-red-500 hover:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
