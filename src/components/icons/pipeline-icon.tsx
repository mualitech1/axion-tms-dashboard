
import React from 'react';

interface PipelineIconProps {
  className?: string;
}

export const PipelineIcon: React.FC<PipelineIconProps> = ({ className }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M3 7v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
      <path d="M5 15h14" />
      <path d="M21 7 12 3 3 7" />
      <path d="M9 15v4" />
      <path d="M15 15v4" />
      <path d="M9 11v4" />
      <path d="M15 11v4" />
    </svg>
  );
};
