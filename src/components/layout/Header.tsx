
import React from 'react';
import NotificationsPanel from '../../pages/pipeline/components/collaboration/NotificationsPanel';
import ReminderPanel from '../../pages/pipeline/components/reminders/ReminderPanel';

export default function Header() {
  return (
    <div className="flex h-16 items-center justify-end gap-4 border-b bg-background px-6">
      <ReminderPanel />
      <NotificationsPanel />
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">admin@example.com</span>
        <div className="h-8 w-8 rounded-full bg-muted"></div>
      </div>
    </div>
  );
}
