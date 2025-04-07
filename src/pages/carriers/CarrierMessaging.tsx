
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Send, Users, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { useToast } from '@/hooks/use-toast';
import { carrierData } from './data/carrierData';
import { Message, MessageGroup, Carrier } from './data/types/carrierTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock message data - in a real app, this would come from an API
const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 1,
    senderName: 'System Admin',
    recipientIds: [9, 10],
    recipientNames: ['Midland Logistics', 'Eastern Carriers'],
    subject: 'Schedule Update',
    content: 'Please confirm your availability for next week\'s deliveries.',
    timestamp: '2025-04-05T14:30:00',
    read: true,
    isGroupMessage: true
  },
  {
    id: '2',
    senderId: 1,
    senderName: 'System Admin',
    recipientIds: [11],
    recipientNames: ['Western Transport'],
    subject: 'Compliance Documents',
    content: 'Your insurance certificate is expiring soon. Please submit updated documentation.',
    timestamp: '2025-04-06T09:15:00',
    read: false,
    isGroupMessage: false
  }
];

// Mock message groups
const mockGroups: MessageGroup[] = [
  {
    id: 'g1',
    name: 'Northern Carriers',
    carrierIds: [9, 10, 13],
    description: 'All carriers operating in northern regions',
    createdAt: '2025-03-15T10:00:00'
  },
  {
    id: 'g2',
    name: 'South & West Coverage',
    carrierIds: [11, 12, 14],
    description: 'Carriers covering southern and western regions',
    createdAt: '2025-03-20T14:30:00'
  }
];

export default function CarrierMessaging() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCarriers, setSelectedCarriers] = useState<Carrier[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<MessageGroup | null>(null);
  const [messageSubject, setMessageSubject] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newGroupDescription, setNewGroupDescription] = useState('');
  const [newGroupCarriers, setNewGroupCarriers] = useState<Carrier[]>([]);
  const [currentView, setCurrentView] = useState<'compose' | 'sent' | 'groups'>('compose');
  
  const filteredCarriers = carrierData.filter(carrier => 
    carrier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    carrier.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCarrierToggle = (carrier: Carrier) => {
    if (selectedCarriers.some(c => c.id === carrier.id)) {
      setSelectedCarriers(selectedCarriers.filter(c => c.id !== carrier.id));
    } else {
      setSelectedCarriers([...selectedCarriers, carrier]);
    }
  };

  const handleGroupSelect = (group: MessageGroup) => {
    if (selectedGroup?.id === group.id) {
      setSelectedGroup(null);
      setSelectedCarriers([]);
    } else {
      setSelectedGroup(group);
      const groupCarriers = carrierData.filter(c => group.carrierIds.includes(c.id));
      setSelectedCarriers(groupCarriers);
    }
  };

  const handleSendMessage = () => {
    if (!messageSubject.trim() || !messageContent.trim() || selectedCarriers.length === 0) {
      toast({
        title: "Missing information",
        description: "Please provide a subject, message content, and select at least one recipient.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would send this to an API
    toast({
      title: "Message sent",
      description: `Your message has been sent to ${selectedCarriers.length} carrier(s).`
    });
    
    // Clear the form
    setMessageSubject('');
    setMessageContent('');
    setSelectedCarriers([]);
    setSelectedGroup(null);
  };

  const handleCreateGroup = () => {
    if (!newGroupName.trim() || newGroupCarriers.length === 0) {
      toast({
        title: "Missing information",
        description: "Please provide a group name and select at least one carrier.",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, we would send this to an API
    toast({
      title: "Group created",
      description: `Group "${newGroupName}" created with ${newGroupCarriers.length} carriers.`
    });
    
    // Close dialog and clear form
    setIsDialogOpen(false);
    setNewGroupName('');
    setNewGroupDescription('');
    setNewGroupCarriers([]);
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Carrier Messaging</h1>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Users className="mr-2 h-4 w-4" />
          Create Message Group
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1 space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <Tabs defaultValue="carriers" className="w-full">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="carriers">Carriers</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>
              
              <TabsContent value="carriers" className="space-y-4">
                <InputWithIcon 
                  icon={Search} 
                  placeholder="Search carriers..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                
                <div className="max-h-[500px] overflow-y-auto space-y-2">
                  {filteredCarriers.map((carrier) => (
                    <div 
                      key={carrier.id}
                      className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${
                        selectedCarriers.some(c => c.id === carrier.id) 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handleCarrierToggle(carrier)}
                    >
                      <div>
                        <p className="font-medium">{carrier.name}</p>
                        <p className="text-sm text-gray-500">{carrier.region}</p>
                      </div>
                      <div className={`w-4 h-4 rounded-full border ${
                        selectedCarriers.some(c => c.id === carrier.id) 
                          ? 'bg-blue-500 border-blue-500' 
                          : 'border-gray-400'
                      }`} />
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="groups" className="space-y-4">
                <div className="max-h-[500px] overflow-y-auto space-y-2">
                  {mockGroups.map((group) => (
                    <div 
                      key={group.id}
                      className={`p-3 rounded-md cursor-pointer ${
                        selectedGroup?.id === group.id 
                          ? 'bg-blue-50 border border-blue-200' 
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                      onClick={() => handleGroupSelect(group)}
                    >
                      <p className="font-medium">{group.name}</p>
                      <p className="text-sm text-gray-500">
                        {group.description || 'No description'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {group.carrierIds.length} carriers
                      </p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-lg shadow p-4">
            <Tabs defaultValue="compose" className="w-full" onValueChange={(v) => setCurrentView(v as any)}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="compose">Compose</TabsTrigger>
                <TabsTrigger value="sent">Sent</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>
              
              <TabsContent value="compose" className="space-y-4">
                <div className="mb-4">
                  <h2 className="text-lg font-medium mb-2">Recipients</h2>
                  {selectedCarriers.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedCarriers.map(carrier => (
                        <div key={carrier.id} className="bg-gray-100 px-2 py-1 rounded-md text-sm flex items-center">
                          {carrier.name}
                          <button 
                            className="ml-2 text-gray-500 hover:text-gray-700"
                            onClick={() => handleCarrierToggle(carrier)}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No recipients selected</p>
                  )}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Input 
                      placeholder="Subject" 
                      value={messageSubject}
                      onChange={(e) => setMessageSubject(e.target.value)}
                    />
                  </div>
                  <div>
                    <Textarea 
                      placeholder="Type your message here..." 
                      rows={8}
                      value={messageContent}
                      onChange={(e) => setMessageContent(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSendMessage}>
                    <Send className="mr-2 h-4 w-4" />
                    Send Message
                  </Button>
                </div>
              </TabsContent>
              
              <TabsContent value="sent" className="space-y-4">
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {mockMessages.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{message.subject}</h3>
                        <span className="text-xs text-gray-500">
                          {new Date(message.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{message.content}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>To: {message.recipientNames.join(', ')}</span>
                        {message.isGroupMessage && (
                          <span className="ml-2 bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                            Group Message
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="groups" className="space-y-4">
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {mockGroups.map((group) => (
                    <div key={group.id} className="border rounded-lg p-4">
                      <h3 className="font-medium">{group.name}</h3>
                      <p className="text-sm text-gray-700 mt-1">
                        {group.description || 'No description'}
                      </p>
                      <div className="mt-2">
                        <p className="text-xs font-medium text-gray-500">Members:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {carrierData
                            .filter(carrier => group.carrierIds.includes(carrier.id))
                            .map(carrier => (
                              <span key={carrier.id} className="text-xs bg-gray-100 px-2 py-0.5 rounded-md">
                                {carrier.name}
                              </span>
                            ))
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Message Group</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Group Name</label>
              <Input 
                placeholder="Enter group name" 
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Description (Optional)</label>
              <Textarea 
                placeholder="Enter group description" 
                value={newGroupDescription}
                onChange={(e) => setNewGroupDescription(e.target.value)}
              />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-1 block">Select Carriers</label>
              <div className="border rounded-md p-2 max-h-[200px] overflow-y-auto">
                {carrierData.map((carrier) => (
                  <div 
                    key={carrier.id}
                    className="flex items-center space-x-2 py-2"
                  >
                    <input 
                      type="checkbox" 
                      id={`carrier-${carrier.id}`} 
                      checked={newGroupCarriers.some(c => c.id === carrier.id)}
                      onChange={() => {
                        if (newGroupCarriers.some(c => c.id === carrier.id)) {
                          setNewGroupCarriers(newGroupCarriers.filter(c => c.id !== carrier.id));
                        } else {
                          setNewGroupCarriers([...newGroupCarriers, carrier]);
                        }
                      }}
                      className="rounded text-blue-500"
                    />
                    <label htmlFor={`carrier-${carrier.id}`} className="text-sm">
                      {carrier.name} - {carrier.region}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateGroup}>
              <Plus className="mr-2 h-4 w-4" />
              Create Group
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
