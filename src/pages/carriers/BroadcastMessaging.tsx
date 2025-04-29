
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import MainLayout from '@/components/layout/MainLayout';
import ComposeMessage from './messaging/components/ComposeMessage';
import MessageGroups from './messaging/components/MessageGroups';
import MessageHistory from './messaging/components/MessageHistory';
import { Button } from '@/components/ui/button';
import { Plus, MessageCircle, Users } from 'lucide-react';
import { CarrierMessageGroup } from './data/types/carrierTypes';

// Mock message groups for demonstration
const initialGroups: CarrierMessageGroup[] = [
  {
    id: 'g1',
    name: 'Northern Fleet Carriers',
    description: 'All carriers operating in northern regions',
    createdAt: '2025-03-15T10:00:00',
    filters: {
      regions: ['london', 'manchester', 'liverpool'],
      capabilities: ['hazmat', 'refrigerated']
    }
  },
  {
    id: 'g2',
    name: 'Express Delivery Partners',
    description: 'Carriers offering same-day and express delivery services',
    createdAt: '2025-03-20T14:30:00',
    filters: {
      fleetType: 'Small',
      complianceStatus: 'Compliant',
      capabilities: [], // Adding the required capabilities array
      regions: [] // Adding the required regions array
    }
  },
  {
    id: 'g3',
    name: 'Heavy Cargo Specialists',
    description: 'Carriers with large vehicles for heavy-duty transport',
    createdAt: '2025-04-05T09:15:00',
    filters: {
      fleetType: 'Large',
      capabilities: ['heavy', 'oversized'],
      regions: [] // Adding the required regions array
    }
  }
];

// Mock message history
const initialMessages = [
  {
    id: 'msg1',
    subject: 'Schedule Update - Easter Weekend',
    content: 'Please note our offices will be closed during the Easter weekend (April 19-22). All deliveries scheduled during this period should be completed by April 18th or rescheduled for April 23rd onwards.',
    sentAt: '2025-04-10T14:30:00',
    recipientGroupId: 'g1',
    recipientGroupName: 'Northern Fleet Carriers',
    recipientCount: 16,
    readCount: 12
  },
  {
    id: 'msg2',
    subject: 'Compliance Document Reminder',
    content: 'This is a friendly reminder to update your insurance certificates and vehicle registration documents before the end of the month. Failure to provide updated documentation may affect your carrier status.',
    sentAt: '2025-04-08T10:15:00',
    recipientGroupId: 'g2',
    recipientGroupName: 'Express Delivery Partners',
    recipientCount: 8,
    readCount: 5
  },
  {
    id: 'msg3',
    subject: 'New Route Opportunities',
    content: 'We are expanding our operations to Scotland and are looking for carriers with experience in the region. If you are interested, please respond to this message by April 15th.',
    sentAt: '2025-04-05T16:45:00',
    recipientGroupId: 'g3',
    recipientGroupName: 'Heavy Cargo Specialists',
    recipientCount: 12,
    readCount: 0
  }
];

export default function BroadcastMessaging() {
  const [groups, setGroups] = useState<CarrierMessageGroup[]>(initialGroups);
  const [messages, setMessages] = useState(initialMessages);
  const [activeTab, setActiveTab] = useState<'compose' | 'groups' | 'history'>('compose');

  const handleCreateGroup = (group: CarrierMessageGroup) => {
    const newGroup = {
      ...group,
      id: `g${groups.length + 1}`,
      createdAt: new Date().toISOString()
    };
    setGroups([...groups, newGroup]);
    toast.success("Message group created", {
      description: `${newGroup.name} has been created successfully.`,
    });
  };

  const handleSendMessage = (subject: string, content: string, groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    
    const newMessage = {
      id: `msg${messages.length + 1}`,
      subject,
      content,
      sentAt: new Date().toISOString(),
      recipientGroupId: groupId,
      recipientGroupName: group.name,
      recipientCount: Math.floor(Math.random() * 20) + 5, // Mock recipient count
      readCount: 0
    };
    
    setMessages([newMessage, ...messages]);
    toast.success("Message sent", {
      description: `Broadcast sent to ${group.name}.`,
    });
  };

  return (
    <MainLayout title="Broadcast Messaging">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="p-4 md:p-6 space-y-6"
      >
        {/* Enhanced Header Section */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
          <motion.h1 
            initial={{ y: -20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold mb-2"
          >
            Carrier Broadcast Messaging
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="opacity-90"
          >
            Create message groups and send broadcast communications to your carrier network
          </motion.p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 p-1 bg-aximo-darker rounded-lg">
          <Button
            variant={activeTab === 'compose' ? 'default' : 'ghost'}
            className={activeTab === 'compose' ? 'bg-aximo-primary' : 'bg-transparent text-aximo-text'}
            onClick={() => setActiveTab('compose')}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Compose Message
          </Button>
          <Button
            variant={activeTab === 'groups' ? 'default' : 'ghost'}
            className={activeTab === 'groups' ? 'bg-aximo-primary' : 'bg-transparent text-aximo-text'}
            onClick={() => setActiveTab('groups')}
          >
            <Users className="mr-2 h-4 w-4" />
            Message Groups
          </Button>
          <Button
            variant={activeTab === 'history' ? 'default' : 'ghost'}
            className={activeTab === 'history' ? 'bg-aximo-primary' : 'bg-transparent text-aximo-text'}
            onClick={() => setActiveTab('history')}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            Message History
          </Button>
        </div>

        {/* Tab Content with Animations */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-6"
        >
          {activeTab === 'compose' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <ComposeMessage groups={groups} onSendMessage={handleSendMessage} />
            </motion.div>
          )}
          
          {activeTab === 'groups' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <MessageGroups groups={groups} onCreateGroup={handleCreateGroup} />
            </motion.div>
          )}
          
          {activeTab === 'history' && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <MessageHistory messages={messages} />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}
