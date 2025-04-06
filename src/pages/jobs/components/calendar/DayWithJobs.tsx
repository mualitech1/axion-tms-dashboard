
import React from 'react';

interface DayWithJobsProps {
  date: Date;
  jobCount: number;
}

export function DayWithJobs({ date, jobCount }: DayWithJobsProps) {
  const day = date.getDate();
  
  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="relative z-10">{day}</div>
      {jobCount > 0 && (
        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
          <div className={`
            text-[9px] font-medium rounded-full px-1.5 h-[14px] flex items-center justify-center
            ${jobCount > 2 ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700'}
          `}>
            {jobCount}
          </div>
        </div>
      )}
    </div>
  );
}
