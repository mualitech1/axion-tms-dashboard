import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Moon, Sun, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QuantumThemeToggleProps {
  className?: string;
}

export function QuantumThemeToggle({ className = "" }: QuantumThemeToggleProps) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  
  // On mount, set the theme from localStorage or system preference
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as "light" | "dark" | null;
    if (storedTheme) {
      setTheme(storedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);
  
  // Apply theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };
  
  // Icon animations
  const iconVariants = {
    hidden: { opacity: 0, rotate: -90, scale: 0.5 },
    visible: { opacity: 1, rotate: 0, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, rotate: 90, scale: 0.5, transition: { duration: 0.3 } }
  };
  
  // Particle effect on hover/click
  const [particles, setParticles] = useState<{ id: number; x: number; y: number, scale: number }[]>([]);
  
  const createParticles = () => {
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 60 - 30,
      y: Math.random() * 60 - 30,
      scale: Math.random() * 0.5 + 0.5
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)));
    }, 1000);
  };
  
  const colors = theme === 'dark' 
    ? ["#0a9bdb", "#0adeee", "#4cc9f0", "#2196f3"] 
    : ["#ff9500", "#ffb700", "#ffd000", "#ffe14f"];
  
  return (
    <div className={`relative ${className}`}>
      <Button
        variant="outline"
        size="icon"
        className={`
          relative overflow-visible transition-all duration-300
          ${theme === 'dark' 
            ? 'bg-[#162233] border-[#1a3246] text-[#0adeee] hover:bg-[#1a3246] hover:text-[#4cc9f0]' 
            : 'bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100'}
        `}
        onClick={() => {
          toggleTheme();
          createParticles();
        }}
        onMouseEnter={createParticles}
      >
        {/* Particle effects */}
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none"
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{ 
              scale: particle.scale, 
              x: particle.x, 
              y: particle.y,
              opacity: [1, 0]
            }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ 
              backgroundColor: colors[Math.floor(Math.random() * colors.length)],
              width: '4px',
              height: '4px',
              borderRadius: '50%'
            }}
          />
        ))}
        
        {/* Center glow effect */}
        <div 
          className={`absolute inset-0 rounded-full opacity-50 ${
            theme === 'dark' ? 'bg-[#0adeee]' : 'bg-amber-400'
          }`} 
          style={{ 
            filter: `blur(8px)`, 
            transform: 'scale(0.6)',
            opacity: particles.length > 0 ? 0.3 : 0
          }}
        />
        
        {/* Toggle icon */}
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="moon"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10"
            >
              <Moon className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              variants={iconVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative z-10"
            >
              <Sun className="h-[1.2rem] w-[1.2rem]" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Quantum indicator */}
        <motion.div
          className={`absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-[#0adeee]' : 'bg-amber-400'
          }`}
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.7, 1, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <Sparkles className="h-2 w-2 text-white" />
        </motion.div>
      </Button>
    </div>
  );
} 