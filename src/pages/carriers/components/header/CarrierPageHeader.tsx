
import { motion } from 'framer-motion';

export default function CarrierPageHeader() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-600/10 to-indigo-600/10 backdrop-blur-sm"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 backdrop-blur-sm z-0"></div>
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 p-6 sm:p-8"
      >
        <h1 className="text-3xl font-bold text-aximo-text bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
          Carrier Management
        </h1>
        <p className="mt-2 text-aximo-text-secondary max-w-2xl">
          Organize, track and manage all your transport carriers and their compliance with regulatory requirements
        </p>
      </motion.div>
    </motion.div>
  );
}
