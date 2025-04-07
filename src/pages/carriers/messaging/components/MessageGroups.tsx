
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Edit, Users } from 'lucide-react';
import { CarrierMessageGroup } from '../../data/types/carrierTypes';
import MessageGroupForm from './MessageGroupForm';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';

interface MessageGroupsProps {
  groups: CarrierMessageGroup[];
  onCreateGroup: (group: CarrierMessageGroup) => void;
}

export default function MessageGroups({ groups, onCreateGroup }: MessageGroupsProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCreateGroup = (group: CarrierMessageGroup) => {
    onCreateGroup(group);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Carrier Message Groups</CardTitle>
          <Button size="sm" onClick={() => setIsDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Group
          </Button>
        </CardHeader>
        <CardContent>
          {groups.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No groups have been created yet.
            </div>
          ) : (
            <div className="space-y-4">
              {groups.map((group) => (
                <Card key={group.id} className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium flex items-center">
                        <Users className="mr-2 h-4 w-4 text-muted-foreground" />
                        {group.name}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        Created {formatDistanceToNow(new Date(group.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mt-1">
                      {group.description || 'No description provided'}
                    </p>
                    
                    <div className="mt-4 space-y-2">
                      <div className="text-xs font-medium">Filters:</div>
                      <div className="flex flex-wrap gap-2">
                        {group.filters.status && (
                          <Badge variant="outline">Status: {group.filters.status}</Badge>
                        )}
                        
                        {group.filters.fleetType && (
                          <Badge variant="outline">Fleet: {group.filters.fleetType}</Badge>
                        )}
                        
                        {group.filters.complianceStatus && (
                          <Badge variant="outline">Compliance: {group.filters.complianceStatus}</Badge>
                        )}
                        
                        {group.filters.capabilities && group.filters.capabilities.map(cap => (
                          <Badge key={cap} variant="secondary">{cap}</Badge>
                        ))}
                        
                        {group.filters.regions && group.filters.regions.map(region => (
                          <Badge key={region} variant="secondary">{region}</Badge>
                        ))}
                        
                        {!group.filters.status && !group.filters.fleetType && 
                         !group.filters.complianceStatus && 
                         (!group.filters.capabilities || group.filters.capabilities.length === 0) &&
                         (!group.filters.regions || group.filters.regions.length === 0) && (
                          <span className="text-xs text-muted-foreground">No filters applied</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Button variant="outline" size="sm" disabled>
                        <Edit className="mr-2 h-3 w-3" />
                        Edit Group
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Message Group</DialogTitle>
          </DialogHeader>
          <MessageGroupForm onSubmit={handleCreateGroup} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
