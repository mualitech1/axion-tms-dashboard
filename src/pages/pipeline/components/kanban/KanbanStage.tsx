
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LeadCard from './LeadCard';
import { Lead, PipelineStage } from '../../data/pipelineTypes';
import { motion } from 'framer-motion';

interface KanbanStageProps {
  stage: PipelineStage;
  leads: Lead[];
  provided: any;
}

export default function KanbanStage({ stage, leads, provided }: KanbanStageProps) {
  // Get stage color based on stage ID
  const getStageColor = (stageId: string): string => {
    switch(stageId) {
      case 'lead': return 'bg-blue-500';
      case 'qualified': return 'bg-purple-500';
      case 'proposal': return 'bg-amber-500';
      case 'negotiation': return 'bg-orange-500';
      case 'won': return 'bg-green-500';
      case 'lost': return 'bg-red-500';
      default: return 'bg-aximo-border';
    }
  };

  const getStageTextColor = (stageId: string): string => {
    switch(stageId) {
      case 'lead': return 'text-blue-500';
      case 'qualified': return 'text-purple-500';
      case 'proposal': return 'text-amber-500';
      case 'negotiation': return 'text-orange-500';
      case 'won': return 'text-green-500';
      case 'lost': return 'text-red-500';
      default: return 'text-aximo-text-secondary';
    }
  };

  return (
    <div
      className="flex-shrink-0 w-80"
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      <div className="p-2">
        <motion.div
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border border-aximo-border bg-gradient-to-br from-aximo-dark to-aximo-darker shadow-aximo hover:shadow-aximo-strong transition-all overflow-hidden">
            <CardHeader className="py-3 px-4 border-b border-aximo-border">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStageColor(stage.id)}`}></div>
                  <CardTitle className={`text-sm font-medium ${getStageTextColor(stage.id)}`}>
                    {stage.name}
                  </CardTitle>
                </div>
                <Badge 
                  variant="outline" 
                  className="border-aximo-border bg-aximo-dark/50 text-aximo-text-secondary"
                >
                  {leads.length}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-2">
              <div
                className="min-h-[400px] max-h-[calc(100vh-14rem)] overflow-y-auto space-y-3 custom-scrollbar p-1"
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
                {leads.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40 text-aximo-text-secondary text-sm opacity-60">
                    <div className="w-12 h-12 rounded-full bg-aximo-card/30 flex items-center justify-center mb-3">
                      <span className="text-lg">+</span>
                    </div>
                    <p>Drag leads here</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
