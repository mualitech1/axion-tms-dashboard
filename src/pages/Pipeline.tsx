
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ReminderProvider } from './pipeline/context/ReminderContext';
import AutoReminder from './pipeline/components/reminders/AutoReminder';
import MainLayout from '@/components/layout/MainLayout';
import { motion } from 'framer-motion';

export default function Pipeline() {
  console.log("Pipeline component rendering");
  
  return (
    <ReminderProvider>
      <AutoReminder />
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-full"
      >
        <Outlet />
      </motion.div>
    </ReminderProvider>
  );
}
