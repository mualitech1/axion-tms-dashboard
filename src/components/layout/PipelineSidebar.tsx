
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Kanban,
  ListTodo,
  Calendar,
  Tag,
  Settings,
  Bell,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const PipelineSidebarItem = ({ to, icon: Icon, label }: { to: string; icon: React.ElementType; label: string }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center px-3 py-2 text-sm rounded-md transition-all duration-200",
          isActive 
            ? "bg-aximo-primary/20 text-aximo-primary font-medium shadow-glow" 
            : "text-aximo-text-secondary hover:bg-aximo-card/60 hover:text-aximo-text"
        )
      }
    >
      <Icon className="h-4 w-4 mr-2" />
      <span>{label}</span>
    </NavLink>
  );
};

export default function PipelineSidebar() {
  const location = useLocation();
  
  // Animation variants for sidebar
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        staggerChildren: 0.08
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };
  
  return (
    <motion.div 
      className="w-56 border-r border-aximo-border min-h-full bg-gradient-to-b from-aximo-dark to-aximo-darker p-4 flex flex-col gap-2 shadow-md overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h3 className="font-medium text-xs text-aximo-text-secondary uppercase tracking-wider mb-3 px-3 flex items-center">
          <span className="bg-aximo-primary/20 w-1.5 h-1.5 rounded-full mr-1.5"></span>
          Sales Pipeline
        </h3>
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <PipelineSidebarItem 
          to="/pipeline/dashboard" 
          icon={LayoutDashboard} 
          label="Dashboard"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <PipelineSidebarItem 
          to="/pipeline/board" 
          icon={Kanban} 
          label="Pipeline Board" 
        />
      </motion.div>
      
      <div className="mt-3 mb-1.5">
        <motion.div 
          className="pl-3 flex items-center"
          variants={itemVariants}
        >
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-aximo-border to-transparent opacity-50"></div>
          <h4 className="mx-2 text-xs font-medium text-aximo-text-secondary">Task Management</h4>
          <div className="h-px flex-grow bg-gradient-to-r from-aximo-border via-aximo-border to-transparent opacity-50"></div>
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants}>
        <PipelineSidebarItem 
          to="/pipeline/tasks" 
          icon={ListTodo} 
          label="Task Board"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <PipelineSidebarItem 
          to="/pipeline/tasks/calendar" 
          icon={Calendar} 
          label="Task Calendar"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <PipelineSidebarItem 
          to="/pipeline/tasks/tags" 
          icon={Tag} 
          label="Task Tags"
        />
      </motion.div>
      
      <div className="mt-3 mb-1.5">
        <motion.div 
          className="pl-3 flex items-center"
          variants={itemVariants}
        >
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-aximo-border to-transparent opacity-50"></div>
          <h4 className="mx-2 text-xs font-medium text-aximo-text-secondary">Management</h4>
          <div className="h-px flex-grow bg-gradient-to-r from-aximo-border via-aximo-border to-transparent opacity-50"></div>
        </motion.div>
      </div>
      
      <motion.div variants={itemVariants}>
        <PipelineSidebarItem 
          to="/pipeline/reminders" 
          icon={Bell} 
          label="Reminders"
        />
      </motion.div>
      
      <motion.div variants={itemVariants}>
        <PipelineSidebarItem 
          to="/pipeline/settings" 
          icon={Settings} 
          label="Settings"
        />
      </motion.div>
      
      {/* Spacer */}
      <div className="flex-1"></div>
      
      {/* Bottom section with upgrade info */}
      <motion.div 
        variants={itemVariants}
        className="mt-4 bg-gradient-to-r from-aximo-primary/20 to-aximo-light/10 rounded-lg p-3 border border-aximo-primary/20"
      >
        <div className="text-xs font-medium text-aximo-text mb-1">Pro Features Available</div>
        <p className="text-xs text-aximo-text-secondary mb-2">Unlock advanced pipeline analytics</p>
        <button className="text-xs bg-aximo-primary/20 hover:bg-aximo-primary/30 text-aximo-primary font-medium py-1 px-2 rounded-md flex items-center w-full justify-center transition-colors">
          Explore <ChevronRight className="h-3 w-3 ml-1" />
        </button>
      </motion.div>
    </motion.div>
  );
}
