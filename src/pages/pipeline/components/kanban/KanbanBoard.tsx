
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import KanbanStage from './KanbanStage';
import { Lead, PipelineStage } from '../../data/pipelineTypes';
import { motion } from 'framer-motion';

interface KanbanBoardProps {
  stages: PipelineStage[];
  leads: Lead[];
  onDragEnd: (result: any) => void;
}

export default function KanbanBoard({ stages, leads, onDragEnd }: KanbanBoardProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <motion.div 
        className="flex gap-4 overflow-x-auto pb-6 pt-1 custom-scrollbar"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {stages.map((stage, index) => {
          const stageLeads = leads.filter(lead => lead.stage === stage.id);
          
          return (
            <Droppable key={stage.id} droppableId={stage.id}>
              {(provided) => (
                <motion.div
                  variants={itemVariants}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <KanbanStage
                    stage={stage}
                    leads={stageLeads}
                    provided={provided}
                  />
                </motion.div>
              )}
            </Droppable>
          );
        })}
      </motion.div>
    </DragDropContext>
  );
}
