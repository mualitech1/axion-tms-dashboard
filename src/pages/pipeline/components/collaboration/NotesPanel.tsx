
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Send, User } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

interface Note {
  id: string;
  leadId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
}

// Sample notes data (in a real app, this would come from an API)
const initialNotes: Note[] = [
  {
    id: 'note-1',
    leadId: 'lead-1',
    userId: 'user-1',
    userName: 'John Doe',
    content: 'Had a great call with Jane today. She seems very interested in our premium transport solutions and has requested detailed pricing.',
    timestamp: '2025-04-05T15:30:00'
  },
  {
    id: 'note-2',
    leadId: 'lead-1',
    userId: 'user-2',
    userName: 'Sarah Wilson',
    content: 'I sent over the pricing details. Jane mentioned they are comparing our offer with one other provider.',
    timestamp: '2025-04-06T10:15:00'
  },
  {
    id: 'note-3',
    leadId: 'lead-2',
    userId: 'user-3',
    userName: 'Alice Thompson',
    content: 'Robert from Global Freight has concerns about our delivery timeframes. Need to schedule a follow-up call to address these.',
    timestamp: '2025-04-04T09:45:00'
  },
  {
    id: 'note-4',
    leadId: 'lead-3',
    userId: 'user-1',
    userName: 'John Doe',
    content: 'Quick Deliveries are ready to move forward. Sarah (CEO) wants to sign the contract next week.',
    timestamp: '2025-04-01T14:20:00'
  }
];

interface NotesPanelProps {
  leadId?: string;
  hideTitle?: boolean;
}

export default function NotesPanel({ leadId, hideTitle = false }: NotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNote, setNewNote] = useState('');
  
  const filteredNotes = leadId 
    ? notes.filter(note => note.leadId === leadId)
    : notes;
  
  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast({
        title: "Note Error",
        description: "Please enter some content for the note",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, the current user details would come from authentication context
    const currentUser = {
      id: 'user-1',
      name: 'John Doe'
    };
    
    const note: Note = {
      id: `note-${Date.now()}`,
      leadId: leadId || '',
      userId: currentUser.id,
      userName: currentUser.name,
      content: newNote,
      timestamp: new Date().toISOString()
    };
    
    setNotes([note, ...notes]);
    setNewNote('');
    
    toast({
      title: "Note Added",
      description: "Your note has been added successfully",
    });
  };
  
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  
  return (
    <Card>
      {!hideTitle && (
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Notes & Updates
          </CardTitle>
        </CardHeader>
      )}
      
      <CardContent className={hideTitle ? "pt-4" : ""}>
        <div className="space-y-6 max-h-[400px] overflow-y-auto pb-4">
          {filteredNotes.length === 0 ? (
            <div className="text-center py-6">
              <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground opacity-20" />
              <p className="mt-2 text-sm text-muted-foreground">No notes yet</p>
            </div>
          ) : (
            filteredNotes.map(note => (
              <div key={note.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {getInitials(note.userName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-center">
                    <p className="text-sm font-medium">{note.userName}</p>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(note.timestamp), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm">{note.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <div className="flex w-full gap-2">
          <Textarea 
            placeholder="Add a note..." 
            className="flex-1"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
          />
          <Button onClick={handleAddNote} className="self-end">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
