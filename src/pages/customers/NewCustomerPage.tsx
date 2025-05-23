import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import NewCustomerForm from './NewCustomerForm';

export default function NewCustomerPage() {
  const navigate = useNavigate();

  return (
    <motion.div 
      className="p-6 space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header section with back button */}
      <motion.div
        className="flex items-center justify-between mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Button 
          variant="outline" 
          onClick={() => navigate('/customers')}
          className="flex items-center gap-2 border-indigo-500/30 bg-slate-900/50 backdrop-blur-sm text-indigo-200 hover:bg-indigo-900/20 hover:text-indigo-100"
        >
          <ArrowLeft className="h-4 w-4" />
          Return to Quantum Network
        </Button>
      </motion.div>
      
      {/* Background decorations */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Main form container */}
      <motion.div 
        className="relative"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <NewCustomerForm />
      </motion.div>
    </motion.div>
  );
} 