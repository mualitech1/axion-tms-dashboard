
import { motion } from 'framer-motion';
import { Truck, FileCheck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CarrierPageHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-700/20 via-blue-600/10 to-purple-600/20 backdrop-blur-sm border border-indigo-500/20"
    >
      <div className="absolute inset-0 bg-[url('/assets/abstract-grid.svg')] opacity-10"></div>
      <div className="absolute top-0 right-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500/40 to-purple-500/40"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -mr-20 -mb-20"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl -ml-10 -mt-10"></div>
      
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 p-6 sm:p-8"
      >
        <div className="flex items-center mb-2 text-sm text-aximo-text-secondary">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Dashboard</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-indigo-400">Carrier Management</span>
        </div>
        
        <div className="flex items-start md:items-center flex-col md:flex-row gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-aximo-text bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Carrier Management
            </h1>
            <p className="mt-2 text-aximo-text-secondary max-w-2xl">
              Organize, track and manage all your transport carriers and their compliance with regulatory requirements
            </p>
          </div>
          
          <div className="flex items-center bg-indigo-500/10 rounded-lg px-4 py-3 border border-indigo-500/20">
            <Truck className="h-6 w-6 text-indigo-400 mr-3" />
            <div>
              <div className="text-sm text-aximo-text-secondary">Active Carriers</div>
              <div className="text-2xl font-bold text-aximo-text">124</div>
            </div>
            <div className="h-10 mx-4 border-r border-aximo-border"></div>
            <FileCheck className="h-6 w-6 text-green-400 mr-3" />
            <div>
              <div className="text-sm text-aximo-text-secondary">Compliance Rate</div>
              <div className="text-2xl font-bold text-aximo-text">92%</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
