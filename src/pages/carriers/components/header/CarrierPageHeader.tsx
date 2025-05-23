import { motion } from 'framer-motion';
import { Truck, FileCheck, ChevronRight, Zap, Orbit } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CarrierPageHeaderProps {
  totalCarriers?: number;
  activeCarriers?: number;
}

export default function CarrierPageHeader({ 
  totalCarriers = 0, 
  activeCarriers = 0 
}: CarrierPageHeaderProps) {
  // Calculate stability rate - default to 92% if no carriers
  const stabilityRate = totalCarriers ? Math.round((activeCarriers / totalCarriers) * 100) : 92;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-aximo-primary/20 via-aximo-dark to-aximo-light/10 backdrop-blur-sm border border-aximo-primary/20"
    >
      <div className="absolute inset-0 bg-[url('/assets/abstract-grid.svg')] opacity-10"></div>
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-aximo-primary/40 to-aximo-light/40"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-aximo-primary/10 rounded-full blur-3xl -mr-20 -mb-20"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-aximo-light/10 rounded-full blur-3xl -ml-10 -mt-10"></div>
      
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 p-6 sm:p-8"
      >
        <div className="flex items-center mb-2 text-sm text-aximo-text-secondary">
          <Link to="/" className="hover:text-aximo-primary transition-colors">Dashboard</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-aximo-primary">Quantum Transport Conduits</span>
        </div>
        
        <div className="flex items-start md:items-center flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-aximo-text bg-gradient-to-r from-aximo-primary to-aximo-light bg-clip-text text-transparent">
              Quantum Transport Conduits
            </h1>
            <p className="mt-2 text-aximo-text-secondary max-w-2xl">
              Organize, manage and calibrate quantum-entangled transport conduits across multiple reality planes
            </p>
          </div>
          
          <div className="flex items-center bg-aximo-primary/10 rounded-lg px-4 py-3 border border-aximo-primary/20">
            <Orbit className="h-6 w-6 text-aximo-primary mr-3" />
            <div>
              <div className="text-sm text-aximo-text-secondary">Active Conduits</div>
              <div className="text-2xl font-bold text-aximo-text">{totalCarriers}</div>
            </div>
            <div className="h-10 mx-4 border-r border-aximo-border"></div>
            <Zap className="h-6 w-6 text-aximo-light mr-3" />
            <div>
              <div className="text-sm text-aximo-text-secondary">Stability Rate</div>
              <div className="text-2xl font-bold text-aximo-text">{stabilityRate}%</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
