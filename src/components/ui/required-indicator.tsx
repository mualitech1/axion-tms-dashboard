import React from 'react';
import { cn } from '@/lib/utils';

export interface RequiredIndicatorProps {
  className?: string;
}

export const RequiredIndicator: React.FC = () => {
  return <span className="text-red-500 ml-1">*</span>;
}; 