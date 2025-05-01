
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import JobCreationForm from './components/job-creation/JobCreationForm';

export default function CreateJobPage() {
  const navigate = useNavigate();
  
  const handleComplete = () => {
    navigate('/jobs');
  };

  return (
    <MainLayout title="Create New Job">
      <div className="container mx-auto py-6">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-lg border-[#1a3246] overflow-hidden">
            <JobCreationForm onComplete={handleComplete} />
          </Card>
        </motion.div>
      </div>
    </MainLayout>
  );
}
