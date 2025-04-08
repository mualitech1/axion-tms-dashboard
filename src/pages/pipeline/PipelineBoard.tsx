
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus, Filter, SortAsc } from 'lucide-react';
import KanbanBoard from './components/kanban/KanbanBoard';
import { pipelineStages, initialLeadsData } from './data/pipelineData';
import { Link } from 'react-router-dom';

export default function PipelineBoard() {
  const [leads, setLeads] = useState(initialLeadsData);
  
  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const { source, destination } = result;
    
    // Create a copy of the leads
    const updatedLeads = [...leads];
    
    // Find the lead that was dragged
    const movedLead = updatedLeads.find(
      lead => lead.id === result.draggableId
    );
    
    if (movedLead) {
      // Update the stage of the moved lead
      movedLead.stage = destination.droppableId;
      
      // Update leads with the new data
      setLeads(updatedLeads);
      
      console.log('Lead moved:', {
        leadId: movedLead.id,
        from: source.droppableId,
        to: destination.droppableId
      });
    }
  };

  return (
    <MainLayout title="Pipeline Board">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pipeline Board</h1>
          <p className="text-muted-foreground">
            Drag & drop leads between pipeline stages
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <SortAsc className="mr-2 h-4 w-4" />
            Sort
          </Button>
          <Link to="/sales-pipeline/lead/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Lead
            </Button>
          </Link>
        </div>
      </div>

      <KanbanBoard 
        stages={pipelineStages}
        leads={leads}
        onDragEnd={handleDragEnd}
      />
    </MainLayout>
  );
}
