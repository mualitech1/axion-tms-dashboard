
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import KanbanStage from './KanbanStage';
import { Lead, PipelineStage } from '../../data/pipelineTypes';

interface KanbanBoardProps {
  stages: PipelineStage[];
  leads: Lead[];
  onDragEnd: (result: any) => void;
}

export default function KanbanBoard({ stages, leads, onDragEnd }: KanbanBoardProps) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 overflow-x-auto pb-6 pt-1">
        {stages.map(stage => {
          const stageLeads = leads.filter(lead => lead.stage === stage.id);
          
          return (
            <Droppable key={stage.id} droppableId={stage.id}>
              {(provided) => (
                <KanbanStage
                  stage={stage}
                  leads={stageLeads}
                  provided={provided}
                />
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}
