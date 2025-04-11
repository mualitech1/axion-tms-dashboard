
import { Badge } from '@/components/ui/badge';

interface UserRoleBadgeProps {
  role: string;
}

export default function UserRoleBadge({ role }: UserRoleBadgeProps) {
  return (
    <Badge variant="outline" className={
      role.toLowerCase().includes('admin') 
        ? 'border-tms-blue text-tms-blue' 
        : ''
    }>
      {role}
    </Badge>
  );
}
