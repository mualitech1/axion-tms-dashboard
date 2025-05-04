
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Permission, permissionService } from "@/services/permission-service";
import { User } from "../types";
import { Loader2 } from "lucide-react";

interface UserPermissionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user: User;
}

export function UserPermissionsDialog({
  open,
  onOpenChange,
  user
}: UserPermissionsDialogProps) {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Fetch all available permissions when the dialog opens
  useEffect(() => {
    const loadPermissions = async () => {
      if (open) {
        setLoading(true);
        try {
          const allPermissions = await permissionService.getPermissions();
          setPermissions(allPermissions);
          
          // TODO: In a real app, we would fetch the user's current permissions
          // For now, just setting a few default ones for demonstration
          setSelectedPermissionIds(
            allPermissions
              .filter(p => p.name.includes('view'))
              .map(p => p.id!)
              .slice(0, 2)
          );
        } catch (error) {
          console.error("Failed to load permissions:", error);
          toast({
            title: "Error",
            description: "Failed to load permissions",
            variant: "destructive"
          });
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadPermissions();
  }, [open]);
  
  const handleTogglePermission = (permissionId: string) => {
    setSelectedPermissionIds(current => {
      if (current.includes(permissionId)) {
        return current.filter(id => id !== permissionId);
      } else {
        return [...current, permissionId];
      }
    });
  };
  
  const handleSave = async () => {
    setSubmitting(true);
    try {
      // In a real application, we would do this:
      // 1. Fetch current permissions
      // 2. Compare with selected permissions
      // 3. Add newly selected permissions
      // 4. Remove deselected permissions
      
      // For demo purposes, we'll just show a success message
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Permissions Updated",
        description: `Permissions for ${user.name} have been updated successfully.`
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error("Failed to update permissions:", error);
      toast({
        title: "Error",
        description: "Failed to update user permissions",
        variant: "destructive"
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Group permissions by resource type
  const groupedPermissions: Record<string, Permission[]> = {};
  permissions.forEach(permission => {
    if (!groupedPermissions[permission.resource]) {
      groupedPermissions[permission.resource] = [];
    }
    groupedPermissions[permission.resource].push(permission);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Manage Permissions</DialogTitle>
          <DialogDescription>
            Configure individual permissions for {user.name}
          </DialogDescription>
        </DialogHeader>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="py-4 max-h-[60vh] overflow-y-auto pr-2">
            {Object.keys(groupedPermissions).map(resource => (
              <div key={resource} className="mb-6">
                <h3 className="text-lg font-medium capitalize mb-2">{resource} Permissions</h3>
                <div className="space-y-2 border rounded-md p-3 bg-muted/20">
                  {groupedPermissions[resource].map(permission => (
                    <div key={permission.id} className="flex items-start space-x-2">
                      <Checkbox 
                        id={`permission-${permission.id}`}
                        checked={selectedPermissionIds.includes(permission.id!)}
                        onCheckedChange={() => handleTogglePermission(permission.id!)}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <label
                          htmlFor={`permission-${permission.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {permission.name.replace(/_/g, ' ')}
                        </label>
                        {permission.description && (
                          <p className="text-xs text-muted-foreground">
                            {permission.description}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={submitting}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={loading || submitting}>
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
