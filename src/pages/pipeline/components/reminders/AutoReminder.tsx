
import React, { useEffect } from 'react';
import { useReminders } from '../../context/ReminderContext';
import { toast } from '@/hooks/use-toast';
import { addMinutes, isPast, isAfter } from 'date-fns';

export default function AutoReminder() {
  const { activeReminders } = useReminders();
  
  useEffect(() => {
    // Check for reminders that should be shown
    const checkReminders = () => {
      const now = new Date();
      
      activeReminders.forEach(reminder => {
        const reminderTime = new Date(reminder.dateTime);
        const notifyTime = addMinutes(reminderTime, -reminder.notifyMinutesBefore);
        
        // If the notification time has passed but the actual reminder time hasn't
        if (isPast(notifyTime) && isAfter(reminderTime, now)) {
          const minutesLeft = Math.round((reminderTime.getTime() - now.getTime()) / 60000);
          
          const reminderKey = `reminder-${reminder.id}-${reminder.dateTime}`;
          const hasShown = sessionStorage.getItem(reminderKey);
          
          // Only show each reminder notification once
          if (!hasShown) {
            toast({
              title: reminder.title,
              description: `Upcoming in ${minutesLeft} minutes${reminder.company ? ` with ${reminder.company}` : ''}`,
              duration: 10000, // Show for longer
            });
            
            // Mark as shown
            sessionStorage.setItem(reminderKey, 'true');
          }
        }
      });
    };
    
    // Check immediately and then set up interval
    checkReminders();
    const interval = setInterval(checkReminders, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [activeReminders]);
  
  // This component doesn't render anything
  return null;
}
