
import React, { useState } from 'react';
import { useReminders, Reminder } from '../../context/ReminderContext';
import { CalendarIcon, CheckIcon, TrashIcon } from 'lucide-react';
import { format } from 'date-fns';

export default function ReminderPanel() {
  const { reminders, markAsComplete, deleteReminder } = useReminders();
  
  // Format the date for display
  const formatReminderDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM dd, yyyy - h:mm a');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="bg-aximo-dark/50 p-5 rounded-lg border border-aximo-border shadow-lg">
      <h3 className="text-lg font-semibold text-aximo-text mb-4 flex items-center">
        <CalendarIcon className="h-5 w-5 mr-2 text-aximo-primary" />
        Upcoming Reminders
      </h3>
      
      <div className="space-y-3 mt-4">
        {reminders.length === 0 ? (
          <div className="text-center py-6 text-aximo-text-secondary">
            No upcoming reminders
          </div>
        ) : (
          reminders
            .filter(r => !r.completed)
            .map((reminder) => (
              <div 
                key={reminder.id}
                className="flex items-start justify-between bg-aximo-card/50 p-3 rounded-md border border-aximo-border"
              >
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-aximo-text">{reminder.title}</h4>
                  <div className="flex items-center mt-1">
                    <span className="text-xs text-aximo-text-secondary">
                      {formatReminderDate(reminder.date)}
                    </span>
                    <span className="mx-2 text-aximo-border">•</span>
                    <span className="text-xs px-2 py-0.5 bg-aximo-primary/20 text-aximo-primary rounded">
                      {reminder.type}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-1">
                  <button 
                    onClick={() => markAsComplete(reminder.id)}
                    className="p-1.5 hover:bg-green-500/20 rounded-full transition-colors"
                  >
                    <CheckIcon className="h-3.5 w-3.5 text-green-500" />
                  </button>
                  <button 
                    onClick={() => deleteReminder(reminder.id)}
                    className="p-1.5 hover:bg-red-500/20 rounded-full transition-colors"
                  >
                    <TrashIcon className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}
