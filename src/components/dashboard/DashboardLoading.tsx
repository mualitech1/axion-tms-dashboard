import { motion } from 'framer-motion';
import { Atom, Sparkles } from 'lucide-react';

export default function DashboardLoading() {
  return (
    <div className="space-y-6 w-full animate-fade-in">
      {/* Header loading placeholder */}
      <div className="bg-aximo-card p-6 rounded-lg border border-aximo-border shadow-aximo">
        <div className="flex justify-between items-center">
          <div className="space-y-2">
            <div className="h-7 w-80 bg-aximo-border rounded-md animate-pulse"></div>
            <div className="h-4 w-64 bg-aximo-border/60 rounded-md animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-6">
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="aximo-card flex flex-col items-center text-center h-full p-4"
            >
              <div className="aximo-icon-container mb-3 bg-aximo-border/40 w-12 h-12 rounded-full animate-pulse"></div>
              <div className="h-5 w-32 bg-aximo-border/60 rounded-md animate-pulse mb-2"></div>
              <div className="h-3 w-full bg-aximo-border/40 rounded-md animate-pulse"></div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* AetherForge loading placeholder */}
      <div className="bg-aximo-card p-6 rounded-lg border border-aximo-border shadow-aximo">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
          <div className="space-y-2">
            <div className="h-6 w-64 bg-aximo-border rounded-md animate-pulse"></div>
            <div className="h-4 w-80 bg-aximo-border/60 rounded-md animate-pulse"></div>
          </div>
          <div className="flex gap-2 mt-4 md:mt-0">
            <div className="h-9 w-36 bg-aximo-border/60 rounded-md animate-pulse"></div>
            <div className="h-9 w-36 bg-aximo-border/60 rounded-md animate-pulse"></div>
            <div className="h-9 w-36 bg-aximo-primary/30 rounded-md animate-pulse"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-aximo-darker rounded-lg p-4 border border-aximo-border">
              <div className="h-5 w-40 bg-aximo-border/60 rounded-md animate-pulse mb-2"></div>
              <div className="h-3 w-full bg-aximo-border/40 rounded-md animate-pulse"></div>
              <div className="h-2 bg-aximo-border/30 rounded-full mt-3">
                <div 
                  className="h-2 bg-aximo-primary/40 rounded-full animate-pulse" 
                  style={{ width: `${85 + (i * 5)}%` }}
                ></div>
              </div>
              <div className="h-3 w-12 bg-aximo-border/40 rounded-md animate-pulse mt-1 ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Operations overview loading placeholder */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="h-6 w-48 bg-aximo-border rounded-md animate-pulse"></div>
          <div className="h-4 w-24 bg-aximo-border/60 rounded-md animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-aximo-card border border-aximo-border rounded-lg shadow-aximo p-5">
              <div className="flex justify-between items-center mb-3">
                <div className="h-4 w-32 bg-aximo-border/60 rounded-md animate-pulse"></div>
                <div className="h-4 w-6 bg-aximo-border/40 rounded-md animate-pulse"></div>
              </div>
              <div className="h-10 w-20 bg-aximo-border/80 rounded-md animate-pulse mb-1"></div>
              <div className="h-3 w-24 bg-aximo-border/40 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-aximo-card border border-aximo-border rounded-lg shadow-aximo p-5">
              <div className="h-40 w-full bg-aximo-border/30 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quantum particles effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 opacity-50">
          <div className="relative">
            <Atom className="h-10 w-10 text-aximo-primary animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-4 w-4 text-purple-500" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-30">
          <div className="relative">
            <Atom className="h-8 w-8 text-blue-400 animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-3 w-3 text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 