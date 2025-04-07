
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';
import { CarrierMessageGroup } from '../../data/types/carrierTypes';

interface ComposeMessageProps {
  groups: CarrierMessageGroup[];
  onSendMessage: (subject: string, content: string, groupId: string) => void;
}

export default function ComposeMessage({ groups, onSendMessage }: ComposeMessageProps) {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !content.trim() || !selectedGroupId) {
      return;
    }
    
    onSendMessage(subject, content, selectedGroupId);
    
    // Reset form
    setSubject('');
    setContent('');
    setSelectedGroupId('');
  };

  const selectedGroup = selectedGroupId ? groups.find(g => g.id === selectedGroupId) : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Compose Broadcast Message</CardTitle>
        <CardDescription>
          Create messages to broadcast to groups of carriers
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Group</Label>
            <Select value={selectedGroupId} onValueChange={setSelectedGroupId}>
              <SelectTrigger id="recipient">
                <SelectValue placeholder="Select a carrier group" />
              </SelectTrigger>
              <SelectContent>
                {groups.map(group => (
                  <SelectItem key={group.id} value={group.id}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedGroup && (
              <p className="text-sm text-muted-foreground">
                {selectedGroup.description}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              placeholder="Message subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message content here..."
              rows={8}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <Button 
            type="submit" 
            className="w-full md:w-auto"
            disabled={!subject.trim() || !content.trim() || !selectedGroupId}
          >
            <Send className="mr-2 h-4 w-4" />
            Send Broadcast
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
