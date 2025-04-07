
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Broadcast, Mail, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ComposeMessage from './messaging/components/ComposeMessage';
import MessageHistory from './messaging/components/MessageHistory';
import MessageGroups from './messaging/components/MessageGroups';
import { CarrierMessageGroup } from './data/types/carrierTypes';
import { useToast } from '@/hooks/use-toast';

// Mock message groups data
const initialGroups: CarrierMessageGroup[] = [
  {
    id: 'g1',
    name: 'Temperature Controlled Carriers',
    description: 'All carriers with temperature controlled capability',
    createdAt: '2025-03-15T10:00:00',
    filters: {
      capabilities: ['temperature-controlled'],
      regions: [],
      status: '',
      fleetType: '',
      complianceStatus: ''
    }
  },
  {
    id: 'g2',
    name: 'London & South East',
    description: 'Carriers operating in London and South East regions',
    createdAt: '2025-03-20T14:30:00',
    filters: {
      capabilities: [],
      regions: ['london'],
      status: 'Active',
      fleetType: '',
      complianceStatus: ''
    }
  },
  {
    id: 'g3',
    name: 'ADR Qualified',
    description: 'Carriers with ADR certification for hazardous goods',
    createdAt: '2025-04-01T09:15:00',
    filters: {
      capabilities: ['adr-hazardous'],
      regions: [],
      status: 'Active',
      fleetType: '',
      complianceStatus: 'Compliant'
    }
  }
];

// Mock message history
const initialMessages = [
  {
    id: 'm1',
    subject: 'Urgent: New tender opportunity - Chemical transport',
    content: 'We have a new tender opportunity for chemical transport between London and Manchester. Please contact us if you are interested.',
    sentAt: '2025-04-05T09:30:00',
    recipientGroupId: 'g3',
    recipientGroupName: 'ADR Qualified',
    recipientCount: 12,
    readCount: 5
  },
  {
    id: 'm2',
    subject: 'Schedule update for Easter holidays',
    content: 'Please note our revised schedule for the upcoming Easter holiday period.',
    sentAt: '2025-04-02T14:15:00',
    recipientGroupId: 'g1',
    recipientGroupName: 'Temperature Controlled Carriers',
    recipientCount: 25,
    readCount: 18
  }
];

export default function BroadcastMessaging() {
  const [activeTab, setActiveTab] = useState('compose');
  const [messageGroups, setMessageGroups] = useState<CarrierMessageGroup[]>(initialGroups);
  const [messages, setMessages] = useState(initialMessages);
  const { toast } = useToast();

  const handleSendMessage = (subject: string, content: string, groupId: string) => {
    // In a real app this would call an API to send the message
    const group = messageGroups.find(g => g.id === groupId);
    
    if (!group) {
      toast({
        title: "Error",
        description: "Selected group not found",
        variant: "destructive"
      });
      return;
    }

    // Add message to history
    const newMessage = {
      id: `m${messages.length + 1}`,
      subject,
      content,
      sentAt: new Date().toISOString(),
      recipientGroupId: groupId,
      recipientGroupName: group.name,
      recipientCount: Math.floor(Math.random() * 30) + 5, // Mock recipient count
      readCount: 0
    };

    setMessages([newMessage, ...messages]);
    
    toast({
      title: "Message broadcast sent",
      description: `Your message has been sent to ${group.name}`
    });

    // Switch to history tab
    setActiveTab('history');
  };

  const handleCreateGroup = (newGroup: CarrierMessageGroup) => {
    setMessageGroups([...messageGroups, newGroup]);
    
    toast({
      title: "Group created",
      description: `Group "${newGroup.name}" has been created`
    });
  };

  return (
    <MainLayout title="Carrier Broadcast Messaging">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Broadcast Messaging</h1>
            <p className="text-muted-foreground">Send messages to carriers based on capabilities and regions</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="compose" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              <span>Compose</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center">
              <Broadcast className="mr-2 h-4 w-4" />
              <span>Message History</span>
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              <span>Manage Groups</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="compose">
              <ComposeMessage 
                groups={messageGroups} 
                onSendMessage={handleSendMessage}
              />
            </TabsContent>
            
            <TabsContent value="history">
              <MessageHistory messages={messages} />
            </TabsContent>
            
            <TabsContent value="groups">
              <MessageGroups 
                groups={messageGroups}
                onCreateGroup={handleCreateGroup} 
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
}
