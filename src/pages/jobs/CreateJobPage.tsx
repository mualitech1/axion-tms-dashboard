
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import JobCreationForm from './components/job-creation/JobCreationForm';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CreateJobPage() {
  const navigate = useNavigate();
  
  const handleComplete = () => {
    navigate('/jobs');
  };

  return (
    <MainLayout title="Create New Job">
      <div className="container mx-auto py-6">
        <div className="max-w-5xl mx-auto mb-4">
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/jobs">Jobs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink>Create New Job</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/jobs')}
              className="flex items-center gap-2 hover:bg-[#162233] text-[#6b82a6] hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Jobs
            </Button>
          </div>
        </div>
        
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
