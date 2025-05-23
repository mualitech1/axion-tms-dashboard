import React from 'react';

interface QuantumCurrencyProps {
  symbol?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  colorScheme?: 'green' | 'blue' | 'indigo' | 'purple';
}

export const QuantumCurrency: React.FC<QuantumCurrencyProps> = ({ 
  symbol = '£', 
  className = '',
  size = 'md',
  colorScheme = 'green'
}) => {
  // Size mapping
  const sizeClasses = {
    sm: 'w-5 h-5 text-xs',
    md: 'w-6 h-6 text-sm',
    lg: 'w-8 h-8 text-base'
  };
  
  // Color scheme mapping
  const colorClasses = {
    green: {
      gradient: 'from-green-400 to-emerald-500 dark:from-green-500 dark:to-emerald-600',
      border: 'border-green-400 dark:border-green-500',
      text: 'text-green-600 dark:text-green-400'
    },
    blue: {
      gradient: 'from-blue-400 to-cyan-500 dark:from-blue-500 dark:to-cyan-600',
      border: 'border-blue-400 dark:border-blue-500',
      text: 'text-blue-600 dark:text-blue-400'
    },
    indigo: {
      gradient: 'from-indigo-400 to-violet-500 dark:from-indigo-500 dark:to-violet-600',
      border: 'border-indigo-400 dark:border-indigo-500',
      text: 'text-indigo-600 dark:text-indigo-400'
    },
    purple: {
      gradient: 'from-purple-400 to-pink-500 dark:from-purple-500 dark:to-pink-600',
      border: 'border-purple-400 dark:border-purple-500',
      text: 'text-purple-600 dark:text-purple-400'
    }
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      {/* Glowing background effect with animation */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[colorScheme].gradient} rounded-full opacity-20 animate-quantum-pulse`}></div>
      
      {/* Quantum ring */}
      <div className={`absolute inset-1 border ${colorClasses[colorScheme].border} rounded-full`}></div>
      
      {/* Subtle inner glow */}
      <div className="absolute inset-2 bg-white dark:bg-indigo-950 rounded-full opacity-30"></div>
      
      {/* Subtle radial glow in dark mode */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent to-transparent dark:from-transparent dark:via-white/5 dark:to-transparent opacity-0 dark:opacity-40"></div>
      
      {/* Currency symbol */}
      <span className={`absolute inset-0 flex items-center justify-center font-bold ${colorClasses[colorScheme].text}`}>
        {symbol}
      </span>
    </div>
  );
};

export default QuantumCurrency; 