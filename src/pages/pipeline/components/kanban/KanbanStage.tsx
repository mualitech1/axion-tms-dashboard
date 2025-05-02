
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LeadCard from './LeadCard';
import { Lead, PipelineStage } from '../../data/pipelineTypes';

interface KanbanStageProps {
  stage: PipelineStage;
  leads: Lead[];
  provided: any;
}

export default function KanbanStage({ stage, leads, provided }: KanbanStageProps) {
  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-50 rounded-md"
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      <div className="p-2">
        <Card>
          <CardHeader className="py-3 px-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-sm font-medium">{stage.name}</CardTitle>
              <Badge variant="outline">{leads.length}</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-2">
            <div
              className="min-h-[200px] max-h-[600px] overflow-y-auto space-y-2"
            >
              {leads.map((lead, index) => (
                <Draggable
                  key={lead.id}
                  draggableId={lead.id}
                  index={index}
                >
                  {(provided) => (
                    <LeadCard
                      key={lead.id}
                      lead={lead}
                      provided={provided}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
