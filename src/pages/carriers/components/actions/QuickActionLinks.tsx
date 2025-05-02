
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Scale, LineChart, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

export default function QuickActionLinks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-wrap gap-2 justify-center mt-6"
    >
      <motion.div variants={itemVariants}>
        <Link to="/carriers/compliance">
          <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-aximo-dark to-indigo-950/30 border-aximo-border text-aximo-text-secondary hover:text-white hover:bg-indigo-600/20 transition-all duration-300 shadow-md shadow-indigo-900/20">
            <Scale className="h-4 w-4" />
            <span>Compliance Dashboard</span>
          </Button>
        </Link>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Link to="/carriers/reports">
          <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-aximo-dark to-indigo-950/30 border-aximo-border text-aximo-text-secondary hover:text-white hover:bg-indigo-600/20 transition-all duration-300 shadow-md shadow-indigo-900/20">
            <LineChart className="h-4 w-4" />
            <span>Performance Reports</span>
          </Button>
        </Link>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <Link to="/carriers/messaging">
          <Button variant="outline" size="sm" className="flex items-center gap-1 bg-gradient-to-r from-aximo-dark to-indigo-950/30 border-aximo-border text-aximo-text-secondary hover:text-white hover:bg-indigo-600/20 transition-all duration-300 shadow-md shadow-indigo-900/20">
            <MessageSquare className="h-4 w-4" />
            <span>Message Carriers</span>
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
