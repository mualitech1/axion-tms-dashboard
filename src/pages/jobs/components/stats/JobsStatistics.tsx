
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Job } from '../../types/jobTypes';

interface JobsStatisticsProps {
  jobs: Job[] | undefined;
  jobStatusCounts: Record<string, number>;
}

export function JobsStatistics({ jobs, jobStatusCounts }: JobsStatisticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <StatCard
        title="Total Jobs"
        count={jobs?.length || 0}
        variant="primary"
        delay={0.1}
      />
      <StatCard
        title="In Progress"
        count={jobStatusCounts['in-progress'] || 0}
        variant="warning"
        delay={0.2}
      />
      <StatCard
        title="Completed"
        count={jobStatusCounts['completed'] || 0}
        variant="success"
        delay={0.3}
      />
      <StatCard
        title="Issues"
        count={jobStatusCounts['issues'] || 0}
        variant="danger"
        delay={0.4}
      />
    </div>
  );
}

interface StatCardProps {
  title: string;
  count: number;
  variant: 'primary' | 'warning' | 'success' | 'danger';
  delay: number;
}

function StatCard({ title, count, variant, delay }: StatCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-aximo-primary/10 text-aximo-primary border-aximo-primary/20';
      case 'warning':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
      case 'success':
        return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      case 'danger':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      className="col-span-1"
    >
      <div className="p-4 rounded-lg bg-gradient-to-br from-aximo-card to-aximo-darker border border-aximo-border shadow-lg hover:shadow-aximo-primary/10 transition-all duration-300">
        <div className="flex items-center justify-between">
          <p className="text-sm text-aximo-text-secondary">{title}</p>
          <Badge variant="outline" className={getVariantStyles()}>
            {count}
          </Badge>
        </div>
      </div>
    </motion.div>
  );
}
