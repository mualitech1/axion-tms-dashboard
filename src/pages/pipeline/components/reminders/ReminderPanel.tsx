
import React, { useState } from 'react';
import { formatDistanceToNow, format, isPast, isToday, addMinutes } from 'date-fns';
import { Clock, Calendar, CheckCircle, X, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useReminders, Reminder } from '../../context/ReminderContext';
import { toast } from '@/hooks/use-toast';

export default function ReminderPanel() {
  // Safely handle the case when the component is rendered outside of ReminderProvider
  let reminderContext;
  try {
    reminderContext = useReminders();
  } catch (error) {
    // If useReminders throws an error, we're not within a ReminderProvider
    return (
      <Button variant="ghost" size="icon" className="relative">
        <Bell className="h-5 w-5" />
      </Button>
    );
  }
  
  const { activeReminders, markAsCompleted, deleteReminder } = reminderContext;
  const [open, setOpen] = useState(false);
  
  const completeReminder = (reminder: Reminder) => {
    markAsCompleted(reminder.id);
    toast({
      title: "Reminder Completed",
      description: `"${reminder.title}" has been marked as completed.`
    });
  };
  
  const removeReminder = (reminder: Reminder) => {
    deleteReminder(reminder.id);
    toast({
      title: "Reminder Deleted",
      description: `"${reminder.title}" has been removed.`
    });
  };
  
  // Sort reminders by date (closest first)
  const sortedReminders = [...activeReminders].sort(
    (a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
  );
  
  // Get reminders that are today or overdue
  const urgentReminders = sortedReminders.filter(
    reminder => isPast(new Date(reminder.dateTime)) || isToday(new Date(reminder.dateTime))
  );
  
  const getReminderStatus = (reminder: Reminder) => {
    const reminderTime = new Date(reminder.dateTime);
    const notificationTime = addMinutes(reminderTime, -reminder.notifyMinutesBefore);
    
    if (isPast(reminderTime)) {
      return {
        label: "Overdue",
        variant: "destructive" as const,
      };
    } else if (isPast(notificationTime)) {
      return {
        label: "Due Soon",
        variant: "secondary" as const,
      };
    } else if (isToday(reminderTime)) {
      return {
        label: "Today",
        variant: "default" as const,
      };
    } else {
      return {
        label: "Upcoming",
        variant: "outline" as const,
      };
    }
  };
  
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {urgentReminders.length > 0 && (
            <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
              {urgentReminders.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Upcoming Reminders</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4 max-h-[calc(100vh-100px)] overflow-y-auto">
          {sortedReminders.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <p className="mt-2 text-sm text-muted-foreground">No upcoming reminders</p>
            </div>
          ) : (
            sortedReminders.map(reminder => {
              const status = getReminderStatus(reminder);
              return (
                <div 
                  key={reminder.id} 
                  className="bg-card border rounded-lg p-4 space-y-2 relative"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{reminder.title}</h4>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 -mt-1 -mr-1"
                      onClick={() => removeReminder(reminder)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {reminder.company && (
                    <p className="text-sm text-muted-foreground">
                      {reminder.company}
                    </p>
                  )}
                  
                  <div className="flex items-center text-sm space-x-4">
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5 mr-1" />
                      <span>{format(new Date(reminder.dateTime), 'MMM d, yyyy')}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{format(new Date(reminder.dateTime), 'h:mm a')}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 pt-2 border-t border-border">
                    <Badge variant={status.variant}>{status.label}</Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center"
                      onClick={() => completeReminder(reminder)}
                    >
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Complete
                    </Button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
