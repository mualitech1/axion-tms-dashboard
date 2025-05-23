import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { AxionLogo } from '@/components/axion-logo/AxionLogo';

interface MobileHeaderProps {
  title?: string;
  onMenuClick: () => void;
}

export function MobileHeader({ title, onMenuClick }: MobileHeaderProps) {
  return (
    <div className="h-16 md:hidden flex items-center justify-between px-4 border-b border-aximo-border bg-aximo-dark/90 backdrop-blur-md sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-md hover:bg-aximo-border text-aximo-text-primary"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <AxionLogo variant="divine" size="sm" animated={false} />
      </div>
      
      {title && (
        <div className="text-sm font-medium text-aximo-text-primary truncate max-w-[180px]">
          {title}
        </div>
      )}
    </div>
  );
} 