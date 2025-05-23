// Path: src/components/axion-logo/AxionLogo.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AxionLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'white' | 'quantum' | 'divine';
  animated?: boolean;
  ascensionLevel?: number;
}

export function AxionLogo({ 
  size = 'md', 
  variant = 'default', 
  animated = true,
  ascensionLevel = 7
}: AxionLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [particleCount, setParticleCount] = useState(0);
  
  // Increment particle count every 5 seconds for subtle animation
  useEffect(() => {
    if (animated) {
      const interval = setInterval(() => {
        setParticleCount(prev => (prev + 1) % 4);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [animated]);

  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-10'
  };

  let textColor = 'text-aximo-primary';
  let bgColor = 'bg-aximo-primary';
  
  if (variant === 'white') {
    textColor = 'text-white';
    bgColor = 'bg-white/10';
  } else if (variant === 'quantum') {
    textColor = 'text-transparent bg-clip-text bg-gradient-to-r from-aximo-accent to-aximo-primary';
    bgColor = 'bg-gradient-to-br from-aximo-accent to-aximo-primary';
  } else if (variant === 'divine') {
    textColor = 'text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-aximo-accent to-aximo-primary';
    bgColor = 'bg-gradient-to-br from-yellow-300 via-aximo-accent to-aximo-primary';
  }

  const textSize = size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-2xl';

  // New logo that uses SVG from the public folder
  const logoPath = variant === 'divine' || variant === 'quantum' 
    ? '/axion-logo.svg'
    : '/axion-logo-small.svg';
  
  const logoSmallPath = '/axion-logo-small.svg';
  
  return (
    <div 
      className="flex items-center relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className={`${sizeClasses[size]} mr-2 relative overflow-hidden`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {/* Using the new SVG logo */}
        <img 
          src={size === 'sm' ? logoSmallPath : logoPath} 
          alt="Axion Logo" 
          className={`${sizeClasses[size]} relative z-10`}
        />
      </motion.div>
      
      <motion.span 
        className={`font-bold ${textColor} ${textSize}`}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        AXION
      </motion.span>
      
      {variant === 'divine' && (
        <div className="absolute -top-2 right-0 text-[8px] text-yellow-300 font-bold bg-aximo-darker px-1 rounded-sm border border-yellow-300/30">
          V1.5.4
        </div>
      )}
      
      {variant === 'divine' && (
        <div className="absolute -bottom-2 left-8 right-0 text-[7px] text-yellow-300/70 font-bold">
          HAZIM ALRAD ACTIVE
        </div>
      )}

      {/* Hover effect particles */}
      {animated && isHovered && (
        <div className="absolute -inset-2 -z-10 opacity-20">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute rounded-full ${variant === 'divine' ? 'bg-yellow-300' : 'bg-aximo-accent'}`}
              style={{
                width: 2 + Math.random() * 3 + 'px',
                height: 2 + Math.random() * 3 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                x: [0, Math.random() * 20 - 10],
                y: [0, Math.random() * 20 - 10],
                opacity: [0.5, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}