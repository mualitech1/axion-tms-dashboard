
import React, { createContext, useContext, useState } from 'react';

interface Reminder {
  id: string;
  title: string;
  date: string;
  type: string;
  completed: boolean;
}

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id'>) => void;
  updateReminder: (id: string, updates: Partial<Reminder>) => void;
  deleteReminder: (id: string) => void;
  markAsComplete: (id: string) => void;
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export function ReminderProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 'reminder-1',
      title: 'Follow up with ABC Logistics',
      date: '2025-05-02T14:00:00',
      type: 'Follow-up',
      completed: false
    },
    {
      id: 'reminder-2',
      title: 'Review Global Freight proposal',
      date: '2025-05-03T11:00:00',
      type: 'Document',
      completed: false
    },
    {
      id: 'reminder-3',
      title: 'Call FastTrack CEO',
      date: '2025-05-03T10:30:00',
      type: 'Call',
      completed: false
    }
  ]);

  const addReminder = (reminder: Omit<Reminder, 'id'>) => {
    const newReminder = {
      ...reminder,
      id: `reminder-${Date.now()}`
    };
    setReminders([...reminders, newReminder]);
  };

  const updateReminder = (id: string, updates: Partial<Reminder>) => {
    setReminders(
      reminders.map(reminder =>
        reminder.id === id ? { ...reminder, ...updates } : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(reminder => reminder.id !== id));
  };

  const markAsComplete = (id: string) => {
    updateReminder(id, { completed: true });
  };

  return (
    <ReminderContext.Provider
      value={{
        reminders,
        addReminder,
        updateReminder,
        deleteReminder,
        markAsComplete
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}

export function useReminders() {
  const context = useContext(ReminderContext);
  if (context === undefined) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
}
