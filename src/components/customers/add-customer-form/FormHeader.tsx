import { FormProgressBar } from './FormProgressBar';
import { motion } from 'framer-motion';

interface FormHeaderProps {
  formCompletion: number;
}

export const FormHeader = ({ formCompletion }: FormHeaderProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="mb-8 relative"
    >
      {/* Particle effect background */}
      <div className="absolute -inset-2 bg-gradient-to-r from-indigo-900/10 via-blue-900/5 to-indigo-900/10 rounded-xl blur-xl opacity-70"></div>
      
      {/* Glow accent */}
      <div className="absolute h-8 w-8 rounded-full bg-blue-500/30 blur-xl -top-4 -left-2"></div>
      <div className="absolute h-6 w-6 rounded-full bg-violet-500/20 blur-xl top-6 right-10"></div>
      
      <div className="relative px-4 py-6 backdrop-blur-sm rounded-xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/20 to-blue-900/10">
        <div className="flex flex-col space-y-2 z-10">
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Create Quantum Entity
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <p className="text-indigo-300/80">
              Initialize new customer node in the network matrix
            </p>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scaleX: 0.9 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4"
        >
          <FormProgressBar formCompletion={formCompletion} />
        </motion.div>
      </div>
    </motion.div>
  );
};
