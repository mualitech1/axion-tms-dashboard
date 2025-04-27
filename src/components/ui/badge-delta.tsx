
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon, MinusIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface BadgeDeltaProps {
  value: number;
  className?: string;
  variant?: 'success' | 'danger' | 'neutral' | 'auto';
  showArrow?: boolean;
  prefix?: string;
  suffix?: string;
  animated?: boolean;
}

export function BadgeDelta({
  value,
  className,
  variant = 'auto',
  showArrow = true,
  prefix = '',
  suffix = '%',
  animated = true,
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
    success: 'bg-emerald-500/15 text-emerald-500 border-emerald-500/30',
    danger: 'bg-red-500/15 text-red-500 border-red-500/30',
    neutral: 'bg-gray-500/15 text-gray-500 border-gray-500/30',
  };
  
  const Badge = animated ? motion.div : 'div';
  const animationProps = animated ? {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    transition: { type: "spring", stiffness: 500, damping: 25 }
  } : {};
  
  return (
    <Badge
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium shadow-sm',
        variantClasses[actualVariant],
        className
      )}
      {...animationProps}
    >
      {showArrow && <Icon className="mr-1 h-3 w-3" />}
      <span>{prefix}{absValue}{suffix}</span>
    </Badge>
  );
}
