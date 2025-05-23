import { useState } from 'react';
import { User } from '../types';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { 
  Check, 
  X, 
  Trash2, 
  Users as UsersIcon,
  ChevronDown,
  UserPlus,
  UserMinus,
  Mail,
  CheckCircle,
  XCircle,
  Shield,
  MoreHorizontal,
} from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UserBulkActionsProps {
  selectedUsers: User[];
  onClearSelection: () => void;
  availableRoles: string[];
}

export default function UserBulkActions({ 
  selectedUsers, 
  onClearSelection,
  availableRoles
}: UserBulkActionsProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>('');
  
  const { toast } = useToast();
  
  const handleBulkActivate = () => {
    // In a real app, this would call an API to activate the users
    toast({
      title: "Users Activated",
      description: `${selectedUsers.length} users have been activated.`,
    });
    onClearSelection();
  };
  
  const handleBulkDeactivate = () => {
    // In a real app, this would call an API to deactivate the users
    toast({
      title: "Users Deactivated",
      description: `${selectedUsers.length} users have been deactivated.`,
    });
    onClearSelection();
  };
  
  const handleBulkDelete = () => {
    // In a real app, this would call an API to delete the users
    setIsDeleteDialogOpen(false);
    toast({
      title: "Users Deleted",
      description: `${selectedUsers.length} users have been deleted.`,
    });
    onClearSelection();
  };
  
  const handleBulkRoleAssign = () => {
    if (!selectedRole) return;
    
    // In a real app, this would call an API to assign the role
    setIsRoleDialogOpen(false);
    toast({
      title: "Role Assigned",
      description: `${selectedUsers.length} users have been assigned the ${selectedRole} role.`,
    });
    onClearSelection();
  };
  
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 font-medium">
          {selectedUsers.length} selected
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center bg-white border-gray-300 text-gray-700">
              <UsersIcon className="mr-2 h-4 w-4" />
              Bulk Actions
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-white">
            <DropdownMenuItem onClick={handleBulkActivate} className="cursor-pointer">
              <Check className="mr-2 h-4 w-4 text-green-500" /> Activate Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleBulkDeactivate} className="cursor-pointer">
              <X className="mr-2 h-4 w-4 text-red-500" /> Deactivate Users
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsRoleDialogOpen(true)} className="cursor-pointer">
              <UserPlus className="mr-2 h-4 w-4 text-blue-500" /> Assign Role
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={() => setIsDeleteDialogOpen(true)}
              className="text-red-600 focus:text-red-600 cursor-pointer"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Delete Users
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUsers.length} users? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              className="border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleBulkDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Role Assignment Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assign Role</DialogTitle>
            <DialogDescription>
              Select a role to assign to {selectedUsers.length} users.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select onValueChange={setSelectedRole} value={selectedRole}>
              <SelectTrigger className="w-full border-gray-300">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRoleDialogOpen(false)}
              className="border-gray-300 text-gray-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBulkRoleAssign}
              disabled={!selectedRole}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Assign Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
