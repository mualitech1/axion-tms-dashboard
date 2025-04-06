
import { useState, useRef, useEffect } from "react";
import { Send, Calendar, Users, Hash, AtSign, MessageSquare, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

type Mention = {
  id: string;
  name: string;
  initials: string;
};

type Category = {
  id: string;
  name: string;
  color: string;
};

type Note = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar?: string;
    initials: string;
  };
  timestamp: Date;
  category?: Category;
  mentions?: Mention[];
  parentId?: string;
  replies?: Note[];
};

const users: Mention[] = [
  { id: "u1", name: "John Doe", initials: "JD" },
  { id: "u2", name: "Sarah Johnson", initials: "SJ" },
  { id: "u3", name: "Mike Thompson", initials: "MT" },
  { id: "u4", name: "Alice Williams", initials: "AW" },
  { id: "u5", name: "Robert Brown", initials: "RB" },
];

const categories: Category[] = [
  { id: "cat1", name: "General", color: "bg-blue-100 text-blue-800" },
  { id: "cat2", name: "Customer", color: "bg-green-100 text-green-800" },
  { id: "cat3", name: "Issue", color: "bg-red-100 text-red-800" },
  { id: "cat4", name: "Request", color: "bg-amber-100 text-amber-800" },
  { id: "cat5", name: "Follow-up", color: "bg-purple-100 text-purple-800" },
];

const mockNotes: Note[] = [
  {
    id: "note1",
    text: "Customer called to confirm delivery time. They requested delivery between 9am-11am.",
    user: {
      name: "Sarah Johnson",
      initials: "SJ"
    },
    timestamp: new Date(2023, 6, 15, 14, 35),
    category: categories[1],
    mentions: [users[3]],
    replies: [
      {
        id: "reply1",
        text: "I've called the driver and confirmed they can meet this time window.",
        user: {
          name: "Mike Thompson",
          initials: "MT"
        },
        timestamp: new Date(2023, 6, 15, 15, 10),
        parentId: "note1"
      }
    ]
  },
  {
    id: "note2",
    text: "Driver reported traffic delays on I-95. ETA pushed back by 30 minutes.",
    user: {
      name: "Mike Thompson",
      initials: "MT"
    },
    timestamp: new Date(2023, 6, 15, 15, 20),
    category: categories[2]
  }
];

export function JobBackofficeTab() {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [newNote, setNewNote] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [showMentionsPopover, setShowMentionsPopover] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [mentions, setMentions] = useState<Mention[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Function to detect @ symbol for mentions
  useEffect(() => {
    if (newNote.includes("@") && newNote.lastIndexOf("@") === newNote.length - 1) {
      setShowMentionsPopover(true);
      setMentionFilter("");
    } else if (newNote.includes("@")) {
      const lastAtPos = newNote.lastIndexOf("@");
      const textAfterAt = newNote.substring(lastAtPos + 1);
      if (!textAfterAt.includes(" ")) {
        setMentionFilter(textAfterAt);
        setShowMentionsPopover(true);
      }
    }
  }, [newNote]);

  const filteredUsers = mentionFilter 
    ? users.filter(user => user.name.toLowerCase().includes(mentionFilter.toLowerCase()))
    : users;

  const handleAddNote = () => {
    if (!newNote.trim()) return;

    const newNoteObj: Note = {
      id: `note${Date.now()}`,
      text: newNote,
      user: {
        name: "John Doe", // Would come from auth context in real app
        initials: "JD"
      },
      timestamp: new Date(),
      mentions: mentions.length > 0 ? [...mentions] : undefined,
      category: selectedCategory ? categories.find(c => c.id === selectedCategory) : undefined
    };
    
    if (replyingTo) {
      // Adding a reply
      setNotes(prevNotes => {
        return prevNotes.map(note => {
          if (note.id === replyingTo) {
            return {
              ...note,
              replies: [...(note.replies || []), {
                ...newNoteObj,
                parentId: note.id
              }]
            };
          }
          return note;
        });
      });

      setReplyingTo(null);
      toast({
        title: "Reply added",
        description: "Your reply has been added to the thread."
      });
    } else {
      // Adding a new note
      setNotes([newNoteObj, ...notes]);
      toast({
        title: "Note added",
        description: "Your note has been added successfully."
      });
    }
    
    setNewNote("");
    setMentions([]);
    setSelectedCategory(null);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleAddNote();
    } else if (e.key === "Escape" && replyingTo) {
      setReplyingTo(null);
    }
  };

  const addMention = (user: Mention) => {
    // Replace the last @word with the user's name
    const lastAtPos = newNote.lastIndexOf("@");
    const newText = newNote.substring(0, lastAtPos) + `@${user.name} `;
    setNewNote(newText);
    setMentions([...mentions, user]);
    setShowMentionsPopover(false);
    
    // Focus back on textarea and move cursor to end
    if (textareaRef.current) {
      textareaRef.current.focus();
      const end = newText.length;
      textareaRef.current.setSelectionRange(end, end);
    }
  };

  const removeMention = (userId: string) => {
    setMentions(mentions.filter(m => m.id !== userId));
    // Also remove @Username from the text
    const user = mentions.find(m => m.id === userId);
    if (user) {
      setNewNote(newNote.replace(`@${user.name} `, ''));
    }
  };

  const startReply = (noteId: string) => {
    setReplyingTo(noteId);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Internal Notes</h3>
        <Select value={selectedCategory || ""} onValueChange={(value) => setSelectedCategory(value || null)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-2 ${category.color.split(' ')[0]}`}></span>
                  {category.name}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Card className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage alt="User" />
            <AvatarFallback className="bg-tms-blue-light text-tms-blue">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="relative">
              <Textarea
                placeholder={replyingTo ? "Write a reply..." : "Add an internal note..."}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                onKeyDown={handleKeyDown}
                className="resize-none mb-2"
                rows={3}
                ref={textareaRef}
              />
              
              {replyingTo && (
                <div className="absolute top-1 right-1">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setReplyingTo(null)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {showMentionsPopover && (
                <Popover open={showMentionsPopover} onOpenChange={setShowMentionsPopover}>
                  <PopoverTrigger asChild>
                    <div className="hidden"></div>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0" align="start">
                    <div className="max-h-48 overflow-y-auto">
                      {filteredUsers.length ? (
                        filteredUsers.map(user => (
                          <div 
                            key={user.id}
                            className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer"
                            onClick={() => addMention(user)}
                          >
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs bg-tms-blue-light text-tms-blue">
                                {user.initials}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{user.name}</span>
                          </div>
                        ))
                      ) : (
                        <div className="p-2 text-sm text-muted-foreground">No users found</div>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>

            {mentions.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {mentions.map(mention => (
                  <Badge key={mention.id} variant="secondary" className="flex items-center gap-1">
                    <AtSign className="h-3 w-3" />
                    {mention.name}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-4 w-4 p-0 ml-1" 
                      onClick={() => removeMention(mention.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-7 px-2">
                      <AtSign className="h-3.5 w-3.5 mr-1" />
                      Mention
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-0">
                    <div className="p-1">
                      <Input 
                        placeholder="Search users..." 
                        className="mb-1"
                        onChange={(e) => setMentionFilter(e.target.value)}  
                      />
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {filteredUsers.map(user => (
                        <div 
                          key={user.id}
                          className="flex items-center gap-2 p-2 hover:bg-muted cursor-pointer"
                          onClick={() => addMention(user)}
                        >
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs bg-tms-blue-light text-tms-blue">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{user.name}</span>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Select onValueChange={setSelectedCategory}>
                  <SelectTrigger className="h-7 w-[130px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <div className="flex items-center">
                          <span className={`w-2 h-2 rounded-full mr-2 ${category.color.split(' ')[0]}`}></span>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center">
                <p className="text-xs text-muted-foreground mr-2">
                  {replyingTo ? "Press Ctrl+Enter to reply" : "Press Ctrl+Enter to submit"}
                </p>
                <Button size="sm" onClick={handleAddNote} disabled={!newNote.trim()}>
                  <Send className="h-4 w-4 mr-1" />
                  {replyingTo ? 'Reply' : 'Add Note'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <div className="space-y-4 mt-6">
        {notes.map((note) => (
          <Card key={note.id} className="p-4">
            <div className="space-y-3">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={note.user.avatar} alt={note.user.name} />
                  <AvatarFallback className="bg-tms-blue-light text-tms-blue">
                    {note.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm font-medium">{note.user.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {format(note.timestamp, "MMM d, yyyy 'at' h:mm a")}
                      </div>
                    </div>
                    {note.category && (
                      <Badge className={note.category.color}>
                        {note.category.name}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm mt-2">{note.text}</p>
                  
                  {note.mentions && note.mentions.length > 0 && (
                    <div className="flex mt-1 gap-1">
                      <Users className="h-3.5 w-3.5 text-muted-foreground" />
                      <div className="flex gap-1">
                        {note.mentions.map((user, index) => (
                          <span key={user.id} className="text-xs text-tms-blue">
                            @{user.name}{index < note.mentions!.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 text-xs"
                      onClick={() => startReply(note.id)}
                    >
                      <MessageSquare className="h-3.5 w-3.5 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
              
              {/* Replies section */}
              {note.replies && note.replies.length > 0 && (
                <div className="ml-8 pl-4 border-l-2 border-muted space-y-3">
                  {note.replies.map(reply => (
                    <div key={reply.id} className="flex gap-3 pt-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                        <AvatarFallback className="bg-tms-blue-light text-tms-blue text-xs">
                          {reply.user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-sm font-medium">{reply.user.name}</p>
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {format(reply.timestamp, "MMM d, yyyy 'at' h:mm a")}
                          </div>
                        </div>
                        <p className="text-sm mt-1">{reply.text}</p>
                        
                        {reply.mentions && reply.mentions.length > 0 && (
                          <div className="flex mt-1 gap-1">
                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                            <div className="flex gap-1">
                              {reply.mentions.map((user, index) => (
                                <span key={user.id} className="text-xs text-tms-blue">
                                  @{user.name}{index < reply.mentions!.length - 1 ? ', ' : ''}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

