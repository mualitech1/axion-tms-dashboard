
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Plus, Tag, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { Lead } from '../../data/pipelineTypes';
import { toast } from '@/hooks/use-toast';

interface LeadNotesCardProps {
  form: UseFormReturn<Lead>;
  tags: string[];
  onSave: () => void;
}

export default function LeadNotesCard({ form, tags, onSave }: LeadNotesCardProps) {
  const [availableTags, setAvailableTags] = useState(tags);
  const [newTag, setNewTag] = useState('');

  // Add a new tag to the lead
  const addTag = () => {
    if (!newTag.trim()) return;
    
    // Check if tag already exists
    if (availableTags.includes(newTag.trim())) {
      toast({
        title: "Tag already exists",
        description: "This tag is already in the list",
        variant: "destructive"
      });
      return;
    }
    
    setAvailableTags([...availableTags, newTag.trim()]);
    setNewTag('');
    
    // Update the form to include tags
    const currentNotes = form.getValues('notes') || '';
    const tagsLine = currentNotes.includes('#tags:') 
      ? currentNotes.replace(/#tags:.*/, `#tags: ${[...availableTags, newTag.trim()].join(', ')}`)
      : `${currentNotes}\n#tags: ${[...availableTags, newTag.trim()].join(', ')}`;
      
    form.setValue('notes', tagsLine);
  };

  // Remove a tag from the lead
  const removeTag = (tagToRemove: string) => {
    const updatedTags = availableTags.filter(tag => tag !== tagToRemove);
    setAvailableTags(updatedTags);
    
    // Update the form to reflect removed tag
    const currentNotes = form.getValues('notes') || '';
    const tagsLine = currentNotes.includes('#tags:') 
      ? currentNotes.replace(/#tags:.*/, `#tags: ${updatedTags.join(', ')}`)
      : currentNotes;
      
    form.setValue('notes', tagsLine);
  };

  // Handle save with integration notification
  const handleSave = () => {
    onSave();
    toast({
      title: "Notes saved",
      description: "Notes have been saved and synced with the TMS system"
    });
  };

  return (
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>Notes</CardTitle>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Enter notes about this lead..."
                  className="min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center mt-4">
          <Tag className="h-4 w-4 mr-2 text-muted-foreground" />
          <Input
            placeholder="Add a tag..."
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="flex-grow"
            onKeyDown={(e) => e.key === 'Enter' && addTag()}
          />
          <Button variant="outline" size="icon" className="ml-2" onClick={addTag}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex flex-wrap gap-2">
          {availableTags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
        <Button onClick={handleSave}>
          Save Notes
        </Button>
      </CardFooter>
    </Card>
  );
}
