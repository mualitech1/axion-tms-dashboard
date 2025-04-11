
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
        <Button variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700">
          <span className="sr-only">Open menu</span>
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        <DropdownMenuItem onClick={() => {
          if (onEditUser) onEditUser(user);
        }} className="cursor-pointer">
          <Edit2 className="mr-2 h-4 w-4 text-blue-500" /> Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          if (onManage2FA) onManage2FA(user.id.toString());
        }} className="cursor-pointer">
          <Shield className="mr-2 h-4 w-4 text-purple-500" /> Manage 2FA
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Key className="mr-2 h-4 w-4 text-orange-500" /> Reset Password
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          if (onToggleUserStatus) onToggleUserStatus(user);
        }} className="cursor-pointer">
          <UserX className="mr-2 h-4 w-4 text-red-500" />
          {user.status === 'Active' ? 'Deactivate' : 'Activate'}
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <UserCog className="mr-2 h-4 w-4 text-gray-500" /> Permissions
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
