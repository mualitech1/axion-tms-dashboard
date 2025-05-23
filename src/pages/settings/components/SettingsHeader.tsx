import React from 'react';
import { Sparkles, Atom, RotateCw, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function SettingsHeader() {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center gap-3"
        >
          <div className="relative p-2 bg-aximo-darker rounded-lg border border-aximo-border">
            <Atom className="h-7 w-7 text-aximo-primary animate-pulse" />
            <div className="absolute -top-1 -right-1">
              <Sparkles className="h-4 w-4 text-blue-400" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-aximo-primary to-purple-400">
              Quantum System Calibration
            </h2>
            <p className="text-aximo-text-secondary mt-1">
              Configure your interdimensional quantum parameters
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Button 
            className="bg-gradient-to-r from-aximo-primary to-purple-500 hover:from-aximo-primary/90 hover:to-purple-600 text-white shadow-glow"
          >
            <RotateCw className="h-4 w-4 mr-2 animate-spin-slow" />
            Synchronize Parameters
          </Button>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2"
      >
        <div className="bg-aximo-darker p-3 rounded-lg border border-aximo-border flex items-center gap-3">
          <div className="bg-aximo-primary/20 p-2 rounded-full">
            <Zap className="h-5 w-5 text-aximo-primary" />
          </div>
          <div>
            <div className="text-sm text-aximo-text">Quantum Integrity</div>
            <div className="text-xs text-aximo-text-secondary">98.7% Synchronized</div>
          </div>
        </div>
        
        <div className="bg-aximo-darker p-3 rounded-lg border border-aximo-border flex items-center gap-3">
          <div className="bg-green-500/20 p-2 rounded-full">
            <Sparkles className="h-5 w-5 text-green-500" />
          </div>
          <div>
            <div className="text-sm text-aximo-text">Entanglement Status</div>
            <div className="text-xs text-aximo-text-secondary">Fully Operational</div>
          </div>
        </div>
        
        <div className="bg-aximo-darker p-3 rounded-lg border border-aximo-border flex items-center gap-3">
          <div className="bg-purple-500/20 p-2 rounded-full">
            <RotateCw className="h-5 w-5 text-purple-500" />
          </div>
          <div>
            <div className="text-sm text-aximo-text">Last Calibration</div>
            <div className="text-xs text-aximo-text-secondary">3 Quantum Cycles Ago</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
