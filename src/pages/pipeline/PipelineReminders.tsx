
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useReminders, Reminder } from './context/ReminderContext';
import ReminderDialog from './components/collaboration/ReminderDialog';
import { format, isPast } from 'date-fns';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

export default function PipelineReminders() {
  const { reminders, markAsCompleted, deleteReminder } = useReminders();
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  
  const handleComplete = (reminder: Reminder) => {
    markAsCompleted(reminder.id);
  };
  
  const handleDelete = (reminder: Reminder) => {
    deleteReminder(reminder.id);
  };
  
  const getReminderStatusBadge = (reminder: Reminder) => {
    const reminderDate = new Date(reminder.dateTime);
    
    if (reminder.completed) {
      return <Badge variant="outline">Completed</Badge>;
    } else if (isPast(reminderDate)) {
      return <Badge variant="destructive">Overdue</Badge>;
    } else {
      return <Badge>Upcoming</Badge>;
    }
  };
  
  return (
    <MainLayout title="Pipeline Reminders">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Reminders</h1>
            <p className="text-muted-foreground">
              Manage all your upcoming reminders and notifications
            </p>
          </div>
          <Button onClick={() => setShowReminderDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Reminder
          </Button>
        </div>
      </div>
      
      <div className="bg-background border rounded-lg shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Reminder</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reminders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <p className="text-muted-foreground">No reminders found</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setShowReminderDialog(true)}
                  >
                    Create Your First Reminder
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              reminders
                .sort((a, b) => {
                  if (a.completed === b.completed) {
                    return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
                  }
                  return a.completed ? 1 : -1;
                })
                .map(reminder => (
                  <TableRow 
                    key={reminder.id}
                    className={reminder.completed ? "opacity-60" : ""}
                  >
                    <TableCell className="font-medium">{reminder.title}</TableCell>
                    <TableCell>{reminder.company || "—"}</TableCell>
                    <TableCell>{format(new Date(reminder.dateTime), "MMM d, yyyy 'at' h:mm a")}</TableCell>
                    <TableCell>{getReminderStatusBadge(reminder)}</TableCell>
                    <TableCell className="text-right space-x-2">
                      {!reminder.completed && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleComplete(reminder)}
                        >
                          Complete
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDelete(reminder)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <ReminderDialog
        open={showReminderDialog}
        onClose={() => setShowReminderDialog(false)}
      />
    </MainLayout>
  );
}
