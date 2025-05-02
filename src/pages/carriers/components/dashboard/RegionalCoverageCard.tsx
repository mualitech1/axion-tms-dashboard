
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

export default function RegionalCoverageCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-aximo-card border border-aximo-border shadow-aximo rounded-lg p-5 bg-gradient-to-br from-aximo-card to-indigo-900/10"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-full bg-indigo-600/20 text-indigo-600 shadow-lg shadow-indigo-600/10">
          <Radio className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-aximo-text">Regional Coverage</h3>
          <p className="text-sm text-aximo-text-secondary">Active carrier distribution</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-aximo-text-secondary">London</span>
          <span className="text-aximo-text">43 carriers</span>
        </div>
        <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: '75%' }}></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-aximo-text-secondary">Manchester</span>
          <span className="text-aximo-text">27 carriers</span>
        </div>
        <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: '55%' }}></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-aximo-text-secondary">Birmingham</span>
          <span className="text-aximo-text">21 carriers</span>
        </div>
        <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: '45%' }}></div>
        </div>
      </div>
    </motion.div>
  );
}
