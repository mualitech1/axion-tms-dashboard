
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbProps {
  items: {
    label: string;
    path: string;
  }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const location = useLocation();
  
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground mb-4">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return (
          <div key={item.path} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
            {isLast ? (
              <span className="font-medium text-foreground">
                {item.label}
              </span>
            ) : (
              <Link
                to={item.path}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
