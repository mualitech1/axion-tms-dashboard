import { ReactNode, useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ArrowDownIcon, ArrowUpIcon, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from 'framer-motion';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    direction: "up" | "down" | "neutral";
    text?: string;
  };
  icon?: ReactNode;
  className?: string;
  accentColor?: 'blue' | 'green' | 'amber' | 'red';
}

export default function MetricsCard({
  title,
  value,
  change,
  icon,
  className,
  accentColor = 'blue'
}: MetricsCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [displayValue, setDisplayValue] = useState('0');
  
  // Animate value counting up
  useEffect(() => {
    let numericValue = 0;
    
    if (typeof value === 'number') {
      numericValue = value;
    } else if (typeof value === 'string') {
      // Extract number from string like '£1234'
      const match = value.match(/(\d+)/);
      if (match) {
        numericValue = parseInt(match[0], 10);
      }
    }
    
    // Animation logic
    if (numericValue > 0) {
      const duration = 1000; // 1 second animation
      const steps = 20;
      const stepTime = duration / steps;
      const increment = numericValue / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        
        if (current >= numericValue) {
          clearInterval(timer);
          setAnimatedValue(numericValue);
          setDisplayValue(value.toString());
        } else {
          setAnimatedValue(Math.floor(current));
          
          // Format with currency symbol if original value had one
          if (typeof value === 'string' && value.match(/^[£$€]/)) {
            setDisplayValue(value.charAt(0) + Math.floor(current).toLocaleString());
          } else {
            setDisplayValue(Math.floor(current).toString());
          }
        }
      }, stepTime);
      
      return () => clearInterval(timer);
    } else {
      setDisplayValue(value.toString());
    }
  }, [value]);

  const getAccentClasses = () => {
    switch (accentColor) {
      case 'blue':
        return "from-aximo-primary/10 to-aximo-primary/5 shadow-aximo-primary/10";
      case 'green':
        return "from-green-500/10 to-green-500/5 shadow-green-500/10";
      case 'amber':
        return "from-amber-500/10 to-amber-500/5 shadow-amber-500/10";
      case 'red':
        return "from-red-500/10 to-red-500/5 shadow-red-500/10";
    }
  };

  const getChangeColor = () => {
    if (!change) return "";
    
    switch (change.direction) {
      case 'up':
        return "text-green-400";
      case 'down':
        return "text-red-400";
      default:
        return "text-aximo-text-secondary";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        "rounded-lg border border-aximo-border p-4 shadow-lg relative overflow-hidden",
        `bg-gradient-to-br ${getAccentClasses()}`,
        className
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs md:text-sm font-medium text-aximo-text-secondary">{title}</h3>
          {icon && (
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 1 }}
            >
              {icon}
            </motion.div>
          )}
        </div>
        
        <div className="mt-2 flex flex-col">
          <motion.div 
            key={displayValue}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-aximo-text tracking-tight"
          >
            {displayValue}
          </motion.div>
          
          {change && (
            <div className={`flex items-center mt-2 text-xs ${getChangeColor()}`}>
              {change.direction === 'up' ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : change.direction === 'down' ? (
                <TrendingDown className="h-3 w-3 mr-1" />
              ) : null}
              <span>{change.value}% {change.text || ''}</span>
            </div>
          )}
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-white/5 to-transparent rounded-tl-full pointer-events-none"></div>
        
        {accentColor === 'blue' && (
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-aximo-primary/10 blur-xl"></div>
        )}
        {accentColor === 'green' && (
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-green-500/10 blur-xl"></div>
        )}
        {accentColor === 'amber' && (
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-amber-500/10 blur-xl"></div>
        )}
        {accentColor === 'red' && (
          <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-red-500/10 blur-xl"></div>
        )}
      </div>
    </motion.div>
  );
}
