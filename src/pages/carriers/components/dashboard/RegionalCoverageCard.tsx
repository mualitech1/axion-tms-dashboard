
import { motion } from 'framer-motion';
import { Radio } from 'lucide-react';

export default function RegionalCoverageCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-[#1a1e2b] border-none shadow-lg overflow-hidden relative rounded-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500/40 to-purple-500/40"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <svg className="absolute top-0 right-0 opacity-10" width="100%" height="100%" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
          <path d="M50,400 Q200,100 400,400 Q600,700 750,400" stroke="#9b87f5" strokeWidth="2" fill="none" />
        </svg>
      </div>
      
      <div className="flex items-center gap-3 mb-5 p-5 relative z-10">
        <div className="p-2.5 rounded-full bg-indigo-600/20 text-indigo-400 shadow-lg shadow-indigo-600/10">
          <Radio className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Regional Coverage</h3>
          <p className="text-sm text-aximo-text-secondary">Active carrier distribution</p>
        </div>
      </div>
      
      <div className="space-y-3 p-5 pt-0 relative z-10">
        <div className="flex justify-between text-sm">
          <span className="text-aximo-text-secondary">London</span>
          <span className="text-white">43 carriers</span>
        </div>
        <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: '75%' }}></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-aximo-text-secondary">Manchester</span>
          <span className="text-white">27 carriers</span>
        </div>
        <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: '55%' }}></div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span className="text-aximo-text-secondary">Birmingham</span>
          <span className="text-white">21 carriers</span>
        </div>
        <div className="h-2 w-full bg-aximo-darker rounded-full overflow-hidden shadow-inner">
          <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" style={{ width: '45%' }}></div>
        </div>
      </div>
    </motion.div>
  );
}
