
import React from 'react';
import NotificationsPanel from '../../pages/pipeline/components/collaboration/NotificationsPanel';
import ReminderPanel from '../../pages/pipeline/components/reminders/ReminderPanel';

interface HeaderProps {
  title?: string;  // Make title optional
}

export default function Header({ title }: HeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-background px-6">
      {title && <h1 className="text-xl font-semibold">{title}</h1>}
      <div className="flex items-center gap-4">
        <ReminderPanel />
        <NotificationsPanel />
        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground">admin@example.com</span>
          <div className="h-8 w-8 rounded-full bg-muted"></div>
        </div>
      </div>
    </div>
  );
}
