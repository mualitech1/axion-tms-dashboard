
import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogOut, BellIcon, ClockIcon, Search } from 'lucide-react';
import NotificationsPanel from '../../pages/pipeline/components/collaboration/NotificationsPanel';
import ReminderPanel from '../../pages/pipeline/components/reminders/ReminderPanel';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  // Use optional chaining to safely access auth methods
  const { signOut, user } = useAuth();

  return (
    <div className="flex h-16 items-center justify-between border-b border-aximo-border bg-aximo-darker px-4 md:px-6">
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
        <Button 
          variant="ghost" 
          size="icon"
          className="text-aximo-text-secondary hover:bg-aximo-card hover:text-aximo-primary"
        >
          <BellIcon className="h-5 w-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-aximo-text-secondary hover:bg-aximo-card hover:text-aximo-primary"
        >
          <ClockIcon className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:block">
            <span className="text-sm text-aximo-text-secondary">{user?.email || 'admin@aximo.ai'}</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-aximo-primary/20 flex items-center justify-center text-aximo-primary font-medium">
            {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="text-aximo-text-secondary hover:bg-aximo-card hover:text-aximo-primary"
            onClick={signOut}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
