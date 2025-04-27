
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-react';

interface BadgeDeltaProps {
  value: number;
  className?: string;
  variant?: 'success' | 'danger' | 'neutral' | 'auto';
  showArrow?: boolean;
  prefix?: string;
  suffix?: string;
}

export function BadgeDelta({
  value,
  className,
  variant = 'auto',
  showArrow = true,
  prefix = '',
  suffix = '%',
}: BadgeDeltaProps) {
  // Determine the variant if auto
  const actualVariant = 
    variant === 'auto' ? 
      value > 0 ? 'success' : 
      value < 0 ? 'danger' : 'neutral'
    : variant;

  // Get the absolute value, preserving one decimal place
  const absValue = Math.abs(value).toFixed(1).replace(/\.0$/, '');
  
  // Get the icon
  const Icon = value > 0 ? ArrowUpIcon : value < 0 ? ArrowDownIcon : MinusIcon;
  
  // Get the color classes based on variant
  const variantClasses = {
    success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    danger: 'bg-red-500/10 text-red-500 border-red-500/20',
    neutral: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
  };
  
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium',
        variantClasses[actualVariant],
        className
      )}
    >
      {showArrow && <Icon className="mr-1 h-3 w-3" />}
      <span>{prefix}{absValue}{suffix}</span>
    </div>
  );
}
