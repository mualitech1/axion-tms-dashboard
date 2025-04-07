
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TaskAssignment from './TaskAssignment';
import TasksList from './TasksList';
import NotesPanel from './NotesPanel';

interface CollaborationTabProps {
  leadId?: string;
  company?: string;
}

export default function CollaborationTab({ leadId, company }: CollaborationTabProps) {
  return (
    <Tabs defaultValue="tasks" className="space-y-4">
      <TabsList className="grid grid-cols-2">
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="notes">Notes</TabsTrigger>
      </TabsList>
      
      <TabsContent value="tasks" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Assign Task</CardTitle>
          </CardHeader>
          <CardContent>
            <TaskAssignment leadId={leadId} company={company} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <TasksList leadId={leadId} />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notes">
        <NotesPanel leadId={leadId} hideTitle />
      </TabsContent>
    </Tabs>
  );
}
