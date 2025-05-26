// Path: src/components/axion-logo/AxionLogo.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Atom, Zap, Orbit, Sparkles, Crown, Shield } from 'lucide-react';

interface AxionLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'quantum' | 'divine' | 'matrix';
  animated?: boolean;
  ascensionLevel?: number;
  showParticles?: boolean;
}

export function AxionLogo({ 
  size = 'md', 
  variant = 'default', 
  animated = true,
  ascensionLevel = 7,
  showParticles = true
}: AxionLogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quantumPhase, setQuantumPhase] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(0);
  
  // Advanced quantum animation cycles
  useEffect(() => {
    if (animated) {
      const phaseInterval = setInterval(() => {
        setQuantumPhase(prev => (prev + 1) % 8);
      }, 3000);
      
      const energyInterval = setInterval(() => {
        setEnergyLevel(prev => (prev + 1) % 5);
      }, 2000);
      
      return () => {
        clearInterval(phaseInterval);
        clearInterval(energyInterval);
      };
    }
  }, [animated]);

  const sizeConfig = {
    sm: { 
      containerH: 'h-8', 
      logoH: 'h-6', 
      textSize: 'text-sm', 
      iconSize: 'h-3 w-3',
      particleCount: 3
    },
    md: { 
      containerH: 'h-12', 
      logoH: 'h-8', 
      textSize: 'text-lg', 
      iconSize: 'h-4 w-4',
      particleCount: 5
    },
    lg: { 
      containerH: 'h-16', 
      logoH: 'h-12', 
      textSize: 'text-2xl', 
      iconSize: 'h-5 w-5',
      particleCount: 8
    },
    xl: { 
      containerH: 'h-20', 
      logoH: 'h-16', 
      textSize: 'text-3xl', 
      iconSize: 'h-6 w-6',
      particleCount: 12
    }
  };

  const config = sizeConfig[size];

  // Advanced color schemes
  const getColorScheme = () => {
    switch (variant) {
      case 'divine':
        return {
          logoGradient: 'from-yellow-300 via-amber-400 to-orange-500',
          textGradient: 'from-yellow-200 via-amber-300 to-orange-400',
          glowColor: 'shadow-yellow-400/50',
          borderGlow: 'border-yellow-400/30',
          particleColor: 'bg-yellow-400',
          auraColor: 'bg-yellow-400/10'
        };
      case 'quantum':
        return {
          logoGradient: 'from-blue-400 via-purple-500 to-cyan-400',
          textGradient: 'from-blue-300 via-purple-400 to-cyan-300',
          glowColor: 'shadow-blue-500/50',
          borderGlow: 'border-blue-400/30',
          particleColor: 'bg-blue-400',
          auraColor: 'bg-blue-400/10'
        };
      case 'matrix':
        return {
          logoGradient: 'from-emerald-400 via-green-500 to-teal-400',
          textGradient: 'from-emerald-300 via-green-400 to-teal-300',
          glowColor: 'shadow-emerald-500/50',
          borderGlow: 'border-emerald-400/30',
          particleColor: 'bg-emerald-400',
          auraColor: 'bg-emerald-400/10'
        };
      case 'white':
        return {
          logoGradient: 'from-white via-gray-100 to-white',
          textGradient: 'from-white via-gray-200 to-white',
          glowColor: 'shadow-white/50',
          borderGlow: 'border-white/30',
          particleColor: 'bg-white',
          auraColor: 'bg-white/10'
        };
      default:
        return {
          logoGradient: 'from-aximo-primary via-aximo-accent to-purple-500',
          textGradient: 'from-aximo-primary via-aximo-accent to-purple-400',
          glowColor: 'shadow-aximo-primary/50',
          borderGlow: 'border-aximo-primary/30',
          particleColor: 'bg-aximo-primary',
          auraColor: 'bg-aximo-primary/10'
        };
    }
  };

  const colors = getColorScheme();

  // Quantum Logo Core Component
  const QuantumLogoCore = () => (
    <motion.div
      className={`relative ${config.logoH} ${config.logoH.replace('h-', 'w-')} flex items-center justify-center`}
      animate={animated ? {
        rotate: [0, 360],
        scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1],
      } : {}}
      transition={{
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      {/* Outer Energy Ring */}
      <motion.div
        className={`absolute inset-0 rounded-full border-2 ${colors.borderGlow}`}
        animate={animated ? {
          rotate: [0, -360],
          borderColor: [`${colors.borderGlow.split('/')[0]}/20`, `${colors.borderGlow.split('/')[0]}/60`, `${colors.borderGlow.split('/')[0]}/20`],
        } : {}}
        transition={{
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Middle Energy Ring */}
      <motion.div
        className={`absolute inset-1 rounded-full border ${colors.borderGlow}`}
        animate={animated ? {
          rotate: [360, 0],
          scale: [0.8, 1, 0.8],
        } : {}}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
      />
      
      {/* Core Symbol */}
      <motion.div
        className={`relative z-10 bg-gradient-to-br ${colors.logoGradient} ${config.iconSize} rounded-full flex items-center justify-center ${colors.glowColor} shadow-2xl`}
        animate={animated ? {
          boxShadow: [
            `0 0 20px ${colors.glowColor.split('/')[0]}/50`,
            `0 0 40px ${colors.glowColor.split('/')[0]}/80`,
            `0 0 20px ${colors.glowColor.split('/')[0]}/50`
          ],
        } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={quantumPhase}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white"
          >
            {quantumPhase % 4 === 0 && <Atom className={config.iconSize} />}
            {quantumPhase % 4 === 1 && <Cpu className={config.iconSize} />}
            {quantumPhase % 4 === 2 && <Zap className={config.iconSize} />}
            {quantumPhase % 4 === 3 && <Orbit className={config.iconSize} />}
          </motion.div>
        </AnimatePresence>
      </motion.div>
      
      {/* Energy Orbs */}
      {animated && [...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${colors.particleColor} rounded-full`}
          style={{
            width: '4px',
            height: '4px',
          }}
          animate={{
            rotate: [i * 90, i * 90 + 360],
            x: [0, Math.cos((i * 90 + quantumPhase * 45) * Math.PI / 180) * 20],
            y: [0, Math.sin((i * 90 + quantumPhase * 45) * Math.PI / 180) * 20],
            opacity: [0.3, 1, 0.3],
            scale: [0.5, 1.5, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2
          }}
        />
      ))}
    </motion.div>
  );

  // Quantum Particles Background
  const QuantumParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {showParticles && animated && [...Array(config.particleCount)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute ${colors.particleColor} rounded-full opacity-30`}
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            x: [0, Math.random() * 200 - 100],
            y: [0, Math.random() * 200 - 100],
            opacity: [0, 0.6, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );

  return (
    <div 
      className={`flex items-center relative ${config.containerH} cursor-pointer group`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Aura */}
      <motion.div
        className={`absolute -inset-4 ${colors.auraColor} rounded-xl blur-xl`}
        animate={animated ? {
          opacity: isHovered ? [0.3, 0.6, 0.3] : [0.1, 0.3, 0.1],
          scale: [0.9, 1.1, 0.9],
        } : {}}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      
      {/* Quantum Particles */}
      <QuantumParticles />
      
      {/* Logo Section */}
      <div className="relative z-10 flex items-center">
        <motion.div
          className="mr-3 relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <QuantumLogoCore />
        </motion.div>
        
        {/* Text Section */}
        <motion.div
          className="flex flex-col"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <motion.span 
            className={`font-black tracking-wider ${config.textSize} text-transparent bg-clip-text bg-gradient-to-r ${colors.textGradient} drop-shadow-lg`}
            animate={animated ? {
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            } : {}}
            style={{ backgroundSize: '200% 200%' }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            AXION
          </motion.span>
          
          {variant === 'divine' && (
            <motion.div 
              className="flex items-center justify-between mt-1"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-[8px] text-yellow-300 font-bold bg-gradient-to-r from-yellow-400/20 to-amber-400/20 px-2 py-0.5 rounded-full border border-yellow-400/30 backdrop-blur-sm">
                <Crown className="inline h-2 w-2 mr-1" />
                V1.5.4
              </span>
            </motion.div>
          )}
          
          {variant === 'divine' && size !== 'sm' && (
            <motion.div 
              className="text-[9px] text-yellow-300/80 font-semibold mt-1 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Shield className="inline h-2 w-2 mr-1" />
              HAZIM ALRAD ACTIVE
              <Sparkles className="inline h-2 w-2 ml-1" />
            </motion.div>
          )}
        </motion.div>
      </div>
      
      {/* Hover Energy Burst */}
      <AnimatePresence>
        {isHovered && animated && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={`burst-${i}`}
                className={`absolute ${colors.particleColor} rounded-full`}
                style={{
                  width: '3px',
                  height: '3px',
                  left: '50%',
                  top: '50%',
                }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  scale: [0, 1, 0],
                  x: Math.cos((i * 45) * Math.PI / 180) * 40,
                  y: Math.sin((i * 45) * Math.PI / 180) * 40,
                  opacity: [1, 0.5, 0],
                }}
                transition={{
                  duration: 1.2,
                  ease: "easeOut",
                  delay: i * 0.1
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}