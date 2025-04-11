
import { User } from '../types';
import { Switch } from '@/components/ui/switch';

interface UserStatusDisplayProps {
  user: User;
  onToggleUserStatus?: (user: User) => void;
}

export default function UserStatusDisplay({ user, onToggleUserStatus }: UserStatusDisplayProps) {
  const isActive = user.status === 'Active';

  return (
    <div className="flex items-center gap-2">
      <Switch 
        checked={isActive}
        onCheckedChange={() => {
          if (onToggleUserStatus) {
            onToggleUserStatus(user);
          }
        }}
        className="data-[state=checked]:bg-blue-600"
      />
      <span className={`text-sm ${isActive ? 'text-green-600' : 'text-red-600'}`}>
        {isActive ? 'Active' : 'Inactive'}
      </span>
    </div>
  );
}
