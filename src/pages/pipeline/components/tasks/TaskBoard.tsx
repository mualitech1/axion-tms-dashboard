
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, MoreHorizontal } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskDialog from './TaskDialog';
import { toast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Sample task data
const initialTasks = {
  todo: [
    { id: 'task-1', title: 'Follow up with Acme Logistics', tags: ['high-priority', 'sales-call'], assignee: 'John Doe', dueDate: '2025-04-15', company: 'Acme Logistics' },
    { id: 'task-2', title: 'Prepare proposal for Tech Innovations', tags: ['proposal', 'documentation'], assignee: 'Sarah Wilson', dueDate: '2025-04-18', company: 'Tech Innovations' },
    { id: 'task-3', title: 'Schedule meeting with Quick Deliveries', tags: ['meeting'], assignee: 'Alice Thompson', dueDate: '2025-04-20', company: 'Quick Deliveries' },
  ],
  inProgress: [
    { id: 'task-4', title: 'Draft contract for Global Freight', tags: ['contract', 'legal'], assignee: 'John Doe', dueDate: '2025-04-12', company: 'Global Freight Ltd' },
    { id: 'task-5', title: 'Review service agreement', tags: ['contract', 'review'], assignee: 'Sarah Wilson', dueDate: '2025-04-13', company: 'Retail Solutions' },
  ],
  completed: [
    { id: 'task-6', title: 'Initial outreach to Express Shipping', tags: ['outreach'], assignee: 'Alice Thompson', dueDate: '2025-04-05', company: 'Express Shipping' },
    { id: 'task-7', title: 'Send pricing sheet', tags: ['pricing', 'sales'], assignee: 'John Doe', dueDate: '2025-04-02', company: 'Cargo Express' },
  ]
};

const columns = [
  { id: 'todo', title: 'To Do', color: 'bg-blue-500' },
  { id: 'inProgress', title: 'In Progress', color: 'bg-amber-500' },
  { id: 'completed', title: 'Completed', color: 'bg-green-500' }
];

interface TaskBoardProps {
  viewFilter: 'all' | 'team' | 'mine';
}

export default function TaskBoard({ viewFilter }: TaskBoardProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [showTaskDialog, setShowTaskDialog] = useState(false);
  const [editingTask, setEditingTask] = useState<any>(null);
  
  const handleDragEnd = (result: any) => {
    const { source, destination } = result;
    
    // Dropped outside the list
    if (!destination) {
      return;
    }
    
    // Same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    
    // Get source and destination lists
    const sourceList = [...tasks[source.droppableId as keyof typeof tasks]];
    const destList = source.droppableId === destination.droppableId 
      ? sourceList 
      : [...tasks[destination.droppableId as keyof typeof tasks]];
    
    // Remove from source list
    const [removed] = sourceList.splice(source.index, 1);
    
    // Insert into destination list
    destList.splice(destination.index, 0, removed);
    
    // Update state
    setTasks({
      ...tasks,
      [source.droppableId]: sourceList,
      [destination.droppableId]: destList
    });
    
    toast({
      title: "Task Moved",
      description: `"${removed.title}" moved to ${columns.find(col => col.id === destination.droppableId)?.title}`,
    });
  };
  
  const handleEditTask = (task: any, columnId: string) => {
    setEditingTask({ ...task, columnId });
    setShowTaskDialog(true);
  };
  
  const handleAddTask = (columnId: string) => {
    setEditingTask({ columnId });
    setShowTaskDialog(true);
  };
  
  const handleSaveTask = (task: any) => {
    const { columnId, ...taskData } = task;
    
    if (taskData.id) {
      // Update existing task
      const columnTasks = [...tasks[columnId as keyof typeof tasks]];
      const taskIndex = columnTasks.findIndex(t => t.id === taskData.id);
      
      if (taskIndex !== -1) {
        columnTasks[taskIndex] = taskData;
        
        setTasks({
          ...tasks,
          [columnId]: columnTasks
        });
        
        toast({
          title: "Task Updated",
          description: `"${taskData.title}" has been updated`
        });
      }
    } else {
      // Add new task
      const newTask = {
        ...taskData,
        id: `task-${Date.now()}`
      };
      
      setTasks({
        ...tasks,
        [columnId]: [...tasks[columnId as keyof typeof tasks], newTask]
      });
      
      toast({
        title: "Task Added",
        description: `"${newTask.title}" has been added`
      });
    }
    
    setShowTaskDialog(false);
    setEditingTask(null);
  };
  
  const filteredTasks = viewFilter === 'all' 
    ? tasks 
    : {
        todo: tasks.todo.filter(task => viewFilter === 'mine' ? task.assignee === 'John Doe' : true),
        inProgress: tasks.inProgress.filter(task => viewFilter === 'mine' ? task.assignee === 'John Doe' : true),
        completed: tasks.completed.filter(task => viewFilter === 'mine' ? task.assignee === 'John Doe' : true)
      };
  
  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  // Card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };
  
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {columns.map((column, index) => (
            <motion.div 
              key={column.id} 
              className="h-full"
              variants={cardVariants}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full border border-aximo-border bg-aximo-darker overflow-hidden shadow-md hover:shadow-aximo transition-shadow duration-300">
                <CardHeader className="pb-2 border-b border-aximo-border relative">
                  <div className="absolute top-0 left-0 h-1 w-full" style={{ backgroundColor: column.color.replace('bg-', '') }}></div>
                  <div className="flex justify-between items-center pt-1">
                    <CardTitle className="text-lg flex items-center gap-2 text-aximo-text">
                      {column.title}
                      <span className="text-sm font-normal px-2 py-0.5 rounded-full bg-aximo-card/50 text-aximo-text-secondary">
                        {filteredTasks[column.id as keyof typeof filteredTasks].length}
                      </span>
                    </CardTitle>
                    
                    <div className="flex items-center gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-aximo-text-secondary hover:text-aximo-text">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-aximo-card border-aximo-border">
                          <DropdownMenuItem className="text-aximo-text hover:bg-aximo-darker">Sort by due date</DropdownMenuItem>
                          <DropdownMenuItem className="text-aximo-text hover:bg-aximo-darker">Sort by priority</DropdownMenuItem>
                          <DropdownMenuItem className="text-aximo-text hover:bg-aximo-darker">Collapse column</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-aximo-text-secondary hover:text-aximo-primary hover:bg-aximo-primary/10"
                        onClick={() => handleAddTask(column.id)}
                      >
                        <Plus className="h-4 w-4" />
                        <span className="sr-only">Add task</span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="p-2 overflow-y-auto min-h-[70vh] max-h-[70vh] custom-scrollbar">
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="min-h-[150px] space-y-2"
                      >
                        {filteredTasks[column.id as keyof typeof filteredTasks].map((task, index) => (
                          <Draggable 
                            key={task.id} 
                            draggableId={task.id} 
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <TaskCard 
                                  task={task} 
                                  onEdit={() => handleEditTask(task, column.id)} 
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </DragDropContext>
      
      <TaskDialog
        open={showTaskDialog}
        onOpenChange={setShowTaskDialog}
        task={editingTask}
        onSave={handleSaveTask}
      />
    </>
  );
}
