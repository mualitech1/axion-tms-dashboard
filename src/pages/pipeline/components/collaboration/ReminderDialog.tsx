
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';
import { useReminders } from '../../context/ReminderContext';

interface ReminderDialogProps {
  open: boolean;
  onClose: () => void;
  leadId?: string;
  company?: string;
}

export default function ReminderDialog({ open, onClose, leadId, company }: ReminderDialogProps) {
  const { addReminder } = useReminders();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('09:00');
  const [notifyBefore, setNotifyBefore] = useState('30');
  
  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Reminder Error",
        description: "Please enter a reminder title",
        variant: "destructive",
      });
      return;
    }
    
    if (!date) {
      toast({
        title: "Reminder Error",
        description: "Please select a date",
        variant: "destructive",
      });
      return;
    }
    
    // Combine date and time
    const [hours, minutes] = time.split(':').map(Number);
    const reminderDate = new Date(date);
    reminderDate.setHours(hours);
    reminderDate.setMinutes(minutes);
    
    if (reminderDate < new Date()) {
      toast({
        title: "Reminder Error",
        description: "Reminder date and time must be in the future",
        variant: "destructive",
      });
      return;
    }
    
    // Add the reminder to our context
    addReminder({
      title,
      date: reminderDate.toISOString(),
      type: 'Follow-up',
      completed: false,
      company,
      leadId,
      notifyMinutesBefore: parseInt(notifyBefore)
    });
    
    toast({
      title: "Reminder Set",
      description: `You'll be notified ${parseInt(notifyBefore)} minutes before the reminder time`,
    });
    
    // Reset form and close dialog
    setTitle('');
    setDate(new Date());
    setTime('09:00');
    setNotifyBefore('30');
    onClose();
  };
  
  // Generate time options in 15-minute intervals
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 15) {
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      timeOptions.push(`${formattedHour}:${formattedMinute}`);
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Set Reminder</DialogTitle>
          <DialogDescription>
            Create a reminder for follow-up actions
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Reminder Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={company ? `Follow up with ${company}` : "Call client"}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label>Time</Label>
              <Select
                value={time}
                onValueChange={setTime}
              >
                <SelectTrigger>
                  <Clock className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((timeOption) => (
                    <SelectItem key={timeOption} value={timeOption}>
                      {timeOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>Notify Before</Label>
            <Select
              value={notifyBefore}
              onValueChange={setNotifyBefore}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select notification time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes before</SelectItem>
                <SelectItem value="30">30 minutes before</SelectItem>
                <SelectItem value="60">1 hour before</SelectItem>
                <SelectItem value="120">2 hours before</SelectItem>
                <SelectItem value="1440">1 day before</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Set Reminder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
