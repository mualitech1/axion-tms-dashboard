
import { Progress } from '@/components/ui/progress';
import { useState, useEffect } from 'react';

interface FormProgressBarProps {
  formCompletion: number;
}

export const FormProgressBar = ({ formCompletion }: FormProgressBarProps) => {
  // Define color classes for the progress bar based on completion percentage
  const getProgressColor = () => {
    if (formCompletion < 30) return "bg-red-500";
    if (formCompletion < 70) return "bg-amber-500"; 
    return "bg-emerald-500";
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">Completion</span>
        <span className="text-sm font-bold text-primary">{formCompletion}%</span>
      </div>
      <Progress 
        value={formCompletion} 
        className="h-2 rounded-full bg-gray-100" 
        indicatorClassName={getProgressColor()}
      />
    </div>
  );
};
