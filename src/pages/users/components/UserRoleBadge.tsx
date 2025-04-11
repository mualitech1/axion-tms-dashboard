
import { Badge } from '@/components/ui/badge';

interface UserRoleBadgeProps {
  role: string;
}

export default function UserRoleBadge({ role }: UserRoleBadgeProps) {
  // Define badge colors based on role
  let badgeClass = "text-xs";
  
  switch (role.toLowerCase()) {
    case 'admin':
      badgeClass += " bg-purple-100 text-purple-800 border-purple-200";
      break;
    case 'senior management':
      badgeClass += " bg-blue-100 text-blue-800 border-blue-200";
      break;
    case 'operations':
      badgeClass += " bg-green-100 text-green-800 border-green-200";
      break;
    case 'accounts':
      badgeClass += " bg-yellow-100 text-yellow-800 border-yellow-200";
      break;
    case 'sales':
      badgeClass += " bg-orange-100 text-orange-800 border-orange-200";
      break;
    default:
      badgeClass += " bg-gray-100 text-gray-800 border-gray-200";
  }
  
  return (
    <Badge variant="outline" className={badgeClass}>
      {role}
    </Badge>
  );
}
