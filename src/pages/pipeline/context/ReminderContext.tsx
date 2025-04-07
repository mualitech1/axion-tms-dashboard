
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Reminder {
  id: string;
  title: string;
  leadId?: string;
  company?: string;
  dateTime: string;
  notifyMinutesBefore: number;
  completed: boolean;
  createdAt: string;
}

interface ReminderContextType {
  reminders: Reminder[];
  addReminder: (reminder: Omit<Reminder, 'id' | 'createdAt' | 'completed'>) => void;
  markAsCompleted: (reminderId: string) => void;
  deleteReminder: (reminderId: string) => void;
  activeReminders: Reminder[];
}

const ReminderContext = createContext<ReminderContextType | undefined>(undefined);

export function useReminders() {
  const context = useContext(ReminderContext);
  if (!context) {
    throw new Error('useReminders must be used within a ReminderProvider');
  }
  return context;
}

// In a real app, this would come from an API or database
const initialReminders: Reminder[] = [
  {
    id: 'reminder-1',
    title: 'Follow up with Acme Logistics proposal',
    leadId: 'lead-1',
    company: 'Acme Logistics',
    dateTime: '2025-04-10T14:00:00',
    notifyMinutesBefore: 30,
    completed: false,
    createdAt: '2025-04-07T09:00:00'
  },
  {
    id: 'reminder-2',
    title: 'Call Tech Innovations about pricing',
    leadId: 'lead-3',
    company: 'Tech Innovations',
    dateTime: '2025-04-09T11:00:00',
    notifyMinutesBefore: 15,
    completed: false,
    createdAt: '2025-04-06T16:00:00'
  },
  {
    id: 'reminder-3',
    title: 'Send rate card to Global Freight',
    leadId: 'lead-5',
    company: 'Global Freight',
    dateTime: '2025-04-08T09:30:00',
    notifyMinutesBefore: 60,
    completed: true,
    createdAt: '2025-04-05T10:30:00'
  }
];

export function ReminderProvider({ children }: { children: React.ReactNode }) {
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);

  // Get active (non-completed) reminders
  const activeReminders = reminders.filter(reminder => !reminder.completed);

  // Add a new reminder
  const addReminder = (newReminder: Omit<Reminder, 'id' | 'createdAt' | 'completed'>) => {
    const reminder: Reminder = {
      ...newReminder,
      id: `reminder-${Date.now()}`,
      createdAt: new Date().toISOString(),
      completed: false
    };
    
    setReminders(prev => [reminder, ...prev]);
  };

  // Mark a reminder as completed
  const markAsCompleted = (reminderId: string) => {
    setReminders(prev => 
      prev.map(reminder => 
        reminder.id === reminderId 
          ? { ...reminder, completed: true }
          : reminder
      )
    );
  };
  
  // Delete a reminder
  const deleteReminder = (reminderId: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== reminderId));
  };

  return (
    <ReminderContext.Provider 
      value={{ 
        reminders, 
        addReminder, 
        markAsCompleted, 
        deleteReminder,
        activeReminders
      }}
    >
      {children}
    </ReminderContext.Provider>
  );
}
