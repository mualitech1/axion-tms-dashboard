
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import TaskDialog from './TaskDialog';
import { toast } from '@/hooks/use-toast';

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
  { id: 'todo', title: 'To Do' },
  { id: 'inProgress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' }
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
  
  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map(column => (
            <div key={column.id} className="h-full">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {column.title}
                      <span className="text-sm font-normal bg-muted rounded-full px-2">
                        {filteredTasks[column.id as keyof typeof filteredTasks].length}
                      </span>
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0"
                      onClick={() => handleAddTask(column.id)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Droppable droppableId={column.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className="min-h-[200px]"
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
                                className="mb-2"
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
            </div>
          ))}
        </div>
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
