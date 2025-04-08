
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Tag, User } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import { InputWithIcon } from '@/components/ui/input-with-icon';

// Sample users for assignee dropdown
const users = [
  { id: 'user-1', name: 'John Doe' },
  { id: 'user-2', name: 'Sarah Wilson' },
  { id: 'user-3', name: 'Alice Thompson' },
];

// Available tags for suggestions
const availableTags = [
  'high-priority', 'medium-priority', 'low-priority',
  'meeting', 'call', 'sales-call', 'follow-up',
  'contract', 'legal', 'documentation', 'proposal',
  'pricing', 'outreach', 'urgent', 'review'
];

interface TaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: any;
  onSave: (task: any) => void;
}

export default function TaskDialog({ open, onOpenChange, task, onSave }: TaskDialogProps) {
  const [title, setTitle] = React.useState(task?.title || '');
  const [company, setCompany] = React.useState(task?.company || '');
  const [assignee, setAssignee] = React.useState(task?.assignee || '');
  const [dueDate, setDueDate] = React.useState<Date | undefined>(
    task?.dueDate ? new Date(task.dueDate) : undefined
  );
  const [tags, setTags] = React.useState<string[]>(task?.tags || []);
  const [tagInput, setTagInput] = React.useState('');
  
  React.useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setCompany(task.company || '');
      setAssignee(task.assignee || '');
      setDueDate(task.dueDate ? new Date(task.dueDate) : undefined);
      setTags(task.tags || []);
    }
  }, [task]);
  
  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };
  
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };
  
  const handleSelectTag = (tag: string) => {
    if (!tags.includes(tag)) {
      setTags([...tags, tag]);
    }
  };
  
  const handleSave = () => {
    onSave({
      ...task,
      id: task?.id,
      title,
      company,
      assignee,
      dueDate: dueDate ? dueDate.toISOString() : '',
      tags,
      columnId: task?.columnId || 'todo'
    });
  };
  
  // Filter tag suggestions to those not already selected
  const tagSuggestions = availableTags.filter(tag => !tags.includes(tag));
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{task?.id ? 'Edit Task' : 'New Task'}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Task Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What needs to be done?"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="Related company"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Assignee</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger>
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Select assignee" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.name}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid gap-2">
              <Label>Due Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, 'PPP') : 'Select date'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <InputWithIcon
                icon={Tag}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Add tag..."
                className="flex-grow"
                onKeyDown={(e) => e.key === 'Enter' && handleAddTag()}
              />
              <Button variant="secondary" onClick={handleAddTag}>Add</Button>
            </div>
            
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.map(tag => (
                <Badge key={tag} className="flex gap-1 items-center">
                  {tag}
                  <X 
                    className="h-3 w-3 cursor-pointer hover:text-destructive" 
                    onClick={() => handleRemoveTag(tag)}
                  />
                </Badge>
              ))}
            </div>
            
            {tagSuggestions.length > 0 && (
              <div className="mt-2">
                <Label className="text-xs text-muted-foreground">Suggestions:</Label>
                <div className="flex flex-wrap gap-1 mt-1">
                  {tagSuggestions.slice(0, 5).map(tag => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => handleSelectTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
