import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FormProgressBarProps {
  formCompletion: number;
}

export const FormProgressBar = ({ formCompletion }: FormProgressBarProps) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  
  useEffect(() => {
    // Animate the progress value
    const timeout = setTimeout(() => {
      setAnimatedValue(formCompletion);
    }, 100);
    return () => clearTimeout(timeout);
  }, [formCompletion]);
  
  // Define color classes for the progress bar based on completion percentage
  const getProgressColor = () => {
    if (formCompletion < 30) return "from-red-500 via-red-400 to-red-500";
    if (formCompletion < 70) return "from-amber-500 via-amber-400 to-amber-500"; 
    return "from-emerald-500 via-teal-400 to-emerald-500";
  };
  
  // Generate particles based on completion
  const particleCount = Math.floor(formCompletion / 10) + 1;
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-3">
        <motion.span 
          className="text-sm font-medium text-indigo-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Neural Synapse Formation
        </motion.span>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex items-center"
        >
          <div className="inline-flex h-6 w-12 items-center justify-center rounded-full bg-indigo-900/50 px-2 text-xs font-semibold text-indigo-100 backdrop-blur-sm border border-indigo-500/30">
            {animatedValue}%
          </div>
        </motion.div>
      </div>
      
      <div className="relative h-3 rounded-full bg-indigo-900/30 backdrop-blur-sm border border-indigo-500/20 overflow-hidden">
        {/* Animated particles floating above the progress bar */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: particleCount }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-white/70 z-10"
              animate={{
                x: [
                  `${(i * 10) % 100}%`, 
                  `${((i * 10) + Math.random() * 20) % 100}%`
                ],
                y: [
                  `${Math.random() * 100}%`,
                  `${Math.random() * 100}%`
                ],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
        
        {/* Glowing progress indicator */}
        <motion.div 
          className={`absolute h-full rounded-full bg-gradient-to-r ${getProgressColor()} shadow-[0_0_10px] shadow-indigo-500/50`}
          initial={{ width: '0%' }}
          animate={{ width: `${animatedValue}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Pulse effect at the end of the progress bar */}
          <motion.div 
            className="absolute right-0 top-0 h-full w-2 bg-white/50 blur-sm"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  );
};
