
import React from 'react';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LeadDetails() {
  const { id } = useParams();
  
  return (
    <MainLayout title={`Lead Details: ${id}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Lead Details</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Lead Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Lead ID: {id}</p>
          <p>This page will display detailed information about the lead.</p>
        </CardContent>
      </Card>
    </MainLayout>
  );
}
