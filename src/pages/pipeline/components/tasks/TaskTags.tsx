
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Tag, Edit, X, Save } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Sample tags data
const initialTagsData = [
  { 
    id: 'tag-1', 
    name: 'high-priority',
    count: 5,
    color: 'destructive',
    description: 'Tasks that need immediate attention'
  },
  { 
    id: 'tag-2', 
    name: 'meeting',
    count: 8,
    color: 'default',
    description: 'Scheduled meetings with leads or clients'
  },
  { 
    id: 'tag-3', 
    name: 'contract',
    count: 3,
    color: 'secondary',
    description: 'Contract related tasks'
  },
  { 
    id: 'tag-4', 
    name: 'proposal',
    count: 4,
    color: 'secondary',
    description: 'Proposal creation and delivery'
  },
  { 
    id: 'tag-5', 
    name: 'follow-up',
    count: 6,
    color: 'outline',
    description: 'Follow up with leads or clients'
  },
  { 
    id: 'tag-6', 
    name: 'documentation',
    count: 2,
    color: 'secondary',
    description: 'Documentation tasks'
  }
];

const colorOptions = [
  { value: 'default', label: 'Blue' },
  { value: 'destructive', label: 'Red' },
  { value: 'secondary', label: 'Gray' },
  { value: 'outline', label: 'Outline' }
];

export default function TaskTags() {
  const [tags, setTags] = useState(initialTagsData);
  const [newTagName, setNewTagName] = useState('');
  const [newTagColor, setNewTagColor] = useState('default');
  const [newTagDescription, setNewTagDescription] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState({
    name: '',
    color: '',
    description: ''
  });
  
  const handleAddTag = () => {
    if (!newTagName.trim()) {
      toast({
        title: "Error",
        description: "Tag name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    // Check if tag already exists
    if (tags.some(tag => tag.name === newTagName.trim())) {
      toast({
        title: "Error",
        description: "Tag already exists",
        variant: "destructive"
      });
      return;
    }
    
    const newTag = {
      id: `tag-${Date.now()}`,
      name: newTagName.trim(),
      count: 0,
      color: newTagColor,
      description: newTagDescription.trim()
    };
    
    setTags([...tags, newTag]);
    setNewTagName('');
    setNewTagColor('default');
    setNewTagDescription('');
    setShowAddForm(false);
    
    toast({
      title: "Tag Created",
      description: `Tag "${newTag.name}" has been created`
    });
  };
  
  const handleEditStart = (tag: typeof tags[0]) => {
    setEditingTagId(tag.id);
    setEditForm({
      name: tag.name,
      color: tag.color,
      description: tag.description
    });
  };
  
  const handleEditSave = (tagId: string) => {
    if (!editForm.name.trim()) {
      toast({
        title: "Error",
        description: "Tag name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    setTags(tags.map(tag => 
      tag.id === tagId 
        ? { ...tag, name: editForm.name, color: editForm.color, description: editForm.description }
        : tag
    ));
    
    setEditingTagId(null);
    
    toast({
      title: "Tag Updated",
      description: `Tag "${editForm.name}" has been updated`
    });
  };
  
  const handleDeleteTag = (tagId: string) => {
    const tagToDelete = tags.find(tag => tag.id === tagId);
    
    setTags(tags.filter(tag => tag.id !== tagId));
    
    toast({
      title: "Tag Deleted",
      description: `Tag "${tagToDelete?.name}" has been deleted`
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Tag Management</CardTitle>
          <Button 
            onClick={() => setShowAddForm(!showAddForm)} 
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Tag
          </Button>
        </CardHeader>
        
        <CardContent>
          {showAddForm && (
            <div className="bg-muted/40 border rounded-lg p-4 mb-6 space-y-4">
              <div className="flex items-center">
                <Input 
                  placeholder="Tag name" 
                  value={newTagName}
                  onChange={(e) => setNewTagName(e.target.value)}
                  className="flex-grow mr-2"
                />
                <select 
                  value={newTagColor}
                  onChange={(e) => setNewTagColor(e.target.value)}
                  className="px-3 py-1.5 border rounded-md bg-background"
                >
                  {colorOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
              
              <Input 
                placeholder="Description (optional)" 
                value={newTagDescription}
                onChange={(e) => setNewTagDescription(e.target.value)}
              />
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
                <Button onClick={handleAddTag}>Add Tag</Button>
              </div>
            </div>
          )}
          
          <div className="divide-y">
            {tags.map(tag => (
              <div key={tag.id} className="py-3 first:pt-0 last:pb-0">
                {editingTagId === tag.id ? (
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Input 
                        value={editForm.name}
                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        className="flex-grow mr-2"
                      />
                      <select 
                        value={editForm.color}
                        onChange={(e) => setEditForm({...editForm, color: e.target.value})}
                        className="px-3 py-1.5 border rounded-md bg-background"
                      >
                        {colorOptions.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <Input 
                      value={editForm.description}
                      onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                      placeholder="Description (optional)"
                    />
                    
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setEditingTagId(null)}>Cancel</Button>
                      <Button onClick={() => handleEditSave(tag.id)}>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge variant={tag.color as any}>{tag.name}</Badge>
                          <span className="text-xs text-muted-foreground">({tag.count} tasks)</span>
                        </div>
                        {tag.description && (
                          <p className="text-sm text-muted-foreground mt-1">{tag.description}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditStart(tag)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
