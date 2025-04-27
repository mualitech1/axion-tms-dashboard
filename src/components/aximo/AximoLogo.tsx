
import React from 'react';

interface AximoLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white';
}

export function AximoLogo({ size = 'md', variant = 'default' }: AximoLogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  const textColor = variant === 'white' ? 'text-white' : 'text-aximo-primary';

  return (
    <div className="flex items-center">
      <div className={`${sizeClasses[size]} mr-2 bg-aximo-primary p-1 rounded`}>
        <svg
          className={`${sizeClasses[size]}`}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            className="fill-white"
          />
          <path
            d="M12 12L2 7V17L12 22L22 17V7L12 12Z"
            className="fill-white opacity-60"
          />
          <circle 
            cx="12" 
            cy="7" 
            r="1.5" 
            className="fill-aximo-light" 
          />
        </svg>
      </div>
      <span className={`font-bold ${textColor} text-${size === 'sm' ? 'lg' : size === 'md' ? 'xl' : '2xl'}`}>
        AXIMO
      </span>
    </div>
  );
}
