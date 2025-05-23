import React from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Calendar, MapPin, Sparkles, Atom } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const JobsPageLoading = () => {
  return (
    <div className="container mx-auto space-y-6">
      {/* Header with loading state */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-4">
        <div className="flex items-center space-x-2">
          <Skeleton className="h-8 w-8 rounded-full bg-aximo-card" />
          <Skeleton className="h-8 w-[180px] rounded-md bg-aximo-card" />
        </div>
        <div className="flex mt-4 sm:mt-0 space-x-2">
          <Skeleton className="h-9 w-[120px] rounded-md bg-aximo-card" />
          <div className="flex border rounded-md overflow-hidden">
            <Skeleton className="h-9 w-9 bg-aximo-card" />
            <Skeleton className="h-9 w-9 bg-aximo-card" />
            <Skeleton className="h-9 w-9 bg-aximo-card" />
          </div>
        </div>
      </div>
      
      {/* Shimmer effect on the loading content */}
      <div className="relative overflow-hidden bg-aximo-card rounded-lg shadow-md border border-aximo-border">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-aximo-primary/5 to-transparent shimmer" />
        
        {/* Tab loading */}
        <div className="px-4 pt-4">
          <div className="grid grid-cols-5 gap-2 max-w-3xl">
            {[...Array(5)].map((_, i) => (
              <Skeleton 
                key={i} 
                className="h-10 rounded-md bg-aximo-darker"
              />
            ))}
          </div>
        </div>
        
        {/* Table loading */}
        <div className="p-4">
          <div className="border border-aximo-border rounded-md overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-5 gap-4 p-4 bg-aximo-darker/50">
              {[...Array(5)].map((_, i) => (
                <Skeleton 
                  key={i} 
                  className="h-6 rounded bg-aximo-card"
                />
              ))}
            </div>
            
            {/* Table rows */}
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                className="grid grid-cols-5 gap-4 p-4 border-t border-aximo-border"
              >
                {[...Array(5)].map((_, j) => (
                  <Skeleton 
                    key={j} 
                    className={`h-6 rounded bg-aximo-darker/40 ${j === 0 ? 'w-full' : 'w-20'}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Quantum particles animation */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-30">
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: 0.2 + Math.random() * 0.3,
                scale: 0.5 + Math.random() * 0.5,
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                opacity: [0.2, 0.5, 0.2],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 10 + Math.random() * 20,
                repeat: Infinity,
                type: "tween",
                repeatType: "reverse",
              }}
            >
              {i % 4 === 0 && <Sparkles className="text-aximo-accent w-3 h-3" />}
              {i % 4 === 1 && <Atom className="text-aximo-primary w-3 h-3" />}
              {i % 4 === 2 && <div className="w-2 h-2 rounded-full bg-aximo-accent/40" />}
              {i % 4 === 3 && <div className="w-1 h-1 rounded-full bg-aximo-primary/40" />}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Loading indicator */}
      <div className="fixed bottom-4 right-4 flex items-center space-x-2 bg-aximo-card/80 backdrop-blur-sm px-3 py-2 rounded-full border border-aximo-border shadow-lg">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Atom className="h-4 w-4 text-aximo-primary" />
        </motion.div>
        <span className="text-xs text-aximo-text-muted font-medium">Quantizing job matrices...</span>
      </div>
    </div>
  );
};

export default JobsPageLoading; 