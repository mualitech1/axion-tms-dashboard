
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';

export default function LeadNotFound() {
  return (
    <MainLayout title="Lead Not Found">
      <div className="flex flex-col items-center justify-center h-96">
        <h1 className="text-2xl font-bold mb-4">Lead Not Found</h1>
        <p className="text-muted-foreground mb-4">
          The lead you're looking for doesn't exist or has been deleted.
        </p>
      </div>
    </MainLayout>
  );
}
