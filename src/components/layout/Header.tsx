
import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import NotificationsPanel from '../../pages/pipeline/components/collaboration/NotificationsPanel';
import ReminderPanel from '../../pages/pipeline/components/reminders/ReminderPanel';

interface HeaderProps {
  title?: string;
}

export default function Header({ title }: HeaderProps) {
  const { signOut, user } = useAuth();

  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-6">
      {title && <h1 className="text-xl font-semibold">{title}</h1>}
      <div className="flex items-center gap-4">
        <ReminderPanel />
        <NotificationsPanel />
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <Button variant="ghost" size="icon" onClick={signOut}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
