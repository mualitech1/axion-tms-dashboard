import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { useTheme } from './theme-provider';
import { cn } from '@/lib/utils';

export function SarahWelcome() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show welcome after component is mounted to avoid SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative p-6 sm:p-8 rounded-xl overflow-hidden my-4",
        "border border-transparent",
        theme === "dark" 
          ? "bg-gradient-to-br from-aximo-darker to-aximo-darker/80"
          : "bg-gradient-to-br from-white to-blue-50"
      )}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-full h-full bg-gray-500/10" />
      </div>
      
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 mb-2"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <Sparkles className={cn(
              "h-5 w-5",
              theme === "dark" ? "text-indigo-400" : "text-indigo-500"
            )} />
          </motion.div>
          <h3 className="text-sm font-medium text-aximo-text-secondary">Exclusively for You</h3>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold my-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent"
        >
          Hello Sarah! <br className="md:hidden" />
          <span className="hidden md:inline">Welcome to </span>
          Axion TMS
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={cn(
            "max-w-lg text-sm sm:text-base mt-2",
            "text-aximo-text-secondary"
          )}
        >
          Mohammad wanted to share his latest project with you. This dashboard helps logistics professionals manage their transportation needs with cutting-edge technology. We hope you enjoy the tour!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 flex items-center gap-2"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Heart className="h-4 w-4 text-red-500" />
          </motion.div>
          <span className="text-xs text-aximo-text-secondary">
            Built with love by Mohammad
          </span>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
        className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl" 
      />
      
      {/* Quantum particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${theme === "dark" ? "bg-indigo-400/30" : "bg-blue-400/20"}`}
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            left: 10 + Math.random() * 80 + "%",
            top: 10 + Math.random() * 80 + "%",
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 2
          }}
        />
      ))}
    </motion.div>
  );
}

export function KamalWelcome() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only show welcome after component is mounted to avoid SSR issues
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn(
        "relative p-6 sm:p-8 rounded-xl overflow-hidden my-4",
        "border border-transparent",
        theme === "dark" 
          ? "bg-gradient-to-br from-aximo-darker to-aximo-darker/80"
          : "bg-gradient-to-br from-white to-blue-50"
      )}
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-full h-full bg-gray-500/10" />
      </div>
      
      <div className="relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex items-center gap-2 mb-2"
        >
          <motion.div
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            <Sparkles className={cn(
              "h-5 w-5",
              theme === "dark" ? "text-indigo-400" : "text-indigo-500"
            )} />
          </motion.div>
          <h3 className="text-sm font-medium text-aximo-text-secondary">Exclusively for You</h3>
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold my-4 bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent"
        >
          Hello Kamal! <br className="md:hidden" />
          <span className="hidden md:inline">Welcome to </span>
          Axion TMS
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className={cn(
            "max-w-lg text-sm sm:text-base mt-2",
            "text-aximo-text-secondary"
          )}
        >
          Mohammad wanted to share his latest project with you. This dashboard helps logistics professionals manage their transportation needs with cutting-edge technology. We hope you enjoy the tour!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-4 flex items-center gap-2"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <Heart className="h-4 w-4 text-red-500" />
          </motion.div>
          <span className="text-xs text-aximo-text-secondary">
            Built with love by Mohammad
          </span>
        </motion.div>
      </div>
      
      {/* Decorative elements */}
      <motion.div 
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-2xl" 
      />
      <motion.div 
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
        className="absolute -top-6 -left-6 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl" 
      />
      
      {/* Quantum particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${theme === "dark" ? "bg-indigo-400/30" : "bg-blue-400/20"}`}
          style={{
            width: 2 + Math.random() * 4,
            height: 2 + Math.random() * 4,
            left: 10 + Math.random() * 80 + "%",
            top: 10 + Math.random() * 80 + "%",
          }}
          animate={{
            x: [0, Math.random() * 50 - 25],
            y: [0, Math.random() * 50 - 25],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            repeatType: "loop",
            delay: Math.random() * 2
          }}
        />
      ))}
    </motion.div>
  );
} 