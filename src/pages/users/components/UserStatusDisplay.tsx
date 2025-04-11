
import { Switch } from '@/components/ui/switch';
import { User } from '../types';

interface UserStatusDisplayProps {
  user: User;
  onToggleUserStatus?: (user: User) => void;
}

export default function UserStatusDisplay({ 
  user, 
  onToggleUserStatus 
}: UserStatusDisplayProps) {
  return (
    <div className="flex items-center">
      <Switch 
        checked={user.status === 'Active'} 
        onCheckedChange={() => {
          if (onToggleUserStatus) onToggleUserStatus(user);
        }}
        className="scale-75 origin-left"
      />
      <span className={`ml-2 text-xs ${
        user.status === 'Active' 
          ? 'text-tms-green' 
          : 'text-tms-red'
      }`}>
        {user.status}
      </span>
    </div>
  );
}
