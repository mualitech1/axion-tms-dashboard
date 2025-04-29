
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Search, Send, Users, Plus, MessageCircle } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { InputWithIcon } from '@/components/ui/input-with-icon';
import { useToast } from '@/hooks/use-toast';
import { carrierData } from './data/carrierData';
import { Message, MessageGroup, Carrier } from './data/types/carrierTypes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

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
    <MainLayout title="Carrier Messaging">
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
            Carrier Messaging
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }} 
            animate={{ y: 0, opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="opacity-90"
          >
            Send targeted messages to individual carriers or create message groups for efficient communication
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="flex gap-2 mt-4"
          >
            <Link to="/carriers/broadcast">
              <Button className="bg-white/20 hover:bg-white/30 text-white">
                <MessageCircle className="mr-2 h-4 w-4" />
                Switch to Broadcast
              </Button>
            </Link>
          </motion.div>
        </div>

        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold text-aximo-text">Direct Messaging</h2>
          <Button onClick={() => setIsDialogOpen(true)} className="bg-aximo-primary hover:bg-aximo-primary/80">
            <Users className="mr-2 h-4 w-4" />
            Create Message Group
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            className="col-span-1 space-y-4"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="bg-aximo-card border-aximo-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-aximo-text font-medium text-base">Select Recipients</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="carriers" className="w-full">
                  <TabsList className="grid grid-cols-2 mb-4 bg-aximo-darker">
                    <TabsTrigger value="carriers" className="data-[state=active]:bg-aximo-primary data-[state=active]:text-white">Carriers</TabsTrigger>
                    <TabsTrigger value="groups" className="data-[state=active]:bg-aximo-primary data-[state=active]:text-white">Groups</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="carriers" className="space-y-4">
                    <InputWithIcon 
                      icon={Search} 
                      placeholder="Search carriers..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-aximo-darker border-aximo-border text-aximo-text"
                    />
                    
                    <div className="max-h-[500px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-aximo-border">
                      {filteredCarriers.map((carrier) => (
                        <motion.div 
                          key={carrier.id}
                          className={`p-3 rounded-md cursor-pointer flex items-center justify-between ${
                            selectedCarriers.some(c => c.id === carrier.id) 
                              ? 'bg-aximo-primary/20 border border-aximo-primary/30' 
                              : 'bg-aximo-darker hover:bg-aximo-darker/70'
                          }`}
                          onClick={() => handleCarrierToggle(carrier)}
                          whileHover={{ scale: 1.01 }}
                        >
                          <div>
                            <p className="font-medium text-aximo-text">{carrier.name}</p>
                            <p className="text-sm text-aximo-text-secondary">{carrier.region}</p>
                          </div>
                          <div className={`w-4 h-4 rounded-full border ${
                            selectedCarriers.some(c => c.id === carrier.id) 
                              ? 'bg-aximo-primary border-aximo-primary' 
                              : 'border-aximo-border'
                          }`} />
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="groups" className="space-y-4">
                    <div className="max-h-[500px] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-aximo-border">
                      {mockGroups.map((group) => (
                        <motion.div 
                          key={group.id}
                          className={`p-3 rounded-md cursor-pointer ${
                            selectedGroup?.id === group.id 
                              ? 'bg-aximo-primary/20 border border-aximo-primary/30' 
                              : 'bg-aximo-darker hover:bg-aximo-darker/70'
                          }`}
                          onClick={() => handleGroupSelect(group)}
                          whileHover={{ scale: 1.01 }}
                        >
                          <p className="font-medium text-aximo-text">{group.name}</p>
                          <p className="text-sm text-aximo-text-secondary">
                            {group.description || 'No description'}
                          </p>
                          <p className="text-xs text-aximo-text-secondary mt-1">
                            {group.carrierIds.length} carriers
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div 
            className="col-span-1 md:col-span-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="bg-aximo-card border-aximo-border">
              <CardContent className="p-4">
                <Tabs defaultValue="compose" className="w-full" onValueChange={(v) => setCurrentView(v as any)}>
                  <TabsList className="grid grid-cols-3 mb-4 bg-aximo-darker">
                    <TabsTrigger value="compose" className="data-[state=active]:bg-aximo-primary data-[state=active]:text-white">Compose</TabsTrigger>
                    <TabsTrigger value="sent" className="data-[state=active]:bg-aximo-primary data-[state=active]:text-white">Sent</TabsTrigger>
                    <TabsTrigger value="groups" className="data-[state=active]:bg-aximo-primary data-[state=active]:text-white">Groups</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="compose" className="space-y-4">
                    <div className="mb-4">
                      <h2 className="text-lg font-medium mb-2 text-aximo-text">Recipients</h2>
                      {selectedCarriers.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                          {selectedCarriers.map(carrier => (
                            <div key={carrier.id} className="bg-aximo-darker px-2 py-1 rounded-md text-sm flex items-center text-aximo-text">
                              {carrier.name}
                              <button 
                                className="ml-2 text-aximo-text-secondary hover:text-aximo-text"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleCarrierToggle(carrier);
                                }}
                              >
                                &times;
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-aximo-text-secondary">No recipients selected</p>
                      )}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Input 
                          placeholder="Subject" 
                          value={messageSubject}
                          onChange={(e) => setMessageSubject(e.target.value)}
                          className="bg-aximo-darker border-aximo-border text-aximo-text"
                        />
                      </div>
                      <div>
                        <Textarea 
                          placeholder="Type your message here..." 
                          rows={8}
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          className="bg-aximo-darker border-aximo-border text-aximo-text resize-none"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button onClick={handleSendMessage} className="bg-aximo-primary hover:bg-aximo-primary/80">
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="sent" className="space-y-4">
                    <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-aximo-border">
                      {mockMessages.map((message) => (
                        <Card key={message.id} className="bg-aximo-darker border-aximo-border overflow-hidden">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium text-aximo-text">{message.subject}</h3>
                              <span className="text-xs text-aximo-text-secondary">
                                {new Date(message.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-aximo-text mb-2">{message.content}</p>
                            <div className="flex items-center text-xs text-aximo-text-secondary">
                              <span>To: {message.recipientNames.join(', ')}</span>
                              {message.isGroupMessage && (
                                <Badge variant="secondary" className="ml-2">
                                  Group Message
                                </Badge>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="groups" className="space-y-4">
                    <div className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-aximo-border">
                      {mockGroups.map((group) => (
                        <Card key={group.id} className="bg-aximo-darker border-aximo-border overflow-hidden">
                          <CardContent className="p-4">
                            <h3 className="font-medium text-aximo-text">{group.name}</h3>
                            <p className="text-sm text-aximo-text-secondary mt-1">
                              {group.description || 'No description'}
                            </p>
                            <div className="mt-2">
                              <p className="text-xs font-medium text-aximo-text-secondary">Members:</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {carrierData
                                  .filter(carrier => group.carrierIds.includes(carrier.id))
                                  .map(carrier => (
                                    <span key={carrier.id} className="text-xs bg-aximo-card px-2 py-0.5 rounded-md text-aximo-text">
                                      {carrier.name}
                                    </span>
                                  ))
                                }
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md bg-aximo-card border-aximo-border text-aximo-text">
            <DialogHeader>
              <DialogTitle className="text-aximo-text">Create Message Group</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <label className="text-sm font-medium mb-1 block text-aximo-text">Group Name</label>
                <Input 
                  placeholder="Enter group name" 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  className="bg-aximo-darker border-aximo-border text-aximo-text"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block text-aximo-text">Description (Optional)</label>
                <Textarea 
                  placeholder="Enter group description" 
                  value={newGroupDescription}
                  onChange={(e) => setNewGroupDescription(e.target.value)}
                  className="bg-aximo-darker border-aximo-border text-aximo-text resize-none"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block text-aximo-text">Select Carriers</label>
                <div className="border border-aximo-border rounded-md p-2 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-aximo-border">
                  {carrierData.map((carrier) => (
                    <div 
                      key={carrier.id}
                      className="flex items-center space-x-2 py-2 text-aximo-text"
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
                        className="rounded text-aximo-primary bg-aximo-darker border-aximo-border"
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
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="border-aximo-border text-aximo-text">
                Cancel
              </Button>
              <Button onClick={handleCreateGroup} className="bg-aximo-primary hover:bg-aximo-primary/80">
                <Plus className="mr-2 h-4 w-4" />
                Create Group
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>
    </MainLayout>
  );
}
