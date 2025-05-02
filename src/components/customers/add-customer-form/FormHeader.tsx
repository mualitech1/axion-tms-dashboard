
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
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <div className="flex flex-col space-y-2">
        <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-800 to-indigo-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-indigo-200">Add New Customer</h2>
        <p className="text-indigo-600/70 dark:text-indigo-400">
          Fill in the details to create a new customer record
        </p>
      </div>
      <FormProgressBar formCompletion={formCompletion} />
    </motion.div>
  );
};
