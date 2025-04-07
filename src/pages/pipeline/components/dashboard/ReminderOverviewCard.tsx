
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Calendar } from 'lucide-react';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { useReminders } from '../../context/ReminderContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ReminderOverviewCard() {
  const { activeReminders } = useReminders();
  
  // Sort reminders by date
  const sortedReminders = [...activeReminders]
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, 5); // Only show the 5 most immediate reminders
  
  const getDateDisplay = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isPast(date)) {
      return 'Overdue';
    } else if (isToday(date)) {
      return `Today, ${format(date, 'h:mm a')}`;
    } else if (isTomorrow(date)) {
      return `Tomorrow, ${format(date, 'h:mm a')}`;
    } else {
      return format(date, 'MMM d, h:mm a');
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">Upcoming Reminders</CardTitle>
      </CardHeader>
      <CardContent>
        {sortedReminders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Calendar className="h-8 w-8 text-muted-foreground/60" />
            <p className="mt-2 text-sm text-muted-foreground">No upcoming reminders</p>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedReminders.map(reminder => (
              <div 
                key={reminder.id} 
                className="flex items-start gap-2 border-b border-border pb-2 last:border-0 last:pb-0"
              >
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">{reminder.title}</p>
                  <div className="flex items-center gap-2">
                    {reminder.company && (
                      <span className="text-xs text-muted-foreground">{reminder.company}</span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {getDateDisplay(reminder.dateTime)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            <Link to="/pipeline/reminders">
              <Button variant="outline" size="sm" className="w-full mt-2">
                View All Reminders
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
