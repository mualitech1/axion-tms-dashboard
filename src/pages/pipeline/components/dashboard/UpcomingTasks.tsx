
import { format } from 'date-fns';
import { Checkbox } from "@/components/ui/checkbox";
import { TaskPriority } from '../../data/pipelineTypes';

// Sample tasks data
const upcomingTasks = [
  {
    id: 'task-1',
    leadId: 'lead-1',
    company: 'Acme Logistics',
    title: 'Send follow-up email with pricing details',
    dueDate: '2025-04-10T17:00:00',
    completed: false,
    assignedTo: 'user-1',
    assignedToName: 'John Doe',
    priority: TaskPriority.HIGH
  },
  {
    id: 'task-2',
    leadId: 'lead-3',
    company: 'Quick Deliveries',
    title: 'Schedule contract signing meeting',
    dueDate: '2025-04-09T12:00:00',
    completed: false,
    assignedTo: 'user-1',
    assignedToName: 'John Doe',
    priority: TaskPriority.HIGH
  },
  {
    id: 'task-3',
    leadId: 'lead-2',
    company: 'Global Freight Ltd',
    title: 'Prepare case study presentation',
    dueDate: '2025-04-12T09:30:00',
    completed: false,
    assignedTo: 'user-2',
    assignedToName: 'Sarah Wilson',
    priority: TaskPriority.MEDIUM
  },
  {
    id: 'task-4',
    leadId: 'lead-5',
    company: 'Tech Innovations',
    title: 'Contact about specialized transport requirements',
    dueDate: '2025-04-11T14:00:00',
    completed: false,
    assignedTo: 'user-2',
    assignedToName: 'Sarah Wilson',
    priority: TaskPriority.LOW
  },
  {
    id: 'task-5',
    leadId: 'lead-4',
    company: 'Retail Solutions',
    title: 'Negotiate final contract terms',
    dueDate: '2025-04-08T16:30:00',
    completed: false,
    assignedTo: 'user-3',
    assignedToName: 'Alice Thompson',
    priority: TaskPriority.URGENT
  }
];

export default function UpcomingTasks() {
  return (
    <div className="space-y-3">
      {upcomingTasks.map((task) => {
        const dueDate = new Date(task.dueDate);
        const formattedDueDate = format(dueDate, 'MMM d');
        
        return (
          <div 
            key={task.id}
            className="flex items-start space-x-2 pb-3 border-b last:border-0"
          >
            <Checkbox id={task.id} className="mt-0.5" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor={task.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {task.title}
              </label>
              <p className="text-xs text-muted-foreground">
                {task.company} • {formattedDueDate} • 
                <span className={`ml-1 ${getPriorityColor(task.priority)}`}>
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function getPriorityColor(priority: TaskPriority): string {
  switch (priority) {
    case TaskPriority.URGENT:
      return 'text-red-600 font-medium';
    case TaskPriority.HIGH:
      return 'text-amber-600';
    case TaskPriority.MEDIUM:
      return 'text-blue-600';
    case TaskPriority.LOW:
    default:
      return 'text-green-600';
  }
}
