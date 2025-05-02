
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { ReminderProvider } from './pipeline/context/ReminderContext';
import AutoReminder from './pipeline/components/reminders/AutoReminder';
import MainLayout from '@/components/layout/MainLayout';

export default function Pipeline() {
  console.log("Pipeline component rendering");
  
  return (
    <ReminderProvider>
      <AutoReminder />
      <MainLayout title="Sales Pipeline">
        <Outlet />
      </MainLayout>
    </ReminderProvider>
  );
}
