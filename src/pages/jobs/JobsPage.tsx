
import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useJobs } from '@/hooks/use-jobs';
import JobsList from './components/JobsList';
import JobCreation from './components/JobCreation';
import JobsGrid from './components/jobs-list/JobsGrid';
import { Button } from '@/components/ui/button';
import { Plus, Filter, RefreshCcw, Grid, List } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

export default function JobsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { jobs, isLoading, error, refetch } = useJobs();
  const { toast } = useToast();

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Refreshing jobs",
      description: "The jobs list is being refreshed."
    });
  };

  const handleCreateJobClick = () => {
    setShowCreateModal(true);
  };

  const filteredJobs = jobs && filterStatus !== 'all' 
    ? jobs.filter(job => job.status === filterStatus) 
    : jobs;

  const jobStatusCounts = jobs ? jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>) : {};

  if (error) {
    return (
      <MainLayout title="Jobs">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="flex items-center justify-center h-full"
        >
          <Card className="p-6 max-w-lg w-full bg-destructive/10 border-destructive">
            <p className="text-destructive font-medium text-center">Error loading jobs: {error.message}</p>
            <Button onClick={() => refetch()} className="mt-4 w-full">
              <RefreshCcw className="mr-2 h-4 w-4" /> Try Again
            </Button>
          </Card>
        </motion.div>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="Jobs">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="h-full"
      >
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="relative">
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-aximo-primary via-blue-400 to-purple-500 mb-1 animate-text">
              Jobs Dashboard
            </h1>
            <p className="text-aximo-text-secondary">
              Manage and track all your transportation jobs in one place
              {jobs && <span className="ml-2">• <span className="font-semibold">{jobs.length}</span> total jobs</span>}
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-aximo-primary/20 to-transparent blur-lg opacity-50 -z-10" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-2 w-full lg:w-auto">
            <Button 
              onClick={handleCreateJobClick}
              className="bg-gradient-to-r from-aximo-primary to-blue-600 hover:from-blue-600 hover:to-aximo-primary text-white transition-all duration-300 shadow-lg hover:shadow-aximo-primary/20"
              size="lg"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Job
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleRefresh} 
              size="icon" 
              className="border-aximo-border hover:border-aximo-primary hover:bg-aximo-primary/10 transition-all duration-300"
            >
              <RefreshCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="col-span-1"
          >
            <div className="p-4 rounded-lg bg-gradient-to-br from-aximo-card to-aximo-darker border border-aximo-border shadow-lg hover:shadow-aximo-primary/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-sm text-aximo-text-secondary">Total Jobs</p>
                <Badge variant="outline" className="bg-aximo-primary/10 text-aximo-primary border-aximo-primary/20">
                  {jobs?.length || 0}
                </Badge>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="col-span-1"
          >
            <div className="p-4 rounded-lg bg-gradient-to-br from-aximo-card to-aximo-darker border border-aximo-border shadow-lg hover:shadow-amber-500/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-sm text-aximo-text-secondary">In Progress</p>
                <Badge variant="outline" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                  {jobStatusCounts['in-progress'] || 0}
                </Badge>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="col-span-1"
          >
            <div className="p-4 rounded-lg bg-gradient-to-br from-aximo-card to-aximo-darker border border-aximo-border shadow-lg hover:shadow-emerald-500/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-sm text-aximo-text-secondary">Completed</p>
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
                  {jobStatusCounts['completed'] || 0}
                </Badge>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="col-span-1"
          >
            <div className="p-4 rounded-lg bg-gradient-to-br from-aximo-card to-aximo-darker border border-aximo-border shadow-lg hover:shadow-red-500/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <p className="text-sm text-aximo-text-secondary">Issues</p>
                <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                  {jobStatusCounts['issues'] || 0}
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-gradient-to-br from-aximo-dark to-aximo-darker border border-aximo-border rounded-lg p-6 shadow-lg backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
            <div className="flex items-center gap-2 mb-3 sm:mb-0">
              <Select 
                defaultValue={filterStatus} 
                onValueChange={setFilterStatus}
              >
                <SelectTrigger className="w-[180px] bg-aximo-darker border-aximo-border hover:border-aximo-primary transition-colors duration-300">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-aximo-darker border-aximo-border">
                  <SelectItem value="all">All Jobs</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="allocated">Allocated</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="finished">Finished</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="issues">Issues</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Tabs 
                defaultValue="list" 
                className="w-full sm:w-auto"
                value={viewMode} 
                onValueChange={(val) => setViewMode(val as 'list' | 'grid')}
              >
                <TabsList className="bg-aximo-darker border border-aximo-border">
                  <TabsTrigger 
                    value="list" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aximo-primary data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
                  >
                    <List className="h-4 w-4 mr-2" />
                    List
                  </TabsTrigger>
                  <TabsTrigger 
                    value="grid" 
                    className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-aximo-primary data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300"
                  >
                    <Grid className="h-4 w-4 mr-2" />
                    Grid
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
          
          <motion.div
            key={viewMode}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'list' ? (
              <JobsList jobs={filteredJobs || []} isLoading={isLoading} />
            ) : (
              <JobsGrid jobs={filteredJobs || []} isLoading={isLoading} />
            )}
          </motion.div>
        </div>
      </motion.div>
      
      {showCreateModal && (
        <JobCreation
          onComplete={() => setShowCreateModal(false)}
        />
      )}
    </MainLayout>
  );
}
