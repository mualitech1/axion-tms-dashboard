
import { useState } from "react";
import { Send, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

type Note = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  timestamp: Date;
};

const mockNotes: Note[] = [
  {
    id: "note1",
    text: "Customer called to confirm delivery time. They requested delivery between 9am-11am.",
    user: {
      name: "Sarah Johnson",
      initials: "SJ"
    },
    timestamp: new Date(2023, 6, 15, 14, 35)
  },
  {
    id: "note2",
    text: "Driver reported traffic delays on I-95. ETA pushed back by 30 minutes.",
    user: {
      name: "Mike Thompson",
      initials: "MT"
    },
    timestamp: new Date(2023, 6, 15, 15, 20)
  }
];

export function JobBackofficeTab() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [newNote, setNewNote] = useState("");
  
  const handleAddNote = () => {
    if (!newNote.trim()) return;
    
    const note: Note = {
      id: `note${Date.now()}`,
      text: newNote,
      user: {
        name: "John Doe", // Would come from auth context in real app
        initials: "JD"
      },
      timestamp: new Date()
    };
    
    setNotes([note, ...notes]);
    setNewNote("");
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleAddNote();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium">Internal Notes</h3>
      
      <Card className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage alt="User" />
            <AvatarFallback className="bg-tms-blue-light text-tms-blue">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="Add an internal note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={handleKeyDown}
              className="resize-none mb-2"
              rows={3}
            />
            <div className="flex justify-between items-center">
              <p className="text-xs text-muted-foreground">
                Press Ctrl+Enter to submit
              </p>
              <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                <Send className="h-4 w-4 mr-1" />
                Add Note
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="space-y-4 mt-6">
        {notes.map((note) => (
          <Card key={note.id} className="p-4">
            <div className="flex gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={note.user.avatar} alt={note.user.name} />
                <AvatarFallback className="bg-tms-blue-light text-tms-blue">
                  {note.user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="text-sm font-medium">{note.user.name}</p>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {format(note.timestamp, "MMM d, yyyy 'at' h:mm a")}
                  </div>
                </div>
                <p className="text-sm mt-1">{note.text}</p>
              </div>
            </div>
          </Card>
        ))}
        
        {notes.length === 0 && (
          <p className="text-sm text-center text-muted-foreground py-4">
            No notes added yet
          </p>
        )}
      </div>
    </div>
  );
}
