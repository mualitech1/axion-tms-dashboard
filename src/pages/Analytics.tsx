
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function Analytics() {
  return (
    <MainLayout title="Analytics">
      <div className="animate-fade-in">
        <h2 className="text-2xl font-semibold mb-6">Analytics Dashboard</h2>
        <div className="p-8 bg-white rounded-lg shadow-sm">
          <p className="text-center text-gray-500">Analytics content will be displayed here.</p>
        </div>
      </div>
    </MainLayout>
  );
}
