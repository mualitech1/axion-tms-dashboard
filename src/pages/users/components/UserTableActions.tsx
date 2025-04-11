
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Edit2, 
  MoreVertical, 
  UserX, 
  Shield, 
  Key, 
  UserCog
} from 'lucide-react';
import { User } from '../types';

interface UserTableActionsProps {
  user: User;
  onEditUser?: (user: User) => void;
  onToggleUserStatus?: (user: User) => void;
  onManage2FA?: (userId: string) => void;
}

export default function UserTableActions({ 
  user, 
  onEditUser, 
  onToggleUserStatus,
  onManage2FA 
}: UserTableActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {
          if (onEditUser) onEditUser(user);
        }}>
          <Edit2 className="mr-2 h-4 w-4" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          if (onManage2FA) onManage2FA(user.id.toString());
        }}>
          <Shield className="mr-2 h-4 w-4" /> Manage 2FA
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Key className="mr-2 h-4 w-4" /> Reset Password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          if (onToggleUserStatus) onToggleUserStatus(user);
        }}>
          <UserX className="mr-2 h-4 w-4" />
          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
        <DropdownMenuItem>
          <UserCog className="mr-2 h-4 w-4" /> Permissions
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
